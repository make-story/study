# CORS  
https://developer.mozilla.org/ko/docs/Web/HTTP/CORS  
https://ingg.dev/cors/   


-----


## 동일 출처(Origin)  
`Protocol`://`Host`:`Prot`/`Path`/?`QueryString`#`Fragment`  
동일 출처(Same Origin)란 scheme(protocol), host(domain), port 가 모두 같을 때  

### 예: https://evan-moon.github.io    
https://evan-moon.github.io/about	
O	스킴, 호스트, 포트가 동일

https://evan-moon.github.io/about?q=안뇽	
O	스킴, 호스트, 포트가 동일

https://user:password@evan-moon.github.io	
O	스킴, 호스트, 포트가 동일

http://evan-moon.github.io	
X	스킴이 다름

https://api.github.io	
X	호스트가 다름

https://evan-moon.naver.com	
X	호스트가 다름

https://evan-moon.github.com	
X	호스트가 다름

https://evan-moon.github.io:8000	
?	브라우저의 구현에 따라 다름


-----


## 단순 요청(Simple requests)
Simple Request는 Preflight Request와 다르게 요청을 보내면서 즉시 cross origin인지 확인하는데,  
다음 조건을 모두 충족해야한다.

- 메서드는 GET POST HEAD 중 하나
- 헤더는 Accept, Accept-Language, Content-Language, Content-Type 만 허용
- Content-Type 헤더는 다음의 값들만 허용
    - application/x-www-form-urlencoded
    - multipart/form-data
    - text/plain


## 프리플라이트 요청
Preflight Request는 요청을 예비 요청과 본 요청으로 나눈다.  
OPTIONS 메서드를 통해 다른 도메인의 리소스에 요청이 가능한지 (실제 요청이 전송하기에 안전한지) 확인 작업을 하고,  
요청이 가능하다면 실제 요청을 보낸다.  
Cross-origin 요청은 유저 데이터에 영향을 줄 수 있기 때문에 Preflight 요청을 한다.   


## HTTP 응답 헤더