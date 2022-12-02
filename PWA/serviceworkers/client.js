/**
 * 서비스워커 사용(등록)을 위해, 서비스페이지에 필요한 코드 예시 
 */

// 서비스워커 등록 또는 업데이트
// https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration
const setRegister = () => {
    return new Promise((resolve, reject) => {
        try {
            navigator?.serviceWorker?.register(`/serviceworker-workbox.js?time=${new Date().getTime()}`)
            .then(resolve, reject);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
};

// 서비스워커 등록 취소
// https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/unregister
const setUnregisterAll = () => {
    return new Promise((resolve, reject) => {
        try {
            navigator.serviceWorker.getRegistrations()
            .then(registrations => {
                // 기존 서비스워커 등록취소
                const promises = [];
                for (const registration of registrations) {
                    promises.push(registration.unregister());
                }
                Promise.all(promises).then(resolve, reject);
            });
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
};

// 리소스 로드와 서비스워커 등록 후 fetch 가 동시에 일어나 버벅거리지 않도록, load 후 서비스워커 작업을 실행
// https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers
// https://developers.google.com/web/fundamentals/primers/service-workers/registration
const load = async () => {
    //const notSupported = ['mobile safari', 'safari', ''].includes(browserName?.toLowerCase()) || -1 < browserName?.toLowerCase().indexOf('safari'); // IOS 최신 사파리에서 BFCache 이슈발생

    try {
        const registration = await navigator?.serviceWorker?.getRegistration();
        if(registration) {
            // 운영 캐시 갱신이 안되는 이슈가 있을 경우, setUnregisterAll 모든 환경에서 무조건 실행되도록 수정하여 배포!
            /*setUnregisterAll()
            .then(
                (value) => console.log('서비스워커 전체해제 성공!', value), 
                (error) => console.log('서비스워커 전체해제 실패!', error),
            );*/
            
            // 서비스워커 업데이트된 버전이 있는지 서버를 확인
            // https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/update
            registration?.update()
            .then(
                (registration) => console.log('서비스워커 업데이트 성공!', registration?.scope), 
                (error) => console.log('서비스워커 업데이트 실패!', error),
            );
        }else {
            setRegister()
            .then(
                registration => console.log('서비스워커 등록 성공!', registration),
                error => console.log('서비스워커 등록 실패!', error),
            );
        }
        navigator?.serviceWorker?.ready
        .then((registration) => console.log('서비스워커 활성화(active) 되었음!', registration.active));
    }catch(error) {
        console.log(error);
    }
};

if ('serviceWorker' in navigator) {
	//window.removeEventListener('load', load);
	window.addEventListener('load', load);
}