# 스칼라 타입 (scalar type)

스칼라 타입은 GraphQL에 내장되어 있는 타입

https://graphql-kr.github.io/learn/schema/

https://www.apollographql.com/docs/apollo-server/schema/custom-scalars/

## 사용자 정의 스칼라 Custom Scalar

GraphQL 구현에는 커스텀 스칼라 타입을 지정하는 방법이 있습니다.  
예를 들면, Date 타입을 정의할 수 있습니다.

```graphql
scalar Date
```

# 열거형 타입 (Enum)

Enums 라고도 하는 열거형 타입은 특정 값들로 제한되는 특별한 종류의 스칼라입니다.

이를 통해 다음과 같은 작업을 할 수 있습니다.

- 타입의 인자가 허용된 값 중 하나임을 검증합니다.
- 필드가 항상 값의 열거형 집합 중 하나가 될 것임을 타입 시스템을 통해 의사소통합니다.

```
enum Episode {
  NEWHOPE
  EMPIRE
  JEDI
}
```

```
type Character {
  name: String!
  appearsIn: [Episode]!
}
```
