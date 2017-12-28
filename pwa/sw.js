this.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('v1').then(function(cache) {
            return cache.addAll([
                '/test/pwa/demo.js'
            ]);
        })
    );

});
// 
// 2222

self.addEventListener("activate", event => {
    // clients.claim();
    console.log("V1 now ready to handle fetches!");
});

// self.addEventListener("fetch", event => {
//     const url = new URL(event.request.url);

//     console.log(url)

//     //如果是同域并且请求的是 dog.svg 的话，那么返回 cat.svg
//     if (url.origin == location.origin && url.pathname == "/1.png") {
//         event.respondWith(caches.match("/2.png"));
//     }
// });

self.addEventListener('fetch', function(event) {
    const url = new URL(event.request.url);

    console.log(url)

    // 先缓存再网络
    if (url.pathname != "/demo.html") {
        event.respondWith(
            caches.match(event.request)
            .then(function(resp) {
                console.log(resp)
                return resp || fetch(event.request).then(function(response) {
                    return caches.open('v1').then(function(cache) {
                        cache.put(event.request, response.clone());
                        return response;
                    });
                });
            })
        );
    }


    // 先网络再缓存
    if (url.pathname == "/demo.html") {
        event.respondWith(
            fetch(event.request).then(function(response) {
                return caches.open('v1').then(function(cache) {
                    cache.put(event.request, response.clone());
                    return response;
                });
            })
            .catch(function() {

                return caches.match(event.request)
            })

        );
    }

});