# float

## clip-path, shape-outside

```html
<img id="clip-path" src="http://resrc.devdic.com/img/bysize/below_200/01.png" />
<p>
  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
  standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a
  type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining
  essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
  passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
</p>
```

```css
#clip-path {
  clip-path: circle(50%);
  shape-outside: circle(50%);
  float: left;
}
```

clip-path 기능은 원하는 이미지같은 요소의 주변을 다양한 형태로 가려주는 기능

shape-outside 기능은 주변 요소(텍스트)가 주변을 감싸게 됨

## display: flow-root;

https://jihyehwang09.github.io/2019/02/03/css-layout-float/

flow-root 는 가장 최상위 요소처럼 보여지게 하라는 뜻

float 된 요소랑 float 되지 않은 요소랑 독립되게 하려면, 자식 요소에  
display: flow-root; 를 준다.

```html
<style>
  /* .ex{display: flow-root;} */
  .cf::after {
    content: '';
    display: block;
    clear: both;
  }
</style>
<ul class="ex cf"></ul>
```

- 익스플로러 대응

```css
::after {
  content: ””;
  display: block;
  clear: both;
}
```

자식 요소 중 마지막 요소의 다음에 content가 “”(비어있는) block 요소를 만들고, clear:both를 사용해서 float를 left 또는 right 상관없이 초기화해야 한다.

- iOS 사파리 12 버전 이하에서 지원하지 않는다.
