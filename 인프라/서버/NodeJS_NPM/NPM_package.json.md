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

## peerDependencies

## bundleDependencies

## optionalDependencies

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
