# 쌓임 맥락(stacking context)

https://developer.mozilla.org/ko/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context

---

https://erwinousy.medium.com/z-index%EA%B0%80-%EB%8F%99%EC%9E%91%ED%95%98%EC%A7%80%EC%95%8A%EB%8A%94-%EC%9D%B4%EC%9C%A0-4%EA%B0%80%EC%A7%80-%EA%B7%B8%EB%A6%AC%EA%B3%A0-%EA%B3%A0%EC%B9%98%EB%8A%94-%EB%B0%A9%EB%B2%95-d5097572b82f

1. stacking order가 결정되기위한 다른 가이드라인 중 하나는 element에 position이 설정되었는지 아닌지에 의해 결정

element의 위치를 설정하려면 static이 아닌,
`relative, absolute 와 같은 값을 CSS의 position 속성을 추가`

`이 규칙에 따르면 배치된 요소들은 배치되지않은 요소들의 위에 표시`
(예를 들어, 위에 보이고자 하는 요소에 'position: relative' 설정)

2. stacking order의 다른 측면은 transform 또는 opacity 같은 일부 css 속성들이 element 자체의 새로운 stacking context에 넣는다는 것

transform을 추가하면 z-index가 0인 것처럼 동작한다는 것을 의미합니다.

https://www.w3.org/TR/css-color-3/#transparency

3. 부모의 z-index 레벨 때문에 element가 더 낮은 stacking context 안에 있습니다.

```html
<section class="content">
  <div class="modal"></div>
</section>
<div class="side-tab"></div>
```

```css
.content {
  position: relative;
  z-index: 1;
}
.content .modal {
  position: fixed;
  z-index: 100;
}
.side-tab {
  position: fixed;
  z-index: 5;
}
```

화면을 보면 modal 은 z-index: 100 이므로
side-tab 위에 배치되어야 하지만
modal 의 오버레이는 z-index: 5 인 side-tab 의 밑에 있습니다.

## 해결책 1

modal 을 content 부모의 밖으로  
페이지의 메인 stacking context로 옮깁니다.

```html
<section class="content"></section>
<div class="modal"></div>
<div class="side-tab"></div>
```

## 해결책 2

content에서 position을 제거하여
modal 의 z-index를 제한하지 않도록 합니다.

```css
.content {
  // No position set
}
.modal {
  position: absolute;
  z-index: 100;
}
.side-tab {
  position: absolute;
  z-index: 5;
}
```
