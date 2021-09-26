
# 6to5라는 이름으로 ES6를 ES5로 바꿔주는 도구로 시작  
ES7이나 다른 트랜스파일도 지원하는 포괄적인 도구가 되기 위해 Babel이라는 이름으로 변경  
바벨 과거(초창기) 버전에서 지원했던 바벨의 기능을 여러개로 쪼개서 별로의 플러그인으로 제공  
Babel 이 6.0이 되면서 각 기능이 모듈화되어 예전에는 Babel을 설치했을 때 많은 기능이 포함되어 있었지만, 이제는 각자 따로 설치해야 한다.   
  
매번 플러그인을 추가 설치/바벨설정은 귀찮은 일,   
프리셋(Presets)은 여러 플러그인이나 설정들을 미리 설정해 놓은 것    
(plugin의 집합, 프리셋을 설치할 경우 포함된 플러그인도 자동설치)  

## 바벨은 다음과 같이 다양한 방식으로 실행 
- @babel/cli 로 실행하기  
$ npx babel src/code.js --presets=@babel/preset-react --plugins=@babel/plugin-transform-template-literals,@babel/plugin-transform-arrow-functions  

- 웹팩에서 babel-loder 로 실행하기    
webpack 의 modules 설정에 babel-loader 추가  

- @babel/core 를 직접 실행하기  
```javascript
// runBabel.js
const babel = require('@babel/core');
const fs = require('fs');

const filename = './src/code.js';
const source = fs.readFileSync(filename, 'utf-8');
const presets = ['@babel/preset-react'];
const plugins = [
    '@babel/plugin-transform-template-literals',
    '@babel/plugin-transform-arrow-functions',
];
const { code } = babel.transformSync(source, {
    filename,
    presets,
    plugins,
    configFile: false,
});
console.log(code);
```
```
$ node runBabel.js
```

- @babel/register 로 실행하기  


-----


# babel
babel은 그 자체로는 아무것도 하지 않는다.   
만약 preset과 plugin을 추가하지 않는다면 babel은 아무것도 하지 않는다.  
```
$ npm install --save-dev @babel/core @babel/cli
```

## 바벨은 컴파일 시 다음 세 단계를 거친다.
- 파싱(parse) 단계  
입력된 코드로 부터 AST(abstract syntax tree)를 생성한다.   
- 변환(transform) 단계  
AST 를 원하는 형태로 변환한다.  
- 생성(generate) 단계  
AST 를 코드로 출력한다.  

## 바벨에서 현재 환경은 다음과 같이 결정된다.
process.env.BABEL_ENV || process.env.NODE_ENV || "development"  

## 전체 설정 파일과 지역 설정 파일
- 첫 번째  
모든 자바스크립트 파일에 적용되는 전체(project-wide) 설정 파일 이다.  
바벨 버전 7에 추가된 babel.config.js 파일이 전체 설정 파일이다.  
- 두 번째  
자바스크립트 파일의 경로에 따라 결정되는 지역(file-relative) 설정 파일이다.  
.babelrc, .babelrc.js 파일과 바벨 설정이 있는 package.json 파일이 지역 설정 파일이다.  
  
1. package.json, .babelrc, .babelrc.js 파일을 만날 때까지 부모 폴더로 이동한다.  
2. 프로젝트 루트의 babel.config.js 파일이 전체 설정 파일이다.  
3. 전체 설정 파일과 지역 설정 파일을 병합한다.  

## 바벨 6까지는 .babelrc 파일로 설정값을 관리했지만, 바벨 7부터는 babel.config.js 파일로 관리하는 것을 추천 (실전 리액트 프로그래밍 책 내용 중)


-----


## plugin
babel이 무엇을 하게 하려면 plugin을 설치  
es6의 arrow function을 컴파일 할 babel plugin을 설치
```
$ npm install --save-dev @babel/plugin-transform-arrow-functions
```

babel한테 dependency를 쓴다고 말해야 한다. ".babelrc 파일"을 프로젝트 root에 추가하자.   
이것은 babel 설정파일이며, es6에서 es5로 컴파일 할 때 .babelrc이 babel에게 @babel/plugin-transform-arrow-functions를 사용하여 es6에서 es5로 컴파일하라고 명령한다.   
@babel/plugin-transform-arrow-functions는 오직 arrow function을 컴파일할 때만 쓰인다.  

`.babelrc`  
```
{
  plugins: ['@babel/plugin-transform-arrow-functions']
}
```

## preset
만약 es6의 기능을 더 쓰고싶다면 매번 npm 패키지를 설치하고 .  
babelrc에 플러그인을 매번 더해야 할 것이다. 이것은 매우 귀찮은 일이다.   
그래서 나온 솔루션이 바로 preset이다.  

babel foundation에서는 plugin들을 포함한 번들(plugin들을 모아놓은 파일이라고 생각하면 된다)파일을 포함 preset을 만들었다. 즉, npm 설치와 babel 설정을 한번만 하면 plugin들이   
자동적으로 설치된다는 뜻이다.  
```
$ npm install --save-dev @babel/preset-env
```
`.babelrc`
```
{
  presets: ['@babel/preset-env']
}
```

기본적으로 babel-preset-env는 단순히 모든 es6 plugin을 설치한다. 하지만 이것은 컴파일된 자바스크립트의 양이 많아져 번들의 코드를 길어지게 만든다.  
그래서 babel-preset-env에게 원하는 브라우저만 지원가능하도록 plugin을 선택할 수 있다.  


-----


# 웹팩(webpack)과 함께 사용할 때
`.babelrc` 있다면 해당 파일을 먼저 참조 하며,  
없을 경우 webpack options에 부여한 presets plugins 을 참조한다.  
(즉, 웹팩에 babel-loader를 활성화하고 옵션을 비워 둘 경우, ".babelrc" 을 웹팩이 읽어 사용)  

# ESM(ECMAScript Modules) 문법  
ESM은 자바스크립트 표준 모듈 시스템이다.  
ESM에서는 import, export 등의 키워드를 사용한다.  


-----


# babel이 7로 업데이트 되면서 scoped package로 전환
`babel-cli -> @babel/cli`  
(기존의 비공식적인 package들과 네이밍 컨벤션에 문제)  
바벨에서 기본적으로 제공하는 프리셋과 비공식 프리셋 또는 직접만든 프리셋 구분  

공식 프리셋  
@babel/preset-env  
@babel/preset-flow  
@babel/preset-react  
@babel/preset-typescript  

`babel@7.4.0 이전에는 @babel/polyfill을 많이 사용했지만, 이제는 @babel/preset-env로 통합하여 사용`    
(@babel/polyfill은 babel@7.4.0에서 deprecated 되었다.)  


-----


# 별칭 경로 설정
```
$ npm install --save-dev babel-plugin-module-resolver
```
`.babelrc`
```
{
    "plugins": [
        [
            "module-resolver", {
                "root": ["./"],
                "alias": {
                    "@src": "./src"
                }
            }
        ]
    ]
}
```


-----




