// VendiMap Service Worker
const CACHE_VERSION = 'vendimap-v12';
const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  './privacy.html',
  './terms.html',
  './icon-180.png',
  './icon-192.png',
  './icon-512.png',
];

// インストール時にApp Shellをキャッシュ
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

// 古いキャッシュを削除
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(
        names.filter((n) => n !== CACHE_VERSION).map((n) => caches.delete(n))
      )
    ).then(() => self.clients.claim())
  );
});

// ネットワーク優先 → 失敗時にキャッシュフォールバック
self.addEventListener('fetch', (event) => {
  const req = event.request;
  // GETリクエストのみ対象
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  // APIリクエスト（Overpass, MapTiler）はキャッシュしない
  if (url.hostname.includes('overpass-api') || url.hostname.includes('maptiler')) {
    return; // デフォルトのネットワークフェッチに任せる
  }

  // 同一オリジンはネットワーク優先、失敗時キャッシュ
  if (url.origin === self.location.origin) {
    event.respondWith(
      fetch(req)
        .then((res) => {
          // 成功したらキャッシュも更新
          const resClone = res.clone();
          caches.open(CACHE_VERSION).then((cache) => cache.put(req, resClone));
          return res;
        })
        .catch(() => caches.match(req))
    );
  }
});
