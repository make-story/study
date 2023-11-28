# 셀렉터 (selector)

https://www.w3schools.com/cssref/css_selectors.php

## Attribute selectors

https://developer.mozilla.org/en-US/docs/Web/CSS/Attribute_selectors

## & nesting selector

https://developer.mozilla.org/en-US/docs/Web/CSS/Nesting_selector

```css
parentRule {
  /* parent rule style properties */
  & childRule {
    /* child rule style properties */
  }
}
```

---

## 단순 셀렉터

- 요소형 셀렉터

```css
p {
}
```

- 전체 셀렉터

```css
* {
}
```

- 속성 셀렉터

```css
a[href"http://www.w3c.org/"]
{
}
```

- 클래스 셀렉터

```css
.my-class {
}
```

- ID 셀렉터

```css
#my-id {
}
```

- 의사 클래스(pseudo-class)

```css
a:visited {
}
```

## 의사 요소(pseudo-element)

클론을 두 개 사용한 것은 모두 '의사 요소'

```css
a::before {
}
```

## 결합자

- 손자 결합자(Decendant Combinator)

```css
div p {
}
```

- 자녀 결합자

```css
div > p {
}
```

- 형제 결합자

```css
div + p {
}
```

```css
div ~ p {
}
```
