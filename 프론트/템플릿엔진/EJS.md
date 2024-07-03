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

## Node.js

https://www.geeksforgeeks.org/use-ejs-as-template-engine-in-node-js/

```javascript
// Set express as Node.js web application
// server framework.
// To install express before using it as
// an application server by using
// "npm install express" command.
const express = require('express');
const app = express();

// Set EJS as templating engine
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  // The render method takes the name of the HTML
  // page to be rendered as input.
  // This page should be in views folder in
  // the root directory.
  // We can pass multiple properties and values
  // as an object, here we are passing the only name
  res.render('home', { name: 'Akashdeep' });
});

const server = app.listen(4000, function () {
  console.log('listening to port 4000');
});
```

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Home Page</title>
    <style type="text/css" media="screen">
      body {
        background-color: skyblue;
        text-decoration-color: white;
        font-size: 7em;
      }
    </style>
  </head>

  <body>
    <center>
      This is our home page.<br />
      Welcome <%=name%>, to our home page.
    </center>
  </body>
</html>
```

## 일부 문법(include) 버전에 따라 다르게 사용

https://www.npmjs.com/package/ejs#includes

<%- include ./test.ejs -%>

Include preprocessor directives (<% include user/show %>) are not supported in v3.0+.
<%- include('./test.ejs') -%>

만약 문법에 오류가 있을 경우, 호출하는 EJS 파일 렌더가 안되고, app.use 또는 app.get 에 걸리지 않는다. (즉, 없는 페이지로 인식)
