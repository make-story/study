# 함수(Functions)

함수는 보통 연산된(Computed) 특정 값을 @return 지시어를 통해 반환합니다.

```scss
// Mixins
@mixin 믹스인이름($매개변수) {
  스타일;
}

// Functions
@function 함수이름($매개변수) {
  @return 값
}
```

Mixin은 @include 지시어를 사용하는 반면,
함수는 함수이름으로 바로 사용합니다.

```scss
// Mixin
@include 믹스인이름(인수);

// Functions
함수이름(인수)
```

```scss
$max-width: 980px;

@function columns($number: 1, $columns: 12) {
  @return $max-width * ($number / $columns);
}

.box_group {
  width: $max-width;

  .box1 {
    width: columns(); // 1
  }
  .box2 {
    width: columns(8);
  }
  .box3 {
    width: columns(3);
  }
}
```

```css
.box_group {
  /* 총 너비 */
  width: 980px;
}
.box_group .box1 {
  /* 총 너비의 약 8.3% */
  width: 81.66667px;
}
.box_group .box2 {
  /* 총 너비의 약 66.7% */
  width: 653.33333px;
}
.box_group .box3 {
  /* 총 너비의 25% */
  width: 245px;
}
```
