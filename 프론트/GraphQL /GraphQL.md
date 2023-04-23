# GraphQL

https://graphql.org/code/#javascript

Node.js 환경에서 GraphQL을 실행하도록 설계된 GraphQL  
graphql은 Facebook에서 제공하는 패키지

https://zinirun.github.io/2020/10/27/graphql-crud-sample/
https://morioh.com/p/689c60cf95c8

---

## Next.js + GqaphQL

https://www.apollographql.com/blog/apollo-client/next-js/building-a-next-js-app-with-slash-graphql/

---

https://medium.com/@rlatla626/graphql-express-%EC%82%AC%EC%9A%A9%EB%B2%95-1-8a28df28596a

```
$ npm install graphql
$ npm install express-graphql
```

```javascript
const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

const root = { hello: () => 'Hello world!' };

const app = express();
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  }),
);
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));
```

## Apollo-GraphQL 서버

모든 Node.js HTTP 프레임워크와 작동하는 Apollo의 GraphQL 서버

apollo-server는 Apollo에서 제공하는 패키지

```
$ npm install @apollo/server graphql
```

---

# Apollo

Apollo는 GraphQL을 편하게 사용할 수 있도록 도와주는 라이브러리  
Apollo는 client와 server 모두에서 사용이 가능

---

## '실전에서 바로 쓰는 Next.js' 책의 그래프QL 설명

### GraphQL API 사용하기

GraphQL 은 API 에서 사용할 수 있는 질의 언어로, REST 나 SOAP 같은 방식과는 다른 새로운 관점으로 API 데이터를 다룹니다.  
GraphQL 을 사용하면 꼭 필요한 데이터만 불러오도록 지정할 수 있으며 / 한 번의 요청으로 여러 곳의 데이터를 불러올 수 있습니다.

```
$ yarn add @apollo/client graphql isomorphic-unfetch
```

Apollo 는 널리 사용되는 GraphQL 클라이언트로, 리액트와 Next.js 를 기본으로 지원합니다.  
`ApolloClient 가 브라우저의 fetch API 를 사용해서 HTTP 요청을 처리`하므로
`서버에서도 같은 기능을 사용할 수 있는 폴리필인 isomorphic-unfetch 를 추가`합니다.

---

# 테스트 환경 구축

https://hwasurr.io/api/graphql-example/
