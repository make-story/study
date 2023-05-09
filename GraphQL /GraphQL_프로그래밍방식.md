`GraphQL과 타입스크립트로 개발하는 웹 서비스` 책 내용 중
GraphQL 은 특정 데이터 소스에 종속되거나  
특정 프로그래밍 언어에 국환되는 기술이 아닙니다.  
GraphQL 은 다양한 언어로 만들어진 구현체를 어럿 가지고 있습니다.

사용하는 언어에 상관없이, GraphQL API 서비스를 구성할 때 취하는 접근방식은 크게 두 가지로 나뉩니다.

# 스키마 주도 방식

스키마 주도 접근법 SDL(Schema Definition Language) 로 스키마(타입 정의)를 먼저 구성한 뒤,  
그에 해당하는 리졸버를 개발하는 순서로 나아갑니다.

```typescript
const typedefs = `
type Film {
    id: Int!
    title: String!
    director: Director!
}

type Director {
    id: Int!
    name: String!
}

type Query {
    flim(filmId: Int!): Film
    films(): [Film]
}

input FilmInput {
    title: String!
    director: Director!
}

type Mutation {
    createFilm(filmDTO: FilmInput): Film
}
`;

export default typedefs;
```

스키마를 구성했다면, Query 에 명시된 film, films 와 Mutation 에 명시한 createFilm 에 대한 리졸버를 따로 구성하는 차례로 나아갑니다.

```typescript
const resolvers = {
  Query: {
    film: (parent, args, context, info) => {
      return Films.findOne(args.filmId);
    },
    films: (parent, args, context, info) => {
      return Films.findAll();
    },
  },
  Mutation: {
    createFilm: async (parent, args, context, info) => {
      const newFilm = await Films.create({
        title,
        director,
      });
      await Films.save(newFilm);
      return newFilm;
    },
  },
};

export default resolvers;
```

```typescript
// project/server/src/index.ts
import 'reflect-metadata';
import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import http from 'http';

import typedefs from './typedefs.ts';
import resolvers from './resolvers.ts';

async function main() {
  const app = express();

  const apolloServer = new ApolloServer({
    typeDefs: typedefs,
    resolvers,
    plugins: [ApolloServerPluginLandingPageLocalDefault],
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  const httpServer = http.createServer(app);
  httpServer.listen(4000);
}

main().catch(error => console.error(error));
```

## 장점

- 스키마 주도 개발 접근 방식은 GraphQL 개발 방식의 기본으로 간주됩니다.
- 기본적인 GraphQL 문법을 그대로 활용할 수 있어 편리합니다.
- SDL 은 그 자체로 의미를 가지므로, 숙련되지 않은 개발자 혹은 비개발자가 확인하여도 대부분 알아볼 수 있습니다.
- 스키마 정의는 데이터 모델로서 프론트와 백엔드 아우르는 모든 팀 구성원의 의사소통 도구로 사용될 수 있습니다.
- 스키마 정의는 API 문서의 역할을 할 수 있습니다.

## 단점

- 스키마 정의에는 리졸버가 포함되지 않습니다. 따라서 GraphQL 서비스는 스키마 정의만으로는 구현할 수 없습니다. 스키마 정의한 타입, 쿼리, 뮤테이션 등에 대한 리졸버 함수를 "따로" 구성해야 합니다.
- 리졸버와 스키마 간에 함수가 따로 구성되므로 이 둘이 명확하게 일치한다는 보장이 없습니다. 언제나 스키마와 리졸버 간 동기화에 대해 고민해야 합니다.
- 많은 기능을 가지는 서버의 경우 스키마가 하나의 방대한 덩어리가 됩니다. 이를 해결하기 위한 기술을 따로 구성하여야 합니다.
- 스키마를 여러 파일에 나누어 모듈화하는 작업이 코드 주도 접근법에 비해 상대적으로 더 어렵습니다.  
  (graphql-import, graphql-modules 와 같은 외부 라이브러리를 통하거나 Apllo Ferderation 과 같은 시스템을 구성해 구현 가능합니다.)

# 코드 주도 방식

코드 주도 개발 접근법에서는 SDL 로 스키마를 정의하지 않고  
프로그래밍 언어로 스크마를 구성합니다. 물론 리졸버를 구현하는 것 또한 동시에 작업합니다.  
코드 주도 개발을 지원하는 많은 라이브러리에서는 코드로 구현된 스키마를 토대로 SDL 스키마 정의를 자동으로 생성합니다.

코드 주도 접근법에서는 GraphQL 서비스를 구현하는 프로그래밍 언어와 SDL 간의 일치성에 더 초점을 맞춥니다.  
스키마와 리졸버가 별다른 노력 없이도 동기화되도록 구성되어 있습니다. 타입스크립트 환경에서는 Nestjs, TypeGraphQL, GraphQL Nexus 등의 라이브러리/프레임워크가 많이 사용되고 있습니다.

```typescript
import { ObjectType, Feild, Int } from 'type-graphql';

@ObjectType()
class Recipe {
  @Field(type => Int)
  id: number;

  @Filed()
  title: string;

  @Filed({ nullable: true })
  description?: string;
}
```

## 장점

- 코드 자동완성, 타입 체크 등과 같은 IDE 기능과 데코레이터, 반복문 등 프로그래밍 언어의 기능을 사용하므로 개발하기 편합니다.
- 스키마 변경은 리졸버 변경과 동일하게 따라가므로, 스키마와 리졸버를 동기화해줘야 하는 번거로움이 없어, 실수를 줄여줍니다.

## 단점

- 이 접근방식은 프레임워크 또는 라이브러리 등의 도움 없이 구현하기에는 시간과 노력이 많이 듭니다.
- JSON 과 비슷한 GraphQL SDL 문법과는 동떨어진 형태로 작업을 진행하게 됩니다.

# 스키마 주도 방식 vs 코드 주도 방식

스키마 주도 접근 방식은 코드 주도 접근법에 비해 더 배우기 쉽습니다.  
구성 문법을 따로 학습하지 않아도, 기본적인 언어의 기능만으로 구현할 수 있기 때문입니다. `다루는 데이터의 양이 많아지는 경우 그 관리에 소요되는 비용이 만만치 않습니다.` 따라서,프로토타이밍에 유용하게 사용될 수 있으며, 개인 프로젝트나 빠르고 가볍게 서비스를 구축할 필요가 있는 경우에 적합할 것으로 생각됩니다.

코드 주도 접근 방식은 비교적 데이터 모델의 양이 많거나, 확장 가능성이 높은 비즈니스의 경우에 조금 더 알맞습니다.  
상속과 같은 프로그래밍 언어가 지원하는 기능을 활용하여 모델을 정의할 수 있다는 장점도 있습니다.  
하지만 가벼운 서비스에서 이와 같은 방식으로 접근하는 것은 비효율적일 수 있습니다.  
추가로, 코드 주도 접근 방식은 GraphQL 관련 데이터베이스 생태계의 특정 기술(TypeORM, Prisma 등)과 통합성이 높아 특정 상황에서 호환성이 좋아집니다.
