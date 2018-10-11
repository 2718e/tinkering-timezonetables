self.addEventListener('install', function (e: any) {
    e.waitUntil(
        caches.open('my-offline-app').then(function (cache) {
            return cache.addAll([
                '/'
            ]);
        })
    );
});

self.addEventListener('fetch', function(event : any) {
    console.log(event.request.url);

    event.respondWith(
        caches.match(event.request).then(function(response) {
          return response || fetch(event.request);
        })
      );
     
   });