# 사용자 지정 CSS 속성

https://developer.mozilla.org/ko/docs/Web/CSS/Using_CSS_custom_properties

# CSS 변수 정의

`CSS 사용자 속성은 이름이 --로 시작해야 함`

```css
.ex {
  --color: red;
  color: blue;
}
```

# CSS 변수 접근

`CSS 변수값을 읽으려면 var() 함수를 사용함`

```css
.ex {
  --gray: #ccc;
  background: var(--gray);
}
```

# CSS 변수 기본값

`var() 함수는 두번째 인자로 기본값 설정가능`  
CSS 변수에 접근할 때 해당 CSS 변수가 이미 정의되어 있는지 확실치 않는 경우에 활용할 수 있습니다.

```css
.ex {
  color: var(--color, black);
}
```

# CSS 변수 상속

CSS 변수는 상위 엘리먼트에서 하위 엘리먼트로 상속이 됩니다.
다시 말해, `상위 엘리먼트에서 정의된 CSS 변수는 하위 엘리먼트에서 자유롭게 접근할 수 있습니다.`

```html
<form>
  <button class="light">밝음</button>
  <button class="dark">어둠</button>
</form>
```

```css
form {
  --light: #ccc;
  --dark: #111;
}

button.light {
  color: var(--dark);
  background: var(--light);
}

button.dark {
  color: var(--light);
  background: var(--dark);
}
```

# CSS 전역 변수

CSS 변수를 최상위 엘리먼트에 정의해놓으면 마치 전역 변수처럼 DOM 트리 내에서 어디에서든지 CSS 변수에 접근할 수 있습니다.  
보통 `:root, html, body 선택자를 이용해서 CSS 전역 변수를 정의`합니다.

```css
:root {
  --color-success: #23d160;
  --color-error: #f14668;
}
```

# JavaScript로 사용자 속성값을 사용

자바스크립트로 변수 값을 변경하는 경우 HTML 태그에 직접 "style" 속성으로 CSS가 선언되기 때문에  
`"<style></style>" 태그 또는 별도의 CSS 파일로 선언된 CSS 속성보다 우선 순위가 있게 됩니다.`

```javascript
let theme = document.querySelector(':root');
let style = getComputedStyle(theme);
console.log(style.getPropertyValue('--hover')); // 변수 값 얻기
theme.style.setProperty('--hover', 'green'); // 변수 값 변경
```

```javascript
// 인라인 스타일에서 변수 얻기
element.style.getPropertyValue('--my-var');

// 어느 곳에서나 변수 얻기
getComputedStyle(element).getPropertyValue('--my-var');

// 인라인 스타일에 변수 설정하기
element.style.setProperty('--my-var', jsVar + 4);
```
