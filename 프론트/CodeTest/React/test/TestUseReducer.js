import React, { useReducer } from 'react';

const INITIAL_STATE = {
    name: 'empty',
    age: 0,
};
function reducer(state, action) {
    const { type } = action;
    switch(type) {
        case 'setName':
            return {
                ...state,
                name: action.name,
            };
        case 'setAge':
            return {
                ...state,
                age: action.age,
            };
        default:
            return state;
    }
}
export const TestUseReducer = () => {
    // useReducer 훅을 사용하면 컴포넌트의 상탯값을 리덕스의 리듀서처럼 관리할 수 있다.
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
    return (
        <div>
            <p>{`name is ${state.name}`}</p>
            <p>{`age is ${state.age}`}</p>
            <input 
                type="text"
                value={state.name}
                onChange={e => dispatch({ type: 'setName', name: e.currentTarget.value })}
            />
            <input  
                type="number"
                value={state.age}
                onChange={e => dispatch({ type: 'setAge', age: e.currentTarget.value })}
            />
        </div>
    );
};