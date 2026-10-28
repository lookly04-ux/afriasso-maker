const V="afriasso-v3.4",CORE=["./","index.html","manifest.json","icon-192.png","icon-512.png"],
LIBS=["https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js","https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js","https://www.gstatic.com/firebasejs/10.12.2/firebase-auth-compat.js","https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore-compat.js"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(async c=>{await c.addAll(CORE);await Promise.allSettled(LIBS.map(u=>c.add(new Request(u,{mode:"cors"}))))}).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET")return;const u=new URL(r.url);
 if(/googleapis\.com|firebaseio\.com|firebaseapp\.com|identitytoolkit/.test(u.hostname)||u.pathname.indexOf("/__/")>-1)return;
 if(r.mode==="navigate"){e.respondWith(Promise.race([fetch(r).then(x=>{const c=x.clone();if(x.ok)caches.open(V).then(k=>k.put("index.html",c));return x}),new Promise((_,j)=>setTimeout(j,4000))]).catch(()=>caches.match("index.html")));return}
 e.respondWith(caches.match(r).then(h=>h||fetch(r).then(x=>{if(x.ok||x.type==="opaque"){const c=x.clone();caches.open(V).then(k=>k.put(r,c))}return x})))});
