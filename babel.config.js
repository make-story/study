/*
바벨 6까지는 .babelrc 파일로 설정값을 관리했지만, 
바벨 7부터는 babel.config.js 파일로 관리하는 것을 추천 ('실전 리액트 프로그래밍' 책 내용 중)

- 전체설정 파일
모든 자바스크립트 파일에 적용되는 전체(project-wide) 설정 파일 이다.  
바벨 버전 7에 추가된 babel.config.js 파일이 전체 설정 파일이다.  

- 지역설정 파일
자바스크립트 파일의 경로에 따라 결정되는 지역(file-relative) 설정 파일이다.  
.babelrc, .babelrc.js 파일과 바벨 설정이 있는 package.json 파일이 지역 설정 파일이다.  
  
1. package.json, .babelrc, .babelrc.js 파일을 만날 때까지 부모 폴더로 이동한다.  
2. 프로젝트 루트의 babel.config.js 파일이 전체 설정 파일이다.  
3. 전체 설정 파일과 지역 설정 파일을 병합한다.  

$ npm install -D @babel/core 
$ npm install -D babel-plugin-module-resolver babel-plugin-styled-components

Next.js
Babel 구성이 있는 경우 Next.js 는 JavaScript/Typescript 컴파일에 SWC 사용을 자동으로 선택 해제하고   
Next.js 11에서 사용된 것과 동일한 방식으로 Babel 을 사용
*/
module.exports = {
  presets: ['next/babel'],
  plugins: [],
};
