# 웹폰트 최적화

## 웹폰트 화면 노출 방식

웹 폰트를 사용할 때 사용자 경험 측면에서 고려할 만한 상황은 두 가지가 있습니다.  
바로 `FOIT(Flash Of Invisible Text)와 FOUT(Flash of Unstyled Tex)`입니다.  
이 두 가지 현상은 사용자 경험을 저하시키고, 개발자가 의도하지 않은 동작을 합니다.  
이를 방지하고자 웹 폰트 최적화가 필요한 것이죠.

- FOIT는 웹 페이지가 렌더링 되었을 때, 필요한 폰트가 아직 준비되지 않아 사용자에게 일시적으로 글자가 보이지 않는 현상
- 필요한 폰트가 준비되지 않아 글자 자체가 보이지 않는 FOIT과 달리, FOUT는 글자가 보이지만 기본 시스템 폰트로 표시되는 현상

## 웹폰트 파일 크기를 줄이는 방식으로 최적화

1. WOFF(Web Open Font Format)
2. WOFF2(Web Open Font Format 2)

## 미리로드로 최적화

- 일반적 로드 순서

우선 브라우저는 html 파일을 제일 먼저 요청하여 다운로드합니다.  
그다음 css 파일을 요청하고, 마지막으로 css 파일 내 font-face로 설정된 폰트 파일을 요청하는 모습입니다.  
즉, html과 css를 모두 불러오기 전까지 폰트 파일은 다운로드를 시작조차 못한다는 것인데요.  
폰트 파일이 준비되지 않으면 다른 대체 폰트가 보이게 되고, 이후 폰트 파일이 준비되면 다시 한번 리렌더링 과정을 거칩니다. 이는 앞서 소개했던 FOUT 현상입니다.

- preload

```html
<html>
  <head>
    <link rel="preload" href="폰트URL" />
  </head>
</html>
```

이제 폰트 파일은 css 파일이 모두 로딩될 때까지 기다리지 않고, css 파일 요청과 동시에 같이 요청하여 가져오는 모습을 보여줍니다.  
하지만 이를 남용하게 될 경우 웹 페이지가 보이는 시간이 증가할 수 있기 때문에, 명확하게 필요한 폰트 파일만 설정해야 합니다.

---

`완성된 웹사이트로 배우는 HTML & CSS 웹 디자인` 책 내용중

# 웹 폰트란

글꼴 데이터를 제공하는 웹 서비스로 웹사이트에 해당하는 글꼴을 나타내는 시스템이 웹폰트입니다.

# 구글 폰트

https://fonts.google.com/

# 어도비 폰트

https://fonts.adobe.com/

# 한글 글꼴 사용 시 주의할 점

## 글꼴이 표시되기까지 시간이 걸린다.

영어는 알파벳 26자로 구성되어 있어 문자, 숫자, 기호를 모두 합해도 100 글자로 표현됩니다.  
한글은 자음, 모음으로 구성되었고 각 글자에서 낱자가 주변 낱자와 어떤 관계인지에 따라 모양이 조금씩 달라집니다.  
모든 경우를 조합한 한글의 글자 수는 11,172 가지 입니다.  
한글 글꼴을 바르게 표현하기 위해서는 11,172 가지를 폰트에 포함해야 하며 용량이 커지게 됩니다.  
용량이 큰 글꼴을 적용하면 페이지 로딩에 시간이 걸리거나 글꼴이 표시되기까지 시간이 걸릴 수밖에 없습니다.

# 이이콘 폰트란

