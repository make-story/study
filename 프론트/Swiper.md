https://velog.io/@rhtjdrhkd123/20220516-swiper-%EB%A7%A4%EA%B0%9C%EB%B3%80%EC%88%98-%EC%A0%95%EB%A6%AC  


이름 : allowSlideNext 허용슬라이드다음
유형 : boolean
기본 : true
설명 :

false '다음 슬라이드 방향(오른쪽 또는 아래쪽)으로의 스와이프를 비활성화 하려면' 으로 설정합니다.
이름 : allowSlidePrev 허용슬라이드이전
유형 : boolean
기본 : true
설명 :

false '이전 슬라이드 방향(왼쪽 또는 위쪽)으로의 스와이프를 비활성화 하려면' 으로 설정합니다.
이름 : allowTouchMove 터치이동허용
유형 : boolean
기본 : true
설명 :

진실인 경우 false슬라이드를 전환하는 유일한 방법은 slidePrev 또는 slideNext와 같은 외부 API 함수를 사용하는 것입니다.
이름 : autoHeight 자동높이
유형 : boolean
기본 : false
설명 :

거짓으로 설정하면 true 슬라이더 래퍼가 현재 활성 슬라이드의 높이에 맞게 높이를 조정합니다.
이름 : breakpoints 중단점
유형 : object
기본 : -
설명 :

다양한 응답 중단점(화면 크기)에 대해 다른 매개변수를 설정할 수 있습니다. 중단점에서 모든 매개변수를 변경할 수 있는 것은 아니며 slidesPerView, slidesPerGroup, spaceBetween, 와 같이 다른 레이아웃 및 논리가 필요하지 않은 매개변수만 변경할 수 있습니다 grid.rows. 이러한 매개변수는 다음 loop과 같이 effect 작동하지 않습니다.
이름 : breakpointsBase 중단점베이스
유형 : string
기본 : window
설명 :

중단점의 기준(베타). window또는 수 있습니다 container. window(기본적으로) 로 설정하면 중단점 키는 창 너비를 의미합니다. 다음 으로 설정하면 container스와이퍼 컨테이너 너비로 처리되는 중단점 키
이름 : centerInsufficientSlides
유형 : object
기본 : window
설명 :

활성화하면 슬라이드 수가 .보다 적으면 가운데로 슬라이드합니다 slidesPerView. 사용되지 않는 loop모드 및 grid.rows
이름 : centeredSlides 중앙슬라이드
유형 : boolean
기본 : false
설명 :

거짓 인 경우 true활성 슬라이드가 중앙에 배치되며 항상 왼쪽에 있는 것은 아닙니다.
이름 : CenteredSlidesBounds
유형 : boolean
기본 : false
설명 :

거짓인 경우 true활성 슬라이드는 슬라이더의 시작과 끝에 간격을 추가하지 않고 중앙에 배치됩니다. 필수 centeredSlides: true. loop또는 다음과 함께 사용할 수 없습니다. pagination
이름 : containerModifierClass 컨테이너 수정자 클래스
유형 : string
기본 : 'swiper-'
설명 :

다양한 매개변수에 따라 swiper 컨테이너에 추가할 수 있는 modifier CSS 클래스의 시작
이름 : createElements
유형 : boolean
기본 : false
설명 :
활성화되면 Swiper는 자동으로 swiper-wrapper 요소로 슬라이드를 래핑하고 활성화된 탐색,

페이지 매김 및 스크롤바에 필요한 요소를 생성합니다(해당 params 개체 또는 부울 사용 true).
이름 : cssMode
유형 : boolean
기본 : false
설명 :
활성화되면 최신 CSS Scroll Snap API를 사용합니다. Swiper의 모든 기능을 지원하지는 않지만 잠재적으로 간단한 구성에서 훨씬 더 나은 성능을 제공해야 합니다.
활성화된 경우 지원되지 않는 항목은 다음과 같습니다.

