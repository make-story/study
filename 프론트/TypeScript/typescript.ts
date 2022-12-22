export const MenuPageCornerId = {
    MAIN_UPPER: 'M01_main_m.16',
    MAIN_MIDDLE: 'M01_main_m.21',
    MAIN_BOTTOM: 'M01_main_m.26',
    GIFT_MIDDLE: 'M01_giftRecommend_m.1',
    BRAND_MANUAL_1: 'M01_brandMain_m.1',
    BRAND_MANUAL_2: 'M01_brandMain_m.2',
    LIVE: 'M01_main_m.30',
} as const;

export type MenuPageCornerIdType = typeof MenuPageCornerId[keyof typeof MenuPageCornerId];

function test(payload: MenuPageCornerIdType) {
    console.log(payload);
}
test(MenuPageCornerId.LIVE);