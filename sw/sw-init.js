if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js', { scope: '/' })
        .then(registration => {
            console.log('[App] Service Worker registered:', registration.scope);

            // Check if SW controls this page
            if (navigator.serviceWorker.controller) {
                console.log('[App] SW is controlling this page ✅');
            } else {
                console.log('[App] SW not controlling yet ❌ — reload might be needed');
            }

            // Register sync (do it once per session)
            if ('SyncManager' in window) {
                navigator.serviceWorker.ready.then(sw => {
                    sw.sync.register('sync-test').then(() => {
                        console.log('[App] Sync registered globally');
                    });
                });
            }
            window.addEventListener('online', async () => {
                console.log('[App] Network restored — notifying Service Worker');
                const reg = await navigator.serviceWorker.ready;
                reg.active.postMessage({ type: 'NETWORK_ONLINE' });
            });

            navigator.serviceWorker.ready.then(async (reg) => {
                if ('periodicSync' in reg) {
                    try {
                        await reg.periodicSync.register('check-network', { minInterval: 60 * 60 * 1000 }); // every hour
                    } catch (e) {
                        console.log('Periodic sync registration failed:', e);
                    }
                }
            });


        })
        .catch(err => console.error('[App] SW registration failed:', err));
}

