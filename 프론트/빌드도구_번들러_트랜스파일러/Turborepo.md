# Turborepo

JavaScript 및 TypeScript 코드베이스를 위한 고성능 빌드 시스템 (모노레포 구조에서 도움되는 도구)

Turborepo의 주요 미션은 모노레포 환경에서 개발자가 조금 더 쉽고 빠르게 개발할 수 있도록 빌드 도구를 제공하는 것  

별도의 코드 작업 없이 JSON 설정으로 터보를 사용할 수 있습니다.

`여러 packages 병렬 빌드 실행 가능`  

https://engineering.linecorp.com/ko/blog/monorepo-with-turborepo

https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks

## 기존 모노레포에 적용  

https://turbo.build/repo/docs/getting-started/existing-monorepo  

### 설치  

```bash
yarn global add turbo
# 또는
yarn add turbo -DW # devDependency, install workspace root
```

### 모노레포의 루트에 turbo.json 파일 생성

```json
{
  "$schema": "https://turbo.build/schema.json"
}
```

### 파이프라인 구성  

파이프라인의 각 명령어들은 하나의 태스크 단위이며 이 단위가 '병렬 처리 및 의존성의 범위'가 됩니다.

```json
{
    "baseBranch": "origin/main",
    "pipeline": {
      "build": {
        // ^는 커맨드 실행 전 dependencies 혹은 devDependencies의 위상 의존성을 가질 때 명시해 줍니다(https://turborepo.org/docs/glossary#topological-order).
        // 의존성 빌드 명령이 실행된 후 build 커맨드가 실행됩니다.
        "dependsOn": [
          "^build"
        ],
        // 기본 캐시 폴더를 지정합니다.
        "outputs": [
          ".next/**",
          "lib/**",
          "storybook-static/**"
        ]
      },
      "cypress:ci": {
        "dependsOn": [
          // 특정 패키지를 지정하고 싶다면 '패키지명#스크립트'로 하면 됩니다.
          "@linecorp/uvp#build"
        ]
      },
      // 아무런 명시가 없다면 의존성이 없다는 것을 의미하며, 이는 언제든지 실행될 수 있다는 것을 의미합니다.
      // 작업이 가능할 때마다 실행합니다.
      "lint": {},
      "deploy": {
        // 의존성을 여러 개 지정할 경우 터보가 똑똑하게 순서를 맞춰서 진행해 줍니다. 위 'Profile in browser'의 이미지를 참고해 주세요.
        "dependsOn": [
          "build",
          "cypress:ci",
          "snapshots",
          "lint"
        ]
      },
      // 개발 환경과 같이 핫 로딩이 필요할 경우 캐시를 비활성화할 수 있습니다.
      "dev": {
        "cache": false
      }
   }
}
```

```json
{
  "baseBranch": "origin/main",
  "pipeline": {
    // 스크립트와 매핑되는 태스크 이름을 작성합니다.
    "build": {
      // 의존성 빌드 명령이 실행된 후 build 커맨드가 실행됩니다.
      "dependsOn": ["^build"],
      // 기본 캐시 폴더를 지정합니다.
      "outputs": [".next/**", "lib/**", "storybook-static/**"]
    },
    "snapshots": {
      "dependsOn": ["@linecorp/uvp#build"]
    },
    "lint": {},
    "deploy": {
      // 의존성을 여러 개 지정할 경우 터보가 똑똑하게 순서를 맞춰서 진행합니다.
      "dependsOn": ["build", "cypress:ci", "snapshots", "lint"]
    },
    "profile": {
      "dependsOn": ["deploy"]
    },
    "dev": {
      "dependsOn": ["@linecorp/uvp#build"],
      "cache": false
    },
    "clean": {
      "cache": false
    }
  }
}
```

참고: 최상위 package.json

```json
// package.json
"scripts": {
  "snapshot": "turbo run snapshots",
  "build": "turbo run build",
  // --scope는 build를 실행할 패키지 범위를 지정합니다. --no-deps와 --include-dependencies를 함께 사용하면 해당 스크립트에 필요한 의존성과 함께 실행합니다.
  "build-uvp": "turbo run build --scope='@linecorp/uvp' --no-deps --include-dependencies",
  // 이와 같이 run 다음에 태스크를 나열하면 각 작업의 우선순위에 따라 터보가 자동으로 정렬해 실행합니다.
  "test": "turbo run build lint cypress:ci snapshots",
  // --force 옵션을 넣으면 캐시된 작업을 다시 실행합니다. --profile, --graph 옵션은 아래에서 다시 다루겠습니다.
  "profile": "turbo run profile --profile --force && turbo run profile --graph",
  "clean": "turbo run clean && rm -rf node_modules"
}
```


### 파이프라인 실행

```bash
npx turbo run deploy
# 또는
turbo run build
```