큐브 및 카드 효과
speed매개변수는 영향을 미치지 않을 수 있습니다.
모든 전환 시작/종료 관련 이벤트( slideChange대신 사용)
slidesPerGroup제한된 지원이 있습니다
simulateTouch효과가 없고 마우스로 "끌기"가 작동하지 않습니다.
resistance아무런 효과가 없다
allowSlidePrev/Next
swipeHandler
freeMode모든 관련 기능
이름 : direction (방향)
유형 : 'horizontal' | 'vertical'
기본 : 'horizontal'
설명 :

'horizontal'또는 'vertical'(수직 슬라이더의 경우) 일 수 있습니다 .
이름 : edgeSwipeDetection (edgeSwipe 감지)
유형 : string | boolean
기본 : false
설명 :

앱에서 뒤로 밀기 작업을 위한 Swipe 이벤트를 해제하려면 활성화합니다. 다음으로 설정하면 'prevent'대신 시스템 스와이프백 탐색이 방지됩니다.
이름 : edgeSwipeThreshold (edgeSwipe 임계값)
유형 : number
기본 : 20
설명 :

앱에서 뒤로 스와이프하기 위한 터치 이벤트를 해제하기 위한 화면 왼쪽 가장자리의 영역(px)
이름 : effect (효과)
유형 : 'slide' | 'fade' | 'cube' | 'coverflow' | 'flip' | 'creative' | 'cards'
기본 : 'slide'
설명 :

전환 효과. 'slide', 'fade', 'cube', 또는 'coverflow''flip''creative'
이름 : enabled
유형 : boolean
기본 : true
설명 :

Swiper가 처음에 활성화되었는지 여부. Swiper가 비활성화되면 모든 탐색 요소가 숨겨지고 이벤트 및 상호 작용에 응답하지 않습니다.
이름 : focusableElements
유형 : string
기본 : 'input, select, option, textarea, button, video, label'
설명 :

포커스 가능한 요소에 대한 CSS 선택기. 이러한 요소가 "포커스"되어 있으면 스와이프가 비활성화됩니다.
이름 : followFinger
유형 : boolean
기본 : true
설명 :

비활성화된 경우 슬라이더는 놓을 때만 애니메이션이 적용되며 손가락을 잡고 있는 동안에는 움직이지 않습니다.
이름 : grabCursor
유형 : boolean
기본 : false
설명 :

이 옵션은 데스크탑 사용성을 약간 향상시킬 수 있습니다. 인 경우 trueSwiper에 마우스를 올려 놓으면 사용자에게 "잡기"커서가 표시됩니다.
이름 : height
유형 : null | number
기본 : null
설명 :
스위퍼 높이(px). 매개변수는 Swiper 높이를 강제로 허용합니다. Swiper가 숨겨져 있고 올바른 Swiper 초기화를 위해 SSR 및 테스트 환경에서 초기화하는 경우에만 유용합니다.

이 매개변수를 설정하면 Swiper가 응답하지 않습니다.
이름 : init (초기화)
유형 : boolean
기본 : true
설명 :

인스턴스를 생성할 때 Swiper를 자동으로 초기화할지 여부입니다. 비활성화된 경우 호출하여 수동으로 초기화해야 합니다.swiper.init()
이름 : initialSlide (이니셜슬라이드)
유형 : number
기본 : 0
설명 :

초기 슬라이드의 인덱스 번호입니다.
이름 : longSwipes (롱스와이프)
유형 : boolean
기본 : true
설명 :

false긴 스와이프를 비활성화하려면 로 설정하십시오.
이름 : longSwipesMs
유형 : number
기본 : 300
설명 :

길게 스와이프하는 동안 다음/이전 슬라이드로 스와이프를 트리거하는 최소 지속 시간(ms)
이름 : longSwipesRatio
유형 : number
기본 : 0.5
설명 :

