# Vue CSS

https://ux.stories.pe.kr/261

## scoped를 유지하며 자식 컴포넌트에 css를 적용하기

https://vue-loader.vuejs.org/guide/scoped-css.html#deep-selectors

컴포넌트를 만들때 스타일에 scoped를 적용하는 것은 중요하기 때문에 이걸 해제하지 않고  
자식 컴포넌트의 css를 적용하려면 딥셀럭터(v-deep)를 사용해야 합니다.

딥셀렉터를 적용하는 방법은 3가지가 있습니다.

```html
<style scoped>
  .a >>> .b {
    /* ... */
  }
</style>
```

```html
<style scoped>
  .a /deep/ .b {
    /* ... */
  }
</style>
```

이 방법을 추천함 (다른 2가지 방법은 css에서 사용은 문제가 없으나 scss, sass, less같은 전처리기에서는 잘 인식이 되지 않는 경우가 있습니다.)

```html
<style scoped>
  .a::v-deep .b {
    /* ... */
  }
</style>
```
