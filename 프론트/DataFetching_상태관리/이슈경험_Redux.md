# Redux

## 리덕스 상태값 JOSN 형태에서 값이 undefined 인 필드(key)는 결과값에서 제외될 수 있음

```javascript
const initialState = {
  gnbLogo: null,
  gnbData: {
    header: null,
    menus: [],
  },
  gnbError: null,
};

export default function reducer(state: IProps = initialState, action: AnyAction) {
  switch (action.type) {
    // ...

    case headerAction.SET_GNB_LOGO:
      return {
        ...state,
        gnbLogo: action.payload, // payload 값이 undefined 이면, gnbLogo 는 redux state 에서 제거된 상태로 노출될 수 있음
      };

    case headerAction.SET_GNB_ERROR:
      return {
        ...state,
        gnbError: action.payload,
      };

    // ...

    default:
      return state;
  }
}
```
