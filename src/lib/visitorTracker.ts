import { io, Socket } from 'socket.io-client';

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
  userAgent: string;
  referrer?: string;
  screenResolution: string;
  language: string;
}

interface LocationData {
  ip: string;
  country: string;
  city: string;
  region: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

class VisitorTracker {
  private socket: Socket | null = null;
  private visitorId: string | null = null;
  private startTime: number = Date.now();
  private currentPath: string = window.location.pathname;
  private reconnectAttempts: number = 0;
  private maxReconnectAttempts: number = 5;

  constructor() {
    this.init();
  }

  private async init() {
    this.visitorId = this.getOrCreateVisitorId();
    await this.connectToServer();
    this.setupEventListeners();
    this.trackInitialVisit();
  }

  private getOrCreateVisitorId(): string {
    let visitorId = localStorage.getItem('visitor_id');
    if (!visitorId) {
      visitorId = this.generateVisitorId();
      localStorage.setItem('visitor_id', visitorId);
    }
    return visitorId;
  }

  private generateVisitorId(): string {
    return 'visitor_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  private async connectToServer() {
    try {
      // Connexion au serveur WebSocket
      this.socket = io(process.env.NODE_ENV === 'production' 
        ? 'wss://your-domain.com' 
        : 'ws://localhost:3001', {
        transports: ['websocket', 'polling'],
        timeout: 10000,
        forceNew: true
      });

      this.socket.on('connect', () => {
        console.log('Connected to visitor tracking server');
        this.reconnectAttempts = 0;
        this.identifyVisitor();
      });

      this.socket.on('disconnect', () => {
        console.log('Disconnected from visitor tracking server');
        this.attemptReconnect();
      });

      this.socket.on('error', (error) => {
        console.error('Socket error:', error);
      });

    } catch (error) {
      console.error('Failed to connect to tracking server:', error);
      this.fallbackToLocalStorage();
    }
  }

  private attemptReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      setTimeout(() => {
        console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
        this.connectToServer();
      }, 2000 * this.reconnectAttempts);
    } else {
      console.log('Max reconnection attempts reached, falling back to localStorage');
      this.fallbackToLocalStorage();
    }
  }

  private identifyVisitor() {
    if (this.socket && this.visitorId) {
      this.socket.emit('identify_visitor', { visitorId: this.visitorId });
    }
  }

  private setupEventListeners() {
    // Suivi des changements de page
    window.addEventListener('popstate', () => {
      this.trackPageChange();
    });

    // Suivi des clics sur les liens internes
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      if (link && link.hostname === window.location.hostname) {
        setTimeout(() => this.trackPageChange(), 100);
      }
    });

    // Suivi de l'activité de l'utilisateur
    let activityTimeout: NodeJS.Timeout;
    const resetActivityTimeout = () => {
      clearTimeout(activityTimeout);
      activityTimeout = setTimeout(() => {
        this.trackUserActivity('idle');
      }, 30000); // 30 secondes d'inactivité
    };

    ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach(event => {
      document.addEventListener(event, resetActivityTimeout, true);
    });

    resetActivityTimeout();

    // Suivi avant de quitter la page
    window.addEventListener('beforeunload', () => {
      this.trackPageLeave();
    });
  }

  private async trackInitialVisit() {
    const visitorData = await this.collectVisitorData();
    this.sendVisitorData('page_visit', visitorData);
  }

  private trackPageChange() {
    const newPath = window.location.pathname;
    if (newPath !== this.currentPath) {
      this.currentPath = newPath;
      this.collectVisitorData().then(visitorData => {
        this.sendVisitorData('page_change', visitorData);
      });
    }
  }

  private trackUserActivity(activity: string) {
    this.sendVisitorData('user_activity', { activity, timestamp: Date.now() });
  }

  private trackPageLeave() {
    const duration = Date.now() - this.startTime;
    this.sendVisitorData('page_leave', { 
      duration, 
      path: this.currentPath,
      timestamp: Date.now() 
    });
  }

  private async collectVisitorData(): Promise<VisitorData> {
    const browserInfo = this.getBrowserInfo();
    const locationData = await this.getLocationData();
    
    return {
      id: this.visitorId!,
      ip: locationData.ip,
      country: locationData.country,
      city: locationData.city,
      browser: browserInfo.browser,
      os: browserInfo.os,
      device: browserInfo.device,
      currentPage: this.currentPath,
      duration: Math.floor((Date.now() - this.startTime) / 1000),
      timestamp: new Date().toISOString(),
      isOnline: true,
      userAgent: navigator.userAgent,
      referrer: document.referrer || 'direct',
      screenResolution: `${screen.width}x${screen.height}`,
      language: navigator.language
    };
  }

  private getBrowserInfo() {
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

  private async getLocationData(): Promise<LocationData> {
    try {
      // Essayer plusieurs API de géolocalisation
      const apis = [
        {
          url: 'https://ipapi.co/json/',
          transform: (data: any) => ({
            ip: data.ip,
            country: data.country_name || data.country,
            city: data.city,
            region: data.region,
            latitude: data.latitude,
            longitude: data.longitude,
            timezone: data.timezone
          })
        },
        {
          url: 'https://api.ipify.org?format=json',
          transform: async (data: any) => {
            // Deuxième appel pour obtenir la localisation
            const response = await fetch(`https://ipapi.co/${data.ip}/json/`);
            const locationData = await response.json();
            return {
              ip: data.ip,
              country: locationData.country_name || locationData.country,
              city: locationData.city,
              region: locationData.region,
              latitude: locationData.latitude,
              longitude: locationData.longitude,
              timezone: locationData.timezone
            };
          }
        }
      ];

      for (const api of apis) {
        try {
          const response = await fetch(api.url);
          if (response.ok) {
            const data = await response.json();
            return await api.transform(data);
          }
        } catch (error) {
          console.warn(`Failed to fetch location from ${api.url}:`, error);
          continue;
        }
      }

      throw new Error('All location APIs failed');

    } catch (error) {
      console.warn('Location detection failed, using fallback:', error);
      return {
        ip: 'unknown',
        country: 'Unknown',
        city: 'Unknown',
        region: 'Unknown',
        latitude: 0,
        longitude: 0,
        timezone: 'UTC'
      };
    }
  }

  private sendVisitorData(event: string, data: any) {
    if (this.socket && this.socket.connected) {
      this.socket.emit(event, data);
    } else {
      // Fallback: stocker localement et synchroniser plus tard
      this.storeOfflineData(event, data);
    }
  }

  private storeOfflineData(event: string, data: any) {
    const offlineData = JSON.parse(localStorage.getItem('offline_visitor_data') || '[]');
    offlineData.push({ event, data, timestamp: Date.now() });
    
    // Garder seulement les 100 derniers événements
    if (offlineData.length > 100) {
      offlineData.splice(0, offlineData.length - 100);
    }
    
    localStorage.setItem('offline_visitor_data', JSON.stringify(offlineData));
  }

  private fallbackToLocalStorage() {
    console.log('Using localStorage fallback for visitor tracking');
    // Implémenter le suivi via localStorage si le serveur n'est pas disponible
  }

  // Méthodes publiques
  public trackCustomEvent(eventName: string, data: any) {
    this.sendVisitorData('custom_event', { eventName, data, timestamp: Date.now() });
  }

  public getVisitorId(): string | null {
    return this.visitorId;
  }

  public isConnected(): boolean {
    return this.socket?.connected || false;
  }
}

export default VisitorTracker;
