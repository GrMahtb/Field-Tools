const CACHE_NAME = "htb-field-tools-v2";
const ASSETS = [
  "./",
  "./index.html",
  "./apps.js",
  "./manifest.webmanifest",
  "./assets/logo-htb.svg",
  "./assets/icons/lauchericon-192×192.png",
  "./assets/icons/launchericon-512×512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => (key !== CACHE_NAME ? caches.delete(key) : null))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
