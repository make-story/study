`study.git/인프라/서버/NodeJS_NPM/NodeJS_모듈시스템.md` 참고!

# JavaScript modules (모듈 시스템)

https://ko.javascript.info/modules-intro

- AMD
  Asynchronous Module Definition  
  가장 오래된 모듈 시스템 중 하나로 require.js 라는 라이브러리를 통해 처음 개발되었습니다.
- CommonJS
  Node.js 서버를 위해 만들어진 모듈 시스템입니다.
- UMD
  Universal Module Definition  
  AMD 와 CommonJS 와 같은 다양한 모듈 시스템을 함께 사용하기 위해 만들어졌습니다.
- ESM
  `ECMAScript Modules`  
  자바스크립트 공식 모듈 시스템

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules

## AMD

`비동기 다운로드 후 콜백 실행`

https://github.com/amdjs/amdjs-api/blob/master/AMD.md

## CommonJS

`디스크로 부터 읽어 그 즉시 실행(동기)`

https://en.wikipedia.org/wiki/CommonJS

https://web.dev/i18n/ko/commonjs-larger-bundles/

.cjs인 경우 CommonJS  
package.json 의 "type" 필드 “commonJS” 또는 없는 경우 CommonJS

## ECMAScript Modules

`병렬 다운로드, 순차 실행`

https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Modules

https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/export

https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/import

.mjs인 경우 ESM  
package.json 의 "type" 필드 “module” 인 경우 ESM

---

# ESM(ECMAScript Modules) 과 CJS(CommonJS) 는 완전히 다르다.

https://yceffort.kr/2020/08/commonjs-esmodules

https://roseline.oopy.io/dev/translation-why-cjs-and-esm-cannot-get-along

`CommonJS 에서는 require()는 동기`로 이루어진다.  
따라서 promise 나 콜백 호출을 리턴하지 않는다.  
`require() 는 디스크로 부터 읽어서 (네트워크 일수도 있다) 그 즉시 스크립트를 실행`한다.  
따라서 스스로 I/O 나 부수효과(side effect)를 실행하고 module.exports 에 설정되어 있는 값을 리턴한다.

반면에 `ESM 은 모듈 로더를 비동기 환경에서 실행`한다.  
먼저 가져온 스크립트를 바로 실행하지 않고, import 와 export 구문을 찾아서 스크립트를 파싱한다. (코드에 import, export 구문 존재 확인!)  
파싱 단계에서, 실제로 ESM 로더는 종속성이 있는 코드를 실행하지 않고도, named imports 에 있는 오타를 감지하여 에러를 발생시킬 수 있다.

그 다음 ESM 모듈 로더는 가져온 스크립트를 비동기로 다운로드 하여 파싱한 다음,  
import 된 스크립트를 가져오고, 더 이상 import 할 것이 없어질 때까지 import 를 찾은 다음 (모든 import 구문에 해당하는 파일 비동기 다운로드!)  
dependencies 의 모듈 그래프를 만들어 낸다.

그리고,  
스크립트는 실행될 준비를 마치게 되며,  
그 스크립트에 의존하고 있는 스크립트들도 실행할 준비를 마치게 되고,  
마침내 실행된다.

`ESM 모듈 내의 모든 자식 스크립트들은 병렬로 다운로드 되지만, 실행은 순차적으로 진행된다.`

# CommonJS -> ESM 전환 / ESM 동작 원리

https://tech.kakao.com/2023/10/19/commonjs-esm-migration/

https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/
