# VSCode

VSCode 설정을 하고, fix (자동수정)이 되지 않을 경우,  
ESLint 설정(.eslintrc.js)에 문제가 있을 경우가 있음

```bash
$ yarn run eslint ./src
```

실행 후 CLI 에 설정 이슈가 나오는지 확인

## VSCode `Prettier 설정 파일이 있을 때에만 적용하기`

`주의!`
'Editor: Default Formatter' 를 'Prettier - Code Formatter' 설정할 경우,
Prettier 설정파일이 없는 프로젝트에서도 코드포맷팅이 자동 설정됨!

`특정 프로젝트만 Prettier 적용하기!`  
https://tesseractjh.tistory.com/220
https://velog.io/@chee9835/vscode-%EC%97%90%EC%84%9C-prettier-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0

1. settings.json
   루트 디렉토리에 .vscode 폴더를 만들고 그 안에 settings.json을 만들어서 Format On Save 설정을 활성화할 수 있다.  
   VSCode 기본 설정에 있는 Format On Save를 해제하고, Prettier 적용을 원하는 프로젝트에서 settings.json으로 개별적으로 설정해주면 된다.

2. Require Config
   설정 > "Require Config" 설정을 하면 루트 디렉토리에 .prettierrc, .prettierrc.json, .prettierrc.js 등의 파일이 있거나, package.json에 prettier 키가 존재하는 등의 경우에만 Prettier가 적용된다.

`주의!`  
VSCode 하단바 "Prettier" 이 비활성화 되어 있거나,  
체크 아이콘이 두개 겹쳐서 노출되는 경우,  
포맷팅 도구 중복되는 것이 있다는 의미 (예를 들어, JSON 형식은 어떠한 포맷팅 도구 설정기반인지 지정필요)  
바로 옆 종모양 알림을 클릭하여, 지정해야함!

`특정 파일에만 적용`

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  // 적용하려는 형식마다 개별적으로 설정
  "[javascript]": {
    "editor.formatOnSave": true
  },
  "[typescript]": {
    "editor.formatOnSave": true
  },
  "[typescriptreact]": {
    "editor.formatOnSave": true
  },
  "[javascriptreact]": {
    "editor.formatOnSave": true
  },
  "[svelte]": {
    "editor.formatOnSave": true
  },
  "[css]": {
    "editor.formatOnSave": true
  },
  "[scss]": {
    "editor.formatOnSave": true
  },
  "[html]": {
    "editor.formatOnSave": true
  }
}
```

## VSCode 설정

1. VSCode Extenstion 설치

- Prettier 설치
- 설정 (File > Preferences > Settings 또는 command + ,)에 들어가서 'editor format on save'를 검색, 체크박스에 체크
- Edit in setting.json 파일에서 editor.formatOnSave 를 true 로 설정

2. 기본 포맷터 설정

- VSCode > Preference (cmd+,) 들어가서 'Default Formatter'를 검색
- Default Formatter 를 Prettier 로 설정!

- 설정에 들어가서 'prettier' 검색하면, prettier 관련 설정들을 볼 수 있음

3. Prettier의 설정은 아래의 순서로 적용

settings.json < .editorconfig < .prettierrc

## setting.json

```json
{
  // 파일을 저장할 때마다 `eslint` 규칙에 따라 자동으로 코드를 수정
  "editor.codeActionsOnSave": { "source.fixAll.eslint": true },
  // `prettier`를 기본 포맷터로 지정
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  // 파일을 저장할 때마다 포매팅 실행
  "editor.formatOnSave": true
}
```
