# NPM TypeScript 배포 (패키지 내부 타입스크립트 코드 타입정의)

https://junghyeonsu.com/posts/deploy-simple-util-npm-library/

타입스크립트를 지원하기 위해서는 라이브러리 package.json 에 types 필드에 d.ts 파일의 경로를 지정해 주면 된다.

## 타입스크립트 설치

@types/node는 node의 타입을 지원해 주는 패키지

```bash
$ yarn add typescript @types/node -D
```

## tsconfig.json

```json
{
  "compilerOptions": {
    "target": "es6" /* 최신 브라우저는 es6을 대부분 지원한다. */,
    "module": "ES6" /* 모듈 시스템을 지정한다. */,
    "lib": [
      "es5",
      "es6",
      "dom"
    ] /* 타입스크립트가 어떤 버전의 JS의 빌트인 API를 사용할 건지에 대한 것을 명시해 준다. */,
    "declaration": true /* 타입스크립트가 자동으로 타입정의 (d.ts) 파일을 생성해 준다. */,
    "outDir": "dist" /* 컴파일된 결과물을 어디에 저장할지에 대한 것을 명시해 준다. */,
    "strict": true /* 타입스크립트의 엄격한 모드를 활성화한다. */
  },
  "include": ["src/index.ts"] /* 컴파일할 대상을 명시해 준다. */
}
```

`중요한 것은 declaration 과 outDir 이다.`  
declaration 은 타입스크립트가 자동으로 타입정의 (d.ts) 파일을 생성해 준다는 것이고,  
outDir 은 컴파일된 결과물을 어디에 저장할지에 대한 것을 명시해 준다.

`타입스크립트는 해당 라이브러리가 타입스크립트를 지원해 주는지 하지 않는지를 타입정의(d.ts) 파일을 찾아서 결정하기 때문에 declaration 을 true 로 설정`해 준다.

## 트랜스파일링(컴파일)

```bash
$ yarn tsc
```

outDir 에 dist 폴더가 생성되고,  
dist 폴더 안에 index.js 와 index.d.ts 파일이 생성

## package.json - CommonJS, ESM, TypeScript 지원여부 설정 및 NPM publish 전 빌드실행

`study.git/인프라/서버/NodeJS_NPM/NPM_package.json.md` 참고!

```json
{
  "name": "test",
  "version": "0.0.1",
  "type": "module",
  "main": "dist/index.js",
  "scripts": {
    "prepack": "yarn build:tsc",
    "build:tsc": "yarn tsc"
  },
  // CommonJS, ESM, TypeScript 지원
  "exports": {
    ".": {
      // 라이브러리의 subpath
      "types": "./dist/index.d.ts", // typescript를 사용하는 경우 사용될 파일을 명시한 conditional 필드 (types 필드는 항상 맨 위에 위치해야 한다.)
      "import": "./dist/index.js", // esm 환경에서 사용될 파일을 명시한 conditional 필드
      "require": "./dist/index.cjs", // cjs 환경에서 사용될 파일을 명시한 conditional 필드
      "default": "./dist/index.js" // default 환경에서 사용될 파일을 명시한 conditional 필드
    }
  },
  "devDependencies": {
    "@types/node": "^18.15.0",
    "typescript": "^4.9.5"
  }
}
```

`exports 필드는 node v12.7.0 버전에 추가된 필드`  
`cjs 와 esm 을 동시에 지원할 수 있게 해 준다.`  
https://nodejs.org/api/packages.html#exports

`types 필드는 항상 맨 위에 위치해야 한다.`  
https://www.typescriptlang.org/docs/handbook/esm-node.html#packagejson-exports-imports-and-self-referencing

## typescript 지원이라는 새로운 기능을 추가했기 때문에 minor 버전을 올려주자.

```bash
$ yarn version --minor
```
