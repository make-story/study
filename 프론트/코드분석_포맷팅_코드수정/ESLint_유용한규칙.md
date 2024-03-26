# eslint-plugin-import

## 계층 간 의존성 제어 (Dependency diagram)

https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-restricted-paths.md

```bash
$ npm install eslint-plugin-import --save-dev
```

pages -> components 또는 lib -> core  
`의존성은 모두 단방향으로만 흘러가고, 역으로 참조해서는 안 된다.`

core 내부의 코드는 외부(components 또는 lib 또는 pages 등) 코드의 의존성이 없어야 한다. (캡슐화)

이러한 관심사의 분리로 인해 각 모듈은 여러 책임에서 벗어나기 쉽고, 테스트하기도 더 쉬워지며, 유지 보수 비용도 줄어들 것이다.

`https://www.kimcoder.io/blog/clean-frontend-architecture`

타입스크립트를 사용하는 경우, settings 하위 import/resolver 추가 설정 필요  
https://github.com/import-js/eslint-plugin-import#typescript  
https://github.com/import-js/eslint-plugin-import/tree/main?tab=readme-ov-file#typescript

```json
{
  "rules": {
    // core 계층에 API 통신을 위한 구현체가 있으며 axios를 사용한다고 가정
    // https://eslint.org/docs/latest/rules/no-restricted-imports
    "no-restricted-imports": [
      "error",
      {
        "paths": [
          {
            "name": "axios",
            "message": "\naxios는 @core/utils/ApiUtil.ts에서만 참조가 가능합니다."
          }
        ]
      }
    ],
    // pages > component > core
    // 단반향으로 플러가고, 참조할 수 있도록 강제
    // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-restricted-paths.md
    "import/no-restricted-paths": [
      "error",
      {
        // "zones" 가 여러개 있을 경우, Lint 가 작동안함, 사용예: zones: [ ...규칙 여러개 작성 ]
        "zones": [
          {
            "target": "src/core",
            "from": "src/components",
            "except": ["**/common/**"],
            "message": "\n의존성 규칙에 어긋나는 참조입니다. (core 에서 components 를 참조할 수 없습니다. 단, common  제외)"
          },
          {
            "target": "src/core",
            "from": "src/lib"
          },
          {
            "target": "src/core",
            "from": "src/pages"
          },
          {
            "target": "src/lib",
            "from": "src/pages"
          },
          {
            "target": "src/components",
            "from": "src/pages"
          }
        ]
      }
    ]
  },
  // https://github.com/import-js/eslint-plugin-import#typescript
  "settings": {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"]
    },
    "import/resolver": {
      // tsconfig.json 에 paths 설정(예: "@/*": ["./src/*"])이 있을 경우, 아래 설정 필수
      "typescript": {
        "project": "**/tsconfig.json"
      },
      "node": {
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
      }
      //caseSensitive: false, // 주의! false 로 할 경우,잘못된 경로 무시한다는 것
    }
  }
}
```

## 확장자를 반드시 포함시키기

https://pozafly.github.io/environment/putting-rules-into-import-syntax-with-eslint/#%ED%99%95%EC%9E%A5%EC%9E%90%EB%A5%BC-%EB%B0%98%EB%93%9C%EC%8B%9C-%ED%8F%AC%ED%95%A8%EC%8B%9C%ED%82%A4%EA%B8%B0

TypeScript 5버전부터 확장자 명시를 권장하고 있다.  
https://pozafly.github.io/typescript/typescript-env/#allowImportingTsExtensions-TypeScript-version-5-%EB%B6%80%ED%84%B0

TypeScript 컴파일러인 tsc 는 Node.js 환경에서 동작하며, Node.js는 CommonJS 모듈을 사용한다.  
CommonJS는 모듈을 불러올 때 확장자를 생략해도 불러올 수 있다.

```javascript
const some = require('./some');
```

Node.js 창시자인 Ryan Dahl 도 require 을 사용해 모듈을 불러올 때 확장자를 생략해도 불러오는 것을 후회한다고 했다.  
https://www.youtube.com/watch?v=M3BM9TB-8yA&t=835s

`study.git/인프라/서버/NodeJS_NPM/NodeJS_모듈시스템.md` 참고!

점차 ESM이 활성화 되어감에 따라 TypeScript에서도 ts 확장자를 사용할 수 있게 만든 컴파일 옵션이 바로 allowImportingTsExtensions 였다.  
IDE 상의 프로젝트에서는 확장자를 사용하지 않아도 webpack으로 빌드도 되고 tsc로 타입 체킹도 된다.  
allowImportingTsExtensions 옵션은 확장자를 사용할 수 있게 만들어주는 TypeScript의 옵션이었기 때문이다. (강제하지 않는다)

따라서, TypeScript가 allowImportingTsExtensions 옵션을 추가해 준 것 같이 앞으로 ESM 방식으로 확장자를 붙일 것인데  
이를 eslint-plugin-import를 사용해 강제할 수 있다.

```json
{
  "rules": {
    "import/extensions": ["error", "ignorePackages"]
  }
}
```

