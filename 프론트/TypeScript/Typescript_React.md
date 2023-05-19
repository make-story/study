# 리액트 훅 - 타입스크립트 타입

https://medium.com/ableneo/typing-of-react-hooks-in-typescript-947b200fa0b0

## Inferring type

```typescript
const [value, setValue] = useState(''); // const value: string
const [value, setValue] = useState(0); // const value: number
const [value, setValue] = useState(true); // const value: boolean
// const setValue: Dispatch<SetStateAction<State>>
```

## Providing type

`useHook<type>(arg)`

```typescript
const [value, setValue] = useState<string>('');
// const value: string
const [value, setValue] = useState<number>(0);
// const value: number
const [value, setValue] = useState<boolean>(true);
// const value: boolean
```

## Typescript Generics

`function useState<State>(initialState: State): [State, ...];`

```typescript
const [value, setValue] = useState<string>('');
// const value: string
// const setValue: Dispatch<SetStateAction<string>>
```

## 사용자 훅

```typescript
import { useEffect, useRef } from 'react';

export const usePrevious = <Value = any>(value: Value): Value => {
  const ref = useRef<Value>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};
```

---

# redux

```typescript
interface IProduct {
  imgUrl: string;
}
interface IBandBannerResponse {
  backgroundColor: string;
  imgUrl: string;
  linkUrl: string;
  products: IProduct[];
  text: string;
}

const middle = useSelector((state: RootState) => state.home.bandBanner.middle ?? {}) as IBandBannerResponse;
```

---

# react 유용한 타입스크립트

## PropsWithChildren, ReactElement

```typescript
import React, { PropsWithChildren, ReactElement } from 'react';
import styled from '@emotion/styled';
import { StyledComponentExtendableProps, StyledGutterExtendableProps } from '@/@types/component';
import { css } from '@emotion/react';

export interface DummyBoxProps extends StyledComponentExtendableProps, StyledGutterExtendableProps {
  width?: string | number;
  height?: string | number;
  size?: string | number;
  block?: boolean;
}

const Styled = styled.div<DummyBoxProps>`
  display: ${({ block }) => (block === undefined || !!block ? 'flex' : 'inline-flex')};
  ${({ block, width, height, size }) => {
    size = !isNaN(Number(size)) ? `${size}px` : size;
    width = block ? '100%' : !isNaN(Number(width)) ? `${width}px` : width ?? size;
    height = !isNaN(Number(height)) ? `${height}px` : height ?? size;
    return css`
      width: ${width};
      height: ${height};
    `;
  }};
  background-color: rgba(0, 0, 0, 0.15);
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.15);
  align-items: center;
  justify-content: center;
  text-align: center;
`;

function DummyBox({ children, ...dummyBoxProps }: PropsWithChildren<DummyBoxProps>): ReactElement {
  dummyBoxProps = {
    size: 100,
    ...dummyBoxProps,
  };
  return <Styled {...dummyBoxProps}>{children}</Styled>;
}

export default DummyBox;
```
