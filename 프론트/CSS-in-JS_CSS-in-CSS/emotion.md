# emotion + CRA 관련 바벨 설정

https://emotion.sh/docs/@emotion/babel-plugin

https://simsimjae.tistory.com/410

https://www.howdy-mj.me/css/emotionjs-intro

https://velog.io/@cks3066/%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%EC%97%90-Emotion-%EC%A0%81%EC%9A%A9%EA%B8%B0

# emotion + Next.js

https://velog.io/@familyman80/nextjs%EC%97%90%EC%84%9C-emotion-%EC%B4%88%EA%B8%B0-%EC%84%A4%EC%A0%95

---

# 개발환경과 다르게 운영환경에서 CSS 코드(style 태그)가 보이지 않는 이유

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

## CSSStyleSheet.insertRule()

https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet/insertRule  
새로운 css rule을 style sheet에 직접 삽입하는 방식

## CSSStyleSheet

CSS 스타일 시트는 CSS 사양에 정의된 스타일 시트를 나타내는 추상적인 개념 이고, CSSOM에서 css style sheet는 CSSStyleSheet 객체로 표현됩니다
https://drafts.csswg.org/cssom/#css-style-sheets