- never : 확장자 사용을 금지한다. 확장자가 붙어 있다면 에러.
- always : 모든 구문에 확장자를 사용해야 한다. 확장자가 붙어있지 않다면 에러.
- ignorePackages : 라이브러리 패키지 구문을 제외하고 확장자를 사용해야 한다.

VSCode import 자동완성 설정 변경  
Import Module Specifier Ending 옵션에서 .js / .ts를 선택하면 자동완성으로 import 할 경우 자동으로 확장자를 붙여준다.

## import 순서 규칙

https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/order.md

https://pozafly.github.io/environment/putting-rules-into-import-syntax-with-eslint/#%EA%B7%B8%EB%A3%B9%EC%97%90-%EB%A7%9E%EA%B2%8C-%EC%88%9C%EC%84%9C-%EB%A7%9E%EC%B6%94%EA%B8%B0

https://eslint.org/blog/2022/02/paying-contributors-sponsoring-projects/#supporting-the-community

https://seohyun0120.tistory.com/entry/ESLint-importsexports-%EA%B5%AC%EB%AC%B8%EC%9D%98-%EC%88%9C%EC%84%9C-%EC%9E%90%EB%8F%99-%EC%A0%95%EB%A0%AC%ED%95%98%EA%B8%B0

```bash
$ npm install eslint-plugin-import --save-dev
```

https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/order.md

```json
{
  "rules": {
    "import/order": [
      "error",
      {
        "groups": [["builtin", "external"], "internal", ["parent", "sibling"], "index"],
        "newlines-between": "always"
      }
    ]
  }
}
```

`TypeScript`  
https://www.npmjs.com/package/eslint-plugin-import#typescript

`Unable to resolve path to module` 에러 대응  
https://min33sky.github.io/posts/paths-tsconfig-setting/  
https://stackoverflow.com/questions/66273491/why-i-got-error-unable-to-resolve-path-to-module-eslint-with-typescript
`https://github.com/import-js/eslint-plugin-import?tab=readme-ov-file#resolvers`

```bash
$ yarn add @typescript-eslint/parser eslint-import-resolver-typescript
```

```json
{
  "settings": {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"]
    },
    "import/resolver": {
      // tsconfig.json 에 paths 설정(예: "@/*": ["./src/*"])이 있을 경우, 아래 설정 필수
      "typescript": {
        "project": "**/tsconfig.json"
      },
      "node": {
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
      }
      //caseSensitive: false, // 주의! false 로 할 경우,잘못된 경로 무시한다는 것
    }
  }
}
```

또는 prettier-plugin-sort-imports 활용

## React가 17 버전으로 업데이트되면서, import React from 'react'; 구문을 사용하지 않아도 동작

https://pozafly.github.io/environment/putting-rules-into-import-syntax-with-eslint/#%EC%83%81%EB%8C%80-%EA%B2%BD%EB%A1%9C-%EB%8C%80%EC%8B%A0-%EC%A0%88%EB%8C%80-%EA%B2%BD%EB%A1%9C%EB%AA%A8%EB%93%88-%EB%B3%84%EC%B9%AD-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0

https://pozafly.github.io/react/declarative-meaning-of-react-rendering-process/#Rendering

```json
{
  "rules": {
    "no-restricted-imports": [
      "error",
      {
        "paths": [
          {
            "name": "react", // import React from 'react'; 방지 - React 17 이상에서는 기본적으로 JSX 에서 React 를 import하지 않아도 됩니다.
            "importNames": ["default"],
            "message": "import React from 'react' makes bundle size larger."
          }
        ]
      }
    ]
  }
}
```

## 상대 경로 대신 절대 경로(모듈 별칭) 사용하기

https://pozafly.github.io/environment/putting-rules-into-import-syntax-with-eslint/#%EC%83%81%EB%8C%80-%EA%B2%BD%EB%A1%9C-%EB%8C%80%EC%8B%A0-%EC%A0%88%EB%8C%80-%EA%B2%BD%EB%A1%9C%EB%AA%A8%EB%93%88-%EB%B3%84%EC%B9%AD-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0

```javascript
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

하지만, 이렇게 지정해 준다고 해도, 여전히 상대 경로를 사용할 수 있다. 이 부분도 모두 절대 경로가 아니면 ESLint 오류가 나도록 설정해 줄 수 있다.

ESLint 공식 rule 활용!  
https://eslint.org/docs/latest/rules/no-restricted-imports

```json
{
  "rules": {
    "no-restricted-imports": [
      "error",
      {
        "patterns": [".*"]
      }
    ]
  }
}
```

사실, no-restricted-imports 규칙은, 특정 경로를 막는 방법이다. 상대 경로와는 상관없는 규칙이다.

https://stackoverflow.com/questions/65670432/eslint-only-allow-absolute-import-paths-not-relative  
patterns에서 경로 전체를 막고 모듈 별칭을 사용하면 막히지 않도록 설정할 수 있다.

또는  
https://www.npmjs.com/package/eslint-plugin-absolute-imports  
사용해도 된다!

# eslint-plugin-node

Node.js 규칙

# eslint-plugin-unused-imports

사용하지 않는 import 구문 자동 제거
