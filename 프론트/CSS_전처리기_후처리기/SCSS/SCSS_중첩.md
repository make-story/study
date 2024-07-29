# 중첩

```scss
.section {
  width: 100%;
  .list {
    padding: 20px;
    li {
      float: left;
    }
  }
}
```

```css
.section {
  width: 100%;
}
.section .list {
  padding: 20px;
}
.section .list li {
  float: left;
}
```

---

중첩 안에서 & 키워드는 상위(부모) 선택자를 참조하여 치환합니다.

```scss
.btn {
  position: absolute;
  &.active {
    color: red;
  }
}

.list {
  li {
    &:last-child {
      margin-right: 0;
    }
  }
}
```

```css
.btn {
  position: absolute;
}
.btn.active {
  color: red;
}
.list li:last-child {
  margin-right: 0;
}
```

---

& 키워드가 참조한 상위 선택자로 치환되는 것이기 때문에 다음과 같이 응용할 수도 있습니다.

```scss
.fs {
  &-small {
    font-size: 12px;
  }
  &-medium {
    font-size: 14px;
  }
  &-large {
    font-size: 16px;
  }
}
```

```css
.fs-small {
  font-size: 12px;
}
.fs-medium {
  font-size: 14px;
}
.fs-large {
  font-size: 16px;
}
```

---

중첩에서 벗어나고 싶을 때 @at-root 키워드를 사용합니다.
.list 안에 있는 `특정 변수를 범위 밖에서 사용할 수 없기 때문`에, 예제 처럼 @at-root 키워드를 사용해야 합니다.

```scss
.list {
  $w: 100px;
  $h: 50px;
  li {
    width: $w;
    height: $h;
  }
  @at-root .box {
    width: $w;
    height: $h;
  }
}
```

```css
.list li {
  width: 100px;
  height: 50px;
}
.box {
  width: 100px;
  height: 50px;
}
```

---

font-, margin- 등과 같이 동일한 네임 스페이스를 가지는 속성들을 다음과 같이 사용할 수 있습니다.

```scss
.box {
  font: {
    weight: bold;
    size: 10px;
    family: sans-serif;
  }
  margin: {
    top: 10px;
    left: 20px;
  }
  padding: {
    bottom: 40px;
    right: 30px;
  }
}
```

```css
.box {
  font-weight: bold;
  font-size: 10px;
  font-family: sans-serif;
  margin-top: 10px;
  margin-left: 20px;
  padding-bottom: 40px;
  padding-right: 30px;
}
```
