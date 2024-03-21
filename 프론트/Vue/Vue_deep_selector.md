# 딥 셀렉터 (deep selector)

자식 컴포넌트의 CSS(SCSS)를 정의

https://vue-loader.vuejs.org/guide/scoped-css.html#deep-selectors

## 자식 컴포넌트의 CSS에 쉽게 접근이 되지 않는 이유

웹 컴포넌트의 중요한 측면인 스타일 캡슐화 때문  
다시말해서 현재 컴포넌트에 적용된 css(scss) 가 현재의 컴포넌트에만 적용되고 다른 컴포넌트에는 간섭이 되지 않도록 하기 위함  
그래서 Vue 컴포넌트에서 <style> 를 정의할 떄 scoped 를 작성하게 되면 해당 컴포넌트에만 CSS 가 적용됨  
(만약 scoped를 제외하면, 해당 컴포넌트의 CSS 는 전역에 영향을 미치게 됨)

```html
<style scoped>
  .a::v-deep .b {
    /* ... */
  }
</style>
```
