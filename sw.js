const CACHE_NAME = 'nogales-qc-v1';
const ASSETS = [
  './',
  './index.html',
  'https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4'
];

// 최초 설치 시 기본 에셋 캐싱
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// 오프라인 상태에서도 앱 프레임이 부드럽게 열리도록 캐시 우선 반환
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
