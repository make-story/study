# Airbnb React/JSX Style Guide

https://github.com/apple77y/javascript/tree/master/react

# 함수 컴포넌트

https://ko.reactjs.org/docs/components-and-props.html

# 명명규칙

- 확장자 : .tsx
- 파일이름 : 컴포넌트는 대문자로 시작(PascalCase를 사용)합니다. (예: ReservationCard.tsx)

```react
// bad
import reservationCard from './ReservationCard';

// good
import ReservationCard from './ReservationCard';

// bad
const ReservationItem = <ReservationCard />;

// good
const reservationItem = <ReservationCard />;
```

- Props: DOM(HTML), React 예약어를 사용하지 않습니다.

```react
// bad
<MyComponent style="fancy" />

// bad
<MyComponent className="fancy" />

// good
<MyComponent variant="fancy" />
```

# 구문

```react
// bad
<Foo superLongParam="bar"
     anotherSuperLongParam="baz" />

// good
<Foo
  superLongParam="bar"
  anotherSuperLongParam="baz"
/>

// if props fit in one line then keep it on the same line
<Foo bar="bar" />

// children get indented normally
<Foo
  superLongParam="bar"
  anotherSuperLongParam="baz"
>
  <Quux />
</Foo>

// bad
{showButton &&
  <Button />
}

// bad
{
  showButton &&
    <Button />
}

// good
{showButton && (
  <Button />
)}

// good
{showButton && <Button />}

// good
{someReallyLongConditional
  && anotherLongConditional
  && (
    <Foo
      superLongParam="bar"
      anotherSuperLongParam="baz"
    />
  )
}

// good
{someConditional ? (
  <Foo />
) : (
  <Foo
    superLongParam="bar"
    anotherSuperLongParam="baz"
  />
)}
```

# 따옴표

HTML 속성도 일반적으로 홑따옴표('') 대신 쌍따옴표를 사용("")하므로 JSX 속성은 이 규칙을 반영

```react
// bad
<Foo bar='bar' />

// good
<Foo bar="bar" />

// bad
<Foo style={{ left: "20px" }} />

// good
<Foo style={{ left: '20px' }} />
```

# 공백 (띄어쓰기)

닫기 태그 전에 하나의 공백

```react
// bad
<Foo/>

// very bad
<Foo                 />

// bad
<Foo
 />

// good
<Foo />
```

속성 값에는 공백 제거

```react
// bad
<Foo bar={ baz } />

// good
<Foo bar={baz} />
```

# Props (속성)

prop 이름에는 항상 camelCase를 사용, React 컴포넌트의 경우 PascalCase를 사용

```react
// bad
<Foo
  UserName="hello"
  phone_number={12345678}
/>

// good
<Foo
  userName="hello"
  phoneNumber={12345678}
  Component={SomeComponent}
/>
```

porp 값 생략 가능 (속성 값이 명확한 true 값의 경우)

```react
// bad
<Foo
  hidden={true}
/>

// good
<Foo
  hidden
/>

// good
<Foo hidden />
```

웹표준 준수, img 태그에는 alt 속성 필수(단, alt 값으로 "image", "photo", or "picture" 값이 아닌, 스크린리더가 읽을 수 있는 의미있는 값)

```react
// bad
<img src="hello.jpg" />

// good
<img src="hello.jpg" alt="Me waving hello" />

// good
<img src="hello.jpg" alt="" />

// good
<img src="hello.jpg" role="presentation" />

// bad alt value
<img src="hello.jpg" alt="Picture of me waving hello" />

// good alt value
<img src="hello.jpg" alt="Me waving hello" />
```

배열 key는 고유값으로 주입

```react
// bad
{todos.map((todo, index) =>
  <Todo
    {...todo}
    key={index}
  />
)}

// good
{todos.map(todo => (
  <Todo
    {...todo}
    key={todo.id}
  />
))}
```

