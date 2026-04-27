var CACHE_NAME = 'ht-diet-v6'
var CACHE_URLS = [
  './',
  './index.html',
  './app.html',
  './css/style.css',
  './js/food-database.js',
  './js/diet-calculator.js',
  './js/app.js',
  './manifest.json'
]

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(CACHE_URLS)
    })
  )
  self.skipWaiting()
})

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(names) {
      return Promise.all(
        names.filter(function(name) { return name !== CACHE_NAME })
          .map(function(name) { return caches.delete(name) })
      )
    })
  )
  self.clients.claim()
})

self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).then(function(fetchResponse) {
      if (fetchResponse && fetchResponse.status === 200) {
        var responseClone = fetchResponse.clone()
        caches.open(CACHE_NAME).then(function(cache) {
          cache.put(event.request, responseClone)
        })
      }
      return fetchResponse
    }).catch(function() {
      return caches.match(event.request).then(function(cachedResponse) {
        if (cachedResponse) return cachedResponse
        return caches.match('./app.html')
      })
    })
  )
})