아이콘 폰트란 웹 페이지에서 글자처럼 표시되는 아이콘을 뜻합니다.  
일반적으로 사용하는 `이미지 형식인 JPEG, PNG 등의 비트맵 형식과 달리 확대하거나 축소해도 화질이 떨어지지 않습니다.`

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <title>HTML Live Test</title>
    <style>
      /* 폰트아이콘 */
      @font-face {
        font-family: "font-icon";
        src: url("./font-icon.eot");
        src: url("./font-icon.eot?#iefix") format("eot"), url("./font-icon.woff2")
            format("woff2"), url("./font-icon.woff") format("woff"), url("./font-icon.ttf")
            format("truetype"), url("./font-icon.svg#font-icon") format("svg");
        font-weight: normal;
        font-style: normal;
      }
      .ficon:before {
        font-family: "font-icon";
        display: inline-block;
        vertical-align: middle;
        line-height: 1;
        font-weight: normal;
        font-style: normal;
        speak: none;
        text-decoration: inherit;
        font-size: inherit;
        text-transform: none;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      .ficon-cate-open_new-20:before {
        content: "\E926";
      }

      .banner-item {
        overflow: hidden;
        border-radius: 8px;
        border: 1px solid #e2e2e2;
      }
      .banner-item dt {
        position: relative;
        background-repeat: no-repeat;
        background-color: #fff;
        background-size: 40px 40px;
        background-position: 18px center;
      }
      .banner-item dt:nth-child(1) {
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Cg transform='translate(-1107.371 -858.901)'%3E%3Cpath data-name='%EC%82%AC%EA%B0%81%ED%98%95 5089' transform='translate(1107.371 858.901)' style='fill:none' d='M0 0h40v40H0z'/%3E%3Crect data-name='%EC%82%AC%EA%B0%81%ED%98%95 5096' width='11' height='20' rx='.85' transform='translate(1133.371 868.901)' style='fill:%23457cdb'/%3E%3Crect data-name='%EC%82%AC%EA%B0%81%ED%98%95 5095' width='34' height='20' rx='.85' transform='translate(1110.371 868.901)' style='stroke:%23221f20%3Bstroke-linecap:round%3Bstroke-linejoin:round%3Bstroke-width:.75px%3Bfill:none'/%3E%3Ctext data-name='%25' transform='translate(1122.371 882.901)' style='font-size:11px%3Bfont-family:AppleSDGothicNeo-ExtraBold Apple SD Gothic Neo%3Bfont-weight:800'%3E%3Ctspan x='-4.911' y='0'%3E%25%3C/tspan%3E%3C/text%3E%3C/g%3E%3C/svg%3E");
      }
      .banner-item dt button {
        display: block;
        width: 100%;
        padding: 24px 35px 24px 75px;
        text-align: left;
        color: #000;
      }
      .banner-item dt button em {
        display: block;
        font-size: 16px;
        font-weight: bold;
        line-height: 18px;
      }
      .banner-item dt button span {
        display: block;
        margin-top: 6px;
        font-size: 14px;
        line-height: 18px;
        letter-spacing: -0.04em;
      }
      .banner-item dt button i {
        position: absolute;
        right: 20px;
        top: 50%;
        font-size: 20px;
        transform: translateY(-50%);
        transition: 0.4s;
      }
      .banner-item.on dt button i {
        /* 회전 애니메이션 */
        transform: translateY(-40%) rotate(180deg);
        transition: 0.4s;
      }
    </style>
  </head>
  <body>
    <div id="font">
      <h2>font</h2>
      <ul>
        <li>
          <dl class="banner-item on">
            <dt>
              <button>
                <em>ABC</em>
                <span>content</span>
                <i class="ficon ficon-cate-open_new-20"></i>
              </button>
            </dt>
            <dd><!-- toggle content //---></dd>
          </dl>
        </li>
      </ul>
    </div>
  </body>
</html>
```

## fontello

https://fontello.com/

## Font Awesome

https://fontawesome.com/

웹 페이지에 아이콘을 표시해주는 서비스로 범용성이 높은 심플한 아이콘이 많이 있습니다.

---

# CSS 코드 및 해석

```css
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}
```

```
// Safari for OS X and iOS (San Francisco)
-apple-system,
// Chrome < 56 for OS X (San Francisco)
BlinkMacSystemFont,
// Windows
"Segoe UI",
// Android
"Roboto",
// Basic web fallback
"Helvetica Neue", Arial, sans-serif,
// Emoji fonts
"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
```

# Noto는 Google이 개발한 오픈소스 글꼴 패밀리

https://fonts.google.com/noto/specimen/Noto+Sans+KR
