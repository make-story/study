/**
 * 서비스워커 사용(등록)을 위해, 서비스페이지에 필요한 코드 예시 
 */

// 기존 서비스워커 등록취소
const unregister = () => {
    return new Promise((resolve, reject) => {
        try {
            navigator.serviceWorker.getRegistrations().then(registrations => {
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

// 신규 서비스워커 등록
const register = () => {
    return new Promise((resolve, reject) => {
        try {
            navigator.serviceWorker
            .register(`/serviceworker-workbox.js?time=${new Date().getTime()}`)
            .then(resolve, reject);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
};

// 리소스 로드와 서비스워커 등록 후 fetch 가 동시에 일어나 버벅거리지 않도록, load 후 서비스워커 작업을 실행
// https://developers.google.com/web/fundamentals/primers/service-workers/registration
const load = () => {
    unregister().then((values) => {
        console.log('ServiceWorker unregister', values);
        register().then(
            (registration) => {
                console.log('ServiceWorker registration successful with scope', registration?.scope);
            },
            (error) => {
                console.log('ServiceWorker registration failed', error);
            },
        );
    });
};

if ('serviceWorker' in navigator) {
	//window.removeEventListener('load', load);
	window.addEventListener('load', load);
}