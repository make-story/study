# GraphQL

https://graphql.org/code/#javascript

Node.js 환경에서 GraphQL을 실행하도록 설계된 GraphQL

graphql은 Facebook에서 제공하는 패키지

https://zinirun.github.io/2020/10/27/graphql-crud-sample/
https://medium.com/@rlatla626/graphql-express-%EC%82%AC%EC%9A%A9%EB%B2%95-1-8a28df28596a
https://morioh.com/p/689c60cf95c8

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

## graphql-yoga
