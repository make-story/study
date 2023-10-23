/**
 * 서비스워커 브라우저단(client) 코드
 */

// 서비스워커 등록 또는 업데이트
// https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration
const setServiceWorkerRegister = () => {
  return new Promise((resolve, reject) => {
    try {
      navigator?.serviceWorker
        ?.register(`/serviceworker-workbox.js?time=${new Date().getTime()}`)
        .then(resolve, reject);
    } catch (error) {
      reject(error);
    }
  });
};

// 서비스워커 등록 취소
// https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/unregister
const setServiceWorkerUnregisterAll = () => {
  return new Promise((resolve, reject) => {
    try {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        // 기존 서비스워커 등록취소
        const promises = [];
        for (const registration of registrations) {
          promises.push(registration.unregister());
        }
        Promise.all(promises).then(resolve, reject);
      });
    } catch (error) {
      reject(error);
    }
  });
};

// 리소스 로드와 서비스워커 등록 후 fetch 가 동시에 일어나 버벅거리지 않도록, load 후 서비스워커 작업을 실행
// https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers
// https://developers.google.com/web/fundamentals/primers/service-workers/registration
const load = async () => {
  /*try {
    // 서비스워커 강제 제거 경우 (모든 브라우저에서 서비스워커 제거)
    // [주외!] 서비스 워커 제거 코드가 정상 실행되었다 하더라도, 브라우저 다른탭에서 제거하려는 서비스워커가 이미 실행중이라면, 브라우저 사용되는 곳 모두 종류 후 다시 시작해야함(정확한 테스트를 위함) 
    setServiceWorkerUnregisterAll().then(
      value => console.log('서비스워커 전체해제 성공!', value),
      error => console.log('서비스워커 전체해제 실패!', error),
    );
  } catch (error) {
    console.log(error);
  }*/

  try {
    // 서비스워커 미지원 체크
    // App 또는 IOS 최신 사파리에서 BFCache 이슈발생
    const notSupported = /^((?!chrome|android).)*safari/i.test(
      window?.navigator?.userAgent || ""
    ); // IOS 최신 사파리에서 BFCache 이슈발생
    //const notSupported = true; // 서비스워커 강제 제거 경우

    if (notSupported) {
      // 기존에 설치된 서비스워커가 있을 경우 모두 제거
      setServiceWorkerUnregisterAll().then(
        (value) => console.log("서비스워커 전체해제 성공!", value),
        (error) => console.log("서비스워커 전체해제 실패!", error)
      );
    } else {
      const registration = await navigator?.serviceWorker?.getRegistration();
      if (registration) {
        // 서비스워커 업데이트된 버전이 있는지 확인
        // https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/update
        registration?.update().then(
          (registration) =>
            console.log("서비스워커 업데이트 성공!", registration),
          (error) => console.log("서비스워커 업데이트 실패!", error)
        );
      } else {
        // 서비스워커 등록(설치)
        setServiceWorkerRegister().then(
          (registration) => console.log("서비스워커 등록 성공!", registration),
          (error) => console.log("서비스워커 등록 실패!", error)
        );
      }
      navigator?.serviceWorker?.ready.then((registration) =>
        console.log("서비스워커 활성화(active) 되었음!", registration?.active)
      );
    }
  } catch (error) {
    console.log(error);
  }
};

window.removeEventListener("load", load);
if ("serviceWorker" in navigator) {
  window.addEventListener("load", load);
}
