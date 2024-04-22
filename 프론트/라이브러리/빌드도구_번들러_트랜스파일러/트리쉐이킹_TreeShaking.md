# Tree Shaking (트리쉐이킹)

https://ui.toast.com/weekly-pick/ko_20180716

트리 쉐이킹은 `사용하지 않는 코드를 제거하는 방식`이다.  
이 용어는 Rollup 에 의해 인기를 얻게 되었으나, 사용하지 않는 코드 제거에 대한 개념은 이미 존재했었다.

Rollup (롤업)  
https://github.com/rollup/rollup#tree-shaking

## 참고

https://helloinyong.tistory.com/305

https://linguinecode.com/post/reduce-css-file-size-webpack-tree-shaking

## `트리쉐이킹 실패하는 경우`

https://webpack.js.org/guides/tree-shaking/#conclusion

- 사용되는 모듈이 ESM(ECMAScript Modules) 이 아닌 경우
  - `컴파일러가 ES2015 모듈 구문을 CommonJS 모듈로 변환하지 않도록 하세요`
  - tsconfig.json { "module": "commonjs", } 설정 주의! { "module": "esnext", } 설정(ESM) 해야함
- 사용하는 쪽에서 ESM 이 아닌 다른 모듈 시스템을 사용하는 경우
- 동적 임포트(dynamic import)를 사용하는 경우

`사용되는 쪽과 사용하는 쪽 모두 ESM 문법을 사용하면 나무 흔들기(트리쉐이킹)가 제대로 동작한다.`

## Webpack (웹팩)

https://webpack.js.org/guides/tree-shaking

예제

- https://github.com/webpack/webpack/tree/master/examples
- https://createapp.dev/

사용하지 않는 코드를 제거하여 번들 사이즈를 줄인다.

`tree-shaking 은 최종 자바스크립트 번들에서 실제로 사용되지 않는 코드들을 제거하기 위해 사용`된다.  
이 과정이 올바르게 수행될 경우 클라이언트 측에서 다운로드해야하는 번들 크기를 줄여 로딩 속도, 구분 분석, 실행 시간을 줄일 수 있다.

`ES2015의 모듈 구문(import, export)으로 정의된 모듈들만 tree-shaking 이 가능`하다.
모듈을 import하는 방법이 tree-shaking 가능 여부를 결정하게 된다.

```javascript
import { remove } from 'lodash';
```

위와 같은 방식을 통해 remove 를 불러온다.  
그러나 `위의 방식으로 사용하면 remove 하나를 사용하기 위해 전체 모듈을 불러오는 결과가 발생`한다.

```javascript
import _ from 'lodash';

const remove = _.remove;
```

아래 방법이 트리쉐이킹 가능

```javascript
// 선택적 import 사용 권장 - 트리쉐이킹 가능
import array from 'lodash/array';
import object from 'lodash/fp/object';

// array(...);
// object(...);
```

### lodash 트리쉐이킹 (트리쉐이킹이 작동하지 않는 기존코드를 도구를 활용하여 트리쉐이킹)

https://ykwan0714.github.io/lodash-%ED%81%AC%EA%B8%B0-%EC%A4%84%EC%9D%B4%EA%B8%B0/

lodash 는 CommonJS 형태로 번들링 되어 배포가 된다고 한다.  
그리고 babel 은 기본적으로 ES6 모듈(import/export) 대상으로 commonJS 형태로 변환을 해준다.

```javascript
import lodash from 'lodash';
// => var lodash = require('lodash');

import { assign } from 'lodash';
// => var assign = require('lodash').assign;
```

Webpack 은 ES Module로 의존성을 관리하는 모듈만 Tree-Shaking 을 한다.
따라서 require 변환된 녀석들은 트리 쉐이킹이 적용이 안되는 것이다.  
이를 수정하기 위해선 babel 설정을 추가해줘야했다.

`babel-plugin-lodash`

https://github.com/lodash/babel-plugin-lodash

```javascript
import { cloneDeep } from 'lodash';
// import cloneDeep from 'lodash/cloneDeep' // 위 코드를 "babel-plugin-lodash" 가 트리쉐이킹 가능한 코드로 변경해준다.
```

bable.config.js

```javascript
//babel.config.js
module.exports = {
  presets: [['@vue/app', { modules: false }]],
  plugins: ['lodash'],
};
```

modules 옵션은 ES6 모듈 구문을 다른 모듈 타입으로 바꿀 것이냐 인데, false 하여 ES6 모듈 그대로를 사용한다는 뜻이다.

`lodash-webpack-plugin 는 사용하지 않는 lodash 코드를 제거`

https://github.com/lodash/lodash-webpack-plugin

```javascript
// vue.config.js
//...생략...
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

module.exports = {
  //...생략...
  configureWebpack: {
    plugins: [
      new LodashModuleReplacementPlugin({ shorthands: true }),
      // ...생략...
    ],
  },
};
```

### `Side Effects`

https://webpack.kr/guides/tree-shaking/#mark-the-file-as-side-effect-free  
https://webpack.js.org/guides/tree-shaking/#clarifying-tree-shaking-and-sideeffects

package.json의 "sideEffects" 속성

ES6 모듈을 import하는 경우 해당 모듈은 즉시 실행된다.  
이 때 참조하는 코드가 export하는 것을 참조하지 않더라도 그 코드 내부에서 전역에 무언가 영향을 줄 수 있다.  
(예를 들면 폴리필 추가, 전역 스타일시트 추가 등..) 이를 side effect라 한다.  
모듈이 export하는 것을 참조하지 않고 있더라도 위와 같은 특이 동작들로 인해 tree-shaking이 불가해지는 경우가 있다.

## Babel (바벨)

`study.git/프론트/라이브러리/빌드도구_번들러_트랜스파일러/Babel/Babel_Plugin.md` 참고!

- babel-plugin-transform-imports
  lodash, react-bootstrap 등 기존코드를 트리쉐이킹 가능하도록 변환

## 배럴파일 트리쉐이킹 (Tree Shaking)

`study.git/프론트/JavaScript/JavaScript_배럴파일_index.md` 참고!

https://stackoverflow.com/questions/58527907/barrel-file-and-tree-shaking  
https://stackoverflow.com/questions/74442696/webpack-doesnt-split-a-huge-vendor-bundle-when-using-barrel-files

배럴파일 사용하지 말라는 권고 내용의 글  
https://tsh.io/blog/how-to-keep-your-lighthouse-score-high-in-next-js-applications-a-checklist/

해결책 내용의 글  
https://github.com/vercel/next.js/issues/12557#issuecomment-994278512

`sideEffects 설정을 false 로 변경`

```javascript
{
  webpack: (config, { dev }) => {
    config.module.rules = [
      ...config.module.rules,
      // ensure our libs barrel files don't constitute imports
      {
        test: /libs\/.*src\/index.ts/i,
        sideEffects: false,
      },
    ];
  };
}
```

트리쉐이킹을 좀 더 효율적으로 해주는 것 참고!

- https://github.com/vincentdchan/webpack-deep-scope-analysis-plugin
- https://webpack.js.org/guides/tree-shaking/#mark-the-file-as-side-effect-free
- https://webpack.js.org/configuration/optimization/#optimizationusedexports
- 'rollup' 도구로 전환!
