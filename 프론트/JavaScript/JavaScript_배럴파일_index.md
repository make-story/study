# What is a barrel file?

참고 자료  
https://vercel.com/blog/how-we-optimized-package-imports-in-next-js

JavaScript 의 배럴 파일은 단일 파일에서 여러 모듈을 그룹화하고 내보내는 방법  
그룹화된 모듈에 액세스할 수 있는 중앙 위치를 제공함으로써 그룹화된 모듈을 더 쉽게 가져올 수 있습니다.  
(즉, module1.js, module2.js, ... 모듈들을 index.js 한곳을 통해 접근가능하도록 해주는 것)

utils/index.js

```javascript
export { default as module1 } from './module1';
export { default as module2 } from './module2';
export { default as module3 } from './module3';
```

위와 같이 하면,
배럴 파일을 사용하여 모든 모듈을 집합적으로 가져올 수 있음

```javascript
import { module1, module2, module3 } from './utils';
```

# 배럴 파일의 문제점은 무엇입니까?

사용하지 않는 불필요한 모듈까지 가져오기를 해야하므로  
성능에 악영향

https://marvinh.dev/blog/speeding-up-javascript-ecosystem-part-7/

## 트리 쉐이킹 으로 해결 가능?

https://vercel.com/blog/how-we-optimized-package-imports-in-next-js#can%E2%80%99t-we-tree-shake-it

트리 쉐이킹이 작동할 수 있는 조건에서는 번들사이즈 최적화가 가능  
그러나 모든 모듈을 컴파일하고 전체 모듈 그래프를 분석한 후 제대로 트리 셰이크를 수행하려면 시간이 더 걸립니다.  
이로 인해 빌드가 상당히 느려집니다.

# Next.js에서 시도한 첫 번째 접근 방식은 modularizeImports

https://vercel.com/blog/how-we-optimized-package-imports-in-next-js#our-first-attempt-modularizeimports

이 옵션을 사용하면 내보낸 이름과 패키지의 배럴 파일 진입점 뒤에 있는 원래 모듈 경로의 매핑 관계를 구성할 수 있습니다.

my-lib/index.js

```javascript
export { default as module1 } from './module1';
export { default as module2 } from './module2';
export { default as module3 } from './module3';
```

사용하는 곳

```javascript
import { module2 } from 'my-lib';
```

Next.js 가  
import module2 from 'my-lib/module2'  
즉, 배럴 파일을 건너뛰고 대상에서 직접 가져올 수 있어 불필요한 모듈이 로드되는 것을 방지할 수 있습니다.

그러나 이 구성은 라이브러리의 내부 디렉터리 구조를 기반으로 하며 대부분 수동으로 구성됩니다.

# `새로운 솔루션:optimizePackageImports`

https://vercel.com/blog/how-we-optimized-package-imports-in-next-js#new-solution-optimizepackageimports

Next.js 13.5 에서 자동으로 수행하는 modularizeImports새로운 옵션을 도입

next.config.js

```javascript
module.exports = {
  experimental: {
    optimizePackageImports: ['my-lib'],
  },
};
```

이 옵션이 활성화되면 Next.js 는 항목 파일을 분석(my-lib)하고 그것이 배럴 파일인지 알아냅니다.

이 프로세스는 한 번에 항목 배럴 파일만 스캔하므로 트리 셰이킹보다 비용이 저렴합니다.

참고: 공통 라이브러리 설정은 기본적으로 되어 있음  
https://github.com/vercel/next.js/blob/12e888126ccf968193e7570a68db1bc35f90d52d/packages/next/src/server/config.ts#L710-L765

# ESLint 설정을 통해 배럴 파일 가져오기 방지

https://github.com/gajus/eslint-plugin-canonical#no-barrel-import

# 배럴파일 트리쉐이킹 (Tree Shaking)

`study.git/프론트/라이브러리/빌드도구_번들러_트랜스파일러/트리쉐이킹_TreeShaking.md` 참고!
