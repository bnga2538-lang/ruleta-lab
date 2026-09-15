const CACHE='ruleta-sector6-v2';
const FILES=['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{if(e.request.mode==='navigate'){e.respondWith(fetch(e.request).then(r=>{let q=r.clone();caches.open(CACHE).then(c=>c.put('./index.html',q));return r}).catch(()=>caches.match('./index.html')))}else e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)))});
