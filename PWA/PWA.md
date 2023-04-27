# PWA

https://abookapart.com/products/progressive-web-apps

# META

https://github.com/gokulkrishh/awesome-meta-and-manifest

# PWA 버그 / 트릭

https://github.com/PWA-POLICE/pwa-bugs

https://github.com/deanhume/pwa-tips-tricks

# IOS 지원

https://webkit.org/status/#?search=manifest

https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html

https://developer.apple.com/documentation/webkit/promoting_apps_with_smart_app_banners

https://medium.com/@firt/progressive-web-apps-on-ios-are-here-d00430dee3a7

https://medium.com/@firt/pwas-on-ios-12-2-beta-the-good-the-bad-and-the-not-sure-yet-if-good-a37b6fa6afbf

---

# PWA 주요 웹 API

> 서비스워커 (Service Workers)  
> 매니페스트 (Manifest)  
> 웹푸시 (Web Push)

# PWA 적용후기 및 장단점

https://yceffort.kr/2020/11/pwa-pros-and-cons

---

# Firebase 클라우드 메시징(FCM) 이용한 방법(웹푸시)

https://firebase.google.com/docs/cloud-messaging

# FCM 서버와 상호작용할 수 있는 방법

https://firebase.google.com/docs/cloud-messaging/server

1. Firebase Admin SDK (Node.js, 자바, Python, C#, Go 지원)
2. FCM HTTP v1 API - 가장 최신 프로토콜로서 보다 안전한 승인과 유연한 교차 플랫폼 메시징 기능 제공(Firebase Admin SDK는 이 프로토콜을 기반으로 하며 모든 고유 이점을 제공함)
3. `기존 HTTP 프로토콜`
4. XMPP 서버 프로토콜. 클라이언트 애플리케이션에서 업스트림 메시징을 사용하려면 XMPP를 사용해야 한다는 점에 유의하세요.

# 서비스워커 캐싱전략 (workbox 도구 참고)

https://developer.chrome.com/docs/workbox/modules/workbox-strategies/

---

# next-pwa

nextjs 환경에서 pwa를 적용해줄 수 있는 라이브러리

https://www.npmjs.com/package/next-pwa

# pwa-asset-generator

pwa 를 ios 나 안드로이드에서 제대로 보여주기 위해서는 아이콘과 splash이미지를 잘 준비해야 함  
특히 ios의 splash 이미지는 apple launch screen 가이드에 따라서 모든 사이즈에 대응할 수 있는 이미지가 준비되어 있어야 함  
아이콘과 스플래시 이미지, 그리고 그에 따른 태그를 알아서 생성

---

# PWA 사례 / 효과

`https://www.pwastats.com/`  
https://web.dev/twitter/  
https://inoxoft.com/blog/benefits-of-progressive-web-apps-pwa-advantages-and-disadvantages/

https://almanac.httparchive.org/en/2022/pwa

## PWA 스토어

https://appsco.pe/

## 스타벅스 PWA

일일 활성 사용자(DAU)가 2배 증가  
https://www.pwastats.com/2020/02/starbucks/  
https://app.starbucks.com/

## 핀터레스트 PWA

사이트 참여도가 60%로 증가하고 사용자 생성 광고 수익이 44%로 증가했으며 사용자가 사이트에서 보낸 시간이 40%에 도달  
https://www.pinterest.co.kr/

## 트위터 PWA

재참여율 증가  
모바일 웹에서 사용자를 다시 참여시키는 것은 어려웠습니다. 
사용자에게 Twitter Lite를 홈 화면에 저장하도록 요청하는 "Add to Homescreen" 프롬프트를 구현한 후  
Twitter는 250,000명의 고유한 일일 사용자가 홈 화면에서 하루 평균 4번 Twitter Lite를 실행하는 것을 보았습니다.  
https://web.dev/twitter/

## 캐싱 전략, 설치 및 푸시 알림을 통해 모바일 전환율을 53% 향상시킨 JD.ID

https://web.dev/jdid/

## Rakuten 24의 PWA 투자로 사용자 유지율 450% 증가

https://web.dev/rakuten-24/

## 프로그레시브 웹 앱(PWA)이란 무엇이며, 왜 필요한가?

https://blog.wishket.com/%ED%94%84%EB%A1%9C%EA%B7%B8%EB%A0%88%EC%8B%9C%EB%B8%8C-%EC%9B%B9-%EC%95%B1pwa%EC%9D%B4%EB%9E%80-%EB%AC%B4%EC%97%87%EC%9D%B4%EB%A9%B0-%EC%99%9C-%ED%95%84%EC%9A%94%ED%95%9C%EA%B0%80/  
https://app.starbucks.com/  
https://www.pinterest.co.kr/

---

## 서비스워커

### Application Shell Architecture (App shell)

https://medium.com/google-developers/instant-loading-web-apps-with-an-application-shell-architecture-7c0c2f10c73

https://developer.mozilla.org/ko/docs/Web/Progressive_web_apps/App_structure

정적 콘텐츠와 동적 콘텐츠를 분리  
공통적 사용자 레이아웃 부분 서버스워커 활용 캐시
