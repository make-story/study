
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

