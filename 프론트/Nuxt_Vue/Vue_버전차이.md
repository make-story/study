# Vue 버전차이, 릴리즈 (Release, 버전변경, ChangeLog)

https://velog.io/@dev-junku/Vue-2-Vue-3-%EC%A0%95%EB%A6%AC

https://velog.io/@lire_eruel/TIL-Vue-2%EC%99%80-Vue-3%EC%9D%98-%EC%B0%A8%EC%9D%B4

## Creating App

Vue2

```javascript
import Vue from 'vue';
import App from './App.vue';

// 배포 팁
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
```

Vue3

```javascript
import { createApp } from 'vue';
import App from './App.vue';
import './index.css';

createApp(App).mount('#app');
```

## Multiple Root

Vue2

```javascript
<template>
  <div>
    <p>test</p>
    <button>button</button>
  </div>
</template>
```

Vue3

```javascript
<template>
  <p>test</p>
  <button>button</button>
</template>
```

## Computed 를 사용하는 방법의 차이

- Vue2 에서는 computed 블록 안에 계산될 값들을 넣어야 했다.
- Vue3 에서는 setup() 안에서 변수 선언시 computed(() => {return \_}); 형식으로 사용이 가능하다.

## Watch를 사용하는 방법의 차이

Vue2

```javascript
export default {
  watch: {
    name(newVal, oldVal) {
      console.log(`${newVal} ${oldVal}`);
    },
  },
};
```

Vue3

```javascript
const name = ref('');
watchEffect(() => {
  console.log(name.value);
});
```

## Composition API(setup)

변경한 이유 (Evan You, Vue 의 창시자가 답변한 것)  
https://github.com/vuejs/core/issues/41#issuecomment-514747379

https://velog.io/@dev-junku/Vue-2-Vue-3-%EC%A0%95%EB%A6%AC

setup 함수 안에 작성

- methods
- data
- lifecycle hooks(onCreate, created 등)
- watch

```vue
<template>
  <div>
    <h1>출입문</h1>
    <p>{{ welcomeMessage }}</p>
    <button @click="leave">떠나기</button>
  </div>
</template>

<script>
import { reactive, ref, computed, watch, onMounted } from 'vue'; // 쓸 항목을 미리 import합니다.
export default {
  // setup 에서 { attribute, slots, emit }와 같이 작성한 이유는 context를 객체 형태로 받기 때문인거 같습니다.
  // 저도 이건 찾아보진 못했어요.
  setup(prop, { attribute, slots, emit }) {
    const state = reactive({
      name: 'Dooly',
      visitCount: 0,
    }); // vue 3 에서는 데이터를 통제할 때 이제 data를 사용하지 않고 setup내에서 vanilla js 처럼 그냥 변수를 생성합니다.

    const leave = () => {
      // methods도 이런 방식으로 사용합니다.
      state.visitCount = 0; // 뭔가 Vue 2 보다 더 js 스러운 느낌이 들지 않나요?
    };

    // hook에 해당하는 항목들을 위에서 사전에 import하고
    // setup 안에 실행함수를 넣으면 해당 훅 조건에 맞게 실행되요!
    // 참고로 Vue 2 → Vue 3 로 변경되면서 바뀐 라이프 사이클은 공식문서에서 확인하실 수 있어요!
    // 명칭과 주기가 좀 바뀐게 있습니다. Composition API 때문에..
    onMounted(() => {
      console.log('component mounted!');
    });

    const welcomeMessage = computed(() => `${state.name}님 환영합니다`);

    watch(
      () => state.visitCount,
      (value, prev) => {
        console.log(`${state.name}님 ${value}회 방문`);
      },
    );

    // 필요한 데이터는 그냥 한 번에 return 합니다.
    return {
      state,
      leave,
      welcomeMessage,
    };
  },
};
</script>
```

## Vue Router

https://router.vuejs.kr/guide/migration/
