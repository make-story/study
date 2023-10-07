# 얍과 웹뷰 사이 정보교환

```typescript
import { isAmoreAOS, isAmoreiOS } from "@/common/utils/is";

// Next.js 클라이언트 import
/*import dynamic from 'next/dynamic';
const webViewControl = dynamic(() => import('common/utils/webViewControl'), { ssr: false });*/

/**
 * 앱 <-> 웹뷰 연동 이벤트 타입
 */
export enum APP_EVENT_TYPE {
  MOVE_TO_HOME = "moveToHome", // 홈(메인)으로 이동
  CLOSE_WEB_VIEW = "closeWebview", // 웹뷰 닫기 또는 웹뷰 뒤로가기
  // 공유하기
  REQUEST_SHARE = "requestShare", // 앱 디바이스 기본 공유하기 레이어
  // 통합 인증 플랫폼 토큰
  TOKEN = "token",
  // 카메라 권한 확인, 요청
  CHECK_CAMERA_PERMISSION = "checkCameraPermission",
  CHECK_CAMERA_PERMISSION_RESULT = "checkCameraPermissionResult",
  REQUEST_CAMERA_PERMISSION = "requestCameraPermission",
  // 에러 코드 교환
  ERROR_CODE = "errorCode",
}

/**
 * 앱 -> 웹뷰 : 인터페이스
 * 앱쪽과 약속된 window.XXX 함수 추가
 */
const appEventDispatch = (type: APP_EVENT_TYPE) => {
  try {
    if (type && typeof (window as any)[type] !== "function") {
      (window as any)[type] = (...detail: any) => {
        document.dispatchEvent(new CustomEvent(type, { detail }));
      };
    }
  } catch (error) {
    console.log(error);
  }
};
if (typeof window !== "undefined") {
  // 앱에서 전달하는 토큰값 (브라우저 환경에서 넘겨주는 값)
  appEventDispatch(APP_EVENT_TYPE.TOKEN);

  // 카메라 권한 확인 요청에 대한 응답
  appEventDispatch(APP_EVENT_TYPE.CHECK_CAMERA_PERMISSION_RESULT);

  // ...
}

/**
 * 앱 -> 웹뷰 : 이벤트 on / 이벤트 off
 *
 * @example
  import { APP_EVENT_TYPE, appEventOn, appEventOff } from '@amore/common/utils/webViewControl';

  // 이벤트 리스너
  const listener = ({ detail }: any) => {
    console.log(detail); // detail: [ 1번째 함수 파라미터, 2번째 함수 파라미터, ... ]
  };

  // 이벤트 리스너 on
  appEventOn(APP_EVENT_TYPE.LAUNCH_LAYER_POPUP, listener);

  // 이벤트 리스너 off
  appEventOff(APP_EVENT_TYPE.LAUNCH_LAYER_POPUP, listener);

  // 테스트
  setTimeout(() => {
    // 앱에서 웹뷰 기능을 실행(콜)했다는 가정
    window.launchLayerPopup('TEST');
  }, 3000);
 */
type eventOptions = {
  capture?: boolean;
  once?: boolean;
  passive?: boolean;
  mozSystemGroup?: boolean;
};
export const appEventOn = (
  type: APP_EVENT_TYPE,
  listener: EventListener,
  options?: eventOptions
) => {
  document.addEventListener(type, listener, options);
};
export const appEventOff = (
  type: APP_EVENT_TYPE,
  listener: EventListener,
  options?: eventOptions
) => {
  document.removeEventListener(type, listener, options);
};

/**
 * 웹뷰 -> 앱
 *
 * 호출 예:
 * inAppWebViewCall("webview", APP_EVENT_TYPE.CHANGE_WEB_STATUS, 'pageName', 'showDimmed', 'Y');
 */
export type TBridge = "webview" | null;
export const inAppWebViewCall =
  (
    bridge: TBridge = "webview"
    type: APP_EVENT_TYPE /* 이벤트 타입 */,
    ...args: any /* App으로 전송할 값(이벤트 타입에 따라 필수값 아님) */
  ) => {
    // App 디버깅을 위해, logger.debug 사용안함
    console.log(`inAppWebViewCall [${bridge}] ${type}`, ...args);

    // 안드로이드는 앱인터페이스 호출 후 리턴값 받을 수 있음
    let result = null;

    // 각 OS별 분기
    if (isAmoreAOS()) {
      // 안드로이드
      try {
        // @ts-ignore
        result = window?.[bridge]?.[type](...args);
      } catch (error: any) {
        console.error(error, `AOS error`);
      }
    } else if (isAmoreiOS()) {
      // IOS
      try {
        if (bridge === "webview" || bridge === "webkit") {
          // WKWebView 방식
          // @ts-ignore
          window?.webkit?.messageHandlers?.[type].postMessage(...args);
        } else {
          // 스키마 방식
          const iframe = document.createElement("iframe");
          const scheme = `${bridge}://${type}`;
          iframe.setAttribute("src", scheme);
          document.documentElement.appendChild(iframe);
          iframe.parentNode!.removeChild(iframe);
        }
      } catch (error: any) {
        console.error(error, `IOS error`);
      }
    }else if(window?.flutter_inappwebview) {
        // Flutter
        try {
            window.flutter_inappwebview.callHandler(type, ...args);
        } catch (error: any) {
            console.error(error, `Flutter error`);
        }
    }

    return result;
  };
```
