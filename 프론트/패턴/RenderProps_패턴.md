# JSX 엘리먼트를 props를 통해 컴포넌트에게 전달한다

https://patterns-dev-kr.github.io/design-patterns/render-props-pattern/  
https://www.patterns.dev/posts/render-props-pattern/

컴포넌트를 재사용 가능하게 할 수 있는 또 다른 방법으로, render prop 패턴을 사용하는 방법이 있다.

render prop은 컴포넌트의 prop으로 함수이며 JSX 엘리먼트를 리턴한다.  
컴포넌트 자체는 아무런 것도 렌더링하지 않지만 render prop함수를 호출한다.

Title컴포넌트가 있다고 생각해 보자.  
Title컴포넌트는 prop으로 넘어온 함수를 호출하여 반환하는 것 외에는 아무런 동작을 하지 않는다.  
Title컴포넌트에 render prop을 아래와 같이 넣어 보자

```javascript
<Title render={() => <h1>I am a render prop!</h1>} />
```

Title컴포넌트 내에서는 단순히 prop의 render함수를 호출하여 반환한다.

```javascript
const Title = props => props.render();
```

```javascript
function Input(props) {
  const [value, setValue] = useState('');

  return (
    <>
      <input type='text' value={value} onChange={e => setValue(e.target.value)} placeholder='Temp in °C' />
      {props.render(value)}
    </>
  );
}

export default function App() {
  return (
    <div className='App'>
      <h1>☃️ Temperature Converter 🌞</h1>
      <Input
        render={value => (
          <>
            <Kelvin value={value} />
            <Fahrenheit value={value} />
          </>
        )}
      />
    </div>
  );
}
```
