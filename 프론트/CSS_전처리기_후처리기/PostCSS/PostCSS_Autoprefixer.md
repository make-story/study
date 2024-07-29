# PostCSS

CSS 동작을 자동화하기 위해 자바스크립트 기반 플러그인을 사용하는 소프트웨어 개발 도구  
https://postcss.org/

## PostCSS 플러그인

- stylelint  
  CSS 문법 검사

- postcss-import  
  @import 문법 사용 가능

- postcss-for
  for 문법 사용 가능

- postcss-preset-env
  CSS 내부 변수 및 중첩 css 사용 가능

- cssnano
  CSS 파일 최적화 (공백 제거, 성능 향상)

- autoprefixer
  -webkit- 등의 prefix 없이 스타일 지정이 가능  
  browserslist 와 밀접한 관계  
  `study.git/프론트/라이브러리/Browserslist.md`

- CSS Next
  CSS Next는 미래의 CSS문법을 사용할 수 있게 해주는 PostCSS 플러그인

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
