# Vue Composition API

https://www.peterkimzz.com/nuxt3-auto-scrolling-with-composition-api

Vue 2 방식

기본적으로 Options API 형태

https://vueschool.io/articles/vuejs-tutorials/options-api-vs-composition-api/

```vue
<template>
  <div>count: {{ count }}</div>
  <div>double count: {{ getDoubleCount }}</div>
  <button @click="addCount">Add count</button>
</template>

<script>
export default {
  data() {
    return {
      count: 1,
    };
  },
  computed: {
    getDoubleCount() {
      return this.count * 2;
    },
  },
  methods: {
    addCount() {
      this.count++;
    },
  },
  mounted() {
    console.log('mounted');
  },
};
</script>
```

Vue의 빌트인 기능들을 사용할 때  
count 같은 반응형 데이터와 computed,mounted 같은 라이프사이클 함수들을 호출하는 .vue 파일 안에 위치시켜야 했습니다.  
그리고 특히 이 요소들을 밖으로 빼내서 재사용하기가 어려웠습니다.  
지금은 코드가 짧아서 보기에 문제가 없어보이지만, 코드가 많아졌을 때 원하는 코드를 찾기가 매우 힘들었습니다.

Composition API를 활용해 재사용성을 높인 코드를 봅시다.

```vue
<template>
  <div>count: {{ count }}</div>
  <div>double count: {{ getDoubleCount }}</div>
  <button @click="addCount">Add count</button>
</template>

<script setup>
import { useCount } from './useCount';

const { count, getDoubleCount, addCount } = useCount();
</script>
```

```javascript
import { ref, computed, onMounted } from 'vue';

export function useCount() {
  const count = ref(1);
  const getDoubleCount = computed(() => count.value);

  function addCount() {
    count.value++;
  }

  onMounted(() => {
    console.log('useCount is mounted.');
  });

  return { count, getDoubleCount, addCount };
}
```

ue 빌트인 기능들을 외부로 빼두고 필요한 곳에서 불러다 쓰니,  
호출하는 곳에선 내부 구현에 대해 전혀 알 필요가 없어졌습니다.  
확실하게 관심사를 분리할 수 있게 되었습니다.
