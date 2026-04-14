const CACHE_NAME = 'aydamin-v4';
const urlsToCache = [
    '/',
    '/index.html',
    '/albums.json',
    '/manifest.json',
    '/defaultBg.jpg',
    // Обложки альбомов
    '/cover1.jpg',
    '/cover2.jpg',
    '/cover3.jpg',
    '/cover_meldamin.jpg',
    '/cover_single.jpg',
    // Фоны альбомов (если есть)
    '/back1.jpg',
    '/back2.jpg',
    '/back3.jpg',
    '/back_meldamin.jpg',
    '/back_single.jpg'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);
    
    // Не кэшируем внешние шрифты и иконки
    if (url.hostname.includes('cdnjs.cloudflare.com') || 
        url.hostname.includes('fonts.googleapis.com') ||
        url.hostname.includes('fonts.gstatic.com')) {
        event.respondWith(fetch(event.request));
        return;
    }
    
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});