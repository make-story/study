# PostCSS

CSS 동작을 자동화하기 위해 자바스크립트 기반 플러그인을 사용하는 소프트웨어 개발 도구  
https://postcss.org/

---

# Autoprefixer

https://github.com/postcss/autoprefixer

## webpack 에서 사용할 경우(로더)

https://github.com/postcss/autoprefixer#webpack

webpack.config.js

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
};
```

postcss.config.js

```javascript
module.exports = {
  plugins: [
    require('autoprefixer')({
      browsers: ['> 1%', 'last 2 versions'],
    }),
  ],
};
```

위의 경우 점유율 1% 이상 혹은 모든 브라우저의 최근 2 버젼 이라고 설정한 상태

---

# Browserslist

https://github.com/browserslist/browserslist

쿼리 추가(정의)

- 방법1) .browserslistrc 파일안에 정의
- 방법2) package.json 파일에 browserslist 키를 사용해 정의

## .browserslistrc

```
 > 1%
last 2 versions
not ie <= 10
```

## package.json

```javascript
{
    // ...
    "browserslist": [
        "> 1%",
        "last 2 versions",
        "not ie <= 10"
    ],
    // ...
}
```

## 쿼리 디버깅

```
$ npx browserslist
```
