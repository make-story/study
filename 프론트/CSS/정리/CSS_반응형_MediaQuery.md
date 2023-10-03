`완성된 웹사이트로 배우는 HTML & CSS 웹 디자인` 책 내용중

# viewport 설정

반응형 웹 디자인을 구현하는 첫걸음으로 디바이스의 화면 크기를 의미하는 viewport 를 설정해야 합니다.  
`viewport 를 설정하지 않으면 스마트폰으로 봐도 데스크톱 화면처럼 크게 나옵니다.`

```html
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

width=device-width 는 '디바이스의 가로 폭에 맞춰 보여주세요' 라는 의미입니다.  
initial-scale 은 페이지를 확대하는 비율을 나타내며 값을 1로 설정하면 '확대 없이 본래 크기대로 보여주세요' 가 됩니다.

- initial-scale
  페이지가 처음 로드될 때 확대/축소 수준을 제어합니다.  
  최소: 0.1 최대: 10 기본값: 1

- minimum-scale
  페이지에서 허용되는 축소 정도를 제어합니다.  
  최소: 0.1 최대: 10 기본값: 0.1

- maximum-scale
  페이지에서 허용되는 확대 정도를 제어합니다.  
  3보다 작은 값은 접근성에 실패합니다.  
  최소: 0.1 최대: 10 기본값: 10

- user-scalable
  페이지에서 확대 및 축소 작업이 허용되는지 여부를 제어합니다.  
  유효한 값: 0, 1, yes 또는 no 기본값: 1

- `interactive-widget`
  가상 키보드와 같은 대화형 UI 위젯이 페이지의 뷰포트에 미치는 영향을 지정합니다.  
  유효한 값: resizes-visual, resizes-content 또는 overlays-content 기본값: resizes-visual

# 미디어 쿼리 기본

## CSS 파일로 적용하는 방법

```css
@media (max-width: 700px) {
  .title {
    font-size: 4rem;
  }
}
```

## CSS 파일을 불러오는 <link> 태그로 적용하는 방법

```html
<link rel="stylesheet" href="desktop.css" media="(min-width: 701px)" />
```

## CSS 파일을 @import 로 불러오는 방법

```css
@charset 'UTF-8';
@import url("mobile.css") (max-width: 700px);
```

# 브레이크 포인트란

브레이크 포인트란 미디어 쿼리를 사용해 디바이스별로 적용하는 CSS 를 나누는 분기점을 말합니다.

# 반응형 웹 디자인을 적용한 갤러리 사이트 예시

http://rwdb.kr

https://mediaqueri.es

# CSS로 웹사이트를 다크 모드에 대응하도록 만들기

https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme

```css
@media (prefers-color-scheme: dark) {
  body {
    background-color: #000;
    color: #fff;
  }
}
```

책 p309 '다크모드 적용 예' 참고

---

# 반응형 계산

```javascript
const sizePercent = function (target, content) {
  // 단위 : https://developer.mozilla.org/ko/docs/Web/CSS/CSS_Values_and_Units
  // 공식(%) : target / content = result
  // 예제1 : 60(구하고자하는 크기) / 320(기준, 최소 해상도) = 0.1875 -> 18.75%
  // 예제2 : 10(구하고자하는 크기) / 320(기준, 최소 해상도) = 0.03125 -> 3.125%

  // rem 계산
  // 공식(rem) : 사용하려는 값(target) / 최상단 부모값(content) = rem 값
  // 부모요소 10px : 그럼 1rem 은 10, 2rem 은 20
  // 부모요소 10px, 구하고자하는 크기 11px : 11 / 10 = 1.1rem

  // 루트 요소의 폰트 사이즈는 웹 브라우저의 기본 폰트 사이즈가 결정하며, 대부분의 웹 브라우저에서 16px로 정해놓고 있습니다.
  // font-size: 1.25rem; /* 사용자 지정된 폰트 사이즈가 없는 경우 브라우저 기본 폰트 사이즈 16px × 1.25 -> 20px */
  // padding: 1.5rem; /* font-size 16px × 1.5 -> 24px */
  // height: 1.4rem; /* font-size 16px × 1.4 -> 22.4px */
  target = Number(target);
  content = Number(content);
  return (target / content) * 100;
};

// 비율 (동영상 비율)
const getAspectRatio = function (width, height) {
  const result = {};
  const getGCD = function (a, b) {
    return b == 0 ? a : getGCD(b, a % b);
  };

  result.width = width;
  result.height = height;
  result.gcd = getGCD(width, height);
  result.aspect = [width / result.gcd, height / result.gcd].join(":");

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

    input[type="checkbox"] {
      width: 1.625rem;
      height: 1.625rem;
    }

    button[type="button"] {
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
      <label for="javascript">
        <input type="checkbox" id="javascript" /> JavaScript
      </label>
      <label for="go"> <input type="checkbox" id="go" /> Go </label>
      <label for="objective-c">
        <input type="checkbox" id="objective-c" /> Objective-C
      </label>
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
