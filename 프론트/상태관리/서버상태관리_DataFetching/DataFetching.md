# 서버 상태 관리 라이브러리 (data fetching)

https://fe-developers.kakaoent.com/2022/220224-data-fetching-libs/

## 상태 3가지 구분

- Local State: 리액트 컴포넌트 안에서만 사용되는 state
- Global State: Global Store에 정의되어 프로젝트 어디에서나 접근할 수 있는 state
- Server State: 서버로부터 받아오는 state

기존에는 리덕스와 같은 상태 관리 라이브러리에 Global State와 Server State를 전부 포함하는 방법으로 프로그래밍을 했었는데요,  
위와 같은 data fetching 라이브러리를 사용함으로써 상태 관리 라이브러리에서 비동기 로직을 제거하여 관심사가 분리되고 선언적으로 프로그래밍할 수 있게 되었습니다.

# Client 데이터(상태)와 Server 데이터(상태)의 분리

https://tech.osci.kr/react-query/

Redux 를 사용하다 보면 서버 데이터를 받아와 상태 관리를 하기 위해 Redux-saga 를 사용하게 되고,  
Client Side 에서 전역 상태 관리를 위해서 사용하는 라이브러리가 의도와는 다르게 비동기 요청을 위한 로직으로 Store 혹은 module 이 비대해지게 됩니다.  
비동기 요청을 위해 request.success, request.fail 상태의 로직도 다뤄야 하며,  
이 전체적인 과정을 Redux 모듈에서 관리하려니 보일러 플레이트가 관리하기 어려울 정도로 커지는건 당연한 상황입니다.

이를 해결하기 위해서 React-Query 를 도입하여,  
서버 데이터와 클라이언트 데이터를 완전하게 분리할 수 있습니다.
