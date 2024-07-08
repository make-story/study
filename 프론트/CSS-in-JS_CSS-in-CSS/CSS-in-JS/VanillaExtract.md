# Vanilla Extract

https://vanilla-extract.style/

https://velog.io/@keumky1/Vanilla-Extract%EB%9E%80-%EB%AC%B4%EC%97%87%EC%9D%B8%EA%B0%80

https://so-so.dev/web/css-in-js-whats-the-defference/

`Runtime CSS in JS 의 문제점을 해결하기 위해 Zero-runtime CSS in JS 가 등장`

Vanilla Extract의 특징은 다음과 같습니다.  
기본적으로 CSS Modules-in-TypeScript 라고 생각하면 됩니다.

- 빌드타임에 ts 파일을 css 파일로 만듭니다. (sass와 같음)
- type-safe 하게 theme 를 다룰 수 있습니다.
- 프론트앤드 프레임워크에 구애받지 않습니다.
- Tailwind 처럼 Atomic CSS 를 구성할 수도 있습니다.
- Sttitches 처럼 variant 기반 스타일링을 구성할 수 있습니다.

# Runtime CSS in JS 의 문제

CSS in JS는 다음과 같은 장점

- CSS에서 JS문법을 사용할 수 있어서 생산성
- 컴포넌트 파일에 관련된 코드들을 함께 둘 수 있음 ([colocation](https://kentcdodds.com/blog/colocation))
  - 기존에는 css와 js파일을 분리해야했다.
- className이 겹치지 않음을 보장한다.(지역 스코프 스타일)

단점!

런타임 CSS in JS 는 런타임에 js 파일이 실행되면서 style 을 생성합니다.  
style 생성의 규모가 크고 빈번할 수록 성능이 저하될 수 있습니다.

share 버튼을 클릭하면 loading 상태가 true 되고 text-color 가 회색으로 변하는 버튼을 예로 들어보겠습니다.  
버튼을 누르면 상태가 변하고 ShareButton 이 다시 랜더링됩니다.  
랜더링 된다는 뜻은 함수가 다시 실행된다는 뜻과 같습니다.

데모  
https://stackblitz.com/edit/vitejs-vite-zjjxo9?file=src%2FApp.tsx,package.json&terminal=dev

```tsx
const [isLoading,setIsLoading]= useState(false)

<ShareButton isLoading={isLoading}> Share </ShareButton>

const ShareButton = styled.button<{isLoading: boolean}>`
  color: ${({isLoading})=> isLoading? "gray" : "black"}
```

CSS-in-JS 가 대게 두가지 방법으로 런타임에 스타일을 추가합니다.

1. html <head> 태그에 <style> 태그를 만들어서 삽입하는 방법
2. CSSStyleSheet.insertRule 을 사용해서 CSSOM 에 직접 삽입
   CSS Object Model 은 자바스크립트에서 CSS 를 조작 할 수 있게 해주는 API

2번 방법으로 스타일을 삽입하면 style 태그가 비어있는 것처럼 보입니다.  
개발자 도구에서 document.styleSheets[0].cssRules로 직접 CSS Rule을 확인할 수 있습니다.

`study.git/프론트/CSS-in-JS_CSS-in-CSS/CSS-in-JS/emotion.md` 참고!

## CSS-in-JS 성능문제

https://itnext.io/how-to-increase-css-in-js-performance-by-175x-f30ddeac6bce

## 기본적인 예제

```tsx
// style.css.ts
import { style } from '@vanilla-extract/css';

export const myStyle = style({
  display: 'flex',
  paddingTop: '3px',
  fontSize: '42px',
});

// App.tsx
<div className={myStyle}>안녕하세요</div>;

// 결과물
// .s_myStyle__t0h71y0 {
//    display: flex;
//    padding-top: 3px;
//    font-size: 42px;
// }
```

스타일을 조각해서 Utility Style 을 만들 수 있습니다.  
그리고 px 단위를 생략해도 자동적으로 px 로 변합니다.

```tsx
export const flexCenter = style({
  // cast to pixels
  padding: 10, // 10px로 계산됩니다.
  marginTop: 25,

  // unitless properties
  display: 'center',
  alignItems: 'center',
  justifyContent: 'center',
});
```

cssVariable 을 이용하고 싶다면 createVar 를 이용하면 됩니다.  
createVar 는 unique 한 variable 이름을 만들어줍니다.

```tsx
import { style, createVar } from '@vanilla-extract/css';

const myVar = createVar(); // 결과값 --myVar__t0h71y2

const myStyle = style({
  vars: {
    [myVar]: 'purple',
    // '--puple_color' : 'purple' createVar를 이용하지 않고 바로 작성해도됨
  },
});
```

style들을 합성해서 사용할 수도 있습니다.

```tsx
const base = style({ padding: 12 }); // s_base__t0h71y4

// base의 className이 합쳐져서 나옴
const secondary = style([base, { background: 'aqua' }]); // s_base__t0h71y4  s_secondary__t0h71y6
```

Vanilla Extract 는 기능적으로 높은 확장성을 가지고 있습니다.  
Tailwind CSS 를 모방한 Sprinkles,  
Sttiches 을 모방한 Recipes,  
Linaria를 모방한 dynamic 을 제공합니다.
