

# types/brands/index.ts
```javascript
import { IAllBrandListResponse } from 'src/display/types/brand/response'; // API 응답 타입정의 (선택적 정의)
 
export interface IBrandsAllActionPayload {
  data?: IAllBrandListResponse;
  error?: Error;
}
export interface IBrandsAllAction extends Action<typeof BRANDS_ALL_ACTION_TYPE[keyof typeof BRANDS_ALL_ACTION_TYPE]> {
  payload?: IBrandsAllActionPayload;
}
 
// 브랜드 전체보기 상태 (API 응답 후 리듀서에서 가공된, 최종 데이터 구조 정의)
export interface IBrandsAllState {
  // [예시] 아래 구조는 각 기능별로 다른 구조를 가져갈 수 있음(참고용 코드)
  data?: IAllBrandListResponse;
  /** 상태 생성일시 */
  createdAt?: number;
  /** 상태 갱신일시 */
  updatedAt?: number;
  /** 오류여부 */
  isError: boolean;
  /** 오류정보 */
  errorMessage?: string;
}
```

# stores/brands/action.ts
```javascript
import { Action } from 'redux';

import { IAllBrandListResponse } from 'src/display/types/brand/response';
import { IBrandsAllAction } from 'src/display/types/brand/index';

// 액션 타입 정의
export const BRANDS_ALL_ACTION_TYPE = {
  FETCH: 'brands/all/FETCH',
  REFETCH: 'brands/all/REFETCH',
  SUCCESS: 'brands/all/SUCCESS',
  FAILURE: 'brands/all/FAILURE',
};

// 액션 생성 함수
export const brandsAllActionCreators = {
  fetch: (): IBrandsAllAction => ({
    type: BRANDS_ALL_ACTION_TYPE.FETCH,
    payload: {},
  }),
  refetch: (): IBrandsAllAction => ({
    type: BRANDS_ALL_ACTION_TYPE.REFETCH,
    payload: {},
  }),
  success: (data: IAllBrandListResponse): IBrandsAllAction => ({
    type: BRANDS_ALL_ACTION_TYPE.SUCCESS,
    payload: { data },
  }),
  failure: (error: Error): IBrandsAllAction => ({
    type: BRANDS_ALL_ACTION_TYPE.FAILURE,
    payload: { error },
  }),
};
```

# sagas/brands/reducer.ts
```javascript
import { Reducer } from 'redux';
import { produce } from 'immer';

import { BRANDS_ALL_ACTION_TYPE } from './action';
import { IAllBrandListResponse } from 'src/display/types/brand/response';
import { IBrandsAllState, IBrandsAllAction } from 'src/display/types/brand/index';

// 리듀서 초기값(결과값), 타입정의 필수
const initialState: IBrandsAllState = {
  isError: false,
};

// 리듀서 브랜드 전체보기
const reducer: Reducer<IBrandsAllState, IBrandsAllAction> = (state = initialState, action) => {
  switch (action.type) {
    case BRANDS_ALL_ACTION_TYPE.SUCCESS:
      return produce(state, draft => {
        const now = Date.now();
        const { data } = action.payload || {};

        draft.data = data;
        draft.createdAt = now;
        draft.updatedAt = now;
        draft.isError = false;
      });

    case BRANDS_ALL_ACTION_TYPE.FAILURE:
      return produce(state, draft => {
        const now = Date.now();
        const { error } = action.payload || {};

        draft.createdAt = draft.createdAt ?? now;
        draft.isError = true;
        draft.errorMessage = error?.message;
      });

    default:
      return state;
  }
};

export default reducer;
```