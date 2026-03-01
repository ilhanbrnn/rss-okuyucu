const CACHE_NAME = 'rss-okuyucu-v1';
const ASSETS = [
  '/rss-okuyucu/',
  '/rss-okuyucu/index.html',
  '/rss-okuyucu/manifest.json',
  '/rss-okuyucu/icon-192.png',
  '/rss-okuyucu/icon-512.png'
];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(key) {
          return key !== CACHE_NAME;
        }).map(function(key) {
          return caches.delete(key);
        })
      );
    })
  );
});

self.addEventListener('fetch', function(e) {
  e.respondWith(
    fetch(e.request).catch(function() {
      return caches.match(e.request);
    })
  );
});