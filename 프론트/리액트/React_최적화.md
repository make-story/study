

## 렌더링 속도를 올리기 위한 성능 최적화 방법 - 실전 리액트 프로그래밍 책 내용 중   
리액트에서 최초 렌더링 이후에는 데이터 변경 시 렌더링을 하는데,  
이 때 다음과 같은 단계를 거친다.  
1. 이전 렌더링 결과를 재사용할 지 판단한다.  
2. 컴포넌트 함수를 호출한다.  
3. 가상 돔끼리 비교해서 변경된 부분만 실제 돔에 반영한다.  
  
* 평상시에는 성능 최적화를 고민하지 말고 편하게 코딩하기를 바란다. 대부분의 웹 페이지는 성능을 고민하지 않아도 문제없이 잘 돌아간다. 성능 이슈가 생기면 그때 고민해도 늦지 않다. (실전 리액트 프로그래밍 책 내용 중)  

## React.memo 로 렌더링 결과 재사용하기  
컴포넌트의 속성값이나 상태값이 변경되면 리액트는 그 컴포넌트를 다시 그릴 준비를 한다.  
만약 React.memo 함수로 감싼 컴포넌트라면 속성값 비교 함수가 호출된다.  
이 함수는 이전 이후 속성값을 매개변수로 받아서 참 또는 거짓을 반환한다.  
참을 반환하면 렌더링을 멈추고, 거짓을 반환하면 컴포넌트 함수를 실행해서 가상 돔을 업데이트한 후 변경된 부분만 실제 돔에 반영한다.  

### 속성값을 불변 객체로 관리했을 때 변경 여부 확인하기  
```javascript
prevProps.todos !== nextProps.todos
```
속성값을 불변 객체로 관리했다면 이전 이후 값의 단순 비교만으로 컴포넌트의 속성값이 변경되었는지 알 수 있다.  
따라서 속성값을 불변 객체로 관리하면 렌더링 성능에 큰 도움이 된다.  


-----


# React.lazy 및 Suspense를 사용한 코드 분할
https://web.dev/code-splitting-suspense/?utm_source=lighthouse&utm_medium=lr  

# 라이브러리
https://loadable-components.com/docs/getting-started/

# React.memo
https://ko.reactjs.org/docs/react-api.html#reactmemo


-----


# useCallback
```javascript
import React, { useCallback, useState } from 'react';
 
const fetchServer = (name, age) => {
    // api 통신
};
const UserEdit = ({ onSave, setName, setAge }) => {
    return <div></div>;
};
 
export const TestUseCallback = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState(0);
 
    // useMemo 훅은 로다시 같은 라이브러리에서 제공해 주는 메모이제이션과 비슷하다.
    // 반면에 useCallback은 리액트의 렌더링 성능을 위해 제공되는 훅이다.
    // 컴포넌트가 렌더링될 때마다 새로운 함수를 생성해서 자식 컴포넌트의 속성 값으로 입력하는 경우가 많다.
    // 리액트 팀에서는 최근의 브라우저에서 함수 생성이 성능에 미치는 영향은 적다고 주장한다.
    // 그보다는 속성값이 매번 변경되기 때문에 자식 컴포넌트에서 React.memo 를 사용해도 불필요한 렌더링(새롭게 생성된 함수에 따른 props 변경발생)이 발행한다는 문제점이 있다.
 
    // useCallback 훅이 필요한 예
    // 현재 컴포넌트가 렌더링 될 때마다 UserEdit 컴포넌트의 onSave 속성값으로 새로운 함수가 입력된다.
    // 따라서 UserEdit 컴포넌트에서 React.memo 를 사용해도 onSave 속성값이 항상 변경되고 그 때문에 불필요한 렌더링이 발생한다.
    // useCallback 훅을 사용하면 불필요한 렌더링을 막을 수 있다.
    const onSave = useCallback(() => fetchServer(name, age), [name, age]);
    return (
        <div>
            <p>{`name is ${name}`}</p>
            <p>{`age is ${age}`}</p>
            <UserEdit
                //onSave={()=>fetchServer(name, age)} // 일반적인 경우 - 현재 컴포넌트 렌더링시 마다 함수가 새로 생성되며, UserEdit 재렌더링 발생됨
                onSave={onSave} // useCallback 사용한 경우 - 현재 컴포넌트 렌더링시 마다 새로운 함수를 생성하지 않음
                setName={setName}
                setAge={setAge}
            />
        </div>
    );
};
```

# useMemo
```javascript
import React, { useMemo } from 'react';
 
const getExpensiveJob = (value1, value2) => {
    return '복잡한 계산의 결과값';
};
 
export const TestUseMemo = ({ value1, value2 }) => {
    // useMemo 훅은 계산량이 많은 함수의 반환값을 재활용하는 용도로 사용된다.
    // useMemo 훅의 첫 번째 매개변수로 함수를 입력한다. useMemo 훅은 이 함수가 반환한 값을 기억한다.
    // useMemo 훅의 두 번째 매개변수는 의존성 배열이다. 의존성 배열이 변경되지 않으면 이전에 반환된 값을 재사용한다.
    const value = useMemo(() => getExpensiveJob(value1, value2), [value1, value2]);
    return <p>{`value is ${value}`}</p>;
};
```

-----


# useSelector 최적화
> https://blog.woolta.com/categories/1/posts/200  

- 방법1) 독립 선언  
각각의 값을 독립적으로 선언하게 되면 이에대한 상태변경여부를 파악할수 있어 상태가 최적화  
```typescript
const { gift, onlineProducts, loading } = useSelector(
    ({ gift, dialog, loading /*각 스토어 - rootReducer.ts 참고*/ }: RootState) => ({
        gift,
        onlineProducts: gift?.onlineProducts,
        loading: loading[giftActionType.GET_ONLINE_PRODUCTS_REVIEW_TYPE],
    }),
);
```

```typescript
const { count, prevCount } = useSelector((state: RootState) => ({
    count : state.countReducer.count,
    prevCount: state.countReducer.prevCount,
})); 
```

```typescript
// 최적화
const count= useSelector((state: RootState) => state.countReducer.count);
const prevCount= useSelector((state: RootState) => state.countReducer.prevCount); 
```

- 방법2) equalityFn  
useSelector 에는 선택옵션으로 equalityFn 라는 파리미터가 존재  
equalityFn 는 이전 값(prev)과 다음 값(next)을 비교하여 true가 나오면 다시 렌더링을 하지 않고 false가 나오면 렌더링을 진행  
```typescript
const { count, prevCount } = useSelector((state: RootState) => ({
    count : state.countReducer.count,
    prevCount: state.countReducer.prevCount,
}),(prev, next) => {
    return prev.count === next.count && prev.prevCount === next.prevCount;
}); 
```

- 방법3) shallowEqual  
shallowEqual 는 selector로 선언한 값의 최상위 값들의 비교여부를 대신 작업  
```typescript
const { count, prevCount } = useSelector((state: RootState) => ({
    count : state.countReducer.count,
    prevCount: state.countReducer.prevCount,
}),shallowEqual); 
```

