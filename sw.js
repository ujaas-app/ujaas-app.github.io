// उजास: ऐप का ढाँचा फ़ोन में रखता है ताकि जल्दी खुले; डेटा हमेशा इंटरनेट से आता है
const C='ujaas-v3',A='ujaas-awaz-v1';
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'])));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C&&x!==A).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);
 if(e.request.method==='GET'&&u.origin===location.origin&&u.pathname.indexOf('/audio/v/')>-1){e.respondWith(caches.open(A).then(c=>c.match(e.request).then(r=>r||fetch(e.request).then(n=>{if(n.ok)c.put(e.request,n.clone());return n}))));return}if(e.request.method!=='GET'||u.origin!==location.origin||u.pathname.indexOf('/audio/')>-1)return;
 e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(C).then(x=>x.put(e.request,c));return r}).catch(()=>caches.match(e.request).then(r=>r||caches.match('./index.html'))))});
