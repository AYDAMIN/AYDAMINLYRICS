const CACHE_NAME = 'aydamin-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/albums.json',
    '/manifest.json',
    '/defaultBg.jpg',
    '/cover1.jpg',
    '/cover2.jpg',
    '/cover3.jpg',
    '/cover_single.jpg',
    '/back1.jpg',
    '/back2.jpg',
    '/back3.jpg',
    '/back_single.jpg',
    '/A1Z.png',
    '/A2Z.png'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);
    
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