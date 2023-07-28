# Next.js 환경구축

https://nextjs.org/docs  
https://leo-xee.github.io/Next/next-setup-allinone/

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
$ yarn add -D typescript @types/react @types/node
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

## ESLint(Airbnb), Prettier

```bash
# eslint와 prettier
$ yarn add -D eslint prettier

# eslint의 formatter을 off하고 prettier를 사용하기 위한 패키지들
$ yarn add -D eslint-config-prettier eslint-plugin-prettier

# typescript를 lint하기 위한 패키지들
$ yarn add -D @typescript-eslint/eslint-plugin @typescript-eslint/parser

# next 규칙 플러그인
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

.eslinitrc.json

```json
{
  "root": true,
  "env": {
    "browser": true,
    "es6": true,
    "node": true,
    "jest": true
  },
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": "latest",
    "sourceType": "module",
    "project": "./tsconfig.json"
  },
  "ignorePatterns": ["jest.*.js"],
  "extends": [
    "airbnb",
    "airbnb-typescript",
    "airbnb/hooks",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:@next/next/recommended",
    "plugin:prettier/recommended",
    "plugin:jest/recommended"
  ],
  "plugins": ["prettier", "@typescript-eslint", "jest", "import"],
  "rules": {
    "prettier/prettier": ["error", { "endOfLine": "auto" }],
    "import/extensions": [
      "error",
      {
        "tsx": "never",
        "ts": "never",
        "js": "never",
        "jsx": "never"
      }
    ],
    "react/react-in-jsx-scope": 0,
    "react/jsx-props-no-spreading": 0
  }
}
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
