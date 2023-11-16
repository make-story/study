# jsconfig

https://code.visualstudio.com/docs/languages/jsconfig

https://www.typescriptlang.org/ko/docs/handbook/tsconfig-json.html

jsconfig.json 디렉토리에 파일이 있다는 것은 해당 디렉토리가 JavaScript 프로젝트의 루트임을 나타냅니다.

```javascript
{
    noLib: "기본 라이브러리 파일(lib.d.ts)를 포함하지 않습니다. ",
    target: `
        사용할 기본 라이브러리(lib.d.ts)를 지정합니다.
        값으로는 "es3", "es5", "es6", "es2015", "es2017", "es2018", "es2019", "es2020", "esnext" 가 있습니다.
    `,
    module: `
        모듈 코드를 생성할 때 사용할 모듈 시스템을 지정합니다.
        "amd", "commonJS", "es2015", "es6", "esnext", "none", "system", "umd" 등을 값으로 가집니다.
    `,
    moduleResolution: `
        import문에서 모듈을 어떻게 해석할 지 지정합니다. "node"와 "classic"을 값으로 가집니다.
        "node" - Node.js에서 모듈 해석하는 방법 사용
        "classic" - 상대 경로 및 baseUrl 옵션 기반으로 모듈 해석
    `,
    checkJs: `
        타입 체크 활성화 옵션입니다.
        옵션 설정 시 javascript 파일에서 타입 오류를 검출할 수 있습니다.
    `,
    experimentalDecorators: `
        ES 데코레이터에 대한 실험적 지원을 활성화합니다.
    `,
    allowSyntheticDefaultImports: `
        default export를 갖지 않는 모듈에서도 default import를 허용할지 여부를 결정합니다.
        옵션이 true일 경우 default export가 없더라도 default import를 사용할 수 있습니다.
    `,
    baseUrl: `
        사용할 기본 디렉토리를 설정합니다.
        baseUrl을 설정하면 모듈을 불러올 때 baseUrl에서부터 시작하는 절대 경로를 사용할 수 있습니다.
    `,
    paths: `
        baseUrl 옵션을 기준으로 경로 매핑을 지정합니다.
    `,
}
```
