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
        font-family: 'font-icon';
        src: url('./font-icon.eot');
        src: url('./font-icon.eot?#iefix') format('eot'), url('./font-icon.woff2') format('woff2'),
          url('./font-icon.woff') format('woff'), url('./font-icon.ttf') format('truetype'),
          url('./font-icon.svg#font-icon') format('svg');
        font-weight: normal;
        font-style: normal;
      }
      .ficon:before {
        font-family: 'font-icon';
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
        content: '\E926';
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
