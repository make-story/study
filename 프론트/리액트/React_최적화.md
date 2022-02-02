

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

