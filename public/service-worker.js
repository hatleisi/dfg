// CODELAB: Add list of files to cache here.
const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/script.js",
  "/addserviceworker.js",
  "/style.css",
  "/manifest.json",
  "/images/BTV1.png",
  "/images/BTV2.png",
  "/images/BTV3.png",
  "/images/BTV4.png",
];

const cacheName = "cache-v1";

self.addEventListener("install", event => {
  console.log("Service worker install event!");
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  console.log("Service worker activating...");
});

self.addEventListener("fetch", event => {
  console.log("Fetch intercepted for:", event.request.url);
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request);
    })
  );
});

self.addEventListener("fetch", evt => {
  console.log("[Service Worker] Fetch", evt.request.url);
  if (evt.request.url.includes("/edge")) {
    console.log("[Service Worker] Fetch (data)", evt.request.url);
    evt.respondWith(
      caches.open(FILES_TO_CACHE).then(cache => {
        return fetch(evt.request)
          .then(response => {
            //if the response was good, clone it and store it in cache
            if (response.status === 200) {
              cache.put(evt.request.url, response.clone());
            }
            return response;
          })
          .catch(err => {
            // Network request failed, try to get it from the cache.
            return cache.match(evt.request);
          });
      })
    );
    return;
  } // if

  evt.respondWith(
    caches.open(cacheName).then(cache => {
      return cache.match(evt.request).then(response => {
        return response || fetch(evt.request);
      });
    })
  );
});

