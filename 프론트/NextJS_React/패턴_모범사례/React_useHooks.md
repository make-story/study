https://usehooks.com/  
https://github.com/streamich/react-use  
https://usehooks-ts.com/  
https://blog.bitsrc.io/11-useful-custom-react-hooks-for-your-next-app-c66307cf0f0c

---

## 커스텀 Hooks 만들기

https://usehooks-ts.com/react-hook/use-interval

`useInputs`

```javascript
import React, { useReducer } from 'react';

function reducer(state, action) {
  return {
    ...state,
    [action.name]: action.value, // <input name="" value="" />
  };
}

export default function useInputs(initialForm) {
  const [state, dispatch] = useReducer(reducer, initialForm);
  const onChange = e => {
    dispatch(e.target);
  };
  return [state, onChange];
}
```

```javascript
import React from 'react';
import useInputs from './customHook/useInputs';

const Info = () => {
  const [state, onChange] = useInputs({ name: '', nickname: '' });
  const { name, nickname } = state;

  return (
    <>
      <input name='name' value={name} onChange={onChange} />
      <input name='nickname' value={nickname} onChange={onChange} />
      <p>
        {name} ({nickname})
      </p>
    </>
  );
};

export default Info;
```

`usePromise`

```javascript
import { useState, useEffect } from 'react';

export default function usePromise(promiseTarget, dependence = []) {
  const [loading, setLoading] = useState(false);
  const [resolve, setResolve] = useState(null); // 정상
  const [reject, setReject] = useState(null); // 에러

  useEffect(() => {
    const process = async () => {
      // 로딩상태 변경
      setLoading(true);
      // 실행
      try {
        const result = await promiseTarget();
        setResolve(result);
      } catch (error) {
        setReject(error);
      }
      // 로딩상태 변경
      setLoading(false);
    };
    process();
  }, dependence);

  return [loading, resolve, reject];
}

/*
-
사용 예

const [loading, response, error] = usePromise(() => {
	return axios.get('url');
}, [category]);
*/
```
