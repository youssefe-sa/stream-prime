import { useState, useEffect, useCallback } from 'react';

interface VisitorData {
  id: string;
  ip: string;
  country: string;
  city: string;
  browser: string;
  os: string;
  device: string;
  currentPage: string;
  duration: number;
  timestamp: string;
  isOnline: boolean;
}

interface VisitorStats {
  totalVisitors: number;
  onlineVisitors: number;
  totalPageViews: number;
  averageDuration: number;
  topPages: Array<{ page: string; views: number }>;
  topCountries: Array<{ country: string; visitors: number }>;
}

export const useVisitorTracking = () => {
  const [visitors, setVisitors] = useState<VisitorData[]>([]);
  const [stats, setStats] = useState<VisitorStats>({
    totalVisitors: 0,
    onlineVisitors: 0,
    totalPageViews: 0,
    averageDuration: 0,
    topPages: [],
    topCountries: []
  });
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fonction pour détecter les informations du navigateur
  const getBrowserInfo = useCallback(() => {
    const userAgent = navigator.userAgent;
    let browser = 'Unknown';
    let os = 'Unknown';
    let device = 'desktop';

    // Détection du navigateur
    if (userAgent.indexOf('Chrome') > -1) browser = 'Chrome';
    else if (userAgent.indexOf('Safari') > -1) browser = 'Safari';
    else if (userAgent.indexOf('Firefox') > -1) browser = 'Firefox';
    else if (userAgent.indexOf('Edge') > -1) browser = 'Edge';

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
  }, []);

  // Fonction pour obtenir la localisation (simulation)
  const getLocation = useCallback(async () => {
    // En production, utiliser une API de géolocalisation comme https://ipapi.co/
    return {
      ip: '192.168.1.' + Math.floor(Math.random() * 255),
      country: ['France', 'Canada', 'Belgique', 'Suisse', 'Maroc'][Math.floor(Math.random() * 5)],
      city: ['Paris', 'Montréal', 'Bruxelles', 'Genève', 'Casablanca'][Math.floor(Math.random() * 5)]
    };
  }, []);

  // Fonction pour suivre la visite actuelle
  const trackCurrentVisit = useCallback(async () => {
    const { browser, os, device } = getBrowserInfo();
    const location = await getLocation();
    
    const visitorData: VisitorData = {
      id: Math.random().toString(36).substr(2, 9),
      ip: location.ip,
      country: location.country,
      city: location.city,
      browser,
      os,
      device,
      currentPage: window.location.pathname,
      duration: 0,
      timestamp: new Date().toISOString(),
      isOnline: true
    };

    // Envoyer les données au serveur (simulation)
    console.log('Tracking visitor:', visitorData);
    
    return visitorData;
  }, [getBrowserInfo, getLocation]);

  // Fonction pour suivre les changements de page
  const trackPageView = useCallback((path: string) => {
    console.log('Page view tracked:', path);
    // En production, envoyer à l'API
  }, []);

  // Simulation de connexion WebSocket
  useEffect(() => {
    const simulateConnection = () => {
      setIsConnected(true);
      setError(null);

      // Simuler la réception de données de visiteurs
      const interval = setInterval(() => {
        setVisitors(prev => {
          const updated = prev.map(v => ({
            ...v,
            duration: v.duration + 5,
            isOnline: Math.random() > 0.05
          })).filter(v => v.isOnline || v.duration > 300);

          // Ajouter de nouveaux visiteurs simulés
          if (Math.random() > 0.7 && updated.length < 10) {
            const newVisitor: VisitorData = {
              id: Math.random().toString(36).substr(2, 9),
              ip: `192.168.1.${Math.floor(Math.random() * 255)}`,
              country: ['France', 'Canada', 'Belgique', 'Suisse', 'Maroc'][Math.floor(Math.random() * 5)],
              city: ['Paris', 'Montréal', 'Bruxelles', 'Genève', 'Casablanca'][Math.floor(Math.random() * 5)],
              browser: ['Chrome', 'Safari', 'Firefox', 'Edge'][Math.floor(Math.random() * 4)],
              os: ['Windows', 'macOS', 'Linux', 'Android', 'iOS'][Math.floor(Math.random() * 5)],
              device: ['desktop', 'mobile', 'tablet'][Math.floor(Math.random() * 3)],
              currentPage: ['/', '/pricing', '/channels', '/faq', '/contact'][Math.floor(Math.random() * 5)],
              duration: Math.floor(Math.random() * 300),
              timestamp: new Date().toISOString(),
              isOnline: true
            };
            updated.push(newVisitor);
          }

          return updated;
        });

        setStats(prev => ({
          ...prev,
          onlineVisitors: Math.max(1, Math.floor(Math.random() * 8) + 2),
          totalPageViews: prev.totalPageViews + Math.floor(Math.random() * 3)
        }));
      }, 5000);

      return () => clearInterval(interval);
    };

    const connectionTimeout = setTimeout(simulateConnection, 1000);

    return () => {
      clearTimeout(connectionTimeout);
      setIsConnected(false);
    };
  }, []);

  // Suivi des changements de page
  useEffect(() => {
    const handleRouteChange = () => {
      trackPageView(window.location.pathname);
    };

    window.addEventListener('popstate', handleRouteChange);
    
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, [trackPageView]);

  return {
    visitors,
    stats,
    isConnected,
    error,
    trackCurrentVisit,
    trackPageView
  };
};
