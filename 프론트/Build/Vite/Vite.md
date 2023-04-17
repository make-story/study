# Vite

https://yozm.wishket.com/magazine/detail/1620/

## esbuild

무려 100배나 esbuild가 더 빠른데 왜 다들 Webpack를 쓰고 있는 걸까요?  
esbuild 가 나올 당시 웹팩(Webpack)은 단순한 빌드 도구가 아니었습니다.  
DevServer, 각종 Loader를 통한 트랜스 파일, 코드 스프리팅, 트리셰이킹, HMR, CSS, HTML, asset 지원 등 빌드 도구를 넘어서서  
개발을 할 수 있게 해주는 통합 툴이었습니다.  
그에 반해 esbuild는 그저 빌드 도구일 뿐입니다.

## esbuild + Snowpack

Snowpack은 esbuild를 통해서 개발 모드를 지원하고,  
실제 번들은 Webpack을 통해 제공하는 방식으로 편리함과 속도라는 두 마리 토끼를 잡을 수 있게 되었습니다.

## Vite

에반 유는 Snowpack 단점을 놓치지 않았고, 이를 개선해서 Vite를 만들었습니다.  
뷰(Vue.js)를 개발한 에반 유의 특기는 기존 쓰던 제품을 더 간결하고 사용하기 편하게 만드는 것이었습니다.  
angaulrjs의 단점을 개선해 더 간결하고 쓰기 쉬운 Vue.js를 만들었고, Redux를 보고 Vuex를 만들었으며, Next를 통해 Nuxt를 만들었습니다.  
그리고, Snowpack을 통해 Vite를 세상에 선보였습니다.

`Vite는 esbuild와 브라우저 모듈을 이용한 개발모드, 개발 서버, 프록시 서버, 번들툴, 코드 스프리팅, HMR 등` 지금까지 나왔던 Snowpack의 컨셉과  
`다른 번들 도구에서 제공하는 기능을 하나로 모은 프론트엔드 번들 도구`였습니다.
