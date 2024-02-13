/**
 * 자주 사용하는 타입스크립트 코드
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

// ---------

/**
 * https://yceffort.kr/2021/05/value-of-typescript
 */

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

// ----------

const LOG_GROUP_KEY = 'logGroup' as const;

type TypedAnyFunction = (...payload: any[]) => any;
type TypedAnyObject = { [key: string | number | symbol]: any };
type TypedLogGroupKey = typeof LOG_GROUP_KEY;

interface OptionsParam {
  [LOG_GROUP_KEY]?: string;
}
// OptionsParam[TypedLogGroupKey]

// ----------

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

// ----------
