https://usehooks.com/  
https://github.com/streamich/react-use  
https://usehooks-ts.com/  
https://blog.bitsrc.io/11-useful-custom-react-hooks-for-your-next-app-c66307cf0f0c

---

# 사용자 정의 훅 (Custom Hooks, 커스텀 훅)

https://react-ko.dev/learn/reusing-logic-with-custom-hooks

`커스텀 훅: 컴포넌트간의 로직 공유`

만들어진 컴포넌트에서 공통된 로직을 찾고, 이를 커스텀 훅으로 만들기!

## 커스텀 훅은 state 자체가 아닌 상태적인 로직(stateful logic)을 공유합니다.

https://react-ko.dev/learn/reusing-logic-with-custom-hooks#custom-hooks-let-you-share-stateful-logic-not-state-itself

```jsx
// 사용자 훅 만들기 전
import { useState } from 'react';

export default function Form() {
  const [firstName, setFirstName] = useState('Mary');
  const [lastName, setLastName] = useState('Poppins');

  function handleFirstNameChange(e) {
    setFirstName(e.target.value);
  }

  function handleLastNameChange(e) {
    setLastName(e.target.value);
  }

  return (
    <>
      <label>
        First name:
        <input value={firstName} onChange={handleFirstNameChange} />
      </label>
      <label>
        Last name:
        <input value={lastName} onChange={handleLastNameChange} />
      </label>
      <p>
        <b>
          Good morning, {firstName} {lastName}.
        </b>
      </p>
    </>
  );
}
```

몇 가지 반복되는 로직이 있습니다.

- firstName, lastName
- handleFirstNameChange, handleLastNameChange
- onChange

```jsx
// 반복 로직을 이 useFormInput 커스텀 훅으로 추출
export function useFormInput(initialValue) {
  const [value, setValue] = useState(initialValue);

  function handleChange(e) {
    setValue(e.target.value);
  }

  const inputProps = {
    value: value,
    onChange: handleChange,
  };

  return inputProps;
}

export default function Form() {
  const firstNameProps = useFormInput('Mary');
  const lastNameProps = useFormInput('Poppins');

  return (
    <>
      <label>
        First name:
        <input {...firstNameProps} />
      </label>
      <label>
        Last name:
        <input {...lastNameProps} />
      </label>
      <p>
        <b>
          Good morning, {firstNameProps.value} {lastNameProps.value}.
        </b>
      </p>
    </>
  );
}
```

`value 라는 state variable(state 변수)를 하나만 선언하는 것을 주목하세요.`
하지만 Form 컴포넌트는 useFormInput 을 두 번 호출합니다.

`커스텀 훅을 사용하면 상태 로직(stateful logic)은 공유할 수 있지만 state 자체는 공유할 수 없습니다.`  
각 훅 호출은 동일한 훅에 대한 다른 모든 호출과 완전히 독립적입니다.

## 여러 컴포넌트 간에 state 자체를 공유해야 하는 경우, 대신 끌어올려 전달하기를 사용하세요.

https://react-ko.dev/learn/sharing-state-between-components

`프레젠테이션(Presentational), 컨테이너(Container) 컴포넌트 패턴!`

- 두 컴포넌트를 조정하려면 해당 컴포넌트의 state를 공통 부모로 이동합니다.
- 그런 다음 공통 부모로부터 props를 통해 정보를 전달합니다.
- 마지막으로 이벤트 핸들러를 전달하여 자식이 부모의 state를 변경할 수 있도록 합니다.
- 컴포넌트를 (props에 의해) “제어”할 지 (state에 의해) “비제어”할지 고려해보는 것은 유용합니다.

```jsx
import { useState } from 'react';

export default function Accordion() {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <>
      <h2>Almaty, Kazakhstan</h2>
      <Panel
        title='About'
        isActive={activeIndex === 0}
        onShow={() => setActiveIndex(0)}
      >
        With a population of about 2 million, Almaty is Kazakhstan's largest
        city. From 1929 to 1997, it was its capital city.
      </Panel>
      <Panel
        title='Etymology'
        isActive={activeIndex === 1}
        onShow={() => setActiveIndex(1)}
      >
        The name comes from <span lang='kk-KZ'>алма</span>, the Kazakh word for
        "apple" and is often translated as "full of apples". In fact, the region
        surrounding Almaty is thought to be the ancestral home of the apple, and
        the wild <i lang='la'>Malus sieversii</i> is considered a likely
        candidate for the ancestor of the modern domestic apple.
      </Panel>
    </>
  );
}

function Panel({ title, children, isActive, onShow }) {
  return (
    <section className='panel'>
      <h3>{title}</h3>
      {isActive ? <p>{children}</p> : <button onClick={onShow}>Show</button>}
    </section>
  );
}
```

## 그외 주의할 점

https://engineering.linecorp.com/ko/blog/line-securities-frontend-3

# 참고 코드

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
