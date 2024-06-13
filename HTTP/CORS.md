# SOP (Same-Origin Policy)

- 동일 출처 정책 (Same-Origin Policy) 은 같은 출처에서만 리소스를 공유할 수 있다는 규칙을 가진 정책이다.
- 하지만 웹의 경우 다른 출처에 있는 리소스를 가져와서 사용하는 일이 많기 때문에 이를 전부 막기란 어려웠다.
- 따라서 몇 가지 예외 사항을 두었는데 그 중 하나가 바로 “CORS 정책을 지킨 리소스 요청” 이다.

# CORS (Cross-Origin Resource Sharing)

- 교차 출처 리소스 공유 정책
- 다른 출처의 리소스 공유에 대한 허용/비허용 정책
- 출처(Origin) 라는 것은 Protolcol 과 Host 그리고 Port 까지 모두 합친 URL

https://developer.mozilla.org/ko/docs/Web/HTTP/CORS  
https://ingg.dev/cors/  
https://evan-moon.github.io/2020/05/21/about-cors/

# CORS (Referer와 Referer-Policy)

https://yceffort.kr/2020/09/referer-and-referrer-policy#%EC%99%9C-strict-origin-when-cross-origin%EC%9D%B8%EA%B0%80

# 크롬 브라우저

https://developer.chrome.com/blog/referrer-policy-new-chrome-default/

---

## 동일 출처(Origin)

`Protocol`://`Host`:`Prot`/`Path`/?`QueryString`#`Fragment`  
동일 출처(Same Origin)란 scheme(protocol), host(domain), port 가 모두 같을 때

### 예: https://evan-moon.github.io

https://evan-moon.github.io/about
O 스킴, 호스트, 포트가 동일

https://evan-moon.github.io/about?q=안뇽
O 스킴, 호스트, 포트가 동일

https://user:password@evan-moon.github.io
O 스킴, 호스트, 포트가 동일

http://evan-moon.github.io
X 스킴이 다름

https://api.github.io
X 호스트가 다름

https://evan-moon.naver.com
X 호스트가 다름

https://evan-moon.github.com
X 호스트가 다름

https://evan-moon.github.io:8000
? 브라우저의 구현에 따라 다름

---

# crossOrigin 속성

https://developer.mozilla.org/ko/docs/Web/HTML/Attributes/crossorigin

http://www.devdic.com/html/refer/attributes/attribute:2888/Common-by-tag/crossorigin

```
<audio>, <img>, <link>, <script>, <video>에 있는 crossOrigin 속성은
element가 CORS 요청을 처리하는 방식을 명시하여 element가 fetch한 데이터를 CORS 가능하게 합니다.
특정 element에서는 CORS 세팅 속성이 될 수도 있습니다.
```

- anonymous  
  element의 CORS 요청의 credentials flag가 'same-origin'으로 지정됩니다.  
  이 값을 설정하는 경우에 별도의 자격 증명을 보내지 않고 익명으로 요청을 한다. 따라서 응답하는 서버에서도 이 익명 요청을 받아들일 수 있도록 설정되어 있어야 한다.
- use-credentials  
  element의 CORS 요청의 crendentials flag가 'include'로 지정됩니다.
  이 값을 설정하는 경우에 요청시 자격 증명을 함께 보내는 것으로 처리된다. 자격 증명의 방법으로 쿠키(cookie), HTTP 인증 정보를 응답하는 서버에 전송한다. 따라서 응답 서버는 허용된 요청에만 응답할 수 있도록 설정되어 있어야 한다.
- ""  
  crossorigin 또는 crossorigin=""처럼 빈 값을 할당하는건 anonymous와 동일합니다.

---

## 단순 요청 (Simple requests)

`예비 요청(Prefilght)을 생략하고 바로 서버에 직행으로 본 요청`

Simple Request는 Preflight Request와 다르게 요청을 보내면서 즉시 cross origin인지 확인하는데,  
다음 조건을 모두 충족해야한다.

- 메서드는 GET POST HEAD 중 하나
- 헤더는 Accept, Accept-Language, Content-Language, Content-Type 만 허용
- Content-Type 헤더는 다음의 값들만 허용
  - application/x-www-form-urlencoded
  - multipart/form-data
  - text/plain

