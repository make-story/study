# 렌더 프롭(render props)

```javascript
/*
렌더 프롭(render props)은 말 그대로 렌더링되는 프로퍼티를 뜻한다.  
이 말은 컴포넌트나 렌더링할 컴포넌트를 반환할 함수 컴포넌트인데 프로퍼티로 전달되는 컴포넌트를 가리킨다.  
이런 컴포넌트는 특정 조건을 만족할 때 런더링 할 수 있다.  
함수 렌더 프롭의 경우 함수이기 때문에(프로퍼티를 포함하는) 컴포넌트가 렌더링될 때 데이터를 함수에 인자로 넘겨서 반환되는 컴포넌트를 렌더링에 사용할 수 있다.
*/

function List({ data = [], renderItem, renderEmpty }) {
  /*if(!data.length) {
        return renderEmpty;
    }
    return <p>{data.length} items</p>;*/

  return !data.length ? (
    renderEmpty
  ) : (
    <ul>
      {data.map((item, index) => {
        <li key={index}>{renderItem(item)}</li>;
      })}
    </ul>
  );
}

export default function App() {
  return (
    <List
      data={[]}
      renderEmpty={<p>This list is empty</p>}
      renderItem={item => {
        <>
          {item.name} / {item.date}
        </>;
      }}
    />
  );
}
```
