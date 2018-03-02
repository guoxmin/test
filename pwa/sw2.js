var CACHE_VERSION = 6;

var CURRENT_CACHES = {
    prefetch: 'prefetch-cache-v' + CACHE_VERSION
};
var FILE_LISTS = ['js', 'css', 'png'];

self.addEventListener('install', event => {
    event.waitUntil(self.skipWaiting())
});

self.addEventListener('activate', event => {

    event.waitUntil(
       clients.claim(),

        caches.keys().then(keys => Promise.all(
            keys.map(key => {
                if (key != CURRENT_CACHES.prefetch) {
                    return caches.delete(key);
                }
            })
        )).then(() => {
            console.log(CURRENT_CACHES.prefetch+' now ready to handle fetches!');
        })
    );
});



var goSaving = function(url) {
    for (var file of FILE_LISTS) {
        if (new URL(url).pathname.endsWith(file)) return true;
    }
    return false;
}

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(resp) {
            return resp || fetch(event.request).then(function(response) {
                // 检查是否需要缓存
                var url = event.request.url;
                if (!goSaving(url)) return response;
                console.log('save file:' + url);
                // 需要缓存,则将资源放到 caches Object 中
                return caches.open(CURRENT_CACHES.prefetch).then(function(cache) {
                    console.log('update files like' + event.request.url);

                    cache.put(event.request, response.clone());
                    return response;
                });
            });
        })
    );
});

self.addEventListener('message', event => {
    console.log("receive message" + event.data);
    // 更新根目录下的 html 文件。
    var url = event.data;
    console.log("update root file " + url);
    event.waitUntil(
        caches.open(CURRENT_CACHES.prefetch).then(cache => {
            return fetch(url)
                .then(res => {
                    cache.put(url, res);
                })
        })
    )
});