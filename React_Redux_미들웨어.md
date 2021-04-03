# 리덕스 비동기 (미들웨어)

> 참고 페이지  
https://velog.io/@hyex/redux-saga-redux-saga-%EB%A7%9D%EB%9D%BC%ED%95%98%EA%B8%B0   

> 디바운싱 (Debouncing)
https://mskims.github.io/redux-saga-in-korean/recipes/  

> 스로틀(throttle)
https://mskims.github.io/redux-saga-in-korean/recipes/


-----


# 리덕스 미들웨어를 통한 비동기 작업 관리
> 미들웨어란?  
리덕스 미들웨어는 `액션을 디스패치했을 때 리듀서에서 이를 처리하기에 앞서 사전에 지전된 작업을 실행(예를 들어 비동기 통신)`합니다.  
`미들웨어는 액션과 리듀서 사이의 중간자`라고 볼 수 있습니다.  

- `액션` -> `미들웨어(redux-saga 등)` -> `리듀서` -> `스토어`  
리듀서가 액션을 처리하기 전에 미들웨어가 할 수 있는 작업은 여러 가지가 있습니다.  
전달받은 액션을 단순히 콘솔에 기록하거나, 전달받은 액션 정보를 기반으로 액션을 아예 취소하거나 다른 종류의 액션을 추가로 디스패치할 수 있습니다.  


-----


# redux-trunk
redux-trunk 는 리덕스를 사용하는 프로젝트에서 `비동기 작업을 처리할 때 가장 기본적으로 사용하는 미들웨어` 입니다.  
Trunk 는 특정 작업을 나중에 할 수 있도록 미루기 위해 함수 형태로 감싼 것을 의미합니다.

액션 모듈
```javascript
// modules/users.js
import axios from 'axios';

const GET_USERS_PENDING = 'users/GET_USERS_PENDING';
const GET_USERS_SUCCESS = 'users/GET_USERS_SUCCESS';
const GET_USERS_FAILURE = 'users/GET_USERS_FAILURE';

const getUsersPending = () => ({ type: GET_USERS_PENDING });
const getUsersSuccess = payload => ({ type: GET_USERS_SUCCESS, payload });
const getUsersFailure = payload => ({
	type: GET_USERS_FAILURE,
	error: true,
	payload
});

// 비동기 사용 - trunk 방식
export const getUsers = () => async dispatch => {
	try {
		dispatch(getUsersPending());
		const response = await axios.get('https://jsonplaceholder.typicode.com/users');
		dispatch(getUsersSuccess(response));
	}catch (e) {
		dispatch(getUsersFailure(e));
		throw e;
	}
};

const initialState = {
	users: null,
	loading: {
		users: false,
		user: false
	},
	error: {
		users: null,
		user: null
	}
};

function users(state = initialState, action) {
	switch (action.type) {
		case GET_USERS_PENDING:
			return {
				...state,
				loading: { ...state.loading, users: true },
				error: { ...state.error, users: null }
			};
		case GET_USERS_SUCCESS:
			return {
				...state,
				loading: { ...state.loading, users: false },
				users: action.payload.data
			};
		case GET_USERS_FAILURE:
			return {
				...state,
				loading: { ...state.loading, users: false },
				error: { ...state.error, users: action.payload }
			};
		default:
			return state;
		}
}

export default users;
```

컨테이너 컴포넌트
```javascript
// containers/UsersContainer.js
import React from 'react';
import Users from '../components/Users';
import { connect } from 'react-redux';
import { getUsers } from '../modules/users';

const { useEffect } = React;

const UsersContainer = ({ users, getUsers }) => {
	// 컴포넌트 마운트될 때 호출
	useEffect(() => {
		if (users) return; // users가 이미 유효하다면 요청하지 않음
		getUsers();
	}, [getUsers, users]);

	return (
		<>
			<Users users={users} />
		</>
	);
};

export default connect(
	state => ({
		users: state.users.users
	}),
	{
		getUsers
	}
)(UsersContainer);
```

