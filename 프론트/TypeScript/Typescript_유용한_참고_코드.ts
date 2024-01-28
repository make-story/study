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
