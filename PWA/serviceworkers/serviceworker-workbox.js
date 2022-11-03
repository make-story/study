/*
// 서비스워커 사용(등록)을 위해, 서비스페이지에 필요한 코드 예시 
if('serviceWorker' in navigator) {
	window.addEventListener('load', function() {
		navigator.serviceWorker.register('/service-worker.js');
	});
}
*/
// 서비스워커에서의 ES 모듈 사용 (import ... from '...' 형태를 안정적으로 사용하려면 번들러 필요 - 22.09기준)
// https://chromium.googlesource.com/chromium/src/+/refs/heads/main/content/browser/service_worker/es_modules.md

// WorkBox 사용 - v4 와 v5 로직이 다르다. v6 부터는 workbox-sw.js 파일만 import 하면, 다른 모듈은 내부에서 자동 로드
//importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js");
//importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');
//importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');
//importScripts('/workbox/5.1.2/workbox-sw.js');
importScripts('/workbox/6.5.4/workbox-sw.js');

const setWorkBoxRun = workbox => {
	// 캐시 이름 
	const CACHE_NAME = 'TEST_CACHE';
	const CACHE_NAME_SCRIPT = [CACHE_NAME, 'SCRIPT'].join('_');
  	const CACHE_NAME_STYLE = [CACHE_NAME, 'STYLE'].join('_');
	const CACHE_NAME_FONT = [CACHE_NAME, 'FONT'].join('_');
	const CACHE_NAME_IMAGE = [CACHE_NAME, 'IMAGE'].join('_');

	/**
	 * context 유효 확인
	 */
	const isObject = (value) => value && typeof value === 'object';
	const isContext = context => (isObject(context) && isObject(context.url) && isObject(context.request) && isObject(context.event)) ? context : false;
	// MIME 유형 확인 (Content-Type응답 헤더)
	const isAccept = (context, mime="") => (isContext(context) && context.request.headers) ? context.request.headers.get("accept").includes(mime) : false;
	// hostname 확인 - hostname 은 host 에서 포트번호를 제거한 부분 - 예: local-markup.cjmall.com
	const isHostname = (context, hostname="") => (isContext(context) && context.url.hostname) ? context.url.hostname.includes(hostname) : false;
	// origin 확인 - 예: https://local-markup.cjmall.com
	const isOrigin = (context, origin="") => (isContext(context) && context.url.origin) ? context.url.origin.includes(origin) : false;
	// pathname 확인 - 예: /unsafe/831x300/image.cjmall.net/public/confirm/assets/tdp_cate_cont/202007/03/2547319/e7360842c9200ed0140bf8dedda8b28bc7f02067.jpg
	const isPathname = (context, pathname="") => (isContext(context) && context.url.pathname) ? context.url.pathname.includes(pathname) : false;
	// 콘텐츠 유형 확인
	const isDestination = (context, destination=[]) => (isContext(context) && context.request.destination) ? destination.includes(context.request.destination) : false;
	// 확장자 확인
	const isExtension = (context, extension=[]) => (isContext(context) && context.request.url && Array.isArray(extension)) ? new RegExp(`.*\\.(?:${extension.join('|')})([\\?|#].*)?$`).test(context.request.url) : false;

	/**
	 * 기존 캐시 제거
	*/
	/*self.addEventListener('activate', function (event) {
		caches.delete(CACHE_NAME_IMAGE);
	});*/

	/**
	 * workbox 설정 
	 */
	workbox.setConfig({
		debug: true,
		// https://developer.chrome.com/docs/workbox/modules/workbox-sw/#using-local-workbox-files-instead-of-cdn
		modulePathPrefix: '/workbox/6.5.4/',
	});

	/**
	 * workbox 모듈 로드 (workbox-sw.js 모듈내부 추가 필요모듈 비동기 로그 실행코드가 있으나, 타이밍 차이 발생 방지, 안정성)
	 * 기본적으로는 구글 CDN에서 모듈을 다운로드
	 */
	workbox.loadModule('workbox-core');
	workbox.loadModule('workbox-routing');
	workbox.loadModule('workbox-strategies');
	workbox.loadModule('workbox-expiration');
	//const { precaching, routing, strategies } = workbox;

	workbox.core.skipWaiting(); // 서비스 워커 즉시 활성화 - 업데이트된 서비스워커를 브라우저 재시작(또는 탭 재시작)후 활성이 아닌, 업데이트된 즉시 활성
	workbox.core.clientsClaim(); // 서비스 워커 활성화되면, 현재 사용 가능한 클라이언트 요청

	/**
	 * 프리로드 리스트 
	 */
	/*workbox.precaching.precacheAndRoute([
		// 리소스 리스트
		{url: '/index.html', revision: '383676' },
		{url: '/styles/app.0c9a31.css', revision: null},
		'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css'
	]);*/

	/**
	 * 라우트
	 */
	//registerRoute(capture, handler, method)
	workbox.routing.registerRoute(
		context => {
			// context.url : URL
			/*
			{
				hash: ""
				host: "local-markup.cjmall.com" 
				hostname: "local-markup.cjmall.com" // hostname은 host에서 포트번호를 제거한 부분
				href: "https://local-markup.cjmall.com/webjars/ec-markup-common/dist/common-cjos-mobile/others/css/common.cjos.mobile.css"
				origin: "https://local-markup.cjmall.com"
				password: ""
				pathname: "/webjars/ec-markup-common/dist/common-cjos-mobile/others/css/common.cjos.mobile.css"
				port: ""
				protocol: "https:"
				search: ""
				searchParams: URLSearchParams {}
				username: ""
			}
			*/
			// context.request : Request
			/*
			{
				bodyUsed: false
				cache: "reload"
				credentials: "include"
				destination: "style"
				headers: Headers {}
				integrity: ""
				isHistoryNavigation: false
				keepalive: false
				method: "GET"
				mode: "no-cors"
				redirect: "follow"
				referrer: "https://local-display.cjmall.com/m/homeTab/main?hmtabMenuId=000002&rPIC=Oclock"
				referrerPolicy: "no-referrer-when-downgrade"
				signal: AbortSignal {aborted: false, onabort: null}
				url: "https://local-markup.cjmall.com/webjars/ec-markup-common/dist/common-cjos-mobile/others/css/common.cjos.mobile.css"
			}
			*/
			// context.event : FetchEvent
			/*
			{
				bubbles: false
				cancelBubble: true
				cancelable: true
				clientId: "e0380359-b069-4a1e-9337-58bc21aacf1e"
				composed: false
				currentTarget: ServiceWorkerGlobalScope {clients: Clients, registration: ServiceWorkerRegistration, serviceWorker: ServiceWorker, onactivate: null, onfetch: null, …}
				defaultPrevented: false
				eventPhase: 0
				isReload: false
				isTrusted: true
				path: []
				preloadResponse: Promise {<resolved>: undefined}
				request: Request {method: "GET", url: "https://local-markup.cjmall.com/webjars/ec-markup-…mon-cjos-mobile/others/css/common.cjos.mobile.css", headers: Headers, destination: "style", referrer: "https://local-display.cjmall.com/m/homeTab/main?hmtabMenuId=000002&rPIC=Oclock", …}
				resultingClientId: ""
				returnValue: true
				srcElement: ServiceWorkerGlobalScope {clients: Clients, registration: ServiceWorkerRegistration, serviceWorker: ServiceWorker, onactivate: null, onfetch: null, …}
				target: ServiceWorkerGlobalScope {clients: Clients, registration: ServiceWorkerRegistration, serviceWorker: ServiceWorker, onactivate: null, onfetch: null, …}
				timeStamp: 0
				type: "fetch"
			}
			*/
			const { event = {}, request = {}, sameOrigin = null, url = {} } = context;
			// https://developer.mozilla.org/en-US/docs/Web/API/Request
    		// https://developer.mozilla.org/en-US/docs/Web/API/URL
			console.log('context', context);
			console.log('sameOrigin', sameOrigin);
			console.log('destination', request?.destination);
			console.log('method', request?.method); // GET, POST, ...
			console.log('accept', request?.headers.get('accept'));
			console.log('hostname', url?.hostname);
			console.log('defaultImages', isPathname(context, 'defaultImages'));
			return false;
		}, 
		new workbox.strategies.NetworkOnly()
	);

	// 공통 만료 설정
	const expiration = new workbox.expiration.ExpirationPlugin({
		//maxEntries: 500, // 캐시 할 최대 리소스 수
		//maxAgeSeconds: 1 * 24 * 60 * 60, // 1 일 - 86400 초
		maxAgeSeconds: 1 * 60 * 60, // 1 시간 - 3600 초
	});

	// HTML 파일은 무조건 네트워크
	workbox.routing.registerRoute(
		context => isAccept(isContext(context), 'text/html'),
		new workbox.strategies.NetworkOnly()
	);

	// 폰트 리소스 
	workbox.routing.registerRoute(
		new RegExp('.*\.(?:eot|woff2|woff|ttf)$'),
		new workbox.strategies.CacheFirst({
			cacheName: CACHE_NAME_FONT
		})
	);

	// 이미지 리소스
	workbox.routing.registerRoute(
		context => context.request.destination === 'image' && isPathname(context, 'defaultImages'),
		new workbox.strategies.CacheFirst({
		  cacheName: CACHE_NAME_IMAGE_DEFAULT,
		}),
	);
	workbox.routing.registerRoute(
		// https://bc.ad.daum.net 처럼 Accept 타입이 'image/webp,image/apng,image/*,*/*;q=0.8' 으로 request 되는 파일이 존재함 
		//context => isAccept(isContext(context), 'image/'),
		//context => isExtension(isContext(context), ['png', 'gif', 'jpg', 'jpeg', 'svg']),
		//context => isContext(context) && (isHostname(context, 'image.cjmall.net') || isPathname(context, '/image.cjmall.net/')) && isExtension(context, ['png', 'gif', 'jpg', 'jpeg']),
		//context => isContext(context) && (/\/\/(dev-image2|image)\.cjmall\.(net|com)\/public\/confirm\/assets/i.test(context.url.origin) || /\/(dev-image2|image)\.cjmall\.(net|com)\/public\/confirm\/assets/.test(context.url.pathname)) && isExtension(context, ['png', 'gif', 'jpg', 'jpeg']),
		//new RegExp('.*\.(?:png|gif|jpg|jpeg|svg)$'),
		({ request }) => request.destination === 'image',
		new workbox.strategies.StaleWhileRevalidate({
			cacheName: CACHE_NAME_IMAGE,
			plugins: [
				// 만료 관련 플러그인
				expiration,
			],
			fetchOptions: {},
			matchOptions: {}
		})
	);

	// css/js
	// 'text/javascript' Accept 값으로 확인 할 경우, API 호출 데이터까지 범위에 들어 갈 수 있다.
	// css/js
	workbox.routing.registerRoute(
		context => isDestination(context, ['script']) && isExtension(context, ['js']) && isPathname(context, '_next'),
		new workbox.strategies.StaleWhileRevalidate({
			cacheName: CACHE_NAME_SCRIPT,
			plugins: [
				// 만료 관련 플러그인
				expiration,
			],
		}),
	);
	workbox.routing.registerRoute(
		context => isDestination(context, ['style']) && isExtension(context, ['css']),
		new workbox.strategies.StaleWhileRevalidate({
			cacheName: CACHE_NAME_STYLE,
			plugins: [
				// 만료 관련 플러그인
				expiration,
			],
		}),
	);

	// fallbacks
	// https://developers.google.com/web/tools/workbox/guides/advanced-recipes#comprehensive_fallbacks
	// https://medium.com/dev-channel/service-worker-caching-strategies-based-on-request-types-57411dd7652c
	workbox.routing.setCatchHandler(({ event }) => {
		switch(event.request.destination) {
			case 'document':
				// return matchPrecache(FALLBACK_HTML_URL);
				//return caches.match(FALLBACK_HTML_URL);
			break;

			case 'image':
				// return matchPrecache(FALLBACK_IMAGE_URL);
				//return caches.match(FALLBACK_IMAGE_URL);
			break;
		
			case 'font':
				// return matchPrecache(FALLBACK_FONT_URL);
				//return caches.match(FALLBACK_FONT_URL);
			break;
		
			default:
				return Response.error();
		}
	});
};

// workbox 변수 존재 확인 
if(workbox) {
	console.log(`Workbox is loaded.`);
	setWorkBoxRun(workbox);
}