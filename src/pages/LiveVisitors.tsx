import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Activity, Clock, Globe, Monitor, Smartphone, Tablet, User, Users, Eye, TrendingUp, TrendingDown, Wifi, WifiOff, RefreshCw, Filter, CalendarIcon, ExternalLink } from "lucide-react";
import { io, Socket } from "socket.io-client";
import VisitorTracker from "@/lib/visitorTracker";
import { format } from "date-fns";

interface Visitor {
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
  isVisible?: boolean;
  hasFocus?: boolean;
  lastHeartbeat?: number;
  referrer?: string;
}

interface Stats {
  totalVisitors: number;
  onlineVisitors: number;
  totalPageViews: number;
  averageDuration: number;
  topPages: Array<{ page: string; views: number }>;
  topCountries: Array<{ country: string; visitors: number }>;
  topReferrers: Array<{ referrer: string; visitors: number }>;
}

const LiveVisitors = () => {
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [filteredVisitors, setFilteredVisitors] = useState<Visitor[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalVisitors: 0,
    onlineVisitors: 0,
    totalPageViews: 0,
    averageDuration: 0,
    topPages: [],
    topCountries: [],
    topReferrers: []
  });
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected'>('connecting');
  const [visitorTracker, setVisitorTracker] = useState<VisitorTracker | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined);
  const [viewMode, setViewMode] = useState<'live' | 'historical'>('live');
  const [showReferrers, setShowReferrers] = useState(false);

  useEffect(() => {
    // Initialiser le tracker de visiteurs
    const tracker = new VisitorTracker();
    setVisitorTracker(tracker);

    // Connexion au serveur WebSocket
    const newSocket = io(() => {
      // Déterminer l'URL du serveur selon l'environnement
      const isDevelopment = window.location.hostname === 'localhost' || 
                           window.location.hostname === '127.0.0.1' ||
                           window.location.hostname.includes('192.168.');
      
      return isDevelopment ? 'http://localhost:3001' : 
             window.location.protocol + '//' + window.location.hostname + ':3001';
    }(), {
      transports: ['websocket', 'polling'],
      timeout: 10000,
      forceNew: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000
    });

    newSocket.on('connect', () => {
      console.log('Connected to tracking server');
      setConnectionStatus('connected');
      setLoading(false);
      
      // Demander les données initiales
      newSocket.emit('get_visitor_data');
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from tracking server');
      setConnectionStatus('disconnected');
    });

    newSocket.on('connect_error', () => {
      console.error('Connection error');
      setConnectionStatus('disconnected');
      setLoading(false);
    });

    newSocket.on('visitor_data', (data) => {
      setVisitors(data.visitors || []);
      setStats(data.statistics || stats);
    });

    newSocket.on('visitors_list', (data) => {
      setVisitors(data);
    });

    newSocket.on('statistics_update', (data) => {
      setStats(data);
    });

    newSocket.on('visitor_update', (data) => {
      setVisitors(prev => {
        const index = prev.findIndex(v => v.id === data.id);
        if (index !== -1) {
          const updated = [...prev];
          updated[index] = data;
          return updated;
        }
        return [...prev, data];
      });
    });

    newSocket.on('visitor_left', (data) => {
      console.log('Visitor left:', data);
      setVisitors(prev => prev.filter(v => v.id !== data.visitorId));
      
      // Afficher une notification de départ
      if (window.Notification && Notification.permission === 'granted') {
        new Notification('Visiteur parti', {
          body: `Un visiteur a quitté ${data.lastPage}`,
          icon: '/favicon.svg'
        });
      }
    });

    newSocket.on('heartbeat_received', (data) => {
      setVisitors(prev => {
        const index = prev.findIndex(v => v.id === data.visitorId);
        if (index !== -1) {
          const updated = [...prev];
          updated[index] = {
            ...updated[index],
            duration: data.duration,
            lastHeartbeat: data.timestamp
          };
          return updated;
        }
        return prev;
      });
    });

    newSocket.on('visitor_visibility_changed', (data) => {
      setVisitors(prev => {
        const index = prev.findIndex(v => v.id === data.visitorId);
        if (index !== -1) {
          const updated = [...prev];
          updated[index] = {
            ...updated[index],
            isVisible: data.visible
          };
          return updated;
        }
        return prev;
      });
    });

    newSocket.on('visitor_focus_changed', (data) => {
      setVisitors(prev => {
        const index = prev.findIndex(v => v.id === data.visitorId);
        if (index !== -1) {
          const updated = [...prev];
          updated[index] = {
            ...updated[index],
            hasFocus: data.focused
          };
          return updated;
        }
        return prev;
      });
    });

    newSocket.on('visitor_activity', (data) => {
      console.log('Visitor activity:', data);
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  // Mettre à jour la durée des visiteurs chaque seconde
  useEffect(() => {
    const interval = setInterval(() => {
      setVisitors(prev => 
        prev.map(visitor => ({
          ...visitor,
          duration: visitor.duration + 1
        }))
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Filtrer les visiteurs selon la date et le mode
  useEffect(() => {
    let filtered = [...visitors];
    
    if (viewMode === 'historical' && dateFilter) {
      const filterDate = format(dateFilter, 'yyyy-MM-dd');
      filtered = filtered.filter(visitor => 
        visitor.timestamp.startsWith(filterDate)
      );
    }
    
    setFilteredVisitors(filtered);
  }, [visitors, dateFilter, viewMode]);

  // Fonction de rafraîchissement manuel
  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      if (socket && socket.connected) {
        socket.emit('request_refresh');
      }
      
      // Simuler un délai pour l'effet de chargement
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Fonction pour basculer la vue des referrers
  const toggleReferrers = () => {
    setShowReferrers(!showReferrers);
  };

  const getDeviceIcon = (device: string) => {
    switch (device) {
      case "mobile":
        return <Smartphone className="h-4 w-4" />;
      case "tablet":
        return <Tablet className="h-4 w-4" />;
      default:
        return <Monitor className="h-4 w-4" />;
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex items-center space-x-2">
            <Activity className="h-6 w-6 animate-pulse text-primary" />
            <span className="text-lg">Connecting to tracking server...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Eye className="h-8 w-8 text-primary" />
            Live Visitors
          </h1>
          <p className="text-muted-foreground mt-2">
            Track visitor activity on your website in real-time
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* Mode selector */}
          <Select value={viewMode} onValueChange={(value: 'live' | 'historical') => setViewMode(value)}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="live">Live</SelectItem>
              <SelectItem value="historical">Historical</SelectItem>
            </SelectContent>
          </Select>

          {/* Date filter */}
          {viewMode === 'historical' && (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-40">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateFilter ? format(dateFilter, 'PPP') : 'Choose date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={dateFilter}
                  onSelect={setDateFilter}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          )}

          {/* Refresh button */}
          <Button 
            onClick={handleRefresh} 
            disabled={isRefreshing}
            variant="outline"
            size="sm"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Refreshing...' : 'Refresh'}
          </Button>

          {/* Referrers button */}
          <Button 
            onClick={toggleReferrers}
            variant={showReferrers ? "default" : "outline"}
            size="sm"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            {showReferrers ? 'Hide' : 'Show'} Referrers
          </Button>

          {/* Connection status */}
          <Badge variant={connectionStatus === 'connected' ? 'default' : 'destructive'} className="text-sm">
            {connectionStatus === 'connected' ? (
              <>
                <Wifi className="h-3 w-3 mr-1" />
                Connected
              </>
            ) : connectionStatus === 'connecting' ? (
              <>
                <Activity className="h-3 w-3 mr-1 animate-pulse" />
                Connecting...
              </>
            ) : (
              <>
                <WifiOff className="h-3 w-3 mr-1" />
                Disconnected
              </>
            )}
          </Badge>
          <Badge variant="outline" className="text-sm">
            <Activity className="h-3 w-3 mr-1 animate-pulse" />
            Live
          </Badge>
        </div>
      </div>

      {/* Main statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Online Visitors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.onlineVisitors}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              Currently on site
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Visitors</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalVisitors.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Today
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Page Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPageViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Total today
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Duration</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatDuration(stats.averageDuration)}</div>
            <p className="text-xs text-muted-foreground">
              Per visitor
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Referrers view */}
      {showReferrers && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <ExternalLink className="h-5 w-5" />
                Traffic Sources
              </CardTitle>
              <CardDescription>
                Where your visitors come from
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {stats.topReferrers && stats.topReferrers.length > 0 ? (
                  stats.topReferrers.map((referrer, index) => (
                    <div key={referrer.referrer} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-muted-foreground w-4">
                          {index + 1}.
                        </span>
                        <span className="text-sm truncate max-w-[200px]" title={referrer.referrer}>
                          {referrer.referrer === 'direct' ? 'Direct Access' : referrer.referrer}
                        </span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {referrer.visitors}
                      </Badge>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No traffic sources recorded</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Source Distribution</CardTitle>
              <CardDescription>
                Percentage by source type
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {stats.topReferrers && stats.topReferrers.length > 0 ? (
                  stats.topReferrers.slice(0, 5).map((referrer) => {
                    const percentage = stats.topReferrers.reduce((sum, r) => sum + r.visitors, 0) > 0 
                      ? Math.round((referrer.visitors / stats.topReferrers.reduce((sum, r) => sum + r.visitors, 0)) * 100)
                      : 0;
                    
                    return (
                      <div key={referrer.referrer} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="truncate">
                            {referrer.referrer === 'direct' ? 'Direct Access' : 
                             referrer.referrer.length > 20 ? referrer.referrer.substring(0, 20) + '...' : 
                             referrer.referrer}
                          </span>
                          <span className="text-muted-foreground">{percentage}%</span>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-sm text-muted-foreground">No data available</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Online visitors list */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              {viewMode === 'live' ? 'Active Visitors' : `Visitors from ${dateFilter ? format(dateFilter, 'PPP') : 'selected day'}`}
            </CardTitle>
            <CardDescription>
              {viewMode === 'live' ? 'Visitors currently on your site' : 'Visitors according to selected filter'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {(viewMode === 'live' ? filteredVisitors : filteredVisitors).map((visitor) => (
                <div key={visitor.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${visitor.isOnline ? 'bg-green-500' : 'bg-gray-400'}`} />
                      <span className="font-medium">{visitor.country}</span>
                      <Badge variant="outline" className="text-xs">
                        {visitor.city}
                      </Badge>
                      {visitor.isVisible === false && (
                        <Badge variant="secondary" className="text-xs">
                          Hidden
                        </Badge>
                      )}
                      {visitor.hasFocus === false && (
                        <Badge variant="outline" className="text-xs">
                          Inactive
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {formatDuration(visitor.duration)}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      {getDeviceIcon(visitor.device)}
                      <span>{visitor.browser} on {visitor.os}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="h-3 w-3" />
                      <span>{visitor.ip}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye className="h-3 w-3" />
                      <span className="font-mono">{visitor.currentPage}</span>
                    </div>
                  </div>
                  
                  {visitor.referrer && visitor.referrer !== 'direct' && (
                    <div className="mt-2 text-xs text-muted-foreground flex items-center gap-1">
                      <ExternalLink className="h-3 w-3" />
                      Source: {visitor.referrer.length > 30 ? visitor.referrer.substring(0, 30) + '...' : visitor.referrer}
                    </div>
                  )}
                  
                  <div className="mt-2 text-xs text-muted-foreground">
                    Arrived at {formatTimestamp(visitor.timestamp)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Popular pages and countries */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Popular Pages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {stats.topPages.map((page, index) => (
                  <div key={page.page} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-muted-foreground w-4">
                        {index + 1}.
                      </span>
                      <span className="font-mono text-sm">{page.page}</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {page.views}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Top Countries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {stats.topCountries.map((country, index) => (
                  <div key={country.country} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-muted-foreground w-4">
                        {index + 1}.
                      </span>
                      <span className="text-sm">{country.country}</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {country.visitors}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LiveVisitors;
