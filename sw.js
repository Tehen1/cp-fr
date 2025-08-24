const CACHE_NAME = 'cyberpunk-pwa-v1.0.0';
const STATIC_CACHE = 'cyberpunk-static-v1';
const DYNAMIC_CACHE = 'cyberpunk-dynamic-v1';

// Assets critiques à mettre en cache
const CRITICAL_ASSETS = [
  '/',
  '/dashboard.html',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/css/cyberpunk-theme.css',
  '/js/app.js',
  '/js/web3-utils.js'
];

// Installation du SW
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        return cache.addAll(CRITICAL_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activation et nettoyage des anciens caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => 
            cacheName.startsWith('cyberpunk-') && 
            !cacheName.includes('v1')
          )
          .map((cacheName) => caches.delete(cacheName))
      );
    }).then(() => self.clients.claim())
  );
});

// Stratégie Cache-First pour assets statiques
self.addEventListener('fetch', (event) => {
  const { request } = event;
  
  // Stratégie différente selon le type de requête
  if (request.destination === 'document') {
    // Network-First pour les pages HTML
    event.respondWith(networkFirst(request));
  } else if (request.url.includes('/api/')) {
    // Network-Only pour les API blockchain
    event.respondWith(networkOnly(request));
  } else {
    // Cache-First pour les assets statiques
    event.respondWith(cacheFirst(request));
  }
});

// Strategies de cache
async function cacheFirst(request) {
  const cache = await caches.open(STATIC_CACHE);
  const cached = await cache.match(request);
  return cached || fetch(request);
}

async function networkFirst(request) {
  const cache = await caches.open(DYNAMIC_CACHE);
  try {
    const response = await fetch(request);
    cache.put(request, response.clone());
    return response;
  } catch (error) {
    const cached = await cache.match(request);
    return cached || new Response('Offline', { status: 503 });
  }
}

async function networkOnly(request) {
  return fetch(request);
}

// Notifications Push (pour futures fonctionnalités)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    event.waitUntil(
      self.registration.showNotification(data.title, {
        body: data.body,
        icon: '/icons/icon-192x192.png',
        badge: '/icons/badge-72x72.png',
        tag: 'cyberpunk-notification'
      })
    );
  }
});
