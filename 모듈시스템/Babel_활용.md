# Babel 은 코드를 변환해주는 트랜스파일링 도구

## ESM -> CommonJS

https://babeljs.io/docs/babel-plugin-transform-modules-commonjs

https://ui.toast.com/weekly-pick/ko_20190418

Babel은 ES 모듈의 내보내기 문법을 사용한 모듈에는 module.exprots.\_\_esModule 플래그를 true 로 설정한다.

```javascript
// 트랜스파일링 이전
export default 42;
```

```javascript
// 트랜스파일링 이후
Object.defineProperty(exports, '__esModule', {
  value: true,
});

exports.default = 42;
```

그리고 ES 모듈로 기본값 가져오기를 통해 가져오는 코드를 만나면 \_interopRequireDefault() 함수를 생성하고,  
가져온 객체를 그대로 사용하지 않고 객체의 defalut 프로퍼티에 접근하여 사용하도록 코드를 바꾼다.  
이렇게 바꿔주면 CommonJS 모듈은 module.exports에 할당한 객체가 새로운 객체의 default 프로퍼티에 할당되어 감싸진 상태로 반환된다.

```javascript
var _bold = _interopRequireDefault(require('../bold'));
var _italic = _interopRequireDefault(require('./italic'));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
```
