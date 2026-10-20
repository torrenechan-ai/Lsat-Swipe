/* LSAT Swipe service worker
   - App shell: served from cache instantly, refreshed in the background
     (edits to index.html show up on the next launch after you're online).
   - questions.json: network first, cache fallback (new questions appear as
     soon as you're online; offline uses the last copy).
   Bump VERSION if you ever need to force every file to re-download. */
const VERSION = 'lsat-swipe-v2';
const SHELL = [
  './',
  'index.html',
  'manifest.json',
  'questions.json',
  'icon-192.png',
  'icon-512.png',
  'icon-maskable-512.png',
  'apple-touch-icon.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(VERSION).then(cache => cache.addAll(SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

async function networkFirst(request) {
  const cache = await caches.open(VERSION);
  try {
    const res = await fetch(request, { cache: 'no-store' });
    if (res && res.ok) await cache.put(request, res.clone());
    return res;
  } catch (e) {
    const hit = await cache.match(request, { ignoreSearch: true });
    return hit || Response.error();
  }
}

async function staleWhileRevalidate(event) {
  const request = event.request;
  const cache = await caches.open(VERSION);
  const cached = await cache.match(request, { ignoreSearch: true });
  const network = fetch(request)
    .then(res => { if (res && res.ok) cache.put(request, res.clone()); return res; })
    .catch(() => null);
  event.waitUntil(network);
  if (cached) return cached;
  const res = await network;
  if (res) return res;
  if (request.mode === 'navigate') return (await cache.match('index.html')) || (await cache.match('./')) || Response.error();
  return Response.error();
}

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname.endsWith('/questions.json')) {
    event.respondWith(networkFirst(req));
  } else {
    event.respondWith(staleWhileRevalidate(event));
  }
});
