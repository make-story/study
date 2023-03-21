# Tailwind CSS

`CSS 의 각 속성들을 클래스에 직관적으로 표현`
클래스명으로 스타일을 적용한다

`Utility-First 를 지향하는 CSS 프레임워크`
Utility-First 란 미리 세팅된 유틸리티 클래스를 활용하여 HTML 코드 내에서 스타일링

https://tailwindcss.com/docs/guides/nextjs

예
https://velog.io/@woodong/1.-Tailwind-CSS%EB%9E%80

```html
<div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4">
  <div class="shrink-0">
    <img class="h-12 w-12" src="/img/logo.svg" alt="ChitChat Logo" />
  </div>
  <div>
    <div class="text-xl font-medium text-black">ChitChat</div>
    <p class="text-slate-500">You have a new message!</p>
  </div>
</div>
```
