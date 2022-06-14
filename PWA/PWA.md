# PWA

# Firebase 클라우드 메시징(FCM) 이용한 방법(웹푸시)  
https://firebase.google.com/docs/cloud-messaging  
    
# FCM 서버와 상호작용할 수 있는 방법  
https://firebase.google.com/docs/cloud-messaging/server  
1. Firebase Admin SDK (Node.js, 자바, Python, C#, Go 지원)  
2. FCM HTTP v1 API - 가장 최신 프로토콜로서 보다 안전한 승인과 유연한 교차 플랫폼 메시징 기능 제공(Firebase Admin SDK는 이 프로토콜을 기반으로 하며 모든 고유 이점을 제공함)  
3. `기존 HTTP 프로토콜`  
4. XMPP 서버 프로토콜. 클라이언트 애플리케이션에서 업스트림 메시징을 사용하려면 XMPP를 사용해야 한다는 점에 유의하세요.  
  
-----

> 서비스워커 (Service Workers)  
> 매니페스트 (Manifest)  
> 웹푸시 (Web Push)  

-----

https://yceffort.kr/2020/11/pwa-pros-and-cons  

# next-pwa
nextjs 환경에서 pwa를 적용해줄 수 있는 라이브러리

# pwa-asset-generator
pwa 를 ios 나 안드로이드에서 제대로 보여주기 위해서는 아이콘과 splash이미지를 잘 준비해야 함   
특히 ios의 splash 이미지는 apple launch screen 가이드에 따라서 모든 사이즈에 대응할 수 있는 이미지가 준비되어 있어야 함   
아이콘과 스플래시 이미지, 그리고 그에 따른 태그를 알아서 생성   