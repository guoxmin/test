self.addEventListener("install", event => {
    console.log("V1 installing…");


    // 这里缓存一个 cat.svg
    // event.waitUntil(
    //     caches.open("static-v2").then(cache => cache.add("/2.png"))
    // );
});

self.addEventListener("activate", event => {
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
    // if (url.origin == location.origin && url.pathname == "/demo.html") {

        console.log(33)

        event.respondWith(
            caches.match(event.request)
            .then(function(resp) {
                return resp || fetch(event.request).then(function(response) {
                    return caches.open('v1').then(function(cache) {
                        cache.put(event.request, response.clone());
                        return response;
                    });
                });
            })
        );
    // }

});