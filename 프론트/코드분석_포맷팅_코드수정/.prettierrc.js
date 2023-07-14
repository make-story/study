/*
-
Prettier 설치 
https://prettier.io/docs/en/integrating-with-linters.html
https://prettier.io/docs/en/configuration.html
https://prettier.io/docs/en/options.html
$ npm install -D prettier 

ESLint + Prettier 함께 사용 (typescript-eslint + prettier 함께 사용)
https://pravusid.kr/typescript/2020/07/19/typescript-eslint-prettier.html
$ npm install -D eslint-plugin-prettier eslint-config-prettier

> plugin이나 config 중 하나만을 사용할 수도 있다
	plugin만 사용: 포맷 관련 오류가 두 번 출력된다(eslint + prettier)
	config만 사용: eslint에서 포맷 관련 오류가 출력되지 않는다
plugin 사용만으로는 eslint formatting rules와 prettier rules가 충돌하므로, eslint-config-prettier를 함께 사용한다 
(공식문서에서도 둘을 함께 사용하기를 권장한다)
*/

/**
 * https://prettier.io/docs/en/configuration.html
 * https://prettier.io/docs/en/options.html
 */
module.exports = {
  arrowParens: 'avoid', // 화살표 함수 괄호
  bracketSpacing: true, // 대괄호 사이에 공백여부
  endOfLine: 'auto', // OS별 줄넘김 LF, CRLF
  printWidth: 120, // 최대 줄 길이 (권장가이드 80)
  semi: true, // 세미콜론 적용여부
  singleQuote: true, // 큰따옴표 대신 작은따옴표 사용여부
  jsxSingleQuote: true, // JSX에서 큰따옴표 대신 작은따옴표 사용여부
  tabWidth: 2, // 들여쓰기 공백수
  trailingComma: 'all', // 개체, 배열 등 항목끝 쉼표
  useTabs: false, // 공백 대신 탭으로 들여쓰기 여부
};
