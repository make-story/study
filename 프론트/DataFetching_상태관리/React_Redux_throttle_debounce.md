- 쓰로틀링: 마지막 함수가 호출된 후 일정 시간이 지나기 전에 다시 호출되지 않도록 하는 것
- 디바운싱: 연이어 호출되는 함수들 중 마지막 함수(또는 제일 처음)만 호출하도록 하는 것

# 디바운싱 (Debouncing)

> https://mskims.github.io/redux-saga-in-korean/recipes/

# 스로틀(throttle)

> https://mskims.github.io/redux-saga-in-korean/recipes/

```javascript
import { throttle } from 'redux-saga/effects';

function* handleInput(input) {
  // ...
}

function* watchInput() {
  yield throttle(500, 'INPUT_CHANGED', handleInput);
}
```

throttle 헬퍼(helper) 함수를 사용하면 watchInput 는 0.5초동안 handleInput 작업을 새로 수행하지 않습니다.
동시에 가장 최신의 INPUT_CHANGED 액션을 buffer에 넣습니다.
하여 0.5초의 지연 주기 사이에 발생하는 INPUT_CHANGED 액션들은 모두 놓치게 됩니다.  
Saga는 0.5초의 지연 시간 동안 최대 하나의 INPUT_CHANGED 액션을 수행하고 후행 액션을 처리 할 수 있도록 보장합니다.

# XHR호출 재시도(Retrying XHR calls)

특정 시간 동안 XHR 호출을 재시도하려면 지연(delay)이 있는 for 루프를 사용해야 합니다.

```javascript
import { delay } from 'redux-saga';

function* updateApi(data) {
  for (let i = 0; i < 5; i++) {
    try {
      const apiResponse = yield call(apiRequest, { data });
      return apiResponse;
    } catch (err) {
      if (i < 5) {
        yield call(delay, 2000);
      }
    }
  }
  // 시도가 5x2초 후에 실패했습니다.
  throw new Error('API request failed');
}

export default function* updateResource() {
  while (true) {
    const { data } = yield take('UPDATE_START');
    try {
      const apiResponse = yield call(updateApi, data);
      yield put({
        type: 'UPDATE_SUCCESS',
        payload: apiResponse.body,
      });
    } catch (error) {
      yield put({
        type: 'UPDATE_ERROR',
        error,
      });
    }
  }
}
```

위 예제에서 apiRequest는 각각 2초의 지연시간을 가지고 5번 다시 시도됩니다.  
5번째 실패 후에 던져진(thrown) 예외는 부모 사가(parent saga)에 의해 catch되고, 부모 사가는 'UPDATE_ERROR` 액션을 전달(디스패치, dispatch)합니다.

만약 무제한으로 제시도하기를 원한다면, for 반복문을 while (true)로 대체하면 가능합니다.  
또한 take대신에 takeLatest를 사용하면 마지막 요청만 재시도할 수 있습니다.  
에러 핸들링에서 UPDATE_RETRY액션을 추가하면, 업데이트를 성공적으로 마치지 못했으며 다시 시도 할 것임을 유저에게 알릴 수 있습니다.

```javascript
import { delay } from 'redux-saga';

function* updateApi(data) {
  while (true) {
    try {
      const apiResponse = yield call(apiRequest, { data });
      return apiResponse;
    } catch (error) {
      yield put({
        type: 'UPDATE_RETRY',
        error,
      });
      yield call(delay, 2000);
    }
  }
}

function* updateResource({ data }) {
  const apiResponse = yield call(updateApi, data);
  yield put({
    type: 'UPDATE_SUCCESS',
    payload: apiResponse.body,
  });
}

export function* watchUpdateResource() {
  yield takeLatest('UPDATE_START', updateResource);
}
```

# 실행 취소(Undo)

실행 취소 기능은 '사용자가 자신이 무엇을 하고 있는지를 모르는 상황'을 가정합니다. 그 가정 아래 자연스럽게 이후 액션을 발생시켜 사용자의 선택을 존중합니다.

(참고: GoodUI)
https://goodui.org/#8

리덕스 사가의 delay와 race를 사용하면, 리듀서를 고도화하거나 이전 상태(state)를 저장하지 않고도 한번의 실행 취소를 간단하게 구현할 수 있습니다.

```javascript
import { take, put, call, spawn, race } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { updateThreadApi, actions } from 'somewhere';

function* onArchive(action) {
  const { threadId } = action;
  const undoId = `UNDO_ARCHIVE_${threadId}`;

  const thread = { id: threadId, archived: true };

  // 실행취소 UI 요소를 보여줍니다. 그리고 커뮤니케이션을 위한 키(key)를 제공합니다.
  yield put(actions.showUndo(undoId));

  // 낙관적으로, 쓰레드를 `archived`로 표시해둡니다.
  yield put(actions.updateThread(thread));

  // 사용자가 5초 동안 실행 취소를 수행할 수 있게 합니다.
  // 5초가 지나면, 'archive'가 race의 최종 승자가 됩니다.
  const { undo, archive } = yield race({
    undo: take(action => action.type === 'UNDO' && action.undoId === undoId),
    archive: call(delay, 5000),
  });

  // 실행 취소 UI 요소를 감춥니다. race의 최종 답안(answer)이 있을 것입니다.
  yield put(actions.hideUndo(undoId));

  if (undo) {
    // 답안이 undo이면 쓰레드를 이전 상태로 되돌립니다.
    yield put(actions.updateThread({ id: threadId, archived: false }));
  } else if (archive) {
    // 답안이 archive이면, API를 호출하여 변경 사항을 원격으로 적용합니다.
    yield call(updateThreadApi, thread);
  }
}

function* main() {
  while (true) {
    // ARCHIVE_THREAD가 발생할때까지 기다립니다.
    const action = yield take('ARCHIVE_THREAD');
    // onArchive를 실행하기 위해 비차단(non-blocking) 방식으로 `spawn`을 사용합니다.
    // 이는 메인 사가가 취소되었을 때, onArchive도 함께 취소되는 것을 방지합니다.
    // 이는 서버와 클라이언트 간 상태(state)가 동일하게 유지되도록(동기화하도록) 돕습니다.
    yield spawn(onArchive, action);
  }
}
```
