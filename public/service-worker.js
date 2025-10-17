const CACHE_NAME = "lamaki-cache-v1"; // change version when you redeploy
const OFFLINE_URLS = [
  "/", // homepage
  "/index.html",
  "/about",
  "/services",
  "/projects",
  "/events",
  "/contact",
];

// Install & cache assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(OFFLINE_URLS);
    })
  );
  self.skipWaiting();
});

// Serve from cache first
self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  event.respondWith(
    caches.match(request).then((cached) => {
      return (
        cached ||
        fetch(request)
          .then((response) => {
            // Cache new images/videos dynamically
            if (
              response.status === 200 &&
              (request.url.match(/\.(jpg|jpeg|png|gif|webp|svg|mp4|webm)$/) ||
                request.url.match(/\.(js|css|woff2)$/))
            ) {
              const cloned = response.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(request, cloned));
            }
            return response;
          })
          .catch(() => caches.match("/index.html"))
      );
    })
  );
});

// Cleanup old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      )
    )
  );
});
