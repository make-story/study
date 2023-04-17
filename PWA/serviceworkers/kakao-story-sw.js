/**
 * 카카오 스토리 SW 참고 - 23.04.17
 * https://storyhome.kakao.com/
 */
self.addEventListener('fetch', event => {
  event.respondWith(fetch(event.request));
});
  