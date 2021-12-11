# 리액트 훅 - 타입스크립트 타입
https://medium.com/ableneo/typing-of-react-hooks-in-typescript-947b200fa0b0

## Inferring type
```javascript
const [value, setValue] = useState("");   // const value: string
const [value, setValue] = useState(0);    // const value: number
const [value, setValue] = useState(true); // const value: boolean
// const setValue: Dispatch<SetStateAction<State>>
```

## Providing type
`useHook<type>(arg)`
```javascript
const [value, setValue] = useState<string>("");
// const value: string
const [value, setValue] = useState<number>(0);    
// const value: number
const [value, setValue] = useState<boolean>(true); 
// const value: boolean
```

## Typescript Generics
`function useState<State>(initialState: State): [State, ...];`

```javascript
const [value, setValue] = useState<string>("");
// const value: string
// const setValue: Dispatch<SetStateAction<string>>
```


## 사용자 훅
```javascript
import {useEffect, useRef} from "react";

export const usePrevious = <Value = any>(value: Value): Value => {
  const ref = useRef<Value>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};
```