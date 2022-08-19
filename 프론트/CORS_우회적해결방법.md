# CORS 우회적 해결방법

https://wit.nts-corp.com/2014/04/22/1400

- Reverse Proxy
- iframe
- JSONP
- document.domain

## JSONP

이 방식은 `<script>` 태그가 동일 출처 정책의 제약을 받지 않는 특성을 이용  
JSONP 방식은 callback 파라미터로 넘어온 콜백 함수를 호출하면서 응답결과를 호출 인자로 전달하는 스크립트 코드를 만들어 클라이언트로 전송 (script 실행 코드, 함수)
JSONP 요청은 GET 메소드만 이용할 수 있다

### success라는 이름의 콜백 함수가 있다. 이 함수는 이름처럼 Ajax 요청에 대한 서버 측 응답을 처리한다.

```javascript
function success(result) {
  // success callback
}
```

### JSONP 방식은 XMLHttpRequest 객체를 이용해서 서버로 요청을 전송하는 대신 동적으로 `<script>` 태그를 만들어 페이지에 삽입한다.

이 때 아래와 같이 script 태그의 src 속성에 호출할 API의 url을 넣어주고 query string에 callback 함수의 이름을 파라미터로 추가한다.

```html
<script src="http://api.example.com/resources?callback=success"></script>
```

### JSONP 방식은 callback 파라미터로 넘어온 콜백 함수를 호출하면서 응답결과를 호출 인자로 전달하는 스크립트 코드를 만들어 클라이언트로 전송한다.

```javascript
success({ key: value }); // 응답결과를 인자로 전달하는 콜백함수 호출 코드를 만들어 전송
```

클라이언트는 넘어온 결과 값을 해석해서 실행한다.  
그러면 결과적으로 success 함수가 호출된다.  
이는 Ajax 요청 응답 결과를 success 콜백함수가 받아서 실행하는 것과 같다.  
JSONP는 일종의 편법인 셈이다.  
JSONP 요청은 GET 메소드만 이용할 수 있다는 치명적인 단점을 가지고 있다.
