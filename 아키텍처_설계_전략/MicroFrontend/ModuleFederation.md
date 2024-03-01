# Module Federation (모듈 페더레이션) - @module-federation

Webpack ModuleFederationPlugin

https://www.npmjs.com/search?q=%40module-federation

## 용어 (모듈 페더레이션의 주요 개념)

- 로컬 모듈
  단일 Webpack 빌드에 포함되는 모듈이다.
  서로 다른 Webpack 빌드의 결과물은 서로 다른 로컬 모듈이다.
  로컬 모듈은 단일 빌드 안에서만 로딩할 수 있다.

- 원격 모듈
  다른 Webpack 빌드에서 만든 모듈을 대상으로 런타임에 로딩할 수 있는 모듈을 말한다.
  즉 A 빌드와 B 빌드의 결과물은 서로 원격 모듈이 될 수 있다.
  각 빌드는 개별 서버에 배포될 수 있으며 런타임에 Dynamic Imports하듯이 원격 모듈을 로딩할 수 있다.

- 컨테이너(Container)
  각각의 빌드를 말하며 하나의 빌드가 하나의 웹 애플리케이션을 나타낸다.
  A 컨테이너는 B 컨테이너의 원격 모듈을 로딩할 수 있으며 B에서 A 방향으로도 로딩할 수 있다.

- Expose
  컨테이너가 외부에 노출한 원격 모듈의 목록을 나타내는 설정이다.
  간단하게는 { "내보낼 모듈이름": "로컬 모듈 경로" } 로 표현할 수 있으며 Webpack 설정의 일부를 보면 이해가 빠를 것이다.

- 공유 모듈
  여러 컨테이너에서 같이 사용하는 모듈을 말하며 런타임에 한 번만 로딩된다.
  예를 들어 여러 컨테이너에서 react를 사용한다면, react 모듈을 여러 번 로딩할 필요는 없다.

- 리모트 앱
  모듈을 Expose 하는 컨테이너

- 호스트 앱
  원격 모듈을 사용하는 컨테이너

`Host 프로젝트는 Remote 프로젝트의 컴포넌트를 불러와서 화면에 보여줍니다.`

```javascript
// 리모트
new ModuleFederationPlugin({
  name: 'app2',
  filename: 'static/chunks/remoteEntry.js',
  // 내보낼 모듈
  exposes: {
    './Button': './src/Button',
  },
  // shared 를 설정하면, 호스트나 여러 원격 모듈에서 사용되는 공통된 패키지를 중복으로 불러오는 걸 방지
  shared: {},
  // 옵션
  extraOptions: {},
});
```

app2 라는 컨테이너는  
로컬 모듈 "./src/Button" 을 "./Button" 이라는 이름의  
원격 모듈로 Expose(노출)한다는 의미다.

원격 모듈을 사용하는 컨테이너(app1)에서는 다음과 같이 설정한다.

```javascript
const remotes = isServer => {
  const location = isServer ? 'ssr' : 'chunks';
  return {
    remote: `remote@http://localhost:8080/_next/static/${location}/remoteEntry.js`, // React.lazy(() => import("remote/<내보내기 exposes 모듈명>"));
  };
};

// 호스트
new ModuleFederationPlugin({
  name: 'app1',
  filename: 'static/chunks/remoteEntry.js',
  // 원격 모듈 가져오기
  //remotes: remotes(isServer),
  remotes: {
    app2: `app2@http://localhost:3002/remoteEntry.js`,
  },
  // shared 를 설정하면, 호스트나 여러 원격 모듈에서 사용되는 공통된 패키지를 중복으로 불러오는 걸 방지
  shared: {},
  // 옵션
  extraOptions: {},
});

// import하여 Button 컴포넌트를 사용할 수 있다.
const RemoteButton = React.lazy(() => import('app2/Button'));
```

## 동작원리

리모트 앱을 빌드하면 remoteEntry.js라는 파일이 생성되며 Expose한 원격 모듈을 호스트 앱에서 로딩할 수 있도록 인터페이스를 정의한다.

호스트 앱은 리모트 앱의 remoteEntry.js 파일을 로딩한다.

리모트 앱의 remoteEntry.js 파일은 호스트 앱에 로딩되면서 컨테이너명(예: app2)으로된 전역 변수를 설정한다.

`정리하면 호스트 앱이 리모트 앱의 remoteEntry.js를 로딩하고 예를 들어 'app2'와 같이 리모트 앱의 컨테이너 이름을 파악한다. 그러면 비동기 로컬 모듈처럼 원격 모듈을 로딩할 수 있다.`

`컨테이너 이름을 만들 때 주의할 것이 있다. Module Federation은 컨테이너의 이름을 나타낼 때 예를 들어 'app2'라는 전역 변수를 사용하기 때문에 컨테이너의 이름은 전역에서 유니크하도록 작명해야 한다!`

## 배포 시 remoteEntry.js 경로 처리

빌드 및 배포할 때 리모트 앱의 remoteEntry.js 파일 경로를 목적별 서버(예> local, dev, alpha, stage, real 등)에 맞게 작성해야 한다.

불편한 점은 목적별 서버가 다르기 때문에 remoteEntry.js 파일의 URL이 달라진다는 점이다.  
그래서 webpack 설정 파일을 따로 두거나 환경 변수로 받아서 환경별로 빌드해야 한다.

https://module-federation.myshopify.com/products/practical-module-federation

목적별 서버 지정

```javascript
// webpack.config.js
new ModuleFederationPlugin({
  remotes: {
    app2: `app2@${getRemoteEntryUrl(3002)}`,
  },
}),
...

function getRemoteEntryUrl(port) {
  const { isLocal, hostName } = process.env;

  if (!isLocal) {
    return `http://localhost:${port}/remoteEntry.js`;
  }

  return `https://${hostName}/remoteEntry.js`;
};
```

# Module Federation 제공되는 코드에 타입스크립트 지원

배달의 민족 마이크로프론트엔드 동영상 참고  
https://www.youtube.com/watch?v=-jYSGaPAEHE&list=PLgXGHBqgT2TundZ81MAVHPzeYOTeII69j&index=19

1. 라이브러리 활용
   https://www.npmjs.com/package/@module-federation/typescript/v/3.0.1

2. @types/\* 내부 타입정의 NPM 제공

양방향 (호스트 - 모듈) 타입스크립트 제공 라이브러리  
https://github.com/module-federation/universe/tree/main/packages/native-federation-typescript

## Next.js

`@module-federation/nextjs-mf` NPM  
https://www.npmjs.com/package/@module-federation/nextjs-mf

`nextjs-ssr`
https://github.com/module-federation/nextjs-ssr

https://velog.io/@lucas/%EB%A7%88%EC%9D%B4%ED%81%AC%EB%A1%9C-%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C-%EC%A0%95%EB%B3%B5%EA%B8%B0

https://www.privjs.com/packages/@module-federation/nextjs-ssr

https://github.com/module-federation/module-federation-examples/tree/master/nextjs-react

### Next.js 13 이상 지원 어려움 - 공식댓글 (23년 8월 기준)

https://github.com/module-federation/universe/issues/1183
https://github.com/module-federation/universe/pull/2002