프레젠테이셔널 컴포넌트
```javascript
// components/Users.js
import React from 'react';
import { Link } from 'react-router-dom';

const Users = ({ users }) => {
	if (!users) return null; // users가 유효하지 않다면 아무것도 보여주지 않음
	return (
		<div>
			<ul>
				{users.map(user => (
					<li key={user.id}>
						<Link to={`/users/${user.id}`}>{user.username}</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Users;
```

루트 리듀서
```javascript
// modules/index.js
import { combineReducers } from 'redux';
import users from './users';

const rootReducer = combineReducers({ users });

export default rootReducer;
```

App
```javascript
import React from 'react';
import { Route } from 'react-router-dom';
import UsersPage from './pages/UsersPage';

function App() {
	return (
		<div>
			<Route path="/users" component={UsersPage} />
		</div>
	);
}

export default App;
```

Pages
```javascript
// pages/UsersPage.js
import React from 'react';
import UsersContainer from '../containers/UsersContainer';

const UsersPage = () => {
	return <UsersContainer />;
};

export default UsersPage;
```

index.js
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './modules/index';

const store = createStore(rootReducer, applyMiddleware(thunk));

/*
https://ko.reactjs.org/docs/strict-mode.html
StrictMode는 애플리케이션 내의 잠재적인 문제를 알아내기 위한 도구입니다. 
Fragment와 같이 UI를 렌더링하지 않으며, 자손들에 대한 부가적인 검사와 경고를 활성화합니다.
*/
ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);
```


-----


# redux-saga
redux-saga 는 redux-trunk 다음으로 많이 사용하는 `비동기 작업 관련 미들웨어` 입니다.  
- 기존 요청을 취소해야할 때(불필요한 중복 요청 방지)  
- 특정 액션이 발생했을 때 다른 액션을 발생시키거나, API 요청 등 리덕스와 관계없는 코드를 실행할 때  
- 웹소켓을 사용할 때
- API 요청 실패 시 재요청해야 할 때  

redux-saga 에서는 ES6 의 제너레이터 함수라는 문법을 사용합니다.
```javascript
// 제너레이터 
// 제너레이터 함수를 사용하면 함수에서 값을 순차적으로 반환할 수 있습니다.
// 심지어 함수의 흐름을 도중에 멈춰 놓았다가 다시 이어서 진행시킬 수도 있죠.
function* generatorFunction() {
	console.log('첫 번째 실행');
	yield 1; // 첫번째 next 호출 시에 이 지점까지 실행된다.
	console.log('두 번쨰 실행');
	yield 2; // 두번째 next 호출 시에 이 지점까지 실행된다.
	console.log('세 번째 실행');
	yield 3; // 세번째 next 호출 시에 이 지점까지 실행된다.

	return 4; // 제너레이터 함수 종료
}

// 제너레이터 생성
// 제너레이터 함수를 호출했을 때 반환되는 객체를 제너레이터 라고 부릅니다.
const generator = generatorFunction();

generator.next();
// 첫 번째 실행
// { value: 1, done: false }

generator.next();
// 두 번째 실행
// { value: 2, done: false }

generator.next();
// 세 번째 실행
// { value: 3, done: false }

generator.next();
// { value: 4, done: true }

generator.next();
// { value: undefined, done: true }
```

next() 가 호출되면 다음 yield 가 있는 곳까지 호출하고 다시 함수가 멈춥니다.  
next() 함수에 파라미터를 넣으면 제너레이터 함수에서 yield를 사용하여 해당 값을 조회할 수도 있습니다.  
```javascript
function* generatorSum() {
	console.log('a + b 테스트');
	
	let a = yield;
	let b = yield;

	yield a + b;
}
const sum = generatorSum();
sum.next();
// a + b 테스트
// { value: undefined, done: false }
sum.next(1);
// { value: undefined, done: false }
sum.next(2);
// { value: 3, done: false }
```

반복기
```javascript
function* createInfinityByGenerator() {
	let i = 0;
	while (true) { yield ++i; }
}  
for(const n of createInfinityByGenerator()) {
	if (n > 5) break;
	console.log('createInfinityByGenerator', n); // 1 2 3 4 5
}

