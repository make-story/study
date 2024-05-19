# Nuxt 릴리즈 (Release, 버전변경, ChangeLog)

Nuxt2 와 Nuxt3 의 차이점

## 디렉토리 관련 변경 사항

1. Auto-import 추가

Nuxt3는 Auto-import를 지원한다. 따라서 /pages, /components, /composables, /utils 등의 폴더를 생성하고 거기에 각각 파일을 추가하면 별도의 import 없이 코드를 사용할 수 있다.1. 디렉토리 관련 변경 사항

```javascript
// /components/intro.tsx
<template>
  <div class="root">
    <h1>Welcome to Nuxt</h1>
  </div>
</template>
<style></style>
```

```javascript
// app.vue
<template>
  <div>
    <Intro />
  </div>
</template>
```

물론 개발자의 선호도에 따라 기존의 명시적 import를 사용하거나 nuxt.config.ts 파일에서 Auto-import를 비활성화할 수도 있다.

```javascript
// nuxt.config.ts
export default defineNuxtConfig({
  imports: {
    autoImport: false,
  },
});
```

2. 설정 파일 문법 변경

Nuxt3로 넘어오면서 설정에 관련된 파일 작성 문법도 변경되었다. 기존에는 작성한 파일을 단순하게 export만하는 형식이었다면, Nuxt3에서는 defineNuxtConfig, defineNuxtPlugin과 같은 Nuxt에서 자체적으로 지원하는 함수의 파라미터로 설정 값들을 넣는다. 대표적으로 nuxt.config.ts 설정 파일과 /plugins 폴더 안에 위치한 플러그인 파일들이 이에 해당한다.

```javascript
// Nuxt2의 nuxt.config.js
export default {
  router: {
    extendRoutes (routes) {
      ...
    }
  }
}
```

```javascript
// Nuxt3의 nuxt.config.ts
export default defineNuxtConfig({
  hooks: {
    'pages:extend' (routes) {
      ...
    }
  }
})
```

3. 정적 파일 폴더 변경

정적인 icon 또는 image를 저장하던 static 폴더가 Nuxt3로 버전 업되면서 public 폴더로 이름이 변경되었다.

## Composition API 공식 지원

Nuxt2는 기본적으로 Options API 형태이다.

Options API는 적응하기 쉽지만 코드의 규모가 커질수록 이를 관리하기 어렵고 재사용성이 어렵다는 단점이 있다.  
이를 보완하기 위해 보다 유연한 형태인 Composition API 형태로도 코드를 작성할 수 있으나,  
Nuxt-bridge를 추가적으로 설치해야 하고 공식 지원이 아니기에 불안정하다는 문제점이 존재한다.

Nuxt3 에서는 기본적으로 Composition API 형태를 지원하며, 또한 이를 권장하고 있다.  
Composition API 문법은 ref, computed 등  
React 의 useState, useEffect 등과 유사한 hook 을 지원하는데 동작 방식은 비슷하기에 기존에 React를 사용했던 사람이라면 손쉽게 적응할 수 있다는 장점이 있다.

```javascript
// Options API
<script>
export default {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    increment(){
      this.count++
    }
  }
}
</script>
```

```javascript
// Composition API
<script setup lang='ts'>
  const count = ref(0); const increment = () => count.value++;
</script>
```

## TypeScript 공식 지원

Nuxt2 는 기본적으로 TypeScript를 지원하지 않으므로,  
TypeScript 사용을 위해선 프로젝트 생성 후, 추가적으로 라이브러리를 설치하고 별도의 설정을 해야했다.  
반면에 Nuxt3는 설치할때 TypeScript 적용 유무를 선택할 수 있어서 별도의 추가적인 설정 없이 손쉽게 TypeScript를 설치할 수 있다.

## 마이크레이션, 2 > 3

https://nuxt.com/docs/migration/overview

https://velog.io/@swj9077/Nuxt2%EC%97%90%EC%84%9C-Nuxt3%EB%A1%9C-%EB%A7%88%EC%9D%B4%EA%B7%B8%EB%A0%88%EC%9D%B4%EC%85%98-%EB%8F%84%EC%A0%84%EA%B8%B0

디렉토리 이동 및 코드 수정

Nuxt2의 파일과 코드를 Nuxt3에 맞게 수정하는 일이었다. 이 부분이 가장 어려웠는데 그 과정은 아래와 같았다.

1. 기존 프로젝트의 root 폴더 하위의 모든 폴더를 복사해서 새 프로젝트에 덮어쓰기를 하고, /static 폴더의 이름을 /public으로 변경한다.
2. nuxt.config.ts 파일과 /plugin 폴더 안의 파일들을 Nuxt3의 문법으로 수정한 후, nuxi dev 명령어로 Nuxt를 실행한다.
3. Nuxt 실행 단계에서 오류가 나는 부분들을 모두 수정한다.
4. 전체적인 페이지 레이아웃을 담당하는 /layouts/default.vue 파일과 그와 관련된 컴포넌트들부터 Composition API로 전환한다.
5. TypeScript 적용을 위해 root 폴더에 /types 폴더를 만들고 타입을 정의한다.
