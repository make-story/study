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
