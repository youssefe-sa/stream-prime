// Script de tracking pour tous les visiteurs du site
(function() {
  'use strict';

  // Variables globales
  let socket = null;
  let visitorId = null;
  let startTime = Date.now();
  let currentPath = window.location.pathname;
  let reconnectAttempts = 0;
  const maxReconnectAttempts = 5;
  let heartbeatInterval = null;
  let isPageVisible = true;
  let lastActivityTime = Date.now();

  // Fonction pour générer un ID de visiteur unique
  function getOrCreateVisitorId() {
    let id = localStorage.getItem('visitor_id');
    if (!id) {
      id = 'visitor_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('visitor_id', id);
    }
    return id;
  }

  // Fonction pour obtenir les informations du navigateur
  function getBrowserInfo() {
    const userAgent = navigator.userAgent;
    let browser = 'Unknown';
    let os = 'Unknown';
    let device = 'desktop';

    // Détection du navigateur
    if (userAgent.indexOf('Chrome') > -1 && userAgent.indexOf('Edg') === -1) browser = 'Chrome';
    else if (userAgent.indexOf('Safari') > -1 && userAgent.indexOf('Chrome') === -1) browser = 'Safari';
    else if (userAgent.indexOf('Firefox') > -1) browser = 'Firefox';
    else if (userAgent.indexOf('Edg') > -1) browser = 'Edge';
    else if (userAgent.indexOf('Opera') > -1 || userAgent.indexOf('OPR') > -1) browser = 'Opera';

    // Détection de l'OS
    if (userAgent.indexOf('Windows') > -1) os = 'Windows';
    else if (userAgent.indexOf('Mac') > -1) os = 'macOS';
    else if (userAgent.indexOf('Linux') > -1) os = 'Linux';
    else if (userAgent.indexOf('Android') > -1) os = 'Android';
    else if (userAgent.indexOf('iOS') > -1) os = 'iOS';

    // Détection du type d'appareil
    if (/Mobile|Android|iPhone|iPad/.test(userAgent)) {
      device = /iPad/.test(userAgent) ? 'tablet' : 'mobile';
    }

    return { browser, os, device };
  }

  // Fonction pour obtenir la localisation (API gratuite)
  async function getLocationData() {
    try {
      // Utiliser ipify pour obtenir l'IP, puis ipapi pour la localisation
      try {
        const ipResponse = await fetch('https://api.ipify.org?format=json', {
          mode: 'cors',
          headers: {
            'Accept': 'application/json'
          }
        });
        
        if (ipResponse.ok) {
          const ipData = await ipResponse.json();
          console.log('IP obtained:', ipData.ip);
          
          // Essayer d'obtenir la localisation avec l'IP
          try {
            const locResponse = await fetch(`https://ipapi.co/${ipData.ip}/json/`, {
              mode: 'cors',
              headers: {
                'Accept': 'application/json'
              }
            });
            
            if (locResponse.ok) {
              const locData = await locResponse.json();
              console.log('Location data:', locData);
              
              return {
                ip: ipData.ip,
                country: locData.country_name || locData.country || 'Unknown',
                city: locData.city || 'Unknown',
                region: locData.region || 'Unknown',
                latitude: locData.latitude || 0,
                longitude: locData.longitude || 0,
                timezone: locData.timezone || 'UTC'
              };
            }
          } catch (locError) {
            console.warn('Location API failed, using IP only:', locError.message);
          }
          
          // Retourner au moins l'IP si la localisation échoue
          return {
            ip: ipData.ip,
            country: 'Unknown',
            city: 'Unknown',
            region: 'Unknown',
            latitude: 0,
            longitude: 0,
            timezone: 'UTC'
          };
        }
      } catch (ipError) {
        console.warn('IP API failed:', ipError.message);
      }
      
      // Fallback final
      throw new Error('All APIs failed');
      
    } catch (error) {
      console.error('Location API failed:', error);
      
      // Fallback vers des données fictives pour le développement
      return {
        ip: '127.0.0.1',
        country: 'Local',
        city: 'Development',
        region: 'Local',
        latitude: 0,
        longitude: 0,
        timezone: 'UTC'
      };
    }
  }

  // Fonction pour collecter les données du visiteur
  async function collectVisitorData() {
    const browserInfo = getBrowserInfo();
    const locationData = await getLocationData();
    
    return {
      id: visitorId,
      ip: locationData.ip,
      country: locationData.country,
      city: locationData.city,
      browser: browserInfo.browser,
      os: browserInfo.os,
      device: browserInfo.device,
      currentPage: currentPath,
      duration: Math.floor((Date.now() - startTime) / 1000),
      timestamp: new Date().toISOString(),
      isOnline: true,
      userAgent: navigator.userAgent,
      referrer: document.referrer || 'direct',
      screenResolution: `${screen.width}x${screen.height}`,
      language: navigator.language
    };
  }

  // Fonction pour démarrer le heartbeat
  function startHeartbeat() {
    if (heartbeatInterval) {
      clearInterval(heartbeatInterval);
    }
    
    heartbeatInterval = setInterval(() => {
      if (socket && socket.connected && isPageVisible) {
        socket.emit('heartbeat', {
          visitorId: visitorId,
          timestamp: Date.now(),
          currentPath: currentPath,
          duration: Math.floor((Date.now() - startTime) / 1000),
          lastActivity: lastActivityTime
        });
        lastActivityTime = Date.now();
      }
    }, 15000); // Heartbeat toutes les 15 secondes
  }

  // Fonction pour arrêter le heartbeat
  function stopHeartbeat() {
    if (heartbeatInterval) {
      clearInterval(heartbeatInterval);
      heartbeatInterval = null;
    }
  }

  // Fonction pour se connecter au serveur WebSocket
  function connectToServer() {
    try {
      // Utiliser Socket.IO CDN si non disponible
      if (typeof io === 'undefined') {
        loadSocketIO();
        return;
      }

      socket = io('http://localhost:3001', {
        transports: ['websocket', 'polling'],
        timeout: 10000,
        forceNew: true
      });

      socket.on('connect', () => {
        console.log('Visitor tracking connected');
        reconnectAttempts = 0;
        identifyVisitor();
        trackInitialVisit();
        startHeartbeat();
      });

      socket.on('disconnect', () => {
        console.log('Visitor tracking disconnected');
        stopHeartbeat();
        attemptReconnect();
      });

      socket.on('connect_error', (error) => {
        console.error('Connection error:', error);
        stopHeartbeat();
        fallbackToLocalStorage();
      });

    } catch (error) {
      console.error('Failed to connect to tracking server:', error);
      fallbackToLocalStorage();
    }
  }

  // Charger Socket.IO depuis CDN si nécessaire
  function loadSocketIO() {
    const script = document.createElement('script');
    script.src = 'https://cdn.socket.io/4.7.4/socket.io.min.js';
    script.onload = () => {
      connectToServer();
    };
    script.onerror = () => {
      console.error('Failed to load Socket.IO');
      fallbackToLocalStorage();
    };
    document.head.appendChild(script);
  }

  // Fonction pour tenter de se reconnecter
  function attemptReconnect() {
    if (reconnectAttempts < maxReconnectAttempts) {
      reconnectAttempts++;
      setTimeout(() => {
        console.log(`Attempting to reconnect (${reconnectAttempts}/${maxReconnectAttempts})`);
        connectToServer();
      }, 2000 * reconnectAttempts);
    } else {
      console.log('Max reconnection attempts reached, using fallback');
      fallbackToLocalStorage();
    }
  }

  // Fonction pour identifier le visiteur
  function identifyVisitor() {
    if (socket && visitorId) {
      socket.emit('identify_visitor', { visitorId: visitorId });
    }
  }

  // Fonction pour suivre la visite initiale
  async function trackInitialVisit() {
    const visitorData = await collectVisitorData();
    sendVisitorData('page_visit', visitorData);
  }

  // Fonction pour suivre les changements de page
  async function trackPageChange() {
    const newPath = window.location.pathname;
    if (newPath !== currentPath) {
      currentPath = newPath;
      const visitorData = await collectVisitorData();
      sendVisitorData('page_change', visitorData);
    }
  }

  // Fonction pour suivre l'activité utilisateur
  function trackUserActivity(activity) {
    sendVisitorData('user_activity', { 
      activity, 
      timestamp: Date.now() 
    });
  }

  // Fonction pour suivre le départ de la page
  function trackPageLeave() {
    const duration = Date.now() - startTime;
    sendVisitorData('page_leave', { 
      duration, 
      path: currentPath,
      timestamp: Date.now() 
    });
  }

  // Fonction pour envoyer les données au serveur
  function sendVisitorData(event, data) {
    if (socket && socket.connected) {
      socket.emit(event, data);
    } else {
      storeOfflineData(event, data);
    }
  }

  // Fonction pour stocker les données hors ligne
  function storeOfflineData(event, data) {
    try {
      const offlineData = JSON.parse(localStorage.getItem('offline_visitor_data') || '[]');
      offlineData.push({ event, data, timestamp: Date.now() });
      
      // Garder seulement les 100 derniers événements
      if (offlineData.length > 100) {
        offlineData.splice(0, offlineData.length - 100);
      }
      
      localStorage.setItem('offline_visitor_data', JSON.stringify(offlineData));
    } catch (error) {
      console.warn('Failed to store offline data:', error);
    }
  }

  // Fallback vers localStorage
  function fallbackToLocalStorage() {
    console.log('Using localStorage fallback for visitor tracking');
    
    // Suivi basique via localStorage
    trackInitialVisit().then(() => {
      console.log('Basic visitor tracking active');
    });
  }

  // Configuration des écouteurs d'événements
  function setupEventListeners() {
    // Suivi des changements de page
    window.addEventListener('popstate', trackPageChange);
    
    // Suivi des clics sur les liens internes
    document.addEventListener('click', function(e) {
      const target = e.target.closest('a');
      if (target && target.hostname === window.location.hostname) {
        setTimeout(trackPageChange, 100);
      }
    });

    // Suivi de l'activité utilisateur
    let activityTimeout;
    function resetActivityTimeout() {
      clearTimeout(activityTimeout);
      lastActivityTime = Date.now();
      activityTimeout = setTimeout(() => {
        trackUserActivity('idle');
      }, 30000); // 30 secondes d'inactivité
    }

    ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach(event => {
      document.addEventListener(event, resetActivityTimeout, true);
    });

    resetActivityTimeout();

    // Suivi amélioré avant de quitter la page
    window.addEventListener('beforeunload', function(e) {
      // Envoyer un heartbeat final avec le statut de départ
      if (socket && socket.connected) {
        socket.emit('visitor_leaving', {
          visitorId: visitorId,
          currentPath: currentPath,
          duration: Math.floor((Date.now() - startTime) / 1000),
          timestamp: Date.now(),
          reason: 'page_unload'
        });
      }
      
      // Stocker localement aussi en cas d'échec
      storeOfflineData('visitor_leaving', {
        visitorId: visitorId,
        currentPath: currentPath,
        duration: Math.floor((Date.now() - startTime) / 1000),
        timestamp: Date.now(),
        reason: 'page_unload'
      });
    });

    // Suivi de la visibilité de la page
    document.addEventListener('visibilitychange', function() {
      isPageVisible = !document.hidden;
      
      if (document.hidden) {
        trackUserActivity('page_hidden');
        // Envoyer un heartbeat quand la page devient cachée
        if (socket && socket.connected) {
          socket.emit('page_visibility_change', {
            visitorId: visitorId,
            visible: false,
            timestamp: Date.now()
          });
        }
      } else {
        trackUserActivity('page_visible');
        // Redémarrer le heartbeat quand la page redevient visible
        startHeartbeat();
        if (socket && socket.connected) {
          socket.emit('page_visibility_change', {
            visitorId: visitorId,
            visible: true,
            timestamp: Date.now()
          });
        }
      }
    });

    // Suivi quand l'utilisateur ferme l'onglet
    window.addEventListener('pagehide', function(e) {
      if (socket && socket.connected) {
        // Envoyer un message synchrone si possible
        socket.emit('visitor_leaving', {
          visitorId: visitorId,
          currentPath: currentPath,
          duration: Math.floor((Date.now() - startTime) / 1000),
          timestamp: Date.now(),
          reason: 'page_hide'
        });
      }
    });

    // Suivi quand le focus est perdu
    window.addEventListener('blur', function() {
      if (socket && socket.connected) {
        socket.emit('focus_change', {
          visitorId: visitorId,
          focused: false,
          timestamp: Date.now()
        });
      }
    });

    window.addEventListener('focus', function() {
      if (socket && socket.connected) {
        socket.emit('focus_change', {
          visitorId: visitorId,
          focused: true,
          timestamp: Date.now()
        });
      }
    });
  }

  // Initialisation du tracking
  function initTracking() {
    visitorId = getOrCreateVisitorId();
    setupEventListeners();
    connectToServer();
  }

  // Démarrer le tracking quand la page est chargée
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTracking);
  } else {
    initTracking();
  }

  // Exposer des fonctions globales pour le tracking personnalisé
  window.VisitorTracker = {
    trackCustomEvent: function(eventName, data) {
      sendVisitorData('custom_event', { eventName, data, timestamp: Date.now() });
    },
    getVisitorId: function() {
      return visitorId;
    },
    isConnected: function() {
      return socket && socket.connected;
    }
  };

})();
