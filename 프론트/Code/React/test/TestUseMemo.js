import React, { useMemo } from 'react';

const getExpensiveJob = (value1, value2) => {
    return '복잡한 계산의 결과값';
};

export const TestUseMemo = ({ value1, value2 }) => {
    // useMemo 훅은 계산량이 많은 함수의 반환값을 재활용하는 용도로 사용된다.
    // useMemo 훅의 첫 번째 매개변수로 함수를 입력한다. useMemo 훅은 이 함수가 반환한 값을 기억한다.
    // useMemo 훅의 두 번째 매개변수는 의존성 배열이다. 의존성 배열이 변경되지 않으면 이전에 반환된 값을 재사용한다.
    const value = useMemo(() => getExpensiveJob(value1, value2), [value1, value2]);
    return <p>{`value is ${value}`}</p>;
};