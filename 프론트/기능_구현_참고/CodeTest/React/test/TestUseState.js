import React, { useState } from 'react';

export const TestUseState = () => {
    // useState 훅이 반환하는 배열의 두 번쨰 원소는 상탯값 변경 함수다.
    // 리액트는 상탯값 변경 함수가 호출되면 해당 컴포넌트를 다시 그린다.  
    // 그 과정에서 자식 컴포넌트도 같이 렌더링된다. 

    // 리액트는 사능하다면 상탯값 변경을 배치(batch)로 처리한다.  
    const [count, setCount] = useState({ value: 0 });
    function onClick() {
        // count.value 상탯값을 두 번 증가시키려고 했다.
        // 하지만 의도와 달리 1만큼만 증가한다. 
        // 이는 상탯값 변경 함수가 비동기로 동작하기 때문이다.
        // 리액트는 효율적으로 렌더링하기 위해 여러 개의 상탯값 변경 요청을 배치로 처리한다.
        setCount({ value: count + 1 });
        setCount({ value: count + 1 });
        // 상탯값 변경 함수의 인수로 함수를 입력할 수 있다.
        // 상탯값 변경 함수로 입력된 함수는 자신이 호출되기 직전의 상탯값을 매개변수로 받는다.
        // 아래 코드에서는 첫 번째 호출에서 변경된 상탯값이 두 번쨰의 호출의 인수로 사용된다.
        setCount(prev => prev + 1);
        setCount(prev => prev + 1); 
    }
    console.log('render called');
    return (
        <div>
            <h2>{count.value}</h2>
            <button onClick={onClick}>증가</button>
        </div>
    );
};