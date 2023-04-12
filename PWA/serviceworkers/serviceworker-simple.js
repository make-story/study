/**
 * 아래 코드를 배포했을 때,
 * 웹뷰에서 이슈가 발생함 (데이터 상태 갱신이 안됨)
 */
try {
  /**
   * install
   */
  self.addEventListener('install', event => {
    // waiting 상태의 서비스 워커를 active 상태의 서비스 워커로 변경하도록 강제
    // 기존 서비스워커 등록된 상태에서 새로 서버시워커를 등록할 경우, 'waiting' 상태에 있음
    // skipWaiting 실행시 waiting 상태없이 바로 실행상태가 됨
    // (업데이트된 서비스워커를 브라우저 재시작(또는 탭 재시작)후 활성이 아닌, 업데이트된 즉시 활성)
    self.skipWaiting();
  });

  /**
   * activate
   * 개발자 도구에서 '새로고침 시 업데이트' 체크가 해제되어 있을 경우, 서비스워커 파일 업데이트가 발생하지 않으므로, activate 단계가 실행안됨
   */
  self.addEventListener('activate', event => {
    // https://web.dev/navigation-preload/
    event.waitUntil(
      (async function () {
        // Feature-detect
        if (self?.registration?.navigationPreload) {
          // Enable navigation preloads!
          await self.registration.navigationPreload.enable();
        }
      })(),
    );
  });
  /*self.addEventListener('activate', event => {
      // https://developer.mozilla.org/ko/docs/Web/API/Service_Worker_API
      // install 과 activate 이벤트 처리는 시간이 꽤 걸릴 수도 있기에, 서비스 워커 명세는 waitUntil() 메서드를 제공합니다.
      // install 이나 activate 에서 waitUntil() 을 호출하면서 매개변수로 프로미스를 제공하면, 성공적으로 이행하기 전까지는 기능 이벤트가 발생하지 않습니다.
      return self.clients.claim();
    });*/

  /**
   * fetch
   */
  self.addEventListener('fetch', event => {
    // https://web.dev/navigation-preload/
    event.respondWith(
      (async function () {
        // Respond from the cache if we can
        //const cachedResponse = await caches.match(event.request);
        //if (cachedResponse) return cachedResponse;

        // Else, use the preloaded response, if it's there
        const response = await event?.preloadResponse;
        if (response) return response;

        // Else try the network.
        return fetch(event?.request);
      })(),
    );
  });
  /*self.addEventListener('fetch', event => {
      event.respondWith(fetch(event.request));
    });*/
} catch (error) {
  console.log('[Service Worker] Error', error);
}
