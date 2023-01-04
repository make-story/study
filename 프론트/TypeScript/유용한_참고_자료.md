# 강제 형변환
특정 타입에서 에러
```typescript
import { IncomingMessage, ServerResponse } from 'http';

const test = (req: IncomingMessage, res: ServerResponse) => {
    // express cookie-parser 미들웨어 활용 중 쿠키접근
    (req as any).cookies?.test || '';
};
```


# keyof - 속성 이름을 타입으로 사용

`인덱싱 가능 타입에서 keyof를 사용하면 속성 이름을 타입으로 사용`

```typescript
interface ICountries {
  KR: '대한민국';
  US: '미국';
  CP: '중국';
}
// key 로 접근
type TKeys = keyof ICountries; // 'KR' | 'US' | 'CP'
let country1: TKeys;
country1 = 'KR'; // ok
country1 = 'RU'; // Error - TS2322: Type '"RU"' is not assignable to type '"KR" | "US" | "CP"'.

// value 로 접근
type TValues = ICountries[keyof ICountries]; // ICountries['KR' | 'US' | 'CP']
let country2: TValues;
country2 = '대한민국';
country2 = '러시아'; // Error - TS2322: Type '"러시아"' is not assignable to type '"대한민국" | "미국" | "중국"'.
```

`const - readonly`

```typescript
export const TAB = {
  HOME: 'home', // 홈
  INTRODUCE: 'introduce', // 소개
  RESERVE: 'reserve', // 예약
  NOTICE: 'notice', // 소식
} as const;

// object 로 접근
export type TTab = typeof TAB;

// key 로 접근
export type TTabKey = keyof typeof TAB; // TAB 의 key

// value 로 접근
export type TTab = typeof TAB[keyof typeof TAB]; // TAB 의 key 의 value
```

`enum`

```typescript
enum sample_keys {
  TypeScript,
  JavaScript,
  ExpressJS,
  NodeJS,
  NextJS,
}

type keyofEnum = keyof typeof sample_keys;
```
