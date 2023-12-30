# 동일한 객체를 다룰 때 이미 존재하는 인스턴스를 재사용한다

https://patterns-dev-kr.github.io/design-patterns/flyweight-pattern/  
https://www.patterns.dev/posts/flyweight-pattern/

`플라이웨잇 패턴은 비슷한 객체를 대량으로 만들어야 할 때 메모리를 절약할 수 있게 해 주는 유용한 패턴`이다.

책을 추가할 수 있는 앱이 있다고 가정해 보자.  
모든 책은 title, author, isbn속성을 가지고 있다.  
그런데 도서관에는 보통 책을 한 권만 가지고 있지 않고 같은 책을 여러권 가지고 있다.

동일한 책에 대해 새로운 클래스를 매번 생성하는것은 그다지 도움이 되지 않는다.  
그 대신 하나의 책을 의미하는 Book 클래스의 인스턴스를 여러 개 만들려고 한다.

```javascript
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}
```

아래 예제에서는 리스트에 새로운 책을 추가하는 기능을 구현하고 있다.  
기 등록된 ISBN 이라면 새로운 Book 인스턴스를 만들 필요가 없다.  
그렇게 하는 대신 해당 책이 이미 존재하는지를 먼저 검사한다.

만약 등록되지 않은 ISBN이라면 새로운 책 인스턴스를 만들고 이를 리스트에 등록해 둔다.

```javascript
const books = new Map();

const createBook = (title, author, isbn) => {
  const existingBook = books.has(isbn);

  if (existingBook) {
    return books.get(isbn);
  }

  const book = new Book(title, author, isbn);
  books.set(isbn, book);

  return book;
};
```

createBook 함수는 새로운 책을 만들 때 사용할 수 있다.  
하지만 앞서 언급한 대로 도서관은 동일한 책을 여러 권 보유할 수 있다.  
이를 위해 같은 책을 여러 권 추가할 수 있는 addBook 함수를 만들어 보자.  
해당 함수에서는 책 인스턴스를 새로 만들거나 이미 존재하는 경우를 고려하여 이전에 구현한 createBook 함수를 호출해야 한다.

```javascript
const bookList = [];

const addBook = (title, author, isbn, availability, sales) => {
  const book = {
    ...createBook(title, author, isbn),
    sales,
    availability,
    isbn,
  };

  bookList.push(book);
  return book;
};
```

이제 사본을 추가할 때 마다 Book 인스턴스를 새로 만드는 대신 이미 존재하는 책일 경우 해당 인스턴스를 재사용하도록 구현하였다.  
아래는 이 함수를 이용하여 3종류의 책 5권을 추가하는 예제이다.

```javascript
addBook('Harry Potter', 'JK Rowling', 'AB123', false, 100);
addBook('Harry Potter', 'JK Rowling', 'AB123', true, 50);
addBook('To Kill a Mockingbird', 'Harper Lee', 'CD345', true, 10);
addBook('To Kill a Mockingbird', 'Harper Lee', 'CD345', false, 20);
addBook('The Great Gatsby', 'F. Scott Fitzgerald', 'EF567', false, 20);
```

플라이웨잇 패턴을 사용하면 대량의 객체를 만들어 낼 때 메모리를 많이 사용하는 문제를 해결할 수 있다.  
메모리 사용량을 최소화할 수도 있는 것이다.

`자바스크립트에서 프로토타입 상속을 통해서도 비슷한 효과를 낼 수 있다` 보니 이 패턴은 그리 크게 중요하지 않게 되었다.
