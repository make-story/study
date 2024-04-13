# Vanilla Extract

https://vanilla-extract.style/

https://velog.io/@keumky1/Vanilla-Extract%EB%9E%80-%EB%AC%B4%EC%97%87%EC%9D%B8%EA%B0%80

Vanilla Extract의 특징은 다음과 같습니다.  
기본적으로 CSS Modules-in-TypeScript 라고 생각하면 됩니다.

- 빌드타임에 ts 파일을 css 파일로 만듭니다. (sass와 같음)
- type-safe 하게 theme 를 다룰 수 있습니다.
- 프론트앤드 프레임워크에 구애받지 않습니다.
- Tailwind 처럼 Atomic CSS 를 구성할 수도 있습니다.
- Sttitches 처럼 variant 기반 스타일링을 구성할 수 있습니다.

# Runtime CSS in JS 의 문제

런타임 CSS in JS 는 런타임에 js 파일이 실행되면서 style 을 생성합니다.  
style 생성의 규모가 크고 빈번할 수록 성능이 저하될 수 있습니다.

share 버튼을 클릭하면 loading 상태가 true 되고 text-color 가 회색으로 변하는 버튼을 예로 들어보겠습니다.  
버튼을 누르면 상태가 변하고 ShareButton 이 다시 랜더링됩니다.  
랜더링 된다는 뜻은 함수가 다시 실행된다는 뜻과 같습니다.

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

`study.git/프론트/CSS-in-JS_CSS-in-CSS/CSS-in-JS/emotion.md` 참고!

## CSS-in-JS 성능문제

https://itnext.io/how-to-increase-css-in-js-performance-by-175x-f30ddeac6bce
