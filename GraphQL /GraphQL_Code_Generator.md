# 'GraphQL 과 타입스크립트로 개발하는 웹 서비스' 책 내용중 - p55

GraphQL Code Gennerator 는
`GraphQL 스키마를 통해 타입스크립트 코드를 생성해주는 CLI 툴`입니다. (스키마 -> 타입스크립트 코드)

`스키마에 기반하여 Java, C#, 타입스크립트, 자바스크립트 등 여러 언어 기반 코드를 생성`해 줍니다.  
특히, 플로그인 추가를 통해 Apllo 클라이언트 또는 Urql 등의 기술을 활용한 GraphQL 요청 React hooks 를 자동적으로 생성할 수 있습니다.

# 'GraphQL 과 타입스크립트로 개발하는 웹 서비스' 책 내용중 - p105

## GraphQL Code Generator

```
$ yarn add --dev @graphql-codegen/cli @graphql-codegen/typescript @graphql-codegen/typescript-operations @graphql-codegen/typescript-react-apollo @graphql-codegen/add
```

codegen.yml

```yml
# codegen.yml
overwrite: true
schema: 'httpp://localhost:4000/graphql'
documents: 'src/**/*.graphql'
generates:
  src/generated/graphql.tsx:
    plugins:
      - add:
        content: '/* exlent-disable */'
      - 'typescript'
      - 'typescript-operations'
      - 'typescript-react-apollo'
```

schema 필드에는 GraphQL Codegen 이 참조할 GraphQL API 서버  
documents 필드에는 자동 생성을 위한 GraphQL 쿼리 및 뮤테이션 .graphql 파일의 경로  
generates 필드에는 어떤 파일을 생성할지 그리고 해당 파일에 작성될 자동 생성 코드는 어떤 플러그인을 통해 어떻게 생성할지에 대한 설정  
'- add' 플로그인으로 생성된 파일에 대해서 ESLint 를 적용하지 않도록 하는 주석도 추가

https://www.graphql-code-generator.com

package.json

```json
{
  "scripts": {
    "codegen": "graphql-codegen --config codegen.yml"
  }
}
```
