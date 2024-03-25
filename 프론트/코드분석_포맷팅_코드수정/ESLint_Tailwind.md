# ESLint Tailwind

```bash
$ yarn add eslint-plugin-tailwind eslint-plugin-tailwindcss
```

## Error: Failed to load plugin 'tailwindcss' declared in '.eslintrc.js': Cannot find module 'tailwindcss/resolveConfig'

'eslint-plugin-tailwindcss' 타입스크립트 지원 버전으로 설치해야 함!
https://www.npmjs.com/package/eslint-plugin-tailwindcss

24년 3월 기준, Latest changelog 참고!

```
feat: support tailwind config in typescript (by quesabe 🙏) You may have to upgrade your Tailwind CSS version to 3.3.2
```
