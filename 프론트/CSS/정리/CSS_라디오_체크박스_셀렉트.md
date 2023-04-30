# appearance

드롭다운 메뉴에 사용되는 <select> 요소는 웹 브라우저마다 그 모양이 많이 다르고, 스타일을 지정하기도 어려워 사용이 꺼려졌습니다.  
다행히 appearance: none;이라는 새로운 속성을 사용해 꾸미는 것이 간편해졌습니다.

https://svelte.dev/repl/cfa1173dce6a4c6a824947afc9f14355?version=3.57.0

```html
<select>
  <option>초등학생</option>
  <option>중학생</option>
  <option>고등학생</option>
</select>

<style>
  select {
    width: 12rem;
    padding: 1rem;
    border-width: 1px;
    /* Removes browser default style from the element. */
    /* https://developer.mozilla.org/en-US/docs/Web/CSS/appearance */
    appearance: none;
    /* Required in Safari */
    background-color: white;
    /* Use background image to re-implement arrow. */
    background-origin: content-box;
    background-repeat: no-repeat;
    background-position-x: 100%;
    /* chevron-up-down, https://heroicons.com/ */
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='rgb(17,24,39)'%0A%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9' /%3E%3C/svg%3E");
  }
</style>
```
