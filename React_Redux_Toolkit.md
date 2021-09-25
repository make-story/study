- https://kyounghwan01.github.io/blog/React/redux/redux-toolkit/#redux-thunk  

# redux-toolkit
## 사용하는 이유   
redux를 아무 라이브러리 없이 사용할 때 (actionType 정의 -> 액션 함수 정의 -> 리듀서 정의) 1개의 액션을 생성합니다. 이렇게 필요하지만 너무 많은 코드가 생성되니 redux-actons라는 것을 사용하게 되었고, 불변성을 지켜야하는 원칙 때문에 immer를 사용하게되고, store 값을 효율적으로 핸들링하여 불필요 리렌더링을 막기 위해 reselect를 쓰게 되었으며, 비동기를 수월하게 하기위해, thunk나 saga를 설치하여 redux를 더 효율적으로 사용하게 됩니다. 지금 말한 것만 총 4~5개의 라이브러리를 설치하여야 위처럼 사용할 수 있습니다.  
  
그런데, redux-toolkit은 redux가 공식적으로 만든 라이브러리로, saga를 제외한 위 기능 모두 지원합니다. 또한 typeScript 사용자를 위해 action type, state type 등 TypeScript를 사용할 때 필요한 Type Definition을 공식 지원합니다.  

## 지원하는 기능  
redux-action  
reselect  
immer의 produce  
redux-thunk  
Flux Standard Action 강제화  
Type Definition  
