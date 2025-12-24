const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: ["http://localhost:8080", "http://localhost:5173", "http://192.168.1.105:8080"],
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Stockage en mémoire (remplacer par une vraie base de données en production)
let visitors = new Map();
let pageViews = new Map();
let statistics = {
  totalVisitors: 0,
  onlineVisitors: 0,
  totalPageViews: 0,
  averageDuration: 0,
  topPages: [],
  topCountries: [],
  dailyStats: new Map()
};

// Nettoyer les visiteurs inactifs
setInterval(() => {
  const now = Date.now();
  let cleanedCount = 0;
  
  visitors.forEach((visitor, id) => {
    // Considérer inactif si pas de heartbeat depuis 2 minutes
    const lastHeartbeat = visitor.lastHeartbeat || visitor.lastActivity || 0;
    if (now - lastHeartbeat > 120000) { // 2 minutes
      visitors.delete(id);
      cleanedCount++;
      
      // Émettre un événement de départ
      io.emit('visitor_left', {
        visitorId: id,
        duration: visitor.duration,
        lastPage: visitor.currentPage,
        reason: 'timeout'
      });
    }
  });
  
  statistics.onlineVisitors = visitors.size;
  
  if (cleanedCount > 0) {
    console.log(`Cleaned ${cleanedCount} inactive visitors`);
    updateStatistics();
    io.emit('visitors_list', getVisitorList());
  }
}, 30000); // Vérifier toutes les 30 secondes

function updateStatistics() {
  // Calculer les pages les plus populaires
  const pageCounts = new Map();
  visitors.forEach(visitor => {
    const count = pageCounts.get(visitor.currentPage) || 0;
    pageCounts.set(visitor.currentPage, count + 1);
  });
  
  statistics.topPages = Array.from(pageCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([page, views]) => ({ page, views }));
  
  // Calculer les pays les plus actifs
  const countryCounts = new Map();
  visitors.forEach(visitor => {
    const count = countryCounts.get(visitor.country) || 0;
    countryCounts.set(visitor.country, count + 1);
  });
  
  statistics.topCountries = Array.from(countryCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([country, visitors]) => ({ country, visitors }));

  // Calculer les sources de trafic (referrers)
  const referrerCounts = new Map();
  visitors.forEach(visitor => {
    const referrer = visitor.referrer || 'direct';
    const count = referrerCounts.get(referrer) || 0;
    referrerCounts.set(referrer, count + 1);
  });
  
  statistics.topReferrers = Array.from(referrerCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([referrer, visitors]) => ({ 
      referrer: referrer === 'direct' ? 'direct' : 
               referrer.length > 50 ? referrer.substring(0, 50) + '...' : referrer, 
      visitors 
    }));
  
  // Calculer la durée moyenne
  if (visitors.size > 0) {
    const totalDuration = Array.from(visitors.values())
      .reduce((sum, visitor) => sum + visitor.duration, 0);
    statistics.averageDuration = Math.floor(totalDuration / visitors.size);
  }
  
  // Émettre les statistiques mises à jour
  io.emit('statistics_update', statistics);
}

function getVisitorList() {
  return Array.from(visitors.values()).map(visitor => ({
    id: visitor.id,
    ip: visitor.ip,
    country: visitor.country,
    city: visitor.city,
    browser: visitor.browser,
    os: visitor.os,
    device: visitor.device,
    currentPage: visitor.currentPage,
    duration: visitor.duration,
    timestamp: visitor.timestamp,
    isOnline: Date.now() - visitor.lastActivity < 300000
  }));
}

