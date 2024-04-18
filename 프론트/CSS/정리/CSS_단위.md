# CSS Unit 단위

https://developer.mozilla.org/ko/docs/Learn/CSS/Building_blocks/Values_and_units

## em

상위요소 사이즈 기준으로 적용

body 에 사이즈를 지정하면, em 이 적용된 모든 자식 요소들은 body 의 폰트 사이즈에 영향을 받음

```css
body {
  font-size: 14px;
}
div {
  font-size: 1.2em; // calculated at 14px * 1.2, or 16.8px
}
```

```html
<div>
  Test (14 * 1.2 = 16.8px)
  <div>
    Test (16.8 * 1.2 = 20.16px)
    <div>Test (20.16 * 1.2 = 24.192px)</div>
  </div>
</div>
```

## rem

최상위 사이즈 기준으로 적용

```css
html {
  font-size: 14px;
}
div {
  font-size: 1.2rem;
}
```

```html
<div>
  Test (14 * 1.2 = 16.8px)
  <div>
    Test (14 * 1.2 = 16.8px)
    <div>Test (14 * 1.2 = 16.8px)</div>
  </div>
</div>
```

## vh & vw (vertical height & vertical width)

뷰포트의 너비값과 높이값

## vmin & vmax

vh 와 vw 이 늘 뷰포트의 너비값과 높이값에 상대적인 영향을 받는다면  
vmin 과 vmax 는 너비값과 높이값에 따라 최대, 최소값을 지정할 수 있음

예를 들어, 모바일 디바이스 가로, 세로 높이 중 값이 더 큰값 기준으로 적용 'vmax', 작은값 기존으로 적용 'vmin'

## ex & ch