Spread Opertor(펼침 연산자, 전개 구문) 활용

```react
export default function Foo {
  const props = {
    text: '',
    isPublished: false
  }

  return (<div {...props} />);
}
```

# Refs

항상 참조 콜백 함수 사용

```react
// bad
<Foo
  ref="myRef"
/>

// good
<Foo
  ref={(ref) => { this.myRef = ref; }}
/>
```

# 괄호

JSX 태그가 두 줄 이상의 경우 괄호 사용

```react
// bad
render() {
  return <MyComponent variant="long body" foo="bar">
           <MyChild />
         </MyComponent>;
}

// good
render() {
  return (
    <MyComponent variant="long body" foo="bar">
      <MyChild />
    </MyComponent>
  );
}

// good, when single line
render() {
  const body = <div>hello</div>;
  return <MyComponent>{body}</MyComponent>;
}
```

# 태그

자식 컴포넌트가 없을 경우 Self-Closing

```react
// bad
<Foo variant="stuff"></Foo>

// good
<Foo variant="stuff" />
```

여러 속성이 있을 경우 줄바꿈 처리

```react
// bad
<Foo
  bar="bar"
  baz="baz" />

// good
<Foo
  bar="bar"
  baz="baz"
/>
```

# Methods

화살표 함수 사용 권장

```react
function ItemList(props) {
  return (
    <ul>
      {props.items.map((item, index) => (
        <Item
          key={item.key}
          onClick={(event) => { doSomethingWith(event, item.name, index); }}
        />
      ))}
    </ul>
  );
}
```

---

# 참고: useState Hell 해결 방법

https://www.builder.io/blog/use-reducer

해결과제

```javascript
import { useState } from 'react';

function EditCalendarEvent() {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState();
  const [attendees, setAttendees] = useState([]);

  return (
    <>
      <input value={title} onChange={e => setTitle(e.target.value)} />
      {/* ... */}
    </>
  );
}
```

방법 (`useReducer 활용`)

```javascript
import { useReducer } from 'react';

function EditCalendarEvent() {
  const [event, updateEvent] = useReducer(
    (prev, next) => {
      return { ...prev, ...next };
    },
    { title: '', description: '', attendees: [] },
  );

  return (
    <>
      <input value={event.title} onChange={e => updateEvent({ title: e.target.value })} />
      {/* ... */}
    </>
  );
}
```

```javascript
import { useReducer } from 'react';

function EditCalendarEvent() {
  const [event, updateEvent] = useReducer(
    (prev, next) => {
      const newEvent = { ...prev, ...next };

      // Ensure that the start date is never after the end date
      if (newEvent.startDate > newEvent.endDate) {
        newEvent.endDate = newEvent.startDate;
      }

      // Ensure that the title is never more than 100 chars
      if (newEvent.title.length > 100) {
        newEvent.title = newEvent.title.substring(0, 100);
      }
      return newEvent;
    },
    { title: '', description: '', attendees: [] },
  );

  return (
    <>
      <input value={event.title} onChange={e => updateEvent({ title: e.target.value })} />
      {/* ... */}
    </>
  );
}
```

```javascript
import { useReducer } from 'react';

function Counter() {
  const [count, setCount] = useReducer((prev, next) => Math.min(next, 10), 0);

  return <button onClick={() => setCount(count + 1)}>Count is {count}</button>;
}
```

```javascript
import { useReducer } from 'react';

function EditCalendarEvent() {
  const [event, updateEvent] = useReducer(
    (state, action) => {
      const newEvent = { ...state };

      switch (action.type) {
        case 'updateTitle':
          newEvent.title = action.title;
          break;
        // More actions...
      }
      return newEvent;
    },
    { title: '', description: '', attendees: [] },
  );

  return (
    <>
      <input value={event.title} onChange={e => updateEvent({ type: 'updateTitle', title: 'Hello' })} />
      {/* ... */}
    </>
  );
}
```
