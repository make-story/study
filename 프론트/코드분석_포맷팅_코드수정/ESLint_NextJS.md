# ESLint Next.js

`모던 리액트 Deep Dive` 책 내용 중 - p540

eslint 와 eslint-config-next 를 설치했지만 이것만으로 부족하다.

eslint-config-next 는 단순히 코드에 있을 잠재적인 문제를 확인할 뿐,  
띄어쓰기나 줄바꿈과 같이 코드의 스타일링을 정의해 주지 않는다.

코드 스타일링 등 eslint-config-next 가 해주지 않는 일반적인 ESLint 작업을 수행하기 위해
가장 설치 및 수정이 쉬운 @titicaca/eslint-config-triple

```bash
$ npm i @titicaca/eslint-config-triple
```

eslint-config-next 와 eslint-config-triple 이 함께 작동하게 하려면 다음과 같은 별도의 설정이 필요하다는 것

```javascript
const path = require("path");

const createConfig = require("@titicaca/eslint-config-triple/create-config");

const { extends: extendConfigs overrides } = createConfig({
    type: 'frontend',
    project: path.resolve(__dirname, './tsconfig.json'),
});

module.export = {
    extends: [...extendConfigs, 'next/core-web-vitals'],
    overrides,
}
```
