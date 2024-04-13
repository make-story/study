# emotion + CRA 관련 바벨 설정

https://emotion.sh/docs/@emotion/babel-plugin

https://simsimjae.tistory.com/410

https://www.howdy-mj.me/css/emotionjs-intro

https://velog.io/@cks3066/%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%EC%97%90-Emotion-%EC%A0%81%EC%9A%A9%EA%B8%B0

# emotion + Next.js (CSS-in-JS)

- @emotion/cache
- @emotion/react
- @emotion/server
- @emotion/styled

Next.js 공식  
https://nextjs.org/docs/app/building-your-application/styling/css-in-js

Emotion 공식
https://emotion.sh/docs/ssr#nextjs  
https://github.com/vercel/next.js/tree/deprecated-main/examples/with-emotion  
https://github.com/vercel/next.js/tree/deprecated-main/examples/with-emotion-vanilla

https://gist.github.com/colinhacks/c40519a6a050a99091862319151377ec

https://soojae.tistory.com/59

https://velog.io/@familyman80/nextjs%EC%97%90%EC%84%9C-emotion-%EC%B4%88%EA%B8%B0-%EC%84%A4%EC%A0%95

## emotion 과 Next.js 13 이상에서의 이슈

https://velog.io/@gene028/classpick-%EA%B0%9C%EB%B0%9C%EC%9D%BC%EC%A7%80-1-Next.js13%EC%9C%BC%EB%A1%9C-%EB%A7%88%EC%9D%B4%EA%B7%B8%EB%A0%88%EC%9D%B4%EC%85%98%ED%95%98%EA%B8%B0-emotion%EC%9D%B4-%EC%95%88%EB%90%9C%EB%8B%A4%EA%B3%A0

```
/** @jsxImportSource @emotion/react */
```

또는 tsconfig.json 에 설정

## @emotion/babel-plugin

Emotion 버전 8 이상 부터는 바벨 필요하지 않음  
https://www.npmjs.com/package/@emotion/babel-plugin

@emotion/babel-plugin -> Next.js compiler 설정으로 이관  
https://nextjs.org/docs/architecture/nextjs-compiler#emotion

---

# `개발환경과 다르게 운영환경에서 CSS 코드(style 태그)가 보이지 않는 이유`

`Empty style[data-emotion] in production build`

https://github.com/emotion-js/emotion/issues/1248

https://github.com/emotion-js/emotion/issues/2209

## 분석글

https://ideveloper2.dev/blog/2022-01-25--emotion%EC%9C%BC%EB%A1%9C-%ED%8C%8C%EC%95%85%ED%95%B4%EB%B3%B4%EB%8A%94-css-in-js%EC%9D%98-%EC%9D%B4%EB%AA%A8%EC%A0%80%EB%AA%A8/

- production 에서는 CSSOM 수정 방식을 선택 (CSSStyleSheet.insertRule())
- development 에서는 DOM 수정 방식을 선택 (tag.appendChild(document.createTextNode(rule)))

css parsing 으로 인해 blocking 되는 시간을 최대한 줄이는 노력이 필요했고,  
(브라우저는 DOM및 CSSOM트리를 결합하여 렌더링 트리를 형성 → 렌더링)  
emotion 에서 DOM 트리는 수정하지 않고 CSSOM 을 수정하는 방식을 선택하여 DOM 트리 parsing 에 드는 시간을 줄이는 방법을 선택

isSpeedy

```typescript
insert(rule: string) {
    // the max length is how many rules we have per style tag, it's 65000 in speedy mode
    // it's 1 in dev because we insert source maps that map a single rule to a location
    // and you can only have one source map per style tag
    if (this.ctr % (this.isSpeedy ? 65000 : 1) === 0) {
      this._insertTag(createStyleElement(this))
    }
    ...

    if (this.isSpeedy) {
      const sheet = sheetForTag(tag)
      try {
        // this is the ultrafast version, works across browsers
        // the big drawback is that the css won't be editable in devtools
        sheet.insertRule(rule, sheet.cssRules.length)
      } catch (e) {
        if (
          process.env.NODE_ENV !== 'production' &&
          !/:(-moz-placeholder|-moz-focus-inner|-moz-focusring|-ms-input-placeholder|-moz-read-write|-moz-read-only|-ms-clear){/.test(
            rule
          )
        ) {
          console.error(
            `There was a problem inserting the following rule: "${rule}"`,
            e
          )
        }
      }
    } else {
      tag.appendChild(document.createTextNode(rule))
    }
    this.ctr++
  }
```

## `CSSStyleSheet.insertRule()`

새로운 css rule을 style sheet에 직접 삽입하는 방식

https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet/insertRule

## CSSStyleSheet

CSS 스타일 시트는 CSS 사양에 정의된 스타일 시트를 나타내는 추상적인 개념 이고,  
CSSOM 에서 css style sheet 는 CSSStyleSheet 객체로 표현됩니다

https://drafts.csswg.org/cssom/#css-style-sheets

## isSpeedy (CSSStyleSheet.insertRule() 사용 안하는 방법)

https://emotion.sh/docs/ssr#puppeteer

