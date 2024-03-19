# Tailwind CSS

`CSS 의 각 속성들을 클래스에 직관적으로 표현`
클래스명으로 스타일을 적용한다

`Utility-First 를 지향하는 CSS 프레임워크`
Utility-First 란 미리 세팅된 유틸리티 클래스를 활용하여 HTML 코드 내에서 스타일링

https://tailwindcss.com/docs/guides/nextjs

예
https://velog.io/@woodong/1.-Tailwind-CSS%EB%9E%80

```html
<div
  class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4"
>
  <div class="shrink-0">
    <img class="h-12 w-12" src="/img/logo.svg" alt="ChitChat Logo" />
  </div>
  <div>
    <div class="text-xl font-medium text-black">ChitChat</div>
    <p class="text-slate-500">You have a new message!</p>
  </div>
</div>
```

## Tailwind CSS 모범사례

https://evilmartians.com/chronicles/5-best-practices-for-preventing-chaos-in-tailwind-css

https://velog.io/@lky5697/5-best-practices-for-preventing-chaos-in-tailwind-css

프로젝트가 충족해야 하는 두 가지 요구 사항

1. 첫 번째로 프로젝트에 디자인 시스템이 있어야 합니다.  
   Tailwind의 철학은 디자이너와 개발자가 일관된 디자인 토큰을 사용하는 디자인 시스템과 함께합니다.  
   디자인 토큰은 디자인의 속성을 정의하고 프로젝트 전체에서 재사용되는 색상, 간격 또는 글씨 크기와 같은 원자 값입니다.

2. 두 번째 조건은 이미 컴포넌트 기반 접근 방식을 사용하고 있어야 한다는 것입니다.  
   유틸리티 우선(Utility-first) 접근 방식은 Tailwind 클래스가 요소에 직접 적용되기 때문에 상당히 복잡하고 장황한 HTML 구조로 이어질 수 있습니다.  
   이는 마크업을 읽고 유지 보수하기가 더 어렵다는 것을 의미하며, 특히 프로젝트가 커질수록 더욱 두드러집니다.

해결책 : 두 번 이상 사용되는 HTML 요소처럼 자주 사용되는 패턴을 별도의 컴포넌트로 캡슐화하는 컴포넌트 기반 접근 방식을 적극적으로 사용하는 것입니다.

마지막으로 컴포넌트 기반 접근 방식과 관련하여 한 가지 더 강조해보면 @apply 지시문을 피하는 것이 좋습니다.

다음은 장기적인 사용 경험을 개선하는 데 가장 유용한 사례

1. 가능한 한 적은 수의 유틸리티 클래스 사용

2. 디자인 토큰을 그룹화하고 의미적으로 이름 짓기

3. 클래스 순서 유지

4. 빌드 크기 최소화

5. 스타일 덮어쓰기 및 확장 시 불일치 방지
