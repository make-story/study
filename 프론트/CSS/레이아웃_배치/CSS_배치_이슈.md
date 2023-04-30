# inline-block 공백 버그

- 아이템 태그의 줄 바꿈을 다르게 하기
- 주석문으로 공백 제거하기
- (추천) 글꼴 크기를 0px 로 지정해서 공백을 업애기

```html
<style>
  .fone-zero {
    font-size: 0;
  }
  .font-zero li {
    font-size: 1rem;
  }
</style>
<ul>
  <li>one</li>
  <li>two</li>
  <li>three</li>
</ul>
```