function* counter() {
	for (const v of [1, 2, 3]) yield v;
}
let generatorCounter = counter();
for(const i of generatorCounter) {
	console.log('generatorCounter', i); // 1 2 3
}
```

`redux-saga 작동원리`
```javascript
function* generatorWatch() {
	console.log('모니터링 중...');

	let prevAction = null;
	while(true) {
		const action = yield;
		console.log('이전 액션: ', prevAction);
		prevAction = action;
		if(action.type === 'HELLO') {
			console.log('안녕하세요.');
		}
	}
}
const watch = generatorWatch();
watch.next();
// 모니터링 중...
// { value: undefined, donw: false }
watch.next({ type: 'TEST' });
// 이전 액션: null
// { value: undefined, donw: false }
watch.next({ type: 'HELLO' });
// 이전 액션: {type: 'TEST'}
// 안녕하세요.
// { value: undefined, donw: false }
```


-----


`redux-saga 사용 예`  
액션 모듈
```javascript
// modules/counter.js
import { createAction, handleActions } from 'redux-actions';
import { delay, put, takeEvery, takeLatest } from 'redux-saga/effects';

// 액션 타입
const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';
const INCREASE_ASYNC = 'counter/INCREASE_ASYNC';
const DECREASE_ASYNC = 'counter/DECREASE_ASYNC';

// 액션 생성함수
export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);
// 마우스 클릭 이벤트가 payload 안에 들어가지 않도록
// () => undefined 를 두 번째 파라미터로 넣어 줍니다.
export const increaseAsync = createAction(INCREASE_ASYNC, () => undefined);
export const decreaseAsync = createAction(DECREASE_ASYNC, () => undefined);

// 비동기 처리가 필요한 것 - saga 생성
/*
보통 2가지 함수 선언
1. call, put 등 실제 비동기 실행이 이루어지는 함수 (제너레이터 함수 또는 일반 함수)
2. takeEvery, takeLatest 등으로 액션타입(액션이름)과 실행 함수를 연결하는 제너레이터 함수

액션이 실행되면 -> 미들웨어 동작(saga) 후 -> 리듀서(handleActions) -> 스토어 저장
*/
function* increaseSaga() {
	yield delay(1000); // 1초를 기다립니다. - 비동기 통신이 발생한 것을 가정
	yield put(increase()); // 특정 액션을 디스패치 합니다.
}
function* decreaseSaga() {
	yield delay(1000); // 1초를 기다립니다. - 비동기 통신이 발생한 것을 가정
	yield put(decrease()); // 특정 액션을 디스패치 합니다.
}
export function* counterSaga() {
	// takeEvery 는 들어오는 모든 액션에 대해 특정 작업을 처리해 줍니다.
	// 즉, '+1' 버튼을 연속클릭하면 해당 작업이 모두 실행된다.
	// INCREASE_ASYNC 액션이 디스패치되면 increaseSaga 미들웨어 실행
	yield takeEvery(INCREASE_ASYNC, increaseSaga);

	// takeLatest 는 기존에 진행 중이던 작업이 있다면 취소 처리하고
	// 가장 마지막으로 실행된 작업만 수행합니다.
	// 즉, '-1' 버튼을 연속클릭하면 마지막 작업이 실행되며 최종적으로 한번 실행한 효과가 된다.
	// DECREASE_ASYNC 액션이 디스패치되면 decreaseSaga 미들웨어 실행
	yield takeLatest(DECREASE_ASYNC, decreaseSaga);
}

// 초기값
const initialState = 0;

// 액션 함수(리듀서)
const counter = handleActions(
	{
		[INCREASE]: state => state + 1,
		[DECREASE]: state => state - 1,
	},
	initialState
);

