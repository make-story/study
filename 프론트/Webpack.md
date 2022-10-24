# webpack, 모듈 번들러

여러 종속관계에 있는 모듈들을 파악해 하나의 번들파일로 만들어주는 도구 (CommonJS / AMD / ES6 Module / dynamic import)  

코드 압축 도구(minifying)를 사용하더라도, 파일단위의 많은 모듈을 불러오게 되면, 네트워크 병목이 발생할 수 있음  
단순히 코드를 합쳐주는 도구(concatenating)를 사용할 경우, 합쳐진 파일의 용량이 너무 크면, 여전히 네트워크 지연이 발생할 수 있음  
웹팩은 모듈들을 단순히 합치는 것이 아닌, 모듈들의 종속관계를 파악해 사용되는 모듈들만 하나의 번들파일로 생성해 주는 것   
  
웹 페이지에서 초기 구동에 필요한 비동기 방식의 모듈(AMD)들이 많으면,  
네트워크 대기시간이 발생할 수 있으나, 번들링을 통해 이를 초소화(사전 미리로드 효과) 할 수 있음  

웹 페이지에 넣어 브라우저에서 바로 실행할 수 없는 코드(파일)들을 컴파일해 브라우저에서 실행가능한 형태로 만들수 있음 (Loader)  
각 모듈에서 공통으로 사용하는 모듈을 분리(Code Splitting, Dynamic Imports), 해시 등  
성능 개선과 최적화(optimization)와 함께, 여러 추가적인 기능(Plugin)들을 옵션형태로 비교적 쉽게 설정할 수 있음  

## entry
웹팩이 번들링을 시작하기 위해 필요한 최초 진입점 정의 (종속관계가시작되는 첫번째 파일지정)  

## output
웹팩이 번들링한 결과(파일)를 어떤 경로, 어떤 이름, 어떤 형태로 저장할지 정의  

## loader
웹팩이 번들링의 과정에서, 자바스크립트가 아닌  
Scss, Template, Typescript, React, Vue 등의 웹 자원을 실행가능한 형태로 변환해주는 속성  
(모듈단위로 파일을 해석하는 과정에서 관여)  

## plugin
웹팩으로 번들링한 파일에 추가적 기능들을 적용해주는 속성 (번들링 완료 후 마지막 output 과정에 관여)  

## 웹팩 4 부터 optimization 최적화 옵션 추가됨

-----

# 설치
1. webpack 설치  
https://webpack.kr/guides/installation/  
```
$ npm install --save-dev webpack 
$ npm install --save-dev webpack@<version>
```
> --save-dev (또는 -D, --save-prod 기본값)     
패키지(plugin)를 ./node_moduels 디렉터리에 설치하고 ./package.json 파일의 devDependencies 항목에 플러그인 정보가 저장   
--production 빌드시 해당 플러그인이 포함되지 않음  

2. 웹팹 v4 혹은 이후 버전을 사용한다면, CLI도 설치  
```
$ npm install --save-dev webpack-cli
```

> 대부분의 프로젝트는 로컬 설치할 것을 권장  
변경사항이 생겼을때 개별 업그레이드가 쉬워짐  
전역 설치는 특정 버전으로 고정되고, 다른 버전을 사용하는 프로젝트에서 정상 동작하지 않을 수 있음  

> 로컬에 설치된 웹팩을 실행하기 위해서 bin 버전에 접근할 수 있음  
node_modules/.bin/webpack  


# 웹팩 4, 5 버전 차이  
https://webpack.js.org/blog/2020-10-10-webpack-5-release/
https://webpack.kr/migrate/5/  

-----

# 바벨 사용 시 주의할 점  
`우리가 작성한 코드를 바벨로 컴파일한 이후에도 ESM 문법으로 남아 있어야 한다.`
만약 @babel/preset-env 플로그인을 사용한다면 babel.config.js 파일에서 다음과 같이 설정해야 한다.  
```javascript
// babel.config.js  
const presets = [
    [
        '@babel/preset-env',
        {
            // ...
            modules: false,
        },
    ],
    // ...
];
// ...
```

-----

# 코드 분할
애플리케이션의 전체 코드를 하나의 번들 파일로 만드는 것은 좋은 생각이 아닐 수 있다.  
불필요한 코드가 전송되어 사용자의 요청으로부터 페이지가 렌더링 되기까지 오랜 시간이 걸릴 수 있기 때문이다.  
(번들 파일을 하나만 만들면 관리 부담이 적어지므로 회사 내부 직원용 애플리케이션 만들 때는 좋은 선택이 될 수 있다.)  

코드를 분할하는 가장 직관적인 방법은 entry 설정값에 페이지별로 파일을 입력하는 것이다.  

웹팩에서는 코드 분할을 위해 기본적으로 SplitChunkPlugin을 내장하고 있다.  
별도의 패키지를 설치하지 않고 설정 파일을 조금 수정하는 것만으로 코드분할을 할 수 있다.  
```javascript
// ...
module.exports = {
    entry: {
        page1:  './src/index1.js',
    },
    // ...
    optimization: {
        splitChunks: {
            // chunks 속성의 기본값은 동적 임포트만 분할하는 async 다.
            // 우리는 동적 임포트가 아니더라도 코드가 분할되도록 all로 설정한다.  
            chunks: 'all',
            name: 'vender',
        },
    },
    // ...
};
```



