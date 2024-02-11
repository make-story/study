# Next.js 환경구축

https://nextjs.org/docs  
https://leo-xee.github.io/Next/next-setup-allinone/

24년 01월, Next.js 14 기준 create-next-app 활용 설치시 패키지 정보

```
Installing dependencies:
- react
- react-dom
- next

Installing devDependencies:
- typescript
- @types/node
- @types/react
- @types/react-dom
- autoprefixer
- postcss
- tailwindcss
- eslint
- eslint-config-next
```

```json
{
  "name": "my-app",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "react": "^18",
    "react-dom": "^18",
    "next": "14.1.0"
  },
  "devDependencies": {
    "typescript": "^5",
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "autoprefixer": "^10.0.1",
    "postcss": "^8",
    "tailwindcss": "^3.3.0",
    "eslint": "^8",
    "eslint-config-next": "14.1.0"
  }
}
```

## 수동 설치시

```bash
$ yarn add next react react-dom
```

- pages : 파일기반 라우팅 시스템을 위한 디렉토리
- public : 이미지와 폰트와 같은 정적 리소스를 위한 디렉토리

## TypeScript

Next.js에 Typescript를 적용하기 위해서 다음 명령어로 tsconfig.json 파일을 생성하고 프로젝트를 실행시켜본다.  
참고로 설정 파일의 내용이 없으면 프로젝트 실행 시에 Next.js에서 설정 기본값을 자동으로 세팅해준다.

```bash
# 파일 생성
$ touch tsconfig.json

# 프로젝트 실행
$ yarn dev
```

```bash
$ yarn add -D typescript @types/react @types/react-dom @types/node
$ yarn dev
```

tsconfig.json

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "incremental": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "noImplicitAny": true,
    "strictNullChecks": true,
    "allowSyntheticDefaultImports": true,
    "noFallthroughCasesInSwitch": true,
    "sourceMap": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

src 디렉토리 내부의 index.jsx 의 파일명을 index.tsx 으로 변경해주면 Typescript 세팅이 완료

## ESLint

24년 01월 기준,

https://nextjs.org/docs/pages/building-your-application/configuring/eslint

- Strict (엄격) : { "extends": "next/core-web-vitals" }
- Base (기본) : { "extends": "next" }

두 가지 구성 옵션 중 하나를 선택하면  
Next.js 는 자동으로 eslint 및 eslint-config-next 애플리케이션에 종속 항목을 설치하고  
.eslintrc.json 선택한 구성을 포함하는 프로젝트 루트에 파일을 생성합니다.

```bash
$ yarn add eslint eslint-config-next eslint-plugin-next prettier eslint-config-prettier
```

.eslintrc.json

```json
{
  "extends": ["next", "prettier"]
}
```

### ESLint Config

`eslint-config-next`  
기본 구성( eslint-config-next)에는 Next.js 에서 최적의 즉시 사용 가능한 필요한 모든 것이 포함되어 있습니다.

```json
{
  "name": "eslint-config-next",
  "version": "14.0.3",
  "description": "ESLint configuration used by Next.js.",
  "main": "index.js",
  "license": "MIT",
  "repository": {
    "url": "vercel/next.js",
    "directory": "packages/eslint-config-next"
  },
  "homepage": "https://nextjs.org/docs/app/building-your-application/configuring/eslint#eslint-config",
  "dependencies": {
    "@next/eslint-plugin-next": "14.0.3",
    "@rushstack/eslint-patch": "^1.3.3",
    "@typescript-eslint/parser": "^5.4.2 || ^6.0.0",
    "eslint-import-resolver-node": "^0.3.6",
    "eslint-import-resolver-typescript": "^3.5.2",
    "eslint-plugin-import": "^2.28.1",
    "eslint-plugin-jsx-a11y": "^6.7.1",
    "eslint-plugin-react": "^7.33.2",
    "eslint-plugin-react-hooks": "^4.5.0 || 5.0.0-canary-7118f5dd7-20230705"
  },
  "peerDependencies": {
    "eslint": "^7.23.0 || ^8.0.0",
    "typescript": ">=3.3.1"
  },
  "peerDependenciesMeta": {
    "typescript": {
      "optional": true
    }
  }
}
```

### ESLint Plugin

`eslint-plugin-next`
Next.js는 ESLint 플러그인을 제공  
Next.js 애플리케이션에서 일반적인 문제를 포착할 수 있는 기본 구성 내에 이미 번들로 포함

https://nextjs.org/docs/app/building-your-application/configuring/eslint#eslint-plugin

## Prettier

ESLint 구성에서 ESLint와 Prettier가 함께 작동

```bash
$ yarn add --dev eslint-config-prettier
```

.prettierrc.json

```json
{
  "singleQuote": false,
  "arrowParens": "always",
  "semi": true,
  "useTabs": false,
  "tabWidth": 2,
  "printWidth": 80,
  "trailingComma": "all"
}
```

## 참고

```bash
# eslint와 prettier
$ yarn add -D eslint prettier

# eslint의 formatter을 off하고 prettier를 사용하기 위한 패키지들
$ yarn add -D eslint-config-prettier eslint-plugin-prettier

# typescript를 lint하기 위한 패키지들
$ yarn add -D @typescript-eslint/eslint-plugin @typescript-eslint/parser

# next 규칙 플러그인
# 기존 구성 마이그레이션 - https://nextjs.org/docs/pages/building-your-application/configuring/eslint#migrating-existing-config
$ yarn add -D @next/eslint-plugin-next

# airbnb 규칙
$ yarn add -D eslint-config-airbnb

# airbnb 규칙의 의존성 패키지들
$ yarn add -D eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-react-hooks

# airbnb 타입스크립트 규칙
$ yarn add -D eslint-config-airbnb-typescript

# jest를 규칙 플러그인
$ yarn add -D eslint-plugin-jest
```
