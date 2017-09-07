self.addEventListener('install', (ev) => {
  console.log('ServiceWorker installed', ev);
});

self.addEventListener('activate', (ev) => {
  console.log('ServiceWorker activated', ev);
});
