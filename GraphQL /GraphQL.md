# GraphQL

https://graphql.org/code/#javascript

https://yozm.wishket.com/magazine/detail/2113/

Node.js 환경에서 GraphQL을 실행하도록 설계된 GraphQL  
graphql은 Facebook에서 제공하는 패키지

https://zinirun.github.io/2020/10/27/graphql-crud-sample/
https://morioh.com/p/689c60cf95c8

## REST API가 가진 단점 및 한계

- 오버페칭(over fetching)
  필요하지 않는 데이터를 받아오는 경우가 있다. 이럴 경우 네트워크 리소스가 낭비가 되고 데이터를 주는 서버 리소스도 낭비가 될거다.
  -> 내가 필요한 데이터만 받을수 없을까? REST API 에서는 이럴 경우 새로운 엔드포인트를 만들어야 한다.

- 언더페칭(under fetching)
  REST API 를 사용하다보면, 여러번의 데이터 호출이 필요할 때가 있다. 이럴 경우 역시나 네트워크 리소스가 낭비가 되고 데이터를 주느 서버 리소스도 낭비가 될거다.
  예로 hr 팀에 속한 직원들을 불어오고 싶다. 그러면 팀에 대한 API 요청 이후에, 팀 정보를 받고 나서 이후에 팀에 대한 id 값으로 속한 직원들에 정보를 요청해서 받아와야 할거다. 이런 경우를 언더페칭이라고 한다.
  (즉 요청을 2번 이상 또는 3번 이상씩 보내야 내가 원하는 정보를 얻을수 있는거다)

- 엔드포인트 관리
  REST(Representational State Transfer: 표현상태전이) API 는 URI 를 통해 자원을 명시하고 이를 통해 상태를 주고 받습니다.  
  그래서 변경사항이 생기면 새로운 엔드포인트를 만들어야 하는데, 이게 이름 짓기도 어렵고 나중에는 많아져서 관리하기가 어렵습니다.  
  GraphQL 을 사용하게 되면 하나의 엔드포인트로 query 및 mutaion 을 통해서 소통을 하기때문에 엄청 단순해집니다.

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
const apiUri = "http://localhost:3000/graphql";
function getProduct() {
  axios
    .get(apiUri, {
      params: {
        query: `{getProduct(id : ${pid.value}) {id price name description}}`,
      },
    })
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
}
```

```javascript
// 뮤테이션 (추가, 수정, 삭제 등)
function postProduct(e) {
  axios
    .post(apiUri, {
      query:
        "mutation addProduct($input: ProductInput) { addProduct(input: $input)}",
      variables: {
        input: {
          price: parseInt(this.price.value),
          name: String(this.name.value),
          description: String(this.description.value),
        },
      },
      operationName: null,
    })
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
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
const express = require("express");
const graphqlHTTP = require("express-graphql");
const { buildSchema } = require("graphql");

const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

const root = { hello: () => "Hello world!" };

const app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);
app.listen(4000, () => console.log("Now browse to localhost:4000/graphql"));
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