길게 스와이프하는 동안 다음/이전 슬라이드로 스와이프를 트리거하는 비율
이름 : loop
유형 : boolean
기본 : false
설명 :
true연속 루프 모드를 활성화하도록 설정
루프 모드 작동 방식의 특성상 중복된 슬라이드가 추가됩니다. 이러한 복제 슬라이드에는 추가 클래스가 있습니다.

swiper-slide-duplicate- 복제된 슬라이드를 나타냅니다.
swiper-slide-duplicate-active- 현재 활성 슬라이드에 복제된 슬라이드를 나타냅니다.
swiper-slide-duplicate-next- 활성 옆에 있는 슬라이드에 복제된 슬라이드를 나타냅니다.
swiper-slide-duplicate-prev- 활성 이전 슬라이드에 복제된 슬라이드를 나타냅니다.
다음 과 함께 사용하는 경우 루프(복제)할 슬라이드의 양과 함께 매개변수 slidesPerView: 'auto'를 지정해야 합니다 .
모드 loopedSlides와 함께 사용하면 안 됩니다.rewind
이름 : loopAdditionalSlides
유형 : number
기본 : 0
설명 :

루프 생성 후 복제될 슬라이드 추가 수
이름 : loopFillGroupWithBlank
유형 : boolean
기본 : false
설명 :

활성화 및 루프 모드는 빈 슬라이드로 슬라이드 수가 부족한 그룹을 채웁니다. slidesPerGroup매개변수 와 함께 사용하면 좋습니다.
이름 : loopPreventsSlide
유형 : boolean
기본 : true
설명 :

활성화되면 전환이 이미 진행 중일 때 Swiper 슬라이드 이전/다음 전환을 방지합니다(활성화된 경우 적용됨 loop)
이름 : loopedSlides
유형 : null | number
기본 : null
설명 :
루프 모드와 함께 사용하는 경우 slidesPerView:'auto'이 매개변수를 사용하여 얼마나 많은 슬라이드를

루프(복제)해야 하는지 Swiper에 알려야 합니다.
이름 : maxBackfaceHiddenSlides
유형 : number
기본 : 10
설명 :

총 슬라이드 수가 여기에 지정된 값보다 적은 경우 Swiper는 backface-visibility: hiddenSafari에서 시각적 "깜박임"을
줄이기 위해 슬라이드 요소를 활성화합니다.
성능을 저하시키므로 많은 양의 슬라이드에서 활성화하지 않는 것이 좋습니다.
이름 : nested
유형 : boolean
기본 : false
설명 :

true올바른 터치 이벤트 차단을 위해 스위퍼 를 켜기로 설정합니다 . 부모와 같은 방향을 사용하는 스와이퍼에만 사용
이름 : noSwiping
유형 : boolean
기본 : true
설명 :

에 지정된 클래스와 일치하는 요소에서 스와이프를 활성화/비활성화합니다.noSwipingClass
이름 : noSwipingClass
유형 : string
기본 : 'swiper-no-swiping'
설명 :
noSwipingClass스와이프를 비활성화할 요소를 지정 하는 대신 사용할 수 있습니다 .

예를 들어 'input'모든 입력에서 스와이프를 비활성화합니다.
이름 : noSwipingSelector
유형 : string
기본 :
설명 :

슬라이드 인덱스를 정규화합니다.
이름 : normalizeSlideIndex
유형 : boolean
기본 : true
설명 :

trueSwiper 상위 요소에 대한 돌연변이도 시청해야 하는 경우 로 설정합니다.
이름 : observeParents
유형 : boolean
기본 : false
설명 :

trueMutations for Swiper 슬라이드 하위 요소도 시청해야 하는 경우 로 설정합니다.
이름 : observeSlideChildren
유형 : boolean
기본 : false
설명 :
trueSwiper 및 해당 요소에서 돌연변이 관찰자를 활성화 하려면 로 설정하십시오 . 이 경우 Swiper는 스타일을 변경

