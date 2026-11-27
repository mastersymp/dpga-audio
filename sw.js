// DPGA Audio offline cache. Change VERSION whenever you upload new files.
const VERSION = 'dpga-audio-2026-11-27-0908';
const FILES = ['./', 'index.html', 'sim.html', 'manifest.webmanifest', 'icon.svg', 'icon-192.png', 'icon-512.png', 'icon-maskable-512.png', 'apple-touch-icon.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

// The practice-console recordings live in their own cache so app updates don't re-download them.
// Change STEMS when the recordings change.
const STEMS = 'dpga-stems-1';

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION && k !== STEMS).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

// Show the saved copy straight away (works with no signal), and fetch a fresh copy in the background for next time.
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  if (new URL(e.request.url).pathname.includes('/stems/')) {
    e.respondWith(caches.open(STEMS).then(cache => cache.match(e.request).then(hit => hit || fetch(e.request).then(res => { if (res.ok) cache.put(e.request, res.clone()); return res; }))));
    return;
  }
  e.respondWith(caches.open(VERSION).then(cache =>
    cache.match(e.request, {ignoreSearch: true}).then(hit => {
      const net = fetch(e.request).then(res => { if (res.ok) cache.put(e.request, res.clone()); return res; }).catch(() => hit);
      return hit || net;
    })
  ));
});
