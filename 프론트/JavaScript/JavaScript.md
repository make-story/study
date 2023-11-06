# 레퍼런스 (참고자료)

> 전역객체(빌트인), 반복기, 흐름제어, 표현식 및 연산자, 함수 및 클레스, 에러처리, 기본식 등  
> https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference

> 코어 자바스크립트 책

# 자습서

https://developer.mozilla.org/ko/docs/Web/JavaScript

# 기본형 데이터, 참조형 데이터

https://developer.mozilla.org/ko/docs/Web/JavaScript/Data_structures

# window.open

Mac 환경에서, 크롬 브라우저 전체화면 모드에서는 window.open 이 '새탭'으로 열린다.  
전체회면 모드가 아닌 창 사이즈 조절이 가능한 화면에서는 window.open 이 '새창'으로 열린다.

---

# window.self

https://developer.mozilla.org/ko/docs/Web/API/Window/self

```javascript
var w1 = window;
var w2 = self;
var w3 = window.window;
var w4 = window.self;
// w1, w2, w3, w4 모두 일치. 그러나 워커에서는 w2만 작동함
```

---

# null, undefined

```javascript
const [a = 1] = []; // a = 1
const { b = 2 } = { b: undefined }; // b = 2
const { c = 3 } = { c: null }; // c = null

const content = undefined;
const { item } = { ...content }; // item = undefined
```
