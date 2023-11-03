# 바벨 플러그인 (plugin)

https://babeljs.io/docs/plugins-list

## babel-plugin-import

antd, antd-mobile, lodash, material-ui 등 특정 라이브러리 import 최적화 (실제 필요한 부분만 번들에 포함)

## babel-plugin-lodash

https://github.com/lodash/babel-plugin-lodash

lodash 기존 코드를 고치지 않고, 트리쉐이킹이 가능하도록 수정

## babel-plugin-transform-imports

lodash, react-bootstrap 등 기존코드를 트리쉐이킹 가능하도록 변환

```json
{
  "plugins": [
    [
      "transform-imports",
      {
        "react-bootstrap": {
          "transform": "react-bootstrap/lib/${member}",
          "preventFullImport": true
        },
        "lodash": {
          "transform": "lodash/${member}",
          "preventFullImport": true
        }
      }
    ]
  ]
}
```
