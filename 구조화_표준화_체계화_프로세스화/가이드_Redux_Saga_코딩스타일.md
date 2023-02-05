`리액트를 다루는 기술` 책 내용 중

# sagas/createRequestSaga.ts

```javascript
/*
-
FSA(Flux Standard Action)
https://github.com/redux-utilities/flux-standard-action

객체는 액션을 구분할 고유한 문자열을 가진 `type` 필드가 반드시 있으며,
`payload` 필드에 데이터를 담아 전달한다.
그 외에 `meta`, `error` 필드를 가질 수도 있다.
{
    type: ACTION_NAME,
    payload: 'createAction 활용할 경우, 두 번째 파라미터 함수 반환 값',
    meta: '사용자값',
    error: '사용자값',
}
*/
import { AnyAction } from 'redux';
import { call, delay, put, takeEvery, takeLatest } from 'redux-saga/effects';

import { loadingActionType, loadingActionCreator } from '@src/common/stores/loading/action';

// API요청/응답 공통 Saga함수 (제너레이터 함수 생성하여 반환)
export function createRequestSaga(actionType: string, reuqest: any) {
  //console.log(`createRequestSaga actionType: ${actionType}`); // actionType: 액션 타입(액션 이름)

  // {해당액션타입}_SUCCESS 와 {해당액션타입}_FAILURE 타입이 있다는 전제
  const SUCCESS = `${actionType}_SUCCESS`;
  const FAILURE = `${actionType}_FAILURE`;

  return function* (action: AnyAction) {
    const { type, payload } = action;

    // 로딩 시작
    yield put(loadingActionCreator.startLoading(actionType));

    try {
      // call(비동기 실행함수, 함꼐 넘길 파라미터 값)
      //const data = (yield reuqest(payload)) as IResponse;
      const data = yield call(reuqest, payload);

      // createAction 활용한 액션함수 사용 없이, type 지정 바로 호출!
      yield put({
        type: SUCCESS, // 액션 타입
        payload: data, // 응답 데이터 값
        meta: payload, // 호출정보 (파라미터 등)
      });
    } catch (e) {
      // createAction 활용한 액션함수 사용 없이, type 지정 바로 호출!
      yield put({
        type: FAILURE, // 액션 타입
        payload: e,
        error: true, // 에러발생 여부
      });
    }

    // 로딩 끝
    yield put(loadingActionCreator.finishLoading(actionType));
  };
}
```

# sagas/module/saga.ts

```javascript
import { AnyAction } from 'redux';
import { call, delay, put, takeEvery, takeLatest } from 'redux-saga/effects';

import { createRequestSaga } from '../createRequestSaga';
import { moduleActionType, moduleActionCreator } from '@src/project/stores/module/action';
import * as api from '@src/project/api/module';

// 테스트
const fetchModuleTest = createRequestSaga(moduleActionType.FETCH_MODULE_TEST, api.fetchModuleTest1);
const fetchModuleContentTest = createRequestSaga(
  moduleActionType.FETCH_MODULE_CONTENT_TEST,
  api.fetchModuleContentTest1,
);

// Saga 미들웨어 - 액션타입 등록
export function* watchModuleSaga() {
  yield takeLatest(moduleActionType.FETCH_MODULE_TEST, fetchModuleTest);
  yield takeEvery(moduleActionType.FETCH_MODULE_CONTENT_TEST, fetchModuleContentTest);
}
```

# stores/module/action.ts

```javascript
// 액션 타입 - 값을 '경로/액션타입값' 형태로 주는 이유는, 다른 Action type과 키값이 중복되는 것을 방지하고자 하는 것 (Saga 등 미들웨어에서 값이 동일한 Type 값 실행가능성 제거)
const FETCH_MODULE_TEST = 'module/FETCH_MODULE_TEST';
const FETCH_MODULE_TEST_SUCCESS = 'module/FETCH_MODULE_TEST_SUCCESS';
const FETCH_MODULE_TEST_FAILURE = 'module/FETCH_MODULE_TEST_FAILURE';
const FETCH_MODULE_CONTENT_TEST = 'module/FETCH_MODULE_CONTENT_TEST';
const FETCH_MODULE_CONTENT_TEST_SUCCESS = 'module/FETCH_MODULE_CONTENT_TEST_SUCCESS';
const FETCH_MODULE_CONTENT_TEST_FAILURE = 'module/FETCH_MODULE_CONTENT_TEST_FAILURE';

export const moduleActionType = {
  FETCH_MODULE_TEST,
  FETCH_MODULE_TEST_SUCCESS,
  FETCH_MODULE_TEST_FAILURE,
  FETCH_MODULE_CONTENT_TEST,
  FETCH_MODULE_CONTENT_TEST_SUCCESS,
  FETCH_MODULE_CONTENT_TEST_FAILURE,
};

// 액션 생성 함수 - dispatch 로 해당 액션 실행을 위한 구조를 가지고 있음
const fetchModuleTest = (payload?: any) => {
  console.log('module > createAction > fetchModuleTest', payload);
  return {
    type: FETCH_MODULE_TEST,
    payload, // 사용자 값
  };
};

const fetchModuleContentTest = (payload?: any) => {
  console.log('module > createAction > fetchModuleContentTest', payload);
  return {
    type: FETCH_MODULE_CONTENT_TEST,
    payload, // 사용자 값
  };
};

export const moduleActionCreator = {
  fetchModuleTest,
  fetchModuleContentTest,
};
```

# stores/module/reducer.ts

```javascript
import { AnyAction } from 'redux';
import produce from 'immer';

import { modulePrivateState } from '@src/common/config/index';
import { moduleActionType, moduleActionCreator } from './action';

// 타입
interface IState {
  moduleData: any;
  moduleContentData: any;
}

// 초기 상태 값
export const initialState = {
  moduleData: [],
  moduleContentData: {},
};

// 리듀서 함수 - combineReducers 에 등록
export default function reducer(state: IState = initialState, action: AnyAction) {
  const { type, payload, meta } = action;

  switch (type) {
    // 테스트
    case moduleActionType.FETCH_MODULE_TEST_SUCCESS:
      console.log('module > reducer > FETCH_MODULE_TEST_SUCCESS', action);
      return produce(state, (draft: { moduleData: any }) => {
        draft.moduleData = payload?.components?.map((item: any, index: number) => {
          return {
            ...modulePrivateState,
            ...(item || {}),
          };
        });
      });
    case moduleActionType.FETCH_MODULE_TEST_FAILURE:
      console.log('module > reducer > FETCH_MODULE_TEST_FAILURE', action);
      return state;

    // 테스트
    case moduleActionType.FETCH_MODULE_CONTENT_TEST_SUCCESS:
      console.log('module > reducer > FETCH_MODULE_CONTENT_TEST_SUCCESS', action);
      return produce(state, (draft: { moduleContentData: any }) => {
        draft.moduleContentData[meta || 'test'] = payload;
      });
    case moduleActionType.FETCH_MODULE_CONTENT_TEST_FAILURE:
      console.log('module > reducer > FETCH_MODULE_CONTENT_TEST_FAILURE', action);
      return state;

    default:
      return state;
  }
}
```
