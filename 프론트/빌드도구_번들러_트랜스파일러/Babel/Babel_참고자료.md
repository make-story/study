# `웹팩(webpack)과 함께 사용할 때`

`.babelrc` 있다면 해당 파일을 먼저 참조 하며,  
없을 경우 webpack options에 부여한 presets plugins 을 참조한다.  
(즉, 웹팩에 babel-loader를 활성화하고 옵션을 비워 둘 경우, ".babelrc" 을 웹팩이 읽어 사용)

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
