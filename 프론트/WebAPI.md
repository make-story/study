# MDN

https://developer.mozilla.org/ko/docs/Web/API

# Sanitizer API

https://wormwlrm.github.io/2021/11/21/Sanitizer-API.html

사용자의 입력을 그대로 HTML에 표현하는 경우를 생각해봅시다.  
만약 여러분이 보안에 충분한 주의를 기울이지 않는다면, 악의를 가진 사용자들로부터 교차 사이트 스크립팅(XSS, cross-site scripting) 공격을 쉽게 받을 수 있겠죠.

이러한 위험을 완화시키기 위해 제안된 Sanitizer(새니타이저, 살균제・소독제라는 뜻) API 는 임의의 문자열이 페이지에 안전하게 삽입될 수 있게 도와주는 방법을 제공합니다.

```javascript
const $div = document.querySelector('div');
const user_input = `<em>hello world</em><img src="" onerror=alert(0)>`;
const sanitizer = new Sanitizer();

$div.setHTML(user_input, sanitizer); // <div><em>hello world</em><img src=""></div>
```
