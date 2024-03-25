# ModuleFederation 이슈경험

## Next.js

https://www.npmjs.com/package/@module-federation/nextjs-mf

package.json

```json
{
  "scripts": {
    "dev": "NEXT_PRIVATE_LOCAL_WEBPACK=true next dev",
    "build": "NEXT_PRIVATE_LOCAL_WEBPACK=true next build"
  }
}
```

24년 3월 기준,
@module-federation/nextjs-mf  
패키지에서 요구하는 NEXT_PRIVATE_LOCAL_WEBPACK=true 설정할 경우,

`Error: Cannot find module 'webpack/lib/javascript/BasicEvaluatedExpression'`

Next.js dev 또는 build 실행간 위와 같은 오류를 만날 수 있다.  
이 경우, NEXT_PRIVATE_LOCAL_WEBPACK 설정을 제거하고 사용해야 한다.