(예: 숨기기/표시)하거나 하위 요소를 수정(예: 슬라이드 추가/제거)할 때마다 업데이트(재초기화)됩니다.
이름 : observer
유형 : boolean
기본 : false
설명 :
trueSwiper 및 해당 요소에서 돌연변이 관찰자를 활성화 하려면 로 설정하십시오 .

이 경우 Swiper는 스타일을 변경(예: 숨기기/표시)하거나 하위 요소를 수정(예: 슬라이드 추가/제거)할 때마다 업데이트(재초기화)됩니다.
이름 : on
유형 : object
기본 :
설명 :

이벤트 핸들러 등록
이름 : passiveListeners
유형 : boolean
기본 : true
설명 :

모바일 장치에서 스크롤 성능을 향상시키기 위해 가능한 경우 수동 이벤트 리스너가 기본적으로 사용됩니다. 그러나 사용해야 e.preventDefault하고 충돌이 있는 경우 이 매개변수를 비활성화해야 합니다.
이름 : preloadImages
유형 : boolean
기본 : true
설명 :

활성화되면 Swiper는 모든 이미지를 강제로 로드합니다.
이름 : preventClicks
유형 : boolean
기본 : true
설명 :

true스와이프하는 동안 링크를 의도하지 않게 클릭하는 것을 방지 하도록 설정
이름 : preventClicksPropagation
유형 : boolean
기본 : true
설명 :

true스와이프하는 동안 링크에서 클릭 이벤트 전파를 중지하려면 로 설정합니다.
이름 : preventInteractionOnTransition
유형 : boolean
기본 : false
설명 :

활성화되면 전환 중에 스와이프 또는 탐색/페이지 매김 버튼으로 슬라이드를 변경할 수 없습니다.
이름 : resistance
유형 : boolean
기본 : true
설명 :

false저항 범위를 비활성화하려면 로 설정하십시오.
이름 : resistanceRatio
유형 : 숫자
기본 : 0.85
설명 :

이 옵션을 사용하면 저항 비율을 제어할 수 있습니다.
이름 : resizeObserver
유형 : boolean
기본 : true
설명 :

활성화되면 swiper 컨테이너에서 ResizeObserver(브라우저에서 지원되는 경우)를 사용하여 컨테이너 크기 조정을 감지합니다(창 크기 조정을 감시하는 대신).
이름 : rewind
유형 : boolean
기본 : false
설명 :
true"되감기" 모드를 활성화하도록 설정합니다 . 활성화된 경우 마지막 슬라이드에서 "다음" 탐색 버튼을 클릭
(또는 호출 .slideNext())하면 첫 번째 슬라이드로 다시 슬라이드됩니다. 첫 번째 슬라이드에서 "이전"
탐색 버튼(또는 .slidePrev())을 클릭하면 마지막 슬라이드로 슬라이드됩니다.

loop모드 와 함께 사용하면 안 됩니다.
이름 : roundLengths
유형 : boolean
기본 : false
설명 :

일반적인 해상도 화면에서 흐릿한 텍스트를 방지하기 위해 슬라이드 너비와 높이 값을 반올림 하도록 설정합니다 true(있는 경우).
이름 : runCallbacksOnInit
유형 : boolean
기본 : true
설명 :
스와이퍼 초기화 시 전환/슬라이드 변경/시작/종료 이벤트가 발생합니다. 이러한 이벤트는 initialSlide가 0이 아니거나

루프 모드를 사용하는 경우 초기화 시 발생합니다.
이름 : setWrapperSize
유형 : boolean
기본 : false
설명 :
이 옵션을 활성화하면 플러그인이 모든 슬라이드의 전체 크기와 동일한 스위퍼 래퍼의 너비/높이를 설정합니다.

대부분 flexbox 레이아웃을 잘 지원하지 않는 브라우저의 호환성 폴백 옵션으로 사용해야 합니다.
이름 : shortSwipes
유형 : boolean
기본 : true
설명 :

false짧은 스와이프를 비활성화하려면 로 설정하십시오.
이름 : simulateTouch
유형 : boolean
기본 : true
설명 :