## 프리플라이트 요청 (preflight, 사전 전달)

`“simple requests” 와는 달리, 먼저 OPTIONS 메서드를 통해 다른 도메인의 리소스로 HTTP 요청을 보내 실제 요청이 전송하기에 안전한지 확인`

Preflight Request는 요청을 예비 요청과 본 요청으로 나눈다.  
OPTIONS 메서드를 통해 다른 도메인의 리소스에 요청이 가능한지 (실제 요청이 전송하기에 안전한지) 확인 작업을 하고,  
요청이 가능하다면 실제 요청을 보낸다.  
Cross-origin 요청은 유저 데이터에 영향을 줄 수 있기 때문에 Preflight 요청을 한다.

## 인증정보 포함 요청 (Credentialed Request)

인증 관련 헤더를 포함할 때 사용하는 요청이다.  
브라우저가 제공하는 비동기 리소스 요청 API인 XMLHttpRequest 객체나 fetch API는 별도의 옵션 없이 브라우저의 쿠키 정보나 인증과 관련된 헤더를 기본적으로 요청에 담지 않으므로,  
credentials 옵션을 변경하지 않고서는 cookie를 주고 받을 수 없다.

옵션은 세가지가 있다.

- omit : 절대로 cookie 들을 전송하거나 받지 않는다.
- same-origin : 동일 출처(same origin)이라면, user credentials (cookies, basic http auth 등..)을 전송한다. (default 값)
- include : cross-origin 호출이라 할지라도 언제나 user credentials (cookies, basic http auth 등..)을 전송한다.

```javascript
fetch('주소', {
  credentials: 'include', // 모든 요청에 인증 정보 포함
});
```

axios 로 통신할 시, withCredentials 설정을 true 로 넣어주면 된다.

```javascript
axios.post(주소, 데이터, { withCredentials: true });

// 또는 공통으로 추가
axios.defaults.withCredentials = true;
```

또한 credentials 설정을 include/true 로 설정하면  
CORS정책에 의해 Access-Control-Allow-Origin을 모든 출처를 허용하는 '*' 로 지정할 수 없다는 에러가 발생하며,  
따라서 cors 설정에서 *을 입력하여 모든 출처를 허용한 경우에는 특정 출처를 정확히 명시해야 한다.

---

# CORS 해결 방법

## Access-Control-Allow-Origin 응답 헤더 세팅

```javascript
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // 모든 도메인
  res.header('Access-Control-Allow-Origin', 'https://example.com'); // 특정 도메인
});
```

## cors 모듈 사용

```javascript
const cors = require('cors');
const app = express();

app.use(cors());
```

특정 도메인 접근 허용

```javascript
const options = {
  origin: 'http://example.com', // 접근 권한을 부여하는 도메인
  credentials: true, // 응답 헤더에 Access-Control-Allow-Credentials 추가
  optionsSuccessStatus: 200, // 응답 상태 200으로 설정
};

app.use(cors(options));
```

특정 요청 접근 허용

```javascript
app.get('/example/:id', cors(), function (req, res, next) {
  res.json({ msg: 'example' });
});
```

## webpack-dev-server proxy 기능

```javascript
// 프록시 쓰지 않았을때
// localhost:8080(클라이언트 측) --X (CORS)--> domain.com (서버 측)

// 프록시를 설정 후
// localhost:8080(클라이언트 측) --O 프록시가 설정된 Webpack Dev Server--> domain.com (서버 측)

module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'domain.com',
        changeOrigin: true,
      },
    },
  },
};
```

## package.json에 proxy값을 설정

create-react-app 으로 생성한 프로젝트에서는, package.json 에 proxy 값을 설정하여 proxy 기능을 활성화 하는 방법도 있다.

```javascript
{
    //...
    "proxy": "http://localhost:4000"
}
```

---

# Same Origin / Cross Origin

https://inpa.tistory.com/entry/WEB-%F0%9F%93%9A-CORS-%F0%9F%92%AF-%EC%A0%95%EB%A6%AC-%ED%95%B4%EA%B2%B0-%EB%B0%A9%EB%B2%95-%F0%9F%91%8F