export default counter;
```

컨테이너 컴포넌트
```javascript
// containers/CounterContainer.js
import React, { useCallback } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux'; 
import Counter from '../components/Counter';
import { increase, decrease, increaseAsync, decreaseAsync } from '../modules/counter';

// 컨테이너 컴포넌트 - 동기 실행 관련 처리
/*const CounterContainer = () => {
	const number = useSelector(state => state.counter);
	const dispatch = useDispatch();

	// useCallback 를 통해 성능 최적화 가능
	// 숫자가 바뀌어서 컴포넌트가 리렌더링될 때마다 onIncrease 함수와 onDecrease 함수가 새롭게 만들어지고 있으므로 최적화 필요
	const onIncrease = useCallback(() => dispatch(increase()), [dispatch]);
	const onDecrease = useCallback(() => dispatch(decrease()), [dispatch]);
	return (
		<Counter number={number} onIncrease={onIncrease} onDecrease={onDecrease} />
	);
};*/
// 컨테이너 컴포넌트 - 비동기 실행 관련 처리
const CounterContainer = () => {
	const number = useSelector(state => state.counter);
	const dispatch = useDispatch();

	// useCallback 를 통해 성능 최적화 가능
	// 숫자가 바뀌어서 컴포넌트가 리렌더링될 때마다 onIncrease 함수와 onDecrease 함수가 새롭게 만들어지고 있으므로 최적화 필요
	const onIncrease = useCallback(() => dispatch(increaseAsync()), [dispatch]);
	const onDecrease = useCallback(() => dispatch(decreaseAsync()), [dispatch]);
	return (
		<Counter number={number} onIncrease={onIncrease} onDecrease={onDecrease} />
	);
};

export default CounterContainer;
```

프레젠테이셔널 컴포넌트
```javascript
// components/Counter.js
import React from 'react';

// 프레젠테이셔널 컴포넌트
const Counter = ({ number, onIncrease, onDecrease }) => {
	return (
		<div>
			<h1>{number}</h1>
			<div>
				<button onClick={onIncrease}>+1</button>
				<button onClick={onDecrease}>-1</button>
			</div>
		</div>
	);
};

export default Counter;
```

루트 리듀서 (루트 사가)
```javascript
// modules/index.js
import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import counter, { counterSaga } from './counter';

// 루트 리듀서
const rootReducer = combineReducers({
	counter,
});

// 루트 사가
// 추후 다른 리듀서에서도 사가를 만들어 등록할 것
export function* rootSaga() {
	// all 함수는 여러 사가를 합쳐 주는 역할을 합니다.
	yield all([
		counterSaga()
	]);
}

export default rootReducer;
```

App
```javascript
// App.js
import React from 'react';
import CounterContainer from './containers/CounterContainer';

const App = () => {
	return (
		<div>
			<CounterContainer />
		</div>
	);
};

export default App;
```

index.js
```javascript
// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import App from './redux-saga/App';
import rootReducer, { rootSaga } from './redux-saga/modules/index';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

// 미들웨어
const logger = createLogger();
const sagaMiddleware = createSagaMiddleware();

// 스토어
const store = createStore(
	// 루트 리듀서 등록
	rootReducer,
	// 미들웨어 등록
	applyMiddleware(logger, sagaMiddleware)
);

// 루트 사가 등록
sagaMiddleware.run(rootSaga);

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
```


-----


`redux-saga 사용 예 (회원기입 비동기 통신)`  
액션 모듈 (auth)  
```javascript
// modules/auth.js
import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga from '../lib/createRequestSaga';
import * as authAPI from '../lib/api/auth';

const REGISTER = 'auth/REGISTER';
const REGISTER_SUCCESS = 'auth/REGISTER_SUCCESS';
const REGISTER_FAILURE = 'auth/REGISTER_FAILURE';
const LOGIN = 'auth/LOGIN';
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
const LOGIN_FAILURE = 'auth/LOGIN_FAILURE';

