/* Service worker tối thiểu: chỉ để hiển thị thông báo trên Android Chrome
   (Chrome Android không cho dùng new Notification() trực tiếp từ trang).
   Không cache, không chặn fetch, không nhận push từ máy chủ. */
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil((async () => {
    const list = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    for (const c of list) if ('focus' in c) return c.focus();
    if (self.clients.openWindow) return self.clients.openWindow('./');
  })());
});