인 경우 trueSwiper는 터치 이벤트와 같은 마우스 이벤트를 허용합니다(슬라이드를 변경하려면 클릭하고 드래그).
이름 : slideActiveClass
유형 : string
기본 : 'swiper-slide-active'
설명 :
현재 활성 슬라이드의 CSS 클래스 이름

클래스를 변경하면 변경된 클래스를 반영하도록 Swiper의 CSS도 변경해야 합니다.
Swiper Angular/React/Svelte/Vue 구성 요소에서는 지원되지 않습니다.
이름 : slideBlankClass
유형 : string
기본 : 'swiper-slide-invisible-blank'
설명 :
빈 슬라이드의 CSS 클래스 이름이 루프 모드 loopFillGroupWithBlank에서도 활성화된 경우 채우기 그룹에 추가됨

클래스를 변경하면 변경된 클래스를 반영하도록 Swiper의 CSS도 변경해야 합니다.
Swiper Angular/React/Svelte/Vue에서는 지원되지 않습니다.
이름 : slideClass
유형 : string
기본 : 'swiper-slide'
설명 :
슬라이드의 CSS 클래스 이름

클래스를 변경하면 변경된 클래스를 반영하도록 Swiper의 CSS도 변경해야 합니다.
Swiper Angular/React/Svelte/Vue 구성 요소에서는 지원되지 않습니다.
이름 : slideDuplicateActiveClass
유형 : string
기본 : 'swiper-slide-duplicate-active'
설명 :
현재 활성 슬라이드를 나타내는 복제된 슬라이드의 CSS 클래스 이름

클래스를 변경하면 변경된 클래스를 반영하도록 Swiper의 CSS도 변경해야 합니다.
Swiper Angular/React/Svelte/Vue 구성 요소에서는 지원되지 않습니다.
이름 : slideDuplicateClass
유형 : string
기본 : 'swiper-slide-duplicate'
설명 :
루프 모드로 복제된 슬라이드의 CSS 클래스 이름

클래스를 변경하면 변경된 클래스를 반영하도록 Swiper의 CSS도 변경해야 합니다.
Swiper Angular/React/Svelte/Vue에서는 지원되지 않습니다.
이름 : slideDuplicateNextClass
유형 : string
기본 : 'swiper-slide-duplicate-next'
설명 :
활성 슬라이드 옆의 슬라이드를 나타내는 복제된 슬라이드의 CSS 클래스 이름

클래스를 변경하면 변경된 클래스를 반영하도록 Swiper의 CSS도 변경해야 합니다.
Swiper Angular/React/Svelte/Vue에서는 지원되지 않습니다.
이름 : slideDuplicatePrevClass
유형 : string
기본 : 'swiper-slide-duplicate-prev'
설명 :
활성 슬라이드 이전 슬라이드를 나타내는 복제된 슬라이드의 CSS 클래스 이름

클래스를 변경하면 변경된 클래스를 반영하도록 Swiper의 CSS도 변경해야 합니다.
Swiper Angular/React/Svelte/Vue에서는 지원되지 않습니다.
이름 : slideNextClass
유형 : string
기본 : 'swiper-slide-duplicate-next'
설명 :
현재 활성 슬라이드 바로 뒤에 있는 슬라이드의 CSS 클래스 이름

클래스를 변경하면 변경된 클래스를 반영하도록 Swiper의 CSS도 변경해야 합니다.
Swiper Angular/React/Svelte/Vue에서는 지원되지 않습니다.
이름 : slidePrevClass
유형 : string
기본 : 'swiper-slide-next'
설명 :
현재 활성화된 슬라이드 바로 앞에 있는 슬라이드의 CSS 클래스 이름

클래스를 변경하면 변경된 클래스를 반영하도록 Swiper의 CSS도 변경해야 합니다.
Swiper Angular/React/Svelte/Vue에서는 지원되지 않습니다.
이름 : slideToClickedSlide
유형 : string
기본 : 'swiper-slide-prev'
설명 :
슬라이드 로 설정 true하고 클릭하면 이 슬라이드로 전환됩니다.