export const register = createAction(REGISTER, ({ username, password }) => {
	// payload
	// authAPI.register 로 넘길 파라미터 값
	return {
		username,
		password,
	};
});
export const login = createAction(LOGIN, ({ username, password }) => {
	// payload
	// authAPI.login 로 넘길 파라미터 값
	return {
		username,
		password,
	};
});

// 비동기 처리가 필요한 것 - saga 생성
const registerSaga = createRequestSaga(REGISTER, authAPI.register); // 제너레이터 함수 반환
const loginSaga = createRequestSaga(LOGIN, authAPI.login); // 제너레이터 함수 반환
export function* authSaga() {
	// REGISTER 디스패치(실행)시 사가에서 액션을 태스크한 후 registerSaga 실행
	yield takeLatest(REGISTER, registerSaga);
	// LOGIN 디스패치(실행)시 사가에서 액션을 태스크한 후 loginSaga 실행
	yield takeLatest(LOGIN, loginSaga);
}

const initialState = {
	register: {
		username: '',
		password: '',
		passwordConfirm: '',
	},
	login: {
		username: '',
		password: '',
	},
	auth: null,
	authError: null,
};

const auth = handleActions(
	{
		// 회원가입 성공
		[REGISTER_SUCCESS]: (state, { payload: auth }) => {
			return {
				...state,
				authError: null,
				auth,
			};
		},
		// 회원가입 실패
		[REGISTER_FAILURE]: (state, { payload: error }) => {
			return {
				...state,
				authError: error,
			};
		},
		// 로그인 성공
		[LOGIN_SUCCESS]: (state, { payload: auth }) => {
			return {
				...state,
				authError: null,
				auth,
			};
		},
		// 로그인 실패
		[LOGIN_FAILURE]: (state, { payload: error }) => {
			return {
				...state,
				authError: error,
			};
		},
	},
	initialState,
);

export default auth;
```

액션 모듈 (loading)  
```javascript
// modules/loading.js
import { createAction, handleActions } from "redux-actions";

const START_LOADING = 'loading/START_LOADING';
const FINISH_LOADING = 'loading/FINISH_LOADING';

/*
요청을 위한 액션 타입을 payload로 설정합니다.
(예: sample/GET_POST)
*/

export const startLoading = createAction(START_LOADING, requestType => {
	// payload
	console.log('startLoading', requestType);
	return requestType; // 액션 타입(액션 이름)을 상태 키 값으로 사용
});
export const finishLoading = createAction(FINISH_LOADING, requestType => {
	// payload
	console.log('finishLoading', requestType);
	return requestType; // 액션 타입(액션 이름)을 상태 키 값으로 사용
});

const initialState = {};

const loading = handleActions(
	{
		[START_LOADING]: (state, action) => {
			return {
				...state,
				[action.payload]: true,
			};
		},
		[FINISH_LOADING]: (state, action) => {
			return {
				...state,
				[action.payload]: false,
			};
		}
	},
	initialState,
);

export default loading;
```

사가 동작 (로딩시작 - 비동기통신 - 로딩끝)  
```javascript
// lib/createRequestSaga
import { call, put } from 'redux-saga/effects';
import { startLoading, finishLoading } from '../modules/loading';

// 사가 (제너레이터 함수 생성하여 반환)
export default function createRequestSaga(actionType, reuqest) {
	// actionType: 액션 타입(액션 이름)
	console.log(`createRequestSaga actionType: ${actionType}`);
	const SUCCESS = `${actionType}_SUCCESS`; // auth/REGISTER_SUCCESS, auth/LOGIN_SUCCESS
	const FAILURE = `${actionType}_FAILURE`; // auth/REGISTER_FAILURE, auth/LOGIN_FAILURE

	return function* (action) {
		// 디스패치 - 로딩 시작 
		yield put(startLoading(actionType)); 

		try {
			// call(비동기 실행함수, 함꼐 넘길 파라미터 값)
			const response = yield call(reuqest, action.payload); 

			// 디스패치
			yield put({ 
				type: SUCCESS, // 액션 타입
				payload: response.data,
			});
		}catch(e) {
			// 디스패치
			yield put({ 
				type: FAILURE, // 액션 타입 
				payload: e,
				error: true,
			});
		}

		// 디스패치 - 로딩 끝
		yield put(finishLoading(actionType)); 
	}
}
```

API 
```javascript
// lib/api/auth
import client from './client';

