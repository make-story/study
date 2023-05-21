# Apollo 도구

Apollo는 GraphQL을 편하게 사용할 수 있도록 도와주는 라이브러리  
Apollo는 client와 server 모두에서 사용이 가능

## `실전에서 바로 쓰는 Next.js` 책의 그래프QL 설명

### GraphQL API 사용하기

GraphQL 은 API 에서 사용할 수 있는 질의 언어로, REST 나 SOAP 같은 방식과는 다른 새로운 관점으로 API 데이터를 다룹니다.  
GraphQL 을 사용하면 꼭 필요한 데이터만 불러오도록 지정할 수 있으며 / 한 번의 요청으로 여러 곳의 데이터를 불러올 수 있습니다.

```
$ yarn add @apollo/client graphql isomorphic-unfetch
```

Apollo 는 널리 사용되는 GraphQL 클라이언트로, 리액트와 Next.js 를 기본으로 지원합니다.  
`ApolloClient 가 브라우저의 fetch API 를 사용해서 HTTP 요청을 처리`하므로
`서버에서도 같은 기능을 사용할 수 있는 폴리필인 isomorphic-unfetch 를 추가`합니다.

## Next.js + Apollo Client(GraphQL)

https://velog.io/@aeong98/Next.js-%EC%97%90%EC%84%9C-Apollo-ClientGraphQL-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0

https://velog.io/@2ast/Next-Next%EC%97%90%EC%84%9C-Apollo-Client-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0

https://www.apollographql.com/blog/apollo-client/next-js/building-a-next-js-app-with-slash-graphql/
