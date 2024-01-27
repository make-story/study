# import 순서 규칙

https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/order.md

```bash
$ npm install eslint-plugin-import --save-dev
```

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

# 계층 간 의존성 제어 (Dependency diagram)

https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-restricted-paths.md

```bash
$ npm install eslint-plugin-import --save-dev
```

pages -> components 또는 lib -> core  
`의존성은 모두 단방향으로만 흘러가고, 역으로 참조해서는 안 된다.`

core 내부의 코드는 외부(components 또는 lib 또는 pages 등) 코드의 의존성이 없어야 한다. (캡슐화)

이러한 관심사의 분리로 인해 각 모듈은 여러 책임에서 벗어나기 쉽고, 테스트하기도 더 쉬워지며, 유지 보수 비용도 줄어들 것이다.

https://www.kimcoder.io/blog/clean-frontend-architecture

타입스크립트를 사용하는 경우, import/resolver 추가 설정 필요  
https://github.com/import-js/eslint-plugin-import#typescript  
https://github.com/import-js/eslint-plugin-import/tree/main?tab=readme-ov-file#typescript

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

# Node.js 규칙

eslint-plugin-node
