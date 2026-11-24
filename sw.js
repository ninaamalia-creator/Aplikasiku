// Lensa PDF service worker: bikin aplikasi bisa dibuka offline dan menerima file (PDF, Word, Excel, gambar) dari menu Bagikan.
const VERSION = 'lensa-v3';
const PDFJS = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/';
const SHELL = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png',
  './icon-maskable-512.png', './apple-touch-icon.png', PDFJS + 'pdf.min.js', PDFJS + 'pdf.worker.min.js'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => Promise.all(SHELL.map(u => c.add(u).catch(() => {})))));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(
    keys.filter(k => k !== VERSION && k !== 'lensa-share').map(k => caches.delete(k)))));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  const req = e.request;
  const url = new URL(req.url);

  // PDF yang dibagikan dari WhatsApp/aplikasi lain. Disimpan sementara,
  // lalu langsung dihapus begitu halaman membukanya.
  if (req.method === 'POST' && url.pathname.endsWith('/share-target')) {
    e.respondWith((async () => {
      try {
        const form = await req.formData();
        const files = [...form.getAll('files'), ...form.getAll('pdf')].filter(f => f && typeof f !== 'string');
        const c = await caches.open('lensa-share');
        for (const k of await c.keys()) await c.delete(k);
        for (let i = 0; i < files.length; i++) {
          const f = files[i];
          await c.put(new URL('shared-' + i, self.registration.scope).href, new Response(f, {
            headers: { 'content-type': f.type || 'application/octet-stream',
                       'x-name': encodeURIComponent(f.name || ('file-' + (i + 1))) }
          }));
        }
      } catch (err) {}
      return Response.redirect(new URL('./?shared=1', self.registration.scope).href, 303);
    })());
    return;
  }

  if (req.method !== 'GET') return;

  // Halaman: ambil versi terbaru dulu, pakai cadangan saat offline.
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).then(r => {
      const copy = r.clone(); caches.open(VERSION).then(c => c.put('./index.html', copy)); return r;
    }).catch(() => caches.match('./index.html')));
    return;
  }

  // File lain (ikon, pdf.js, font): pakai cache, perbarui di belakang.
  if (url.origin === location.origin || url.hostname === 'cdnjs.cloudflare.com' || url.hostname === 'cdn.jsdelivr.net' || url.hostname.endsWith('gstatic.com') || url.hostname === 'fonts.googleapis.com') {
    e.respondWith(caches.match(req).then(hit => {
      const net = fetch(req).then(r => {
        if (r.ok || r.type === 'opaque') { const copy = r.clone(); caches.open(VERSION).then(c => c.put(req, copy)); }
        return r;
      }).catch(() => hit);
      return hit || net;
    }));
  }
});