// 로그인
export const login = ({ username, password }) => {
	return client.post('/api/auth/login', { username, password });
};

// 회원가입
export const register = ({ username, password }) => {
	return client.post('/api/auth/register', { username, password });
};

// 로그인 상태 확인
export const check = () => {
	return client.get('/api/auth/check');
};
```

AXIOS 공통 설정
```javascript
import axios from 'axios';

const client = axios.create();

/*
-
설정값 우선순위 
인스턴스 호출 메서드 옵션 > 인스턴스.defaults 설정 옵션 > 인스턴스.create()에 설정된 옵션

-
axios 사용자 정의 인스턴스 기본 설정 예

const client = axios.create();

client.defaults.baseURL = 'https://api.example.com';
client.defaults.headers.common['Authorization'] = AUTH_TOKEN;
client.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 요청 인터셉터 추가
client.interceptors.request.use(
	function (config) {
		// 요청을 보내기 전에 수행할 일
		// ...
		return config;
	},
	function (error) {
		// 오류 요청을 보내기전 수행할 일
		// ...
		return Promise.reject(error);
	}
);

// 응답 인터셉터 추가
client.interceptors.response.use(
	function (response) {
		// 응답 데이터를 가공
		// ...
		return response;
	},
	function (error) {
		// 오류 응답을 처리
		// ...
		return Promise.reject(error);
	}
);
*/

export default client;
```

index.js
```javascript
// index.js
import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import auth, { authSaga } from './auth';
import loading from './loading';

const rootReducer = combineReducers({
	auth,
	loading,
});

export function* rootSaga() {
	yield all([
		authSaga(),
	]);
}

export default rootReducer;
```


-----


## redux-saga/effects
https://redux-saga.js.org/docs/api/
`fork`  
비동기 실행을 한다.
`call`  
동기 실행을 한다. 따라서 순서대로 함수를 실행해야하는 API 요청 같은 곳에 쓰인다.
`put`  
액션 함수 (dispatch)로 진행시킬 때 사용한다.


-----


## Redux Toolkit (TypeScript 지원)  
https://redux-toolkit.js.org/  

- Redux 와 비교
Redux Toolkit을 사용하면 `리듀서, 액션타입, 액션 생성함수, 초기상태를 하나의 함수로 편하게 선언`  
`Typescript 지원`  
`Immer 가 내장`되어있기 때문에, 불변성을 유지하기 위하여 번거로운 코드들을 작성하지 않고 원하는 값을 직접 변경하면 알아서 불변셩 유지되면서 상태가 업데이트  


```javascript 
import { createSlice } from '@reduxjs/toolkit';

// 리듀서와 액션 생성 함수를 한방에 만들 수 있음
const msgboxSlice = createSlice({
	name: 'msgbox',
	initialState: {
		open: false,
		message: '',
	},
	reducers: {
		open(state, action) {
			state.open = true;
			state.message = action.payload
		},
		close(state) {
			state.open = false;
		}
	}
});

export default msgboxSlice;
```

> 리덕스를 사용 할 때, TypeScript를 사용하지 않으면,   
우리가 컴포넌트에서 상태를 조회할때, 그리고 액션생성 함수를 사용 할 때 자동완성이 되지 않으므로 실수하기가 쉽습니다.

```javascript
// Typescript 사용
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type MsgboxState = {
  open: boolean;
	message: string;
}

const initialState: MsgboxState = {
  open: false,
  message: ''
};

const msgboxSlice = createSlice({
  name: 'msgbox',
  initialState,
  reducers: {
    open(state, action: PayloadAction<string>) {
      state.open = true;
      state.message = action.payload;
    },
    close(state) {
      state.open = false;
    }
  }
});

export default msgboxSlice;
```



