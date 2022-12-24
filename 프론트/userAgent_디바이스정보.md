# 사용자 에이전트

https://developer.mozilla.org/ko/docs/Web/HTTP/Browser_detection_using_the_user_agent

# MediaDevices

MediaDevices 인터페이스는 카메라, 마이크, 공유 화면 등 현재 연결된 미디어 입력 장치로의 접근 방법을 제공하는 인터페이스입니다. 다르게 말하자면, 미디어 데이터를 제공하는 모든 하드웨어로 접근할 수 있는 방법입니다.  
https://developer.mozilla.org/ko/docs/Web/API/MediaDevices

# swiper5.js

```javascript
const Device = (function Device() {
  const platform = win.navigator.platform;
  const ua = win.navigator.userAgent;

  const device = {
    ios: false,
    android: false,
    androidChrome: false,
    desktop: false,
    iphone: false,
    ipod: false,
    ipad: false,
    edge: false,
    ie: false,
    firefox: false,
    macos: false,
    windows: false,
    cordova: !!(win.cordova || win.phonegap),
    phonegap: !!(win.cordova || win.phonegap),
    electron: false,
  };

  const screenWidth = win.screen.width;
  const screenHeight = win.screen.height;

  const android = ua.match(/(Android);?[\s\/]+([\d.]+)?/); // eslint-disable-line
  let ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
  const ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
  const iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
  const ie = ua.indexOf('MSIE ') >= 0 || ua.indexOf('Trident/') >= 0;
  const edge = ua.indexOf('Edge/') >= 0;
  const firefox = ua.indexOf('Gecko/') >= 0 && ua.indexOf('Firefox/') >= 0;
  const windows = platform === 'Win32';
  const electron = ua.toLowerCase().indexOf('electron') >= 0;
  let macos = platform === 'MacIntel';

  // iPadOs 13 fix
  if (
    !ipad &&
    macos &&
    Support.touch &&
    ((screenWidth === 1024 && screenHeight === 1366) || // Pro 12.9
      (screenWidth === 834 && screenHeight === 1194) || // Pro 11
      (screenWidth === 834 && screenHeight === 1112) || // Pro 10.5
      (screenWidth === 768 && screenHeight === 1024)) // other
  ) {
    ipad = ua.match(/(Version)\/([\d.]+)/);
    macos = false;
  }

  device.ie = ie;
  device.edge = edge;
  device.firefox = firefox;

  // Android
  if (android && !windows) {
    device.os = 'android';
    device.osVersion = android[2];
    device.android = true;
    device.androidChrome = ua.toLowerCase().indexOf('chrome') >= 0;
  }
  if (ipad || iphone || ipod) {
    device.os = 'ios';
    device.ios = true;
  }
  // iOS
  if (iphone && !ipod) {
    device.osVersion = iphone[2].replace(/_/g, '.');
    device.iphone = true;
  }
  if (ipad) {
    device.osVersion = ipad[2].replace(/_/g, '.');
    device.ipad = true;
  }
  if (ipod) {
    device.osVersion = ipod[3] ? ipod[3].replace(/_/g, '.') : null;
    device.ipod = true;
  }
  // iOS 8+ changed UA
  if (device.ios && device.osVersion && ua.indexOf('Version/') >= 0) {
    if (device.osVersion.split('.')[0] === '10') {
      device.osVersion = ua.toLowerCase().split('version/')[1].split(' ')[0];
    }
  }

  // Webview
  device.webView =
    !!((iphone || ipad || ipod) && (ua.match(/.*AppleWebKit(?!.*Safari)/i) || win.navigator.standalone)) ||
    (win.matchMedia && win.matchMedia('(display-mode: standalone)').matches);
  device.webview = device.webView;
  device.standalone = device.webView;

  // Desktop
  device.desktop = !(device.ios || device.android) || electron;
  if (device.desktop) {
    device.electron = electron;
    device.macos = macos;
    device.windows = windows;
    if (device.macos) {
      device.os = 'macos';
    }
    if (device.windows) {
      device.os = 'windows';
    }
  }

  // Pixel Ratio
  device.pixelRatio = win.devicePixelRatio || 1;

  // Export object
  return device;
})();
```

---

```javascript
const APP = {
  /**
   * 앱이름
   * @deprecated
   *
   * @returns {String}
   */
  getAppName: function () {
    if (uaLower.indexOf('naver') > -1) {
      return 'NAVER';
    } else {
      return '';
    }
  },

  /**
   * 앱버전
   * @deprecated
   *
   * @returns {String}
   */
  getAppVer: function () {
    var version = '0';
    version = uaLower.match(/serviceversion\=([\d\.]+)/)[1];
    return version;
  },

  /**
   * 안드로이드 버전
   * @deprecated
   *
   * @returns {*}
   */
  getAndroidVer: function () {
    var os = this.getOs();
    if (os === 'android') {
      var match = uaLower.match(/android\s([0-9\.]*)/);
      return match ? parseInt(match[1], 10) : false;
    } else {
      return false;
    }
  },

  /**
   * ios 버전
   * @deprecated
   *
   * @returns {String} '9.2.1'
   */
  getIosVer: function () {
    var matchResult = uaLower.match(/(iphone )?os ([\d|_]+)/);
    var version = '';
    if (matchResult !== null && typeof matchResult[2] !== 'undefined') {
      version = String(matchResult[2]).split('_').join('.');
    }
    return version;
  },
};
```
