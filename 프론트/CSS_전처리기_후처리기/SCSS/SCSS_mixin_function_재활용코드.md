# 재활용!

https://www.heropy.dev/p/Y7OrPe#h2_%EC%9E%AC%ED%99%9C%EC%9A%A9

Mixin은 두 가지만 기억하면 됩니다.
`선언하기(@mixin)와 포함하기(@include)` 입니다.

# @mixin

```scss
// SCSS
@mixin 믹스인이름 {
  스타일;
}
```

```scss
// SCSS
@mixin large-text {
  font-size: 22px;
  font-weight: bold;
  font-family: sans-serif;
  color: orange;
}
```

Mixin은 선택자를 포함 가능하고 상위(부모) 요소 참조(& 같은)도 할 수 있습니다.

```scss
@mixin large-text {
  font: {
    size: 22px;
    weight: bold;
    family: sans-serif;
  }
  color: orange;

  &::after {
    content: '!!';
  }

  span.icon {
    background: url('/images/icon.png');
  }
}
```

---

# @include

선언된 Mixin을 사용(포함)하기 위해서는 @include가 필요합니다.

```scss
// SCSS
@include 믹스인이름;
```

```scss
// SCSS
h1 {
  @include large-text;
}
div {
  @include large-text;
}
```

```css
h1 {
  font-size: 22px;
  font-weight: bold;
  font-family: sans-serif;
  color: orange;
}
h1::after {
  content: '!!';
}
h1 span.icon {
  background: url('/images/icon.png');
}

div {
  font-size: 22px;
  font-weight: bold;
  font-family: sans-serif;
  color: orange;
}
div::after {
  content: '!!';
}
div span.icon {
  background: url('/images/icon.png');
}
```

---

# 인수(Arguments)

Mixin은 함수(Functions)처럼 인수(Arguments)를 가질 수 있습니다.

```scss
// SCSS
@mixin 믹스인이름($매개변수) {
  스타일;
}
@include 믹스인이름(인수);
```

```scss
@mixin dash-line($width, $color) {
  border: $width dashed $color;
}

.box1 {
  @include dash-line(1px, red);
}
.box2 {
  @include dash-line(4px, blue);
}
```

```css
.box1 {
  border: 1px dashed red;
}
.box2 {
  border: 4px dashed blue;
}
```

## 인수의 기본값 설정

인수(argument)는 기본값(default value)을 가질 수 있습니다.
@include 포함 단계에서 별도의 인수가 전달되지 않으면 기본값이 사용됩니다.

```scss
@mixin 믹스인이름($매개변수: 기본값) {
  스타일;
}
```

```scss
@mixin dash-line($width: 1px, $color: black) {
  border: $width dashed $color;
}

.box1 {
  @include dash-line;
}
.box2 {
  @include dash-line(4px);
}
```

```css
.box1 {
  border: 1px dashed black;
}
.box2 {
  border: 4px dashed black;
}
```

## 키워드 인수(Keyword Arguments)

인수의 변수를 선택하여, 해당 인수의 값만 전달

```scss
@mixin position($p: absolute, $t: null, $b: null, $l: null, $r: null) {
  position: $p;
  top: $t;
  bottom: $b;
  left: $l;
  right: $r;
}

.absolute {
  // 키워드 인수로 설정할 값만 전달
  @include position($b: 10px, $r: 20px);
}
.fixed {
  // 인수가 많아짐에 따라 가독성을 확보하기 위해 줄바꿈
  @include position(fixed, $t: 30px, $r: 40px);
}
```

```css
.absolute {
  position: absolute;
  bottom: 10px;
  right: 20px;
}
.fixed {
  position: fixed;
  top: 30px;
  right: 40px;
}
```

## 가변 인수(Variable Arguments)

```scss
// 인수를 순서대로 하나씩 전달 받다가, 3번째 매개변수($bg-values)는 인수의 개수에 상관없이 받음
@mixin bg($width, $height, $bg-values...) {
  width: $width;
  height: $height;
  background: $bg-values;
}

div {
  // 위의 Mixin(bg) 설정에 맞게 인수를 순서대로 전달하다가 3번째 이후부터는 개수에 상관없이 전달
  @include bg(
    100px,
    200px,
    url('/images/a.png') no-repeat 10px 20px,
    url('/images/b.png') no-repeat,
    url('/images/c.png')
  );
}
```

```css
div {
  width: 100px;
  height: 200px;
  background: url('/images/a.png') no-repeat 10px 20px, url('/images/b.png')
      no-repeat, url('/images/c.png');
}
```

또는 가변인수에서 사용

```scss
@mixin font($style: normal, $weight: normal, $size: 16px, $family: sans-serif) {
  font: {
    style: $style;
    weight: $weight;
    size: $size;
    family: $family;
  }
}
div {
  // 매개변수 순서와 개수에 맞게 전달
  $font-values: italic, bold, 16px, sans-serif;
  @include font($font-values...);
}
span {
  // 필요한 값만 키워드 인수로 변수에 담아 전달
  $font-values: (
    style: italic,
    size: 22px,
  );
  @include font($font-values...);
}
a {
  // 필요한 값만 키워드 인수로 전달
  @include font((weight: 900, family: monospace)...);
}
```

```css
div {
  font-style: italic;
  font-weight: bold;
  font-size: 16px;
  font-family: sans-serif;
}
span {
  font-style: italic;
  font-weight: normal;
  font-size: 22px;
  font-family: sans-serif;
}
a {
  font-style: normal;
  font-weight: 900;
  font-size: 16px;
  font-family: monospace;
}
```

---

# @content

선언된 Mixin에 @content이 포함되어 있다면 해당 부분에 원하는 스타일 블록 을 전달할 수 있습니다.

```scss
@mixin icon($url) {
  &::after {
    content: $url;
    @content;
  }
}
.icon1 {
  // icon Mixin의 기존 기능만 사용
  @include icon('/images/icon.png');
}
.icon2 {
  // icon Mixin에 스타일 블록을 추가하여 사용
  @include icon('/images/icon.png') {
    position: absolute;
  }
}
```

```css
.icon1::after {
  content: '/images/icon.png';
}
.icon2::after {
  content: '/images/icon.png';
  position: absolute;
}
```

---

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
