# Axios와 Retry (Retrying XHR calls)

https://genie-youn.github.io/journal/axios%EC%99%80_retry.html

axios는 실패시 체인의 중간단계에서나 설정을 통한 retry를 제공하지 않는다.  
사용자가 직접 구현해 주어야 하는데, 방법은 크게 다음과 같다.

참고: Retry를 몇 초마다 요청하는게 좋은가요?

https://www.google.com/search?rlz=1C5CHFA_enKR919KR919&ei=Dg09YKn8NsXd-QbI8LjABA&q=Exponential+backoff&oq=Exponential+backoff&gs_lcp=Cgdnd3Mtd2l6EAMyAggAMgIIADICCAAyAggAMgIIADICCAAyAggAMgIIADICCAAyAggAULRTWLRTYMRiaABwAHgAgAHZAYgB0AKSAQUwLjEuMZgBAKABAqABAaoBB2d3cy13aXrAAQE&sclient=gws-wiz&ved=0ahUKEwipu4KEuY_vAhXFbt4KHUg4DkgQ4dUDCA0&uact=5

## Interceptor 활용

실패시 인터셉터로 잡아 재시도 하는 방법이다. axios 개발팀도 이 방법을 권하고 있다.

참고: Axios 팀에서도 Retry를 작성할 때는 interceptor를 이용하라는 답변  
https://github.com/axios/axios/issues/934#issuecomment-322003342

```javascript
axios.interceptors.response.use(null, (error) => {
  if (error.config && error.response && error.response.status === 401) {
    return updateToken().then((token) => {
      error.config.headers.xxxx <= set the token
      return axios.request(config);
    });
  }

  return Promise.reject(error);
});
```

https://github.com/axios/axios/issues/934#partial-timeline

참고 코드

https://codesandbox.io/p/sandbox/axios-retry-p0hrc?file=%2Fsrc%2Fapi.js%3A1%2C1-34%2C1

```javascript
import axios from 'axios';

export const customAxiosInstance = () => {
  const axiosInstance = axios.create({
    timeout: 100,
    headers: {
      'Cache-Control': 'no-cache',
    },
  });

  const onFulfilled = response => response;

  const retry = errorConfig => {
    return new Promise(resolve => {
      setTimeout(() => {
        console.log('retry');
        resolve(axiosInstance.request(errorConfig));
      }, 10000);
    });
  };

  const onRejected = error => {
    if (error.config) {
      return retry(error.config);
    }

    return Promise.reject(error);
  };

  axiosInstance.interceptors.response.use(onFulfilled, onRejected);

  return axiosInstance;
};
```

```javascript
const fetchData = async () => {
  try {
    const apiRequest = customAxiosInstance();
    const data = await apiRequest.get(API_URL);
  } catch {
    // ...
  }
};
```

## axios-retry 라이브러리 사용

또 다른 방법은 서드파티 라이브러리인 axios-retry를 사용하는 방법이다.

```
$ npm install axios-retry
```

```javascript
// ES6
import axiosRetry from 'axios-retry';

axiosRetry(axios, { retries: 3 });

axios
  .get('http://example.com/test') // The first request fails and the second returns 'ok'
  .then(result => {
    result.data; // 'ok'
  });

// Exponential back-off retry delay between requests
axiosRetry(axios, { retryDelay: axiosRetry.exponentialDelay });

// Custom retry delay
axiosRetry(axios, {
  retryDelay: retryCount => {
    return retryCount * 1000;
  },
});

// Works with custom axios instances
const client = axios.create({ baseURL: 'http://example.com' });
axiosRetry(client, { retries: 3 });

client
  .get('/test') // The first request fails and the second returns 'ok'
  .then(result => {
    result.data; // 'ok'
  });

// Allows request-specific configuration
client
  .get('/test', {
    'axios-retry': {
      retries: 0,
    },
  })
  .catch(error => {
    // The first request fails
    error !== undefined;
  });
```

---

# saga 에러 핸들링 패턴

https://redux-saga.js.org/docs/recipes#retrying-xhr-calls  
https://redux-saga.js.org/docs/api/#retrymaxtries-delay-fn-args

# 특수문자 대응

기본적으로 `axios.get('URL', { params })` GET 파라미터 데이터를 .get 함수 두번째 값에 추가할 경우,  
해당 값은 자동 URL인코딩이 된다.  
그러나 '[', ']' 등 일부 특수문자는 인코딩이 되지 않는다.  
이 경우, 'axios.get(`auto-complete?keyword=${encodeURIComponent(keyword)}`)' 형태로 작업해야 한다.

```javascript
import qs from 'query-string';

/**
 * Params Object를 String으로 선형화하는 Utility
 * - axios의 paramsSerializer 옵션으로 사용
 * - axios v0.x에서 `[`, `]`등의 문자가 Url String으로 Encode 되지 않는 문제에 대응
 *   - 관련이슈: https://github.com/axios/axios/issues/3316
 * - Array 포멧 변환
 *   - { a: [1, 2] } 전달 시
 *     - 적용 전 - a[]=1&a[]=2
 *     - 적용 시 - a=1,2
 *
 * @param params Get Parameters Object
 *
 * @example
 * const fetchData = (params) =>
 *   axios.get('apis/endpoint', {
 *     params,
 *     paramsSerializer,
 *   })
 */
const paramsSerializer = params =>
  qs.stringify(params, { arrayFormatSeparator: ',' });

export default paramsSerializer;
```
