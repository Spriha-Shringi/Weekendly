const CACHE = "weekendly-cache-v1";
const ASSETS = ["/", "/index.html"];


self.addEventListener("install", (e) => {
e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)));
});


self.addEventListener("activate", (e) => {
e.waitUntil(self.clients.claim());
});


self.addEventListener("fetch", (e) => {
e.respondWith(
caches.match(e.request).then(
(res) =>
res ||
fetch(e.request).then((resp) => {
const copy = resp.clone();
caches.open(CACHE).then((c) => c.put(e.request, copy));
return resp;
})
)
);
});