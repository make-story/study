# package.json 항목 설명

https://docs.npmjs.com/cli/v10/configuring-npm/package-json

Next.js package.json 참고  
https://github.com/vercel/next.js/blob/canary/package.json

## exports

https://gusrb3164.github.io/web/2022/10/24/package-exports/

exports 옵션을 활용하면 sub path 로 라이브러리를 참조하기 쉽게 만들어주고,
module 옵션처럼 sub module의 esm 파일까지 추가로 지원할 수 있습니다.

`webpack 4 에서는 exports 옵션을 아직 지원하지 않아서 번들링 될 때 라이브러리들의 exports를 참조하지 못하는 이슈가 있습니다.`

package.json

```json
{
  "exports": {
    "./plugin": {
      "types": "./dist/types/plugin/index.d.ts",
      "module": "./dist/plugin/esm/index.js",
      "default": "./dist/plugin/index.js"
    }
  }
}
```

```jsx
import plugin from 'my-library/plugin';
```

---

## name

패키지를 게시(publish)하려는 경우 package.json에서 가장 중요한 사항은 필수인 이름 및 버전 필드입니다.

- 패키지 이름에는 대문자가 포함되어서는 안 됩니다.
- 핵심 Node 모듈과 동일한 이름을 사용하지 마십시오.
- 이름에 "js" 또는 "node"를 넣지 마세요. package.json 파일을 작성하고 있으므로 "engines" 필드를 사용하여 엔진을 지정할 수 있으므로 js라고 가정합니다.
- 해당 이름의 항목이 이미 있는지 확인하기 위해 npm 레지스트리를 확인하는 것이 좋습니다.

선택적으로 이름 앞에 범위를 붙일 수 있습니다 (예: @myorg/mypackage)
https://docs.npmjs.com/cli/v10/using-npm/scope

## version

https://github.com/npm/node-semver

https://docs.npmjs.com/cli/v10/commands/npm-version

## files

필드를 생략하면 기본값이 "["*"]"로 설정됩니다
즉, 모든 파일이 포함됩니다.

설정에 관계없이 특정 파일은 항상 포함됩니다.

- package.json
- README
- LICENSE
- "main" 필드에 있는 파일
- "bin" 필드의 파일

## main

설정되지 않은 경우 main기본값은 index.js패키지의 루트 폴더

## browser

모듈을 클라이언트 측에서 사용하려는 경우

## bin

실행 파일

## repository

코드가 있는 장소를 지정

```json
{
  "repository": {
    "type": "git",
    "url": "https://github.com/npm/cli.git"
  }
}
```

## config

```json
{
  "name": "foo",
  "config": {
    "port": "8080"
  }
}
```

## dependencies

프로젝트에서 실제로 의존하고 호출하는 의존성 모듈 (필히 설치되어야 하는 모듈)

```bash
$ npm install
```

## devDependencies

devDependencies 에 명시된 의존성 모듈은  
운영환경에서는 "--production" 플래그를 사용하여 설치되지 않도록 할 수 있음  
("--production" 플래그를 붙이면 devDependencies 를 제외한 의존성 파일만을 내려받게 됩니다.)

```bash
$ npm install --production
```

## peerDependencies

https://velog.io/@johnyworld/Peer-Dependencies-%EC%97%90-%EB%8C%80%ED%95%98%EC%97%AC

https://medium.com/angular-in-depth/npm-peer-dependencies-f843f3ac4e7f

이 라이브러리를 사용하게 될 프로젝트에게,  
예를 들어 react ^17.0.0 버전을 사용해주세요! 라고 알려주는 것과 비슷하다.
(즉, 현 패키지가 다른 패키지의 `특정 버전과 호환`된다는 것을 뜻한다)

```json
{
  "peerDependencies": {
    "react": "^17.0.0"
  }
}
```

위와 같이 명시할 경우,  
라이브러리(NPM 패키지)를 사용하는 곳에서의 react 버전이 다르면,  
아래와 같이 설치됨

```
node_modules
ㄴreact ^16.0.0 (dependancy)
ㄴmy-ui-library ^0.0.1 (dependancy)
  ㄴnode_modules
    ㄴreact ^17.0.0 (peer dependancy)
```

> `실제로 패키지에서 직접 require(import) 하지는 않더라도 호환성이 필요한 경우 명시한다.`

`npm 3 버전부터 npm 6 버전까지는 npm install 과정에서 peerDependencies를 무시`하고 버전이 일치하지 않으면 경고 메시지만 보여줬지만,  
`npm 7 버전부터는 실제로 peerDependencies를 설치`한다. 그리고 버전이 일치하지 않으면 에러를 낸다.

## bundleDependencies

내 패키지와 함께 제공되는 일련의 패키지들. 타사 라이브러리가 NPM에 없거나 일부 프로젝트를 모듈에 포함하려는 경우 사용할 수 있다.

## optionalDependencies

선택적인 의존성으로 없거나 설치에 실패해도 npm 패키지 설치 과정이 중단되지 않아 다른 라이브러리 설치에 영향을 주지 않는 의존성들

## overrides

## engines

작업이 작동하는 노드 버전을 지정

## os

모듈이 실행될 운영 체제를 지정

```json
{
  "os": ["!win32"]
}
```

## private

게시(publish)를 거부

## publishConfig

## resolutions

## packageManager
