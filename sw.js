var NOM = 'ji-v1';

var FICHIERS = [
  'index.html', 'accueil.html', 'agenda.html', 'opportunites.html',
  'declic.html', 'communaute.html', 'defis.html', 'profil.html',
  'formations.html', 'ressources.html', 'apropos.html',
  'temoignages.html', 'galerie.html', 'actualites.html', 'soutenir.html',
  'style.css', 'pwa.js', 'manifest.json'
];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(NOM).then(function (c) { return c.addAll(FICHIERS); }));
  self.skipWaiting();
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (noms) {
      return Promise.all(
        noms.filter(function (n) { return n !== NOM; })
            .map(function (n) { return caches.delete(n); })
      );
    })
  );
});

// Essaie internet d'abord (dernière version), sinon utilise la copie enregistrée
self.addEventListener('fetch', function (e) {
  e.respondWith(fetch(e.request).catch(function () { return caches.match(e.request); }));
});