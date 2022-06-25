# Web App Manifest
https://web.dev/install-criteria/   
https://web.dev/promote-install  
https://web.dev/codelab-make-installable/  

https://web.dev/manifest-updates/


https://developer.chrome.com/blog/richer-pwa-installation/   
https://web.dev/add-manifest/  


## 설치 기준 
https://web.dev/install-criteria/#criteria  
- 웹 앱이 아직 설치되지 않음  
- 사용자 참여 휴리스틱 충족  
- HTTPS를 통해 제공  
- 다음을 포함하는 웹 앱 매니페스트를 포함합니다.  
    - short_name 또는 name  
    - icons - 192px 및 512px 아이콘을 포함해야 합니다.  
    - start_url  
    - display fullscreen , standalone 또는 minimal-ui 중 하나여야 합니다.  
    - prefer_related_applications이 존재하거나 false여서는 안 됩니다.  
- fetch 핸들러에 서비스 워커를 등록합니다.  


## 브라우저 자동 설치유도 배너 
https://web.dev/promote-install/#browser-promotion  
> `설치 배너 노출 기준` 
특정 기준 이 충족되면 대부분의 브라우저에서 사용자에게 PWA를 설치할 수 있음을 자동으로 표시   
https://web.dev/define-install-strategy/#pwa-3    

> Android용 Chrome은 사용자에게 미니 정보 표시줄을 표시하지만  
이는 beforeinstallprompt 이벤트에서 preventDefault()을 호출하면 막을 수 있습니다.

> 사용자가 사이트를 처음 방문할 때 배너가 표시되고  
Android에서 설치 가능성 기준을 충족한 다음 약 90일 후에 다시 표시됩니다.  


## screenshots 노출 기준 
https://web.dev/add-manifest/#screenshots  
- 너비와 높이는 320px 이상 3840px 이하여야 합니다.  
- 최대 치수는 최소 치수의 2.3배를 초과할 수 없습니다.  
- 스크린샷은 가로 세로 비율이 동일해야 합니다.  
- JPEG 및 PNG 이미지 형식만 지원됩니다.  

