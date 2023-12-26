# Boolean

https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Boolean  

Boolean `객체!`   

```javascript
const x = new Boolean(true);
x.name = 'ysm';
// Boolean {true, name: 'ysm'}
```

불리언이 아닌 값을 변환할 때 Boolean 객체를 사용해선 안됩니다. 대신 Boolean 함수를 사용하세요.

```javascript
const x = Boolean(expression); // 추천
const x = new Boolean(expression); // 사용하지 말것
```