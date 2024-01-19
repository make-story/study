# import 순서 규칙

https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/order.md

```json
{
  "rules": {
    "import/order": [
      "error",
      {
        "groups": [["builtin", "external"], "internal", ["parent", "sibling"], "index"],
        "newlines-between": "always"
      }
    ]
  }
}
```

# 계층 간 의존성 제어

import/no-restricted-paths

https://www.kimcoder.io/blog/clean-frontend-architecture

타입스크립트를 사용하는 경우, import/resolver 추가 설정 필요  
https://github.com/import-js/eslint-plugin-import#typescript

```json
{
  "rules": {
    // core 계층에 API 통신을 위한 구현체가 있으며 axios를 사용한다고 가정
    "no-restricted-imports": [
      "error",
      {
        "paths": [
          {
            "name": "axios",
            "message": "\naxios는 @core/utils/ApiUtil.ts에서만 참조가 가능합니다."
          }
        ]
      }
    ],
    // pages > component > core
    // 단반향으로 플러가고, 참조할 수 있도록 강제
    "import/no-restricted-paths": [
      "error",
      {
        "zones": [
          {
            "target": "src/core",
            "from": "src/components",
            "message": "\n의존성 규칙에 어긋나는 참조입니다."
          },
          {
            "target": "src/core",
            "from": "src/lib"
          },
          {
            "target": "src/core",
            "from": "src/pages"
          },
          {
            "target": "src/lib",
            "from": "src/pages"
          },
          {
            "target": "src/components",
            "from": "src/pages"
          }
        ]
      }
    ]
  },
  "settings": {
    "import/resolver": {
      "typescript": {
        "project": "."
      }
    }
  }
}
```
