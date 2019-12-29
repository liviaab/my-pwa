console.log("Hello from custom service worker!")
// From https://blog.taller.net.br/pwa-com-react/
// You have to update your cache version/cache name when you update the service-worker.js
const CACHE_NAME = 'pwa-cache-v1'

const urlsToCache = [
  "/",
  "static/media/loading.26ef8bb4.gif",
  "static/media/sad-face.a18c41a4.png",
  "static/js/bundle.js", //bundle created by webpack
]

// A primeira vez que o usuário inicia a PWA, 'install' é acionado.
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) {
        return cache.addAll(urlsToCache);
      })
  )
});


// Elimina caches antigos que não sejam os atuais.
// É um bom momento para processar migrações de esquema no IndexedDB e também excluir caches não utilizados
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(keyList =>
      Promise.all(keyList.map(key => {
        if (!cacheWhitelist.includes(key)) {
          return caches.delete(key);
        }
      }))
    )
  );
})

// Quando a página da Web vai buscar arquivos, nós interceptamos esse pedido e
// // servimos os arquivos correspondentes se tivemos
self.addEventListener('fetch', function (event) {
  console.log('Intercepting fetch.');
  event.respondWith(
    caches.match(event.request).then(response => {
      if(response) {
        return response
      }

      const fetchRequest = event.request.clone()

      return fetch(fetchRequest).then(
        function(response) {
          // Check if we received a valid response
          if(!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // IMPORTANT: Clone the response. A response is a stream
          // and because we want the browser to consume the response
          // as well as the cache consuming the response, we need
          // to clone it so we have two streams.
          var responseToCache = response.clone();

          caches.open(CACHE_NAME)
            .then(function(cache) {
              console.log('Updating cache entry');
              cache.put(event.request, responseToCache);
            });

          return response;
        }
      ).catch(function() {
        // If both fail, show a generic fallback:
        return caches.match('/offline.html');
        // However, in reality you'd have many different
        // fallbacks, depending on URL & headers.
        // Eg, a fallback silhouette image for avatars.
      });
    })
  )
})