```javascript
import { sheet } from '@emotion/css';

// Check if the root node has any children to detect if the app has been preprendered
// speedy is disabled when the app is being prerendered so that styles render into the DOM
// speedy is significantly faster though so it should only be disabled during prerendering
if (!document.getElementById('root')?.hasChildNodes()) {
  sheet.speedy(false);
}
```

또는

https://stackoverflow.com/questions/51518253/react-emotions-css-not-present-in-dom

```javascript
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

// if you are using mui v5
import { ThemeProvider } from '@mui/material/styles';

const emotionCache = createCache({
  key: 'emotion-cache-no-speedy',
  speedy: false,
});

const theme = createTheme();

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CacheProvider value={emotionCache}>
        <div>Your app here</div>
      </CacheProvider>
    </ThemeProvider>
  );
};
```

## 디버깅이 힘들어지는데.. 왜 다르게 할까?

runtime css-in-js 라는 emotion 의 특성과 겹친다 (styled component 도 동일)

- prod 에서도 dev 와 같이 style 태그가 추가된다면 ->
- 컴포넌트에서 runtime 에 스타일을 수정할시마다 스타일 태그가 추가 ->
- dom tree 다시 그리고 또 cssom 트리 구축 ->
- `css 를 parsing 하는 시간이 필요하고, 이 시간만큼 렌더링 blocking.` ->
- runtime에 일어나는 이러한 변화를 최적화하기 쉽지 않다.

css parsing 으로 인해 blocking되는 시간을 최대한 줄이는 노력이 필요했고,  
(브라우저는 DOM 및 CSSOM 트리를 결합하여 렌더링 트리를 형성 -> 렌더링)  
emotion 에서 DOM 트리는 수정하지 않고 CSSOM 을 수정하는 방식을 선택하여  
`DOM 트리 parsing 에 드는 시간을 줄이는 방법을 선택`

# runtime css-in-js 와 zero-run-time 그리고 near zero run time

아예 runtime 이 아닌 라이브러리들을 고려?

## runtime

emotion 과 styled component

> runtime : 브라우저에서 페이지가 로드될 때 스타일을 구문을 분석해 적용

https://punits.dev/blog/zero-runtime-css-in-js/

자바스크립트로 조작하는 UI 스타일링들은 자바스크립트 런타임과 연관이 생겼고,  
아래와 같은 성능관련 여러 내용들을 생각해보게 되었다

- 사용자들의 여러 동작들로 인해 동적으로 추가되는 스타일링은 parse, compile 과정 등등이 추가적으로 일어나게 되었다
- UI 렌더링이 지연되기도 하였다 (많은 js들이 실행되고 난뒤 실행되서)
- 자바스크립트 실행에 실패하면 스타일들이 제대로 렌더되지않았다. (JavaScript errors are a lot more probable than CSS or HTML errors.)
- run time css-in-js 로 얻는 DX 의 장점(js로 핸들링 하는 css,..etc)과 웹 성능들에서 생기는 문제점들이 양자택일의 문제처럼 상충하기 시작했다

## zero runtime

그럼 run time에서 생기는 문제점들이 있으니 zero run time?  
그런데, 빌드시 css 파일이 생기는 예전으로 회귀하는게 아닌가..?  
사실 Zero Runtime CSS 라는 것은 예전에도 있었습니다..!  
하지만 과거에는 prop 이나 state 에 의한 동적 스타일링을 지원하지 않은 채로, 단순한 정적 스타일 파일을 빌드 시간에 생성하는 것에 그쳤습니다.

linaria 라는 대표적인 zero run time css in js 라이브러리가 있는데,  
그럼 이건 어떻게 zero run time을 접목했을까요?

간단히 말해, Emotion 및 Styled Components 와 같은 JS 라이브러리의 CSS 는  
브라우저에서 페이지가 로드될 때 스타일을 구문을 분석해 적용하고(runtime)  
`Linaria 는 프로젝트를 빌드할 때(예: webpack) CSS 파일에 스타일을 추출하고 CSS 파일이 로드되는 방식 (zero runtime).`

동적 스타일링은 어떻게 구현?

Linaria 는 Babel Plugin 과 Webpack Loader 를 사용해서 빌드될 때 별도의 CSS 파일을 생성하게 되는 데  
이 파일 안에서 prop 이나 state 등에 의한 값들을 CSS Variable (CSS 변수) 로 정의하고  
CSS Variable 의 값을 변경시킴으로써 동적 스타일링을 구현

`zero runtime css-in-js 는 run time css-in-js 에서의 DX는 유지하면서, 웹성능 문제가 상충하는 상황도 해결하려 노력했다`

## near zero run time

stitches 가 대표적인 near zero run time 라이브러리입니다.

- 단어 그대로 runtime 을 아예 가지지 않는 것은 아니지만,
  component prop 에 의한 interpolation 을 최소화하는 방향의 API 를 제공해
  zero run time 에 가까운 성능을 냄.
- styled-components, emotion 에서는 prop 전달받은것에 따라 동적 스타일링이 가능하지만,
  stitches 는 사전에 정의한 variants 에 의한 스타일링만 가능
