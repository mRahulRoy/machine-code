console.log("Inside sw.js file");


const ASSETS = [
    '/',
    '/index.html',
    '/offline.html',
];
const CACHE_NAME = 'v1';


self.addEventListener('periodicsync', (event) => {
    if (event.tag === 'check-network') {
        console.log('[SW] Periodic sync fired, checking connection...');
        self.registration.sync.register('sync-test');
    }
});

self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'NETWORK_ONLINE') {
        console.log('[SW] Network restored — running sync manually');
        self.registration.sync.register('sync-test');
    }
});


self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-test') {

        console.log("connection has restored")

    }
});


self.addEventListener("install", (event) => {
    console.log("Inside installationds.", event)
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('[SW] Caching static assets');
            return cache.addAll(ASSETS);
        })
    );


    // skipWaiting ensures new SW activates immediately
    self.skipWaiting();
})

self.addEventListener('activate', (event) => {
    console.log('Service Worker Activated..');
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
            );
        })
    );

    // claim ensures new SW controls all clients immediately
    self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    const req = event.request;

    // Handle only navigation requests (full page loads)
    if (req.mode === 'navigate') {
        event.respondWith(
            (async () => {
                try {
                    return await fetch(event.request);
                } catch (err) {
                    console.log('[SW] Offline – serving cached offline.html');
                    const cache = await caches.open('v1');
                    const cachedOffline = await cache.match('/offline.html');
                    return cachedOffline || new Response('<h1>No internet</h1> <br/> <a href="./about.html">About</a>', { status: 404, headers: { 'Content-Type': 'text/html' } });
                }
            })()
        );
    } else {
        // For other requests (like images, CSS, JS)
        event.respondWith(
            caches.match(req).then(cachedRes => {
                return cachedRes || fetch(req);
            })
        );
    }
});