클래스를 변경하면 변경된 클래스를 반영하도록 Swiper의 CSS도 변경해야 합니다.
Swiper Angular/React/Svelte/Vue에서는 지원되지 않습니다.
이름 : slideVisibleClass
유형 : boolean
기본 : false
설명 :
현재 보이는 슬라이드의 CSS 클래스 이름

클래스를 변경하면 변경된 클래스를 반영하도록 Swiper의 CSS도 변경해야 합니다.
Swiper Angular/React/Svelte/Vue에서는 지원되지 않습니다.
이름 : slidesOffsetAfter
유형 : number
기본 : 0
설명 :

컨테이너 끝에 추가 슬라이드 오프셋(픽셀 단위)을 추가합니다(모든 슬라이드 후).
이름 : slidesOffsetBefore
유형 : number
기본 : 0
설명 :

컨테이너 시작 부분(모든 슬라이드 앞에)에 추가 슬라이드 오프셋(px)을 추가합니다.
이름 : slidesPerGroup
유형 : number
기본 : 1
설명 :

그룹 슬라이딩을 정의하고 활성화할 슬라이드 수를 설정합니다. SlidesPerView > 1과 함께 사용하는 데 유용합니다.
이름 : slidesPerGroupAuto
유형 : boolean
기본 : false
설명 :
slidesPerView: 'auto'이 매개변수는 및 에서만 사용하기 위한 것 slidesPerGroup: 1입니다. 활성화되면 .slideNext()&

.slidePrev()메소드 호출, 탐색 "버튼" 클릭 및 자동 재생에서 보기의 모든 슬라이드를 건너뜁니다.
이름 : slidesPerGroupSkip
유형 : number
기본 : 0
설명 :
매개변수는 다음과 같은 방식으로 작동합니다. slidesPerGroupSkip같음 0(기본값)인 경우 그룹화에서 슬라이드가
제외되지 않으며 결과 동작은 이 변경 사항이 없는 경우와 동일합니다.

slidesPerGroupSkip가 같거나 크면 첫 1번째 X개 슬라이드는 단일 그룹으로 처리되는 반면 모든 다음 슬라이드는slidesPerGroup값으로 그룹화됩니다.
이름 : slidesPerView
유형 : number | 'auto'
기본 : 1
설명 :
보기당 슬라이드 수(슬라이더의 컨테이너에서 동시에 볼 수 있는 슬라이드).

"auto" 값과 함께 사용하는 경우 루프(복제)할 슬라이드의 양과 함께 매개변수 loop: true를 지정해야 합니다.loopedSlides
slidesPerView: 'auto'grid.rows> 1 인 경우 현재 다중 행 모드와 호환되지 않습니다.
이름 : spaceBetween
유형 : number
기본 : 0
설명 :
슬라이드 사이의 거리(px).

"spaceBetween"을 전달하는 Swiper에 들어가는 요소에 "margin" CSS 속성을 사용하면 탐색이 제대로
작동하지 않을 수 있습니다.
이름 : speed
유형 : number
기본 : 300
설명 :

슬라이드 간 전환 기간(ms)
이름 : swipeHandler
유형 : null | CSSSelector | HTMLElement
기본 : null
설명 :
스와이프에 대해 사용 가능한 핸들러로만 작동하는 페이지 매김이 있는 컨테이너의 CSS 선택기 또는

HTML 요소가 있는 문자열
이름 : threshold
유형 : number
기본 : 0
설명 :

임계값(px). "터치 거리"가 이 값보다 낮으면 스와이퍼가 움직이지 않습니다.
이름 : touchAngle
유형 : number
기본 : 45
설명 :

터치 이동을 트리거하는 허용 각도(도)
이름 : touchEventsTarget
유형 : 'container' | 'wrapper'
기본 : 'wrapper'
설명 :

