# v-text, v-html 지시자

# v-on 지시자

<태그이름 v-on:이벤트이름="자바스크립트 표현식 또는 함수 이름" />

# v-on 지시자를 더 간략하게 사용하는 방법이 있는데, v-on을 @로 쓰면 됩니다.

예를 들어 v-on:click="..." 을 쓴다고 하면, @click="..." 으로 대체할 수 있습니다.

# v-show 지시자

v-show 지시자는 지정된 조건이 참(true)일 때만 마크업을 렌더링 합니다.
거짓(false) 이면, Vue 는 인라인으로 CSS의 display 속성을 none 으로 지정합니다.

# v-if 와 v-else 지시자

v-if와 v-else 지시자는 주어진 표현식의 진릿값에 따라 두 가지 선택 중 하나를 표시하는 데 사용됩니다.
v-if와 v-else 지시자를 사용해서 Vue.js 는 (거짓일 때) DOM에서 한 요소를 제거하고, (참일 떄) 다른 요소를 제거합니다.
<span v-if="availableInventory - cartItemCount < 5" class="">테스트</span>

# v-show 와 v-if/v-else 비교

v-show 지시자는 CSS 를 사용해서 요소를 숨기거나 보여 주는 반면, v-if/v-else 지시자는 DOM에서 컨텐츠를 제거합니다.
v-show 지시자는 '다른(else)' 사례가 없을 때 가장 적합합니다.
v-if와 v-else 지시자는 마크업 덩어리 2개 중 하나가 렌더링되어야 할 때 적합한 선택입니다.

# v-model 지시자

폼 혹은 텍스트 영역 입력과 템플릿에 양방향 데이터 바인딩을 생성합니다.
이것으로 애플리케이션 모델의 데이터가 UI와 항상 동기화할 수 있습니다.
<태그이름 v-model="양방향 바인딩 객체" />

# v-model 지시자와 v-bind 지시자의 차이

v-model 은 주로 입력과 폼 바인딩에 사용됩니다. (예를 들어, <input v-model="양방향 데이터 바인딩 객체" />)
v-bind 는 주로 HTML 속성 바인딩에 사용됩니다. (예를 들어, <img v-bind:src="product.image" />)
(v-model 지시자는 사실 v-bind 지시자를 사용)

# v-bind 지시문의 약자를 사용할 수 있습니다.

필요할 때마다 매번 v-bind를 입력할 필요 없이 v-bind 를 빼고 : 을 사용할 수 있습니다.
v-bind:src="..." 대신 :src="..." 로 쓰면 됩니다.

# v-for 지시자

v-for 지시자는 코드나 객체 내 값을 쉽게 나열할 수 있게 합니다.
객체, 배열, 컴포넌트와 함꼐 사용할 수 있습니다.
v-for 지시자를 사용하는 가장 간단한 방법 중 하나는 정수 값을 설정하는 것입니다. (예를 들어, <span v-for="n in 5">+</span>)

# v-bind:class 지시자

예를 들어, <span v-bind:class="{'rating-active': checkRating(n)}" v-for="n in 5">+</span>
