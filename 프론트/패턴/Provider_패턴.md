# 여러 자식 컴포넌트에서 데이터를 사용하능하게 한다

https://patterns-dev-kr.github.io/design-patterns/provider-pattern/  
https://www.patterns.dev/posts/provider-pattern/

앱 내의 여러 컴포넌트들이 데이터를 사용 할 수 있게 해야 하는 상황이 있다.  
props 를 통해서 데이터를 전달하는 방식이 있지만 앱 내의 모든 컴포넌트들이 데이터에 접근해야 하는 경우 이 작업을 하기 매우 번거롭다.

Provider 패턴은 이런 경우에 매우 유용하다.  
`Provider 패턴을 이용하면 각 레이어에 직접 데이터를 주지 않고도 여러 컴포넌트들에게 데이터에 접근할 수 있게 구현`할 수 있다.

먼저 모든 컴포넌트를 Provider 로 감싼다.  
Provider 는 HOC로 Context 객체를 제공한다.  
React가 제공하는 createContext 메서드를 활용하여 Context 객체를 만들어낼 수 있다.

Provider 컴포넌트는 value 라는 prop으로 하위 컴포넌트들에 내려줄 데이터를 받는다.  
이 컴포넌트의 모든 자식 컴포넌트들은 해당 provider 를 통해 value prop에 접근할 수 있다.

```javascript
const DataContext = React.createContext()

function App() {
  const data = { ... }

  return (
    <div>
      <DataContext.Provider value={data}>
        <SideBar />
        <Content />
      </DataContext.Provider>
    </div>
  )
}

const SideBar = () => <List />
const List = () => <ListItem />
const Content = () => <div><Header /><Block /></div>

function ListItem() {
  const { data } = React.useContext(DataContext);
  return <span>{data.listItem}</span>;
}

function Text() {
  const { data } = React.useContext(DataContext);
  return <h1>{data.text}</h1>;
}

function Header() {
  const { data } = React.useContext(DataContext);
  return <div>{data.title}</div>;
}
```