터치 이벤트를 수신할 대상 요소입니다. 'container'(swiper의 터치 이벤트 수신) 또는 'wrapper'(swiper-wrapper의 터치 이벤트 수신)일 수 있습니다
이름 : touchMoveStopPropagation
유형 : boolean
기본 : false
설명 :

활성화하면 "touchmove" 전파가 중지됩니다.
이름 : touchRatio
유형 : number
기본 : 1
설명 :

터치 비율
이름 : touchReleaseOnEdges
유형 : boolean
기본 : false
설명 :

추가 페이지 스크롤을 허용하기 위해 슬라이더 가장자리 위치(시작, 끝)에서 터치 이벤트를 해제하도록 활성화
이름 : touchStartForcePreventDefault
유형 : boolean
기본 : false
설명 :

touchstart( pointerdown) 이벤트 에 대한 기본값을 항상 방지하도록 강제합니다.
이름 : touchStartPreventDefault
유형 : boolean
기본 : true
설명 :

비활성화하면 touchstart( pointerdown) 이벤트가 방지되지 않습니다.
이름 : uniqueNavElements
유형 : boolean
기본 : true
설명 :

기본적으로 활성화되어 있고 탐색 요소의 매개변수가 문자열(예: ".pagination")로 전달되면 Swiper는 먼저 하위 요소를 통해 이러한 요소를 찾습니다. 페이지 매김, 이전/다음 버튼 및 스크롤바 요소에 적용
이름 : updateOnImagesReady
유형 : boolean
기본 : true
설명 :

활성화되면 모든 내부 이미지( 태그)가 로드된 후 Swiper가 다시 초기화됩니다. 필수의preloadImages: true
이름 : updateOnWindowResize
유형 : boolean
기본 : true
설명 :

Swiper는 창 크기 조정(방향 변경) 시 슬라이드 위치를 다시 계산합니다.
이름 : url
유형 : null | string
기본 : null
설명 :

서버 측에서 렌더링되고 기록이 활성화된 경우 활성 슬라이드 감지에 필요합니다.
이름 : userAgent
유형 : null | string
기본 : null
설명 :

사용자 에이전트 문자열. 서버 측에서 렌더링될 때 브라우저/장치 감지에 필요
이름 : virtualTranslate
유형 : boolean
기본 : false
설명 :

이 옵션을 활성화하면 스위퍼가 움직이지 않고 래퍼의 실제 번역 값이 설정되지 않는다는 점을 제외하고 평소와 같이 작동합니다. 사용자 지정 슬라이드 전환을 생성해야 할 때 유용합니다.
이름 : watchOverflow
유형 : boolean
기본 : true
설명 :

활성화되면 Swiper는 비활성화되고 슬라이딩을 위한 충분한 슬라이드가 없는 경우 탐색 버튼을 숨깁니다.
이름 : watchSlidesProgress
유형 : boolean
기본 : false
설명 :

각 슬라이드의 진행 상황과 가시성을 계산하려면 이 기능을 활성화하십시오(뷰포트의 슬라이드에는 추가로 표시되는 클래스가 있습니다).
이름 : width
유형 : null | number
기본 : null
설명 :
스와이퍼 너비(px). 매개변수는 스위퍼 너비를 강제로 허용합니다. Swiper가 숨겨져 있고 올바른 Swiper 초기화를 위한 SSR
및 테스트 환경에서 초기화하는 경우에만 유용합니다.

이 매개변수를 설정하면 Swiper가 응답하지 않습니다.
이름 : wrapperClass
유형 : string
기본 : 'swiper-wrapper'
설명 :
슬라이드 래퍼의 CSS 클래스 이름

클래스를 변경하면 변경된 클래스를 반영하도록 Swiper의 CSS도 변경해야 합니다.
Swiper Angular/React/Svelte/Vue에서는 지원되지 않습니다.
이름 : onAny
유형 : function
기본 :
설명 :

모든 이벤트에서 실행될 이벤트 리스너 추가