# MongoDB

`monorepo-nodejs20.git/apps/database` 참고!

- collection (RDB 데이터베이스)
- document (RDB 테이블)
- ObjectID (RDB 기본 키, 고유 id)

## MongoDB / Mongoose 차이

https://www.mongodb.com/developer/languages/javascript/getting-started-with-mongodb-and-mongoose/

https://mongoosejs.com/

- `Mongoose 는 MongoDB용 ODM(객체 데이터 모델링) 라이브러리`
- Mongoose 는 MongoDB 객체 모델링(스키마)
- MongoDB 를 사용하기 위해 ODM(객체 데이터 모델링) 또는 ORM(객체 관계형 매핑) 도구를 사용할 필요는 없지만 일부 개발자는 이를 선호

Java 기반의 Hibernate. iBatis 등의 ORM(Object Relational Mapping)과 유사한 개념

## 스키마

스키마는 컬렉션 문서의 구조를 정의합니다. Mongoose 스키마는 MongoDB 컬렉션에 직접 매핑됩니다.

```javascript
export const blog = new Schema({
  title: String,
  slug: String,
  published: Boolean,
  author: String,
  content: String,
  tags: [String],
  createdAt: Date,
  updatedAt: Date,
  comments: [
    {
      user: String,
      content: String,
      votes: Number,
    },
  ],
});
```

## 모델

모델은 스키마를 가져와 컬렉션의 각 문서에 적용합니다.

모델은 CRUD(만들기, 읽기, 업데이트, 삭제)와 같은 모든 문서 상호 작용을 담당합니다.

> 모델에 전달되는 첫 번째 인수는 컬렉션 이름의 단수형이어야 합니다. Mongoose 는 자동으로 이를 복수형으로 변경하고 소문자로 변환한 후 이를 데이터베이스 컬렉션 이름으로 사용합니다.

```javascript
// In this example, Blog translates to the blogs collection.
export const Blog = mongoose.model('Blog', blog);
```
