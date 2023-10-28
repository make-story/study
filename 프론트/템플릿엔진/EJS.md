# EJS

webpack

```javascript
{
    test: /\.ejs$/,
    exclude: /node_modules/, // 제외
    use: {
        loader: "ejs-compiled-loader", // ejs-loader 은 <%-include ... %> 작동안함, ejs-compiled-loader 사용
        options: {},
    }
}
```

## 일부 문법(include) 버전에 따라 다르게 사용

https://www.npmjs.com/package/ejs#includes

<%- include ./test.ejs -%>

Include preprocessor directives (<% include user/show %>) are not supported in v3.0+.
<%- include('./test.ejs') -%>

만약 문법에 오류가 있을 경우, 호출하는 EJS 파일 렌더가 안되고, app.use 또는 app.get 에 걸리지 않는다. (즉, 없는 페이지로 인식)
