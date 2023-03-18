반복적으로 사용되는 값을 변수로 지정할 수 있습니다.
`변수 이름 앞에는 항상 $를 붙입니다.`

```
$변수이름: 속성값;
```

```scss
$color-primary: #e96900;
$url-images: '/assets/images/';
$w: 200px;

.box {
  width: $w;
  margin-left: $w;
  background: $color-primary url($url-images + 'bg.jpg');
}
```

```css
.box {
  width: 200px;
  margin-left: 200px;
  background: #e96900 url('/assets/images/bg.jpg');
}
```

---

## 변수 유효범위(Variable Scope)

`선언된 블록({}) 내에서만 유효범위`를 가집니다.

```scss
.box1 {
  $color: #111;
  background: $color;
}
// Error
.box2 {
  background: $color;
}
```

---

## 변수 재 할당(Variable Reassignment)

변수에 변수를 할당할 수 있습니다.

```scss
$red: #ff0000;
$blue: #0000ff;

$color-primary: $blue;
$color-danger: $red;

.box {
  color: $color-primary;
  background: $color-danger;
}
```

```css
.box {
  color: #0000ff;
  background: #ff0000;
}
```

---

## !global (전역 설정)

!global 플래그를 사용하면 변수의 유효범위를 전역(Global)로 설정할 수 있습니다.

```scss
.box1 {
  $color: #111 !global;
  background: $color;
}
.box2 {
  background: $color;
}
```

```css
.box1 {
  background: #111;
}
.box2 {
  background: #111;
}
```

대신 기존에 사용하던 같은 이름의 변수가 있을 경우 값이 덮어져 사용될 수 있습니다.

```scss
$color: #000;
.box1 {
  $color: #111 !global;
  background: $color;
}
.box2 {
  background: $color;
}
.box3 {
  $color: #222;
  background: $color;
}
```

```css
.box1 {
  background: #111;
}
.box2 {
  background: #111;
}
.box3 {
  background: #222;
}
```

---

## !default (초깃값 설정)

!default 플래그는 할당되지 않은 변수의 초깃값을 설정합니다.  
즉, 할당되어있는 변수가 있다면 변수가 기존 할당 값을 사용합니다.

```scss
$color-primary: red;

.box {
  $color-primary: blue !default;
  background: $color-primary;
}
```

```css
.box {
  background: red;
}
```

---

# #{} (문자 보간)

#{}를 이용해서 코드의 어디든지 변수 값을 넣을 수 있습니다.

```scss
$family: unquote('Droid+Sans');
@import url('http://fonts.googleapis.com/css?family=#{$family}');
```

```css
@import url('http://fonts.googleapis.com/css?family=Droid+Sans');
```

Sass의 내장 함수 unquote()는 문자에서 따옴표를 제거합니다.
