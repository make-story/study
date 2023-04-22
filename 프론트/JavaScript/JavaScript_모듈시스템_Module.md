# JavaScript modules (모듈 시스템)

https://ko.javascript.info/modules-intro

- AMD
  가장 오래된 모듈 시스템 중 하나로 require.js라는 라이브러리를 통해 처음 개발되었습니다.
- CommonJS
  Node.js 서버를 위해 만들어진 모듈 시스템입니다.
- UMD
  AMD와 CommonJS와 같은 다양한 모듈 시스템을 함께 사용하기 위해 만들어졌습니다.

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules

## CommonJS

https://en.wikipedia.org/wiki/CommonJS

https://web.dev/i18n/ko/commonjs-larger-bundles/

## AMD

https://github.com/amdjs/amdjs-api/blob/master/AMD.md

## ECMAScript Modules

https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Modules

https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/export

https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/import

---

# ESM(ECMAScript Modules)과 CJS(CommonJS)는 완전히 다르다.

https://yceffort.kr/2020/08/commonjs-esmodules

https://roseline.oopy.io/dev/translation-why-cjs-and-esm-cannot-get-along

CommonJS에서는 require()는 동기로 이루어진다. 따라서 promise나 콜백 호출을 리턴하지 않는다. require()는 디스크로 부터 읽어서 (네트워크 일수도 있다) 그 즉시 스크립트를 실행한다. 따라서 스스로 I/O나 부수효과 (side effect)를 실행하고 module.exports에 설정되어 있는 값을 리턴한다.

반면에 ESM은 모듈 로더를 비동기 환경에서 실행한다. 먼저 가져온 스크립트를 바로 실행하지 않고, import와 export구문을 찾아서 스크립트를 파싱한다. 파싱 단계에서, 실제로 ESM 로더는 종속성이 있는 코드를 실행하지 않고도도, named imports에 있는 오타를 감지하여 에러를 발생시킬 수 있다.

그 다음 ESM 모듈 로더는 가져온 스크립트를 비동기로 다운로드 하여 파싱한다음, import된 스크립트를 가져오고, 더 이상 import 할 것이 없어질 때까지 import를 찾은 다음 dependencies의 모듈 그래프를 만들어 낸다. 그리고, 스크립트는 실행될 준비를 마치게 되며, 그 스크립트에 의존하고 있는 스크립트들도 실행할 준비를 마치게 되고, 마침내 실행된다.

ESM 모듈 내의 모든 자식 스크립트들은 병렬로 다운로드 되지만, 실행은 순차적으로 진행된다.
