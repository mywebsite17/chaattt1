const CACHE_NAME = 'pwa-cache-v2';
const assets = [ 
    './', 
    './index.html', 
    './manifest.json', 
    './icon-192.png', 
    './icon-512.png',
    './offline.html' 
];

self.addEventListener('install', e => { 
    e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(assets))); 
});

self.addEventListener('fetch', e => { 
    e.respondWith(
        caches.match(e.request).then(res => {
            return res || fetch(e.request).catch(() => caches.match('./offline.html'));
        })
    ); 
});