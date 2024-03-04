# 자바스크립트 용량 최소화 (Minify)

https://terser.org/
https://try.terser.org/

대부분의 프레임워크에서는 이미 Terser에 대한 세팅이 기본적으로 되어있으며,  
더욱이 Webpack의 경우 v4 이후 버전부터 별도의 설정 없이도 프로덕션 모드에서 자동으로 Terser 툴을 사용하도록 세팅

Terser 공식 웹사이트에서는 Terser라는 툴을 다음과 같이 소개하고 있습니다.  
`ES6+를 위한 자바스크립트 parser, mangler 그리고 compressor`

- 변수, 함수, 속성 등 이름을 줄임, 모든 공백 문자를 제거
- 자바스크립트 코드를 분석한 후, 더 짧은 코드를 통해 동일한 기능을 구현(코드 변환)
