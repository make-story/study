# Axion 인터셉터 (Interceptor)

https://www.timegambit.com/blog/digging/axios/01

```javascript
// 요청 인터셉터 추가
const myInterceptor = axios.interceptors.request.use(
  function (config) {
    // 요청을 보내기 전에 수행할 일
    // ...
    // config.headers.common['Authorization'] = `Bearer ${accessToken}`;
    return config;
  },
  function (error) {
    // 오류 요청을 보내기전 수행할 일
    // ...
    return Promise.reject(error);
  },
);

// 인터셉터 제거
axios.interceptors.request.eject(myInterceptor);

// 응답 인터셉터 추가
axios.interceptors.response.use(
  function (response) {
    // 응답 데이터를 가공
    // ...
    return response;
  },
  function (error) {
    // 오류 응답을 처리
    // ...
    return Promise.reject(error);
  },
);
```

## Axios default 설정

```javascript
axios.defaults.baseURL = 'https://api.example.com';
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded';
```

### config.headers.common

https://github.com/axios/axios?tab=readme-ov-file#global-axios-defaults

node_modules/axios/lib/core/dispatchRequest.js

```javascript
// Flatten headers
config.headers = utils.merge(
  config.headers.common || {},
  config.headers[config.method] || {},
  config.headers,
);
```
