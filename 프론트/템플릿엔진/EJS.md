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

버전에 따라 다르게 사용

<%- include ./test.ejs -%>
<%- include('./test.ejs') -%>

https://www.npmjs.com/package/ejs#includes

Include preprocessor directives (<% include user/show %>) are not supported in v3.0+.
