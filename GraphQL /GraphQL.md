# GraphQL

https://graphql.org/code/#javascript

Node.js 환경에서 GraphQL을 실행하도록 설계된 GraphQL  
graphql은 Facebook에서 제공하는 패키지

https://zinirun.github.io/2020/10/27/graphql-crud-sample/
https://morioh.com/p/689c60cf95c8

## GraphQL 스키마 시각화

https://studio.apollographql.com/sandbox/explorer

## 흐름

### 서버

1. 스키마(schema) 정의
   GraphQL 의 타입 및 데이터에 대한 표현 정보를 담고 있는 schema
2. 리졸버(resolve) 함수 정의
   GraphQL 쿼리 요청이 들어온 경우 실행 될 resolve 함수
3. 서버 실행
   Node.js + Express ('express-graphql' NPM 모듈 등) 실행

### 클라이언트

- 'fetch', 'axios' 등 Data Fetching 도구를 활용, GraphQL 쿼리로 데이터 호출

```javascript
// 쿼리
const apiUri = 'http://localhost:3000/graphql';
function getProduct() {
  axios
    .get(apiUri, {
      params: {
        query: `{getProduct(id : ${pid.value}) {id price name description}}`,
      },
    })
    .then(result => {
      console.log(result);
    })
    .catch(err => {
      console.log(err);
    });
}
```

```javascript
// 뮤테이션 (추가, 수정, 삭제 등)
function postProduct(e) {
  axios
    .post(apiUri, {
      query: 'mutation addProduct($input: ProductInput) { addProduct(input: $input)}',
      variables: {
        input: {
          price: parseInt(this.price.value),
          name: String(this.name.value),
          description: String(this.description.value),
        },
      },
      operationName: null,
    })
    .then(result => {
      console.log(result);
    })
    .catch(err => {
      console.log(err);
    });
}
```

### Apollo 도구

Apollo는 GraphQL을 편하게 사용할 수 있도록 도와주는 라이브러리  
Apollo는 client와 server 모두에서 사용이 가능

---

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

---

## express

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

---

# express + grahpql + react + react-apollo

https://hwasurr.io/api/graphql-example/

```
$ yarn add graphql express express-graphql json-server axios
$ yarn add nodemon --dev
```

'json-server' 활용
json-server 는 기본적으로 3000 port 사용

## express + graphql 서버

```javascript
const express = require('express');
const cors = require('cors');
const expressGraphQL = require('express-graphql');
const schema = require('./schema.js');

const app = express();
const port = 4000;

// For Cross origin resource sharing
app.use(cors());

app.use('/graphql', expressGraphQL({
	schema: schema,
	graphiql: true
})

app.listen(port, () => {
	console.log(`listening on ${port}`);
})
```
