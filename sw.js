/* Service worker de Cap : app-shell hors-ligne + gestion des notifications. */
const CACHE = 'cap-v7';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './icon-192-maskable.png',
  './icon-512-maskable.png',
  './apple-touch-icon.png',
  './favicon-32.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const { request } = e;
  if (request.method !== 'GET' || !request.url.startsWith('http')) return;
  e.respondWith(
    caches.match(request).then((cached) => {
      const network = fetch(request)
        .then((res) => {
          if (res && res.status === 200 && res.type === 'basic') {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(request, copy));
          }
          return res;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});

/* Réveille l'app quand on clique sur une notification de rappel. */
self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  const data = e.notification.data || {};
  const wantAlarm = data.alarm;
  let type = wantAlarm ? 'alarm' : 'focus-task';
  if (e.action === 'done') type = 'complete-task';
  else if (e.action === 'snooze') type = 'snooze-task';
  e.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
      for (const client of list) {
        if ('focus' in client) {
          client.postMessage({ type: type, id: data.id });
          return e.action ? Promise.resolve() : client.focus();
        }
      }
      return self.clients.openWindow('./index.html' + (wantAlarm ? '?action=alarm' : ''));
    })
  );
});

/* Best-effort : certaines plateformes autorisent un réveil périodique en arrière-plan. */
self.addEventListener('periodicsync', (e) => {
  if (e.tag === 'cap-check') {
    e.waitUntil(
      self.clients.matchAll({ includeUncontrolled: true }).then((list) => {
        list.forEach((c) => c.postMessage({ type: 'check-reminders' }));
      })
    );
  }
});

self.addEventListener('message', (e) => {
  if (e.data === 'skip-waiting') self.skipWaiting();
});
