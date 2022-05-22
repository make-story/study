import React, { useCallback, useState } from 'react';

const fetchServer = (name, age) => {
    // api 통신
};
const UserEdit = ({ onSave, setName, setAge }) => {
    return <div></div>;
};

export const TestUseCallback = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState(0);

    // useMemo 훅은 로다시 같은 라이브러리에서 제공해 주는 메모이제이션과 비슷하다.
    // 반면에 useCallback은 리액트의 렌더링 성능을 위해 제공되는 훅이다.
    // 컴포넌트가 렌더링될 때마다 새로운 함수를 생성해서 자식 컴포넌트의 속성 값으로 입력하는 경우가 많다.
    // 리액트 팀에서는 최근의 브라우저에서 함수 생성이 성능에 미치는 영향은 적다고 주장한다.
    // 그보다는 속성값이 매번 변경되기 때문에 자식 컴포넌트에서 React.memo 를 사용해도 불필요한 렌더링(새롭게 생성된 함수에 따른 props 변경발생)이 발행한다는 문제점이 있다.

    // useCallback 훅이 필요한 예
    // 현재 컴포넌트가 렌더링 될 때마다 UserEdit 컴포넌트의 onSave 속성값으로 새로운 함수가 입력된다.
    // 따라서 UserEdit 컴포넌트에서 React.memo 를 사용해도 onSave 속성값이 항상 변경되고 그 때문에 불필요한 렌더링이 발생한다.
    // useCallback 훅을 사용하면 불필요한 렌더링을 막을 수 있다.
    const onSave = useCallback(() => fetchServer(name, age), [name, age]);
    return (
        <div>
            <p>{`name is ${name}`}</p>
            <p>{`age is ${age}`}</p>
            <UserEdit
                //onSave={()=>fetchServer(name, age)} // 일반적인 경우 - 현재 컴포넌트 렌더링시 마다 함수가 새로 생성되며, UserEdit 재렌더링 발생됨
                onSave={onSave} // useCallback 사용한 경우 - 현재 컴포넌트 렌더링시 마다 새로운 함수를 생성하지 않음
                setName={setName}
                setAge={setAge}
            />
        </div>
    );
};