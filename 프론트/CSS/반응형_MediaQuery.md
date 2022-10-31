# 반응형 계산

```javascript
const sizePercent = function (target, content) {
  // 단위 : https://developer.mozilla.org/ko/docs/Web/CSS/CSS_Values_and_Units
  // 공식(%) : target / content = result
  // 예제1 : 60(구하고자하는 크기) / 320(기준, 최소 해상도) = 0.1875 -> 18.75%
  // 예제2 : 10(구하고자하는 크기) / 320(기준, 최소 해상도) = 0.03125 -> 3.125%
  // 공식(rem) : 사용하려는 값 / 최상단 부모값 = rem 값
  // 부모요소 10px : 그럼 1rem은 10, 2rem은 20
  // 부모요소 10px, 구하고자하는 크기 11px : 11 / 10 = 1.1rem
  target = Number(target);
  content = Number(content);
  return (target / content) * 100;
};

// 비율
const getAspectRatio = function (width, height) {
  const result = {};
  const getGCD = function (a, b) {
    return b == 0 ? a : getGCD(b, a % b);
  };

  result.width = width;
  result.height = height;
  result.gcd = getGCD(width, height);
  result.aspect = [width / result.gcd, height / result.gcd].join(':');

  return result;
};
```

---

# 미디어쿼리로 터치디바이스, 마우스디바이스 구분

https://www.smashingmagazine.com/2022/03/guide-hover-pointer-media-queries/

## Media Query Hover: Detecting A Pointer

```html
<style>
  .button {
    padding: 0.5em 1em;
    font-size: 1.125rem;
    border-radius: 0.6em;
    background-color: coral;
    font-weight: bold;
    border: 1px solid transparent;
    transition: background-color 200ms ease-in-out;
  }

  @media (hover: hover) {
    .button:hover {
      background-color: hotpink;
    }
  }
</style>

<button class="button">Hover over me</button>
```

## Media Query Pointer: Detecting A Pointer’s Accuracy

```html
<style>
  @media screen and (pointer: coarse) {
    .form-grid {
      gap: 0.5em;
    }

    label {
      font-size: 1.05em;
    }

    input[type='checkbox'] {
      width: 1.625rem;
      height: 1.625rem;
    }

    button[type='button'] {
      min-height: 3rem;
    }
  }
</style>
<form action="post">
  <fieldset>
    <legend>Which programming languages do you want to learn?</legend>
    <div class="form-grid">
      <label for="c"> <input type="checkbox" id="c" /> C </label>
      <label for="c+"> <input type="checkbox" id="c+" /> C+ </label>
      <label for="c++"> <input type="checkbox" id="c++" /> C++ </label>
      <label for="c-sharp"> <input type="checkbox" id="c-sharp" /> C# </label>
      <label for="kotlin"> <input type="checkbox" id="kotlin" /> Kotlin </label>
      <label for="java"> <input type="checkbox" id="java" /> Java </label>
      <label for="javascript"> <input type="checkbox" id="javascript" /> JavaScript </label>
      <label for="go"> <input type="checkbox" id="go" /> Go </label>
      <label for="objective-c"> <input type="checkbox" id="objective-c" /> Objective-C </label>
      <label for="php"> <input type="checkbox" id="php" /> PHP </label>
      <label for="python"> <input type="checkbox" id="python" /> Python </label>
      <label for="ruby"> <input type="checkbox" id="ruby" /> Ruby </label>
      <label for="rust"> <input type="checkbox" id="rust" /> Rust </label>
      <label for="scala"> <input type="checkbox" id="scala" /> Scala </label>
      <label for="swift"> <input type="checkbox" id="swift" /> Swift </label>
      <label for="other"> <input type="checkbox" id="other" /> Another </label>
    </div>
    <button type="button">Submit</button>
  </fieldset>
</form>
```

## Combining Media Queries

| Media query hover’s value | Media query pointer’s value | Device                                |
| ------------------------- | --------------------------- | ------------------------------------- |
| none                      | coarse                      | Smartphones, touchscreens             |
| none                      | fine                        | Stylus-based screens                  |
| hover                     | coarse                      | Smart TVs, video game consoles        |
| hover                     | fine                        | Desktop computers, laptops, touchpads |

---

# picture 요소

디스플레이 크기에 따라 적합한 이미지를 노출합니다.

```html
<picture>
  <source srcset="images/small_image.jpg" media="all and (min-width: 586px)" />
  <source srcset="images/wide_image.jpg" media="all and (min-width: 768px)" />
  <img src="images/default_image.jpg" alt="" />
</picture>
```

특정 이미지 파일 형식이 지원되지 않는 경우 대체 이미지 형식을 제공합니다.

```html
<picture>
  <source srcset="images/logo.webp" type="image/webp" />
  <img src="images/logo.png" alt="" />
</picture>
```

대역폭을 절약하고 페이지 로드 시간을 단축합니다.

```html
<picture>
  <source srcset="images/image-768.png 768w, images/image-768-1.5x.png 1.5x" />
  <source srcset="images/image-480.png, images/image-480-2x.png 2x" />
  <img src="images/image.png" alt="" />
</picture>
```
