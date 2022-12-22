/**
 * 스와이퍼 옵션
 * https://swiperjs.com/swiper-api
 * https://swiperjs.com/react
 * node_modules/swiper/swiper-react.d.ts
 * https://unpkg.com/swiper@6.4.1/swiper-react.d.ts
 */
export interface ISwiperOptions {
  slidesPerView?: 'auto'; // 한 슬라이드에 보여줄 갯수
  direction?: 'horizontal' | 'vertical'; // 방향
  loop?: boolean; // 슬라이드 반복 여부
  loopAdditionalSlides?: number; // 슬라이드 반복 시 마지막 슬라이드에서 다음 슬라이드가 보여지지 않는 현상 수정
  loopedSlides?: number; // slidesPerView:'auto'루프 모드와 함께 사용 하는 경우 이 매개변수를 사용하여 얼마나 많은 슬라이드를 루프(복제)해야 하는지 Swiper에 알려야 합니다.
  speed?: number;
  centeredSlides?: boolean; // true시에 슬라이드가 가운데로 배치
  allowSlideNext?: boolean;
  allowSlidePrev?: boolean;
  allowTouchMove?: boolean; // false시에 스와이핑이 되지 않으며 버튼으로만 슬라이드 조작이 가능
  followFinger?: boolean; // false 경우 슬라이드는 손가락 놓을 때만 애니메이션이 적용되며, 손가락을 잡고 있는 동안에는 움직이지 않습니다.
  watchOverflow?: boolean; // 슬라이드가 1개 일 때 pager, button 숨김 여부 설정
  spaceBetween?: number; // 슬라이드 사이 여백
  slidesOffsetBefore?: number; // 슬라이드 시작 부분 여백
  slidesOffsetAfter?: number; // 슬라이드 시작 부분 여백
  slideActiveClass?: string; // 활성 슬라이드의 CSS 클래스 이름
  slideDuplicateActiveClass?: string;
  slideBlankClass?: string;
  slideClass?: string;
  observeParents?: boolean;
  observeSlideChildren?: boolean;
  observer?: boolean;
  nested?: boolean;
  lazy?:
    | boolean
    | {
        // 지연 로드
        loadPrevNext?: boolean;
      };
  preloadImages?: boolean;
  autoHeight?: boolean; // true로 설정하면 슬라이더 래퍼가 현재 활성 슬라이드의 높이에 맞게 높이를 조정합니다.
  freeMode?: boolean; // 슬라이드 넘길 때 위치 고정 여부
  resistance?: boolean; // 슬라이드 터치에 대한 저항 여부 설정
  slideToClickedSlide?: boolean; // 해당 슬라이드 클릭시 슬라이드 위치로 이동
  // 자동 슬라이드 설정 , 비 활성화 시 false
  autoplay?:
    | boolean
    | {
        // 자동 슬라이드 설정 , 비 활성화 시 false
        delay?: number; // 시간 설정
        disableOnInteraction?: boolean; // false로 설정하면 스와이프 후 자동 재생이 비활성화 되지 않음
        pauseOnMouseEnter?: boolean; // 활성화되면 자동 재생이 Swiper 컨테이너 위로 마우스를 올리면 일시 중지
        stopOnLastSlide?: boolean; // 마지막 슬라이드에 도달하면 자동 재생이 중지
      };
  // 좌우 날개 버튼(슬라이드 좌우 이동 버튼)
  navigation?: {
    nextEl?: string;
    prevEl?: string;
    disabledClass?: string; // 비활성화되면 탐색 버튼에 CSS 클래스 swiper-button-disabled
    hiddenClass?: string; // 탐색 버튼이 숨겨질 때 CSS 클래스 swiper-button-hidden
    lockClass?: string; // 비활성화된 탐색 버튼에 CSS 클래스 swiper-button-lock
  };
  // 페이저 버튼 사용자 설정
  pagination?: {
    el?: string; // 페이저 버튼을 담을 태그 설정
    clickable?: boolean; // 버튼 클릭 여부
    type?: 'bullets' | 'fraction' | 'progressbar' | 'custom';
  };
  // 스와이프 컨트롤러
  controller?: {
    by?: 'slide' | 'container';
    control?: any; // 스와이퍼 인스턴스
  };
  // 이벤트 콜백
  onInit?: any;
  onAfterInit?: any; // 초기화 직후 이벤트가 발생합
  onBeforeInit?: any; // 초기화 직전에 이벤트가 발생
  onSwiper?: any; // Swiper 인스턴스 가져오기
  onSlideChange?: any; // 현재 활성화된 슬라이드가 변경되면 이벤트가 발생
  onSlideChangeTransitionStart?: any; // 다른 슬라이드(다음 또는 이전)로 애니메이션 시작 시 발생
  onSlideChangeTransitionEnd?: any; // 다른 슬라이드(다음 또는 이전)로 애니메이션 후 이벤트가 발생
  onTransitionStart?: any;
  onTransitionEnd?: any;
  onSetTransition?: any; // 스와이퍼가 애니메이션을 시작할 때마다 이벤트가 발생
  onTouchStart?: any; // 사용자가 Swipe를 터치하면 이벤트가 발생
  onTouchMove?: any;
  onSliderMove?: any;
  onTouchEnd?: any;
  onClick?: any;
  onTap?: any;
  onImagesReady?: any; // 모든 내부 이미지가 로드된 직후 이벤트 발생
  onProgress?: any;
  onReachEnd?: any; // Swiper가 마지막 슬라이드에 도달하면 이벤트 발생
  onToEdge?: any; // Swiper가 시작 위치 또는 끝 위치로 이동하면 이벤트가 발생
  onFromEdge?: any; // Swiper가 시작 위치 또는 끝 위치에서 이동할 때 이벤트가 발생
  onRealIndexChange?: any;
  onBeforeResize?: any; // 크기 조정 핸들러 전에 이벤트가 발생
  onResize?: any;
  onSliderFirstMove?: any;
  onSlidesLengthChange?: any;
  onAutoplayStart?: any;
  onAutoplayStop?: any;
  onAutoplay?: any;
  onObserverUpdate?: any; // 관찰자가 활성화되고 DOM 변경 감지하면 이벤트가 발생
}
