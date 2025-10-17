const CACHE_NAME = "lamaki-cache-v2"; // Increment version when redeploying
const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/logo.png",
  "/manifest.json",
  "/favicon.ico",
];

// Install event – cache essential assets
self.addEventListener("install", (event) => {
  console.log("📦 Installing new service worker...");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
});

// Activate event – clear old cache versions
self.addEventListener("activate", (event) => {
  console.log("🧹 Activating new service worker & cleaning old cache...");
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log("🗑️ Deleting old cache:", key);
            return caches.delete(key);
          }
        })
      )
    )
  );
});

// Fetch event – serve from cache first, then network fallback
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) return cachedResponse;

      return fetch(event.request)
        .then((response) => {
          // Cache successful responses (only images, css, js)
          const contentType = response.headers.get("content-type");
          if (response.status === 200 && contentType && /(image|video|css|javascript)/.test(contentType)) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
          }
          return response;
        })
        .catch(() => caches.match("/offline.html")); // Optional offline fallback
    })
  );
});

