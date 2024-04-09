/**
 * 자주 사용하는 타입스크립트 코드
 *
 * https://velog.io/@familyman80/%EB%A6%AC%EC%95%A1%ED%8A%B8-%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-CheatSheet-apfc48by
 * https://react-typescript-cheatsheet.netlify.app/docs/advanced/patterns_by_usecase/#wrappingmirroring
 */

export const MenuPageCornerId = {
  MAIN_UPPER: 'M01_main_m.16',
  MAIN_MIDDLE: 'M01_main_m.21',
  MAIN_BOTTOM: 'M01_main_m.26',
  GIFT_MIDDLE: 'M01_giftRecommend_m.1',
  BRAND_MANUAL_1: 'M01_brandMain_m.1',
  BRAND_MANUAL_2: 'M01_brandMain_m.2',
  LIVE: 'M01_main_m.30',
} as const;

export type MenuPageCornerIdType =
  (typeof MenuPageCornerId)[keyof typeof MenuPageCornerId];

function test(payload: MenuPageCornerIdType) {
  console.log(payload);
}
test(MenuPageCornerId.LIVE);

// --

/**
 * https://yceffort.kr/2021/05/value-of-typescript
 */

type Padding1 = 'small' | 'medium' | 'large';
//     ^?
const padding1: Record<Padding1, number> = {
  small: 1,
  medium: 2,
  large: 3,
};
const padding2 = {
  small: 1,
  medium: 2,
  large: 3,
};
type Padding2Keys = keyof typeof padding2; // "small" | "medium" | "large"
type Padding2Values = (typeof padding2)[keyof typeof padding2];

// interface key 리스트를 타입으로 변환
type KeysOf<T> = {
  [K in keyof T]: K;
}[keyof T];

// interface value 리스트를 타입으로 변환
type ValuesOf<T> = T[keyof T];

const object1 = {
  a: 1,
  b: 2,
  c: 3,
};
type objectShape1 = typeof object1;
/*
type objectShape = {
  a: number
  b: number
  c: number
}
*/
const object2 = {
  a: 1,
  b: 2,
  c: 3,
} as const;
type objectShape2 = typeof object2;
/*
type objectShape = {
  readonly a: 1
  readonly b: 2
  readonly c: 3
}
*/
type keys = keyof objectShape2; // "a" | "b" | "c"
type values = objectShape2[keys]; // 1 | 2 | 3

// --

/**
 * API_TYPE 객체에 선언된 값만 하위 객체에서 선언할 수 있도록 종속관계
 */

// 각 API별 구분 값
export const API_TYPE = {
  TEST: 'TEST', // 테스트 데이터 URL
  DEFAULT: 'DEFAULT',
} as const;

// 기본 공통 URL (Axios baseUrl)
export const API_BASE_URL: Record<
  (typeof API_TYPE)[keyof typeof API_TYPE],
  string
> = {
  [API_TYPE.TEST]: 'https://jsonplaceholder.typicode.com',
  [API_TYPE.DEFAULT]:
    process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL || '',
} as const;

// 각 API별 Path
export const API_PATH: Record<
  (typeof API_TYPE)[keyof typeof API_TYPE],
  { [key: string | number | symbol]: any }
> = {
  [API_TYPE.TEST]: {
    LIST: '/todos',
  },
  [API_TYPE.DEFAULT]: {},
} as const;

// --

type MessageCallback = (message: string) => void;
type ConnectionCallback = (ws: WebSocket) => void;
type OpenCallback = () => void;

interface CallbackMap {
  message?: MessageCallback;
  connection?: ConnectionCallback;
  open?: OpenCallback;
}

type ValidateCallback<T> = {
  [K in keyof T]: T[K] extends (...args: infer Args) => void
    ? (...args: Args) => void
    : never;
};
type ValidatedCallbacks = ValidateCallback<CallbackMap>;

// Usage example:
const validatedCallbacks: ValidatedCallbacks = {
  message: (message: string) => {
    // Your implementation here
  },
  connection: (ws: WebSocket) => {
    // Your implementation here
  },
  open: () => {
    // Your implementation here
  },
};

// --

const LOG_GROUP_KEY = 'logGroup' as const;

type TypedAnyFunction = (...payload: any[]) => any;
type TypedAnyObject = { [key: string | number | symbol]: any };
type TypedLogGroupKey = typeof LOG_GROUP_KEY;

interface OptionsParam {
  [LOG_GROUP_KEY]?: string;
}
// OptionsParam[TypedLogGroupKey]

// --

export interface Observable {
  observe(handler: Function): void;
}

export function makeObservable<T extends object>(target: T): T & Observable {
  const handlers = Symbol('handlers');

  // 핸들러를 저장할 곳을 초기화합니다.
  (target as any)[handlers] = [];

  // 나중에 호출될 것을 대비하여 핸들러 함수를 배열에 저장합니다.
  (target as Observable).observe = function (handler: Function) {
    (this as any)[handlers].push(handler);
  };

  // 변경을 처리할 프락시를 만듭니다.
  return new Proxy(target, {
    set(target, property, value, receiver) {
      let success = Reflect.set(target, property, value, receiver); // 동작을 객체에 전달합니다.
      if (success) {
        // 에러 없이 프로퍼티를 제대로 설정했으면
        // 모든 핸들러를 호출합니다.
        (target as any)[handlers].forEach((handler: Function) =>
          handler(property, value),
        );
      }
      return success;
    },
  }) as T & Observable;
}

// 예제 사용
let user: { [key: string]: any } = {};
user = makeObservable(user);
user.observe((key: string, value: any) => {
  alert(`SET ${key}=${value}`);
});
user.name = 'John';

// --

/**
 * 함수 리턴 타입
 */
type Params = FetchConfigParams & FetchInterceptorParams;
export interface FetchManagerParams extends Params {
  test?: boolean; // 테스트 전용
}
const createFetchManager = (params: FetchManagerParams = {}) => {
  return {
    TEST: 'test',
  } as const;
};
type FetchManager = ReturnType<typeof createFetchManager>;

/**
 * promise
 * https://bobbyhadz.com/blog/typescript-function-return-type-promise
 */

// ✅ Named function
function getPromise(): Promise<number> {
  return Promise.resolve(5);
}

// 👇️ Unwrap promise type if necessary
// 👇️ type T = number
type T = Awaited<ReturnType<typeof getPromise>>;

// ✅ Named async function
async function getPromise2(): Promise<number> {
  return 10;
}

// ✅ Arrow function
const getPromise3 = (): Promise<string> => {
  return Promise.resolve('bobbyhadz.com');
};

async function getPromise4(): Promise<string | null> {
  if (Math.random() > 0.5) {
    return null;
  }

  return 'bobbyhadz.com';
}