// Socket.IO handlers
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);
  
  socket.on('identify_visitor', (data) => {
    const { visitorId } = data;
    socket.visitorId = visitorId;
    
    console.log(`Visitor ${visitorId} identified`);
    
    // Envoyer les données actuelles au visiteur
    socket.emit('visitor_data', {
      visitors: getVisitorList(),
      statistics
    });
  });
  
  socket.on('page_visit', (data) => {
    const visitorData = {
      ...data,
      socketId: socket.id,
      lastActivity: Date.now()
    };
    
    visitors.set(data.id, visitorData);
    
    // Mettre à jour les statistiques
    if (!statistics.dailyStats.has(new Date().toDateString())) {
      statistics.dailyStats.set(new Date().toDateString(), {
        visitors: new Set(),
        pageViews: 0
      });
    }
    
    const todayStats = statistics.dailyStats.get(new Date().toDateString());
    todayStats.visitors.add(data.id);
    todayStats.pageViews++;
    
    statistics.totalVisitors = Array.from(statistics.dailyStats.values())
      .reduce((sum, day) => sum + day.visitors.size, 0);
    statistics.totalPageViews = Array.from(statistics.dailyStats.values())
      .reduce((sum, day) => sum + day.pageViews, 0);
    statistics.onlineVisitors = visitors.size;
    
    updateStatistics();
    
    // Diffuser les nouvelles données à tous les clients
    io.emit('visitor_update', visitorData);
    io.emit('visitors_list', getVisitorList());
  });
  
  socket.on('page_change', (data) => {
    if (visitors.has(data.id)) {
      const visitor = visitors.get(data.id);
      visitor.currentPage = data.currentPage;
      visitor.lastActivity = Date.now();
      
      // Mettre à jour les statistiques de pages
      const pageViewCount = pageViews.get(data.currentPage) || 0;
      pageViews.set(data.currentPage, pageViewCount + 1);
      
      updateStatistics();
      io.emit('visitor_update', visitor);
      io.emit('visitors_list', getVisitorList());
    }
  });
  
  socket.on('user_activity', (data) => {
    if (socket.visitorId && visitors.has(socket.visitorId)) {
      const visitor = visitors.get(socket.visitorId);
      visitor.lastActivity = Date.now();
      
      io.emit('visitor_activity', {
        visitorId: socket.visitorId,
        activity: data.activity,
        timestamp: data.timestamp
      });
    }
  });
  
  socket.on('page_leave', (data) => {
    if (socket.visitorId && visitors.has(socket.visitorId)) {
      const visitor = visitors.get(socket.visitorId);
      visitor.duration = Math.floor(data.duration / 1000);
      
      console.log(`Visitor ${socket.visitorId} left page ${data.path} after ${visitor.duration}s`);
    }
  });
  
  socket.on('custom_event', (data) => {
    console.log('Custom event:', data);
    io.emit('custom_event_broadcast', data);
  });
  
  socket.on('request_refresh', () => {
    console.log('Manual refresh requested');
    updateStatistics();
    io.emit('visitors_list', getVisitorList());
    io.emit('statistics_update', statistics);
  });
  
  socket.on('heartbeat', (data) => {
    if (visitors.has(data.visitorId)) {
      const visitor = visitors.get(data.visitorId);
      visitor.lastHeartbeat = Date.now();
      visitor.duration = data.duration;
      visitor.currentPage = data.currentPath;
      visitor.lastActivity = data.lastActivity;
      
      io.emit('heartbeat_received', {
        visitorId: data.visitorId,
        timestamp: data.timestamp,
        duration: data.duration
      });
    }
  });
  
  socket.on('visitor_leaving', (data) => {
    console.log(`Visitor ${data.visitorId} leaving: ${data.reason}`);
    
    if (visitors.has(data.visitorId)) {
      const visitor = visitors.get(data.visitorId);
      visitor.duration = data.duration;
      visitor.isOnline = false;
      
      io.emit('visitor_left', {
        visitorId: data.visitorId,
        duration: data.duration,
        lastPage: data.currentPath,
        reason: data.reason
      });
      
      // Supprimer le visiteur après un court délai
      setTimeout(() => {
        visitors.delete(data.visitorId);
        statistics.onlineVisitors = visitors.size;
        updateStatistics();
        io.emit('visitors_list', getVisitorList());
      }, 1000);
    }
  });
  
  socket.on('page_visibility_change', (data) => {
    if (visitors.has(data.visitorId)) {
      const visitor = visitors.get(data.visitorId);
      visitor.isVisible = data.visible;
      visitor.lastActivity = Date.now();
      
      io.emit('visitor_visibility_changed', {
        visitorId: data.visitorId,
        visible: data.visible,
        timestamp: data.timestamp
      });
    }
  });
  
  socket.on('focus_change', (data) => {
    if (visitors.has(data.visitorId)) {
      const visitor = visitors.get(data.visitorId);
      visitor.hasFocus = data.focused;
      visitor.lastActivity = Date.now();
      
      io.emit('visitor_focus_changed', {
        visitorId: data.visitorId,
        focused: data.focused,
        timestamp: data.timestamp
      });
    }
  });
  
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
    
    if (socket.visitorId && visitors.has(socket.visitorId)) {
      const visitor = visitors.get(socket.visitorId);
      visitor.isOnline = false;
      visitor.lastActivity = Date.now();
      
      io.emit('visitor_update', visitor);
      io.emit('visitors_list', getVisitorList());
    }
  });
});

// API REST pour les statistiques
app.get('/api/visitors', (req, res) => {
  res.json({
    visitors: getVisitorList(),
    statistics
  });
});

app.get('/api/statistics', (req, res) => {
  res.json(statistics);
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    onlineVisitors: visitors.size,
    totalConnections: io.engine.clientsCount
  });
});

// Servir les fichiers statiques en développement
if (process.env.NODE_ENV !== 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));
}

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`🚀 Visitor tracking server running on port ${PORT}`);
  console.log(`📊 Real-time visitor tracking active`);
  console.log(`🌐 API available at http://localhost:${PORT}/api`);
});
