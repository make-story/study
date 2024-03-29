# React 서버 컴포넌트 (React Server Component, RSC)

리액트 서버 컴포넌트는 리액트 18 버전에서 추가된 기능이며,  
서버 측에서 컴포넌트를 실행하여 미리 렌더링된 마크업을 생성후,  
클라이언트에게 전달되어 사용자에게 콘텐츠를 보여주는 방식입니다.

## 요약

- React 서버 컴포넌트는 네트워크 왕복 없이 백엔드 접근이 가능합니다.
- React 서버 컴포넌트를 통해 네트워크 워터폴을 피할 수 있습니다.
- React 서버 컴포넌트는 자동 코드 분할(splitting)을 지원하며 번들 크기를 제로로 줄여 앱의 성능을 향상시킵니다.
- 이러한 컴포넌트는 서버 측에 있으므로 클라이언트 사이드 이벤트 핸들러, state 및 effect에 액세스할 수 없습니다.
  이는 이벤트 핸들러나 useState, useReducer, useEffect와 같은 React 훅을 사용할 수 없음을 의미합니다.
- React 서버 컴포넌트는 클라이언트 컴포넌트를 가져와 렌더링할 수 있지만, 반대로는 불가능 합니다.
  그러나 서버 컴포넌트를 클라이언트 컴포넌트에 props로 전달할 수 있습니다.

> 백엔드 리소스: 데이터베이스, fs, node-fetch 등의 서버에서 접근 가능한 리소스

https://yozm.wishket.com/magazine/detail/2271/

- '리액트 서버 컴포넌트'는 새로운 패러다임의 이름입니다.

- 새로운 패러다임에서 우리가 잘 알고 사랑하는 "표준" 리액트 컴포넌트는 ‘클라이언트 컴포넌트’로 리브랜딩 되었습니다.

- 새로운 패러다임에는 서버에서만 렌더링 되는 새로운 유형의 컴포넌트인 ‘서버 컴포넌트’가 추가되었습니다. 해당 코드는 JS 번들에 포함되지 않으므로 하이드레이트 하거나 다시 렌더링하지 않습니다.

현재(2023년 9월 19일),  
리액트 서버 컴포넌트를 사용할 수 있는 유일한 방법은 Next.js 13.4 이상에서 새롭게 재설계된 "앱 라우터"를 사용하는 것뿐입니다.

## Next.js RSC, fetch

`기존에 Next.js에서는 Page 단위의 컴포넌트에서만 백엔드 리소스에 접근이 가능했지만,`  
`RSC를 사용하게되면 일반적인 단위의 컴포넌트에서 접근 가능하다는 특징이 존재`합니다.

https://nextjs.org/docs/app/api-reference/functions/generate-static-params

- next dev (개발환경)에서, generateStaticParams 은 라우트를 이동할 때 실행됩니다.
- next build (빌드, 배포 시) , generateStaticParams 은 해당 레이아웃이나 페이지가 만들어지기 전에 실행됩니다.
- ISR시 (revalidate) , generateStaticParams 은 다시 실행되지 않습니다.

https://nextjs.org/blog/next-13#data-fetching  
https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating

```javascript
// SSR
fetch('https://...', { cache: 'no-store' }); // 매 요청시마다 새로 (기존 getServerSideProps 와 유사)

// SSG
fetch('https://...'); // cache: force-cache => 무제한 캐시! (기존 getStaticProps 와 유사)

// ISR
fetch('https://...', { next: { revalidate: 10 } }); // revalidate second 마다 캐시 초기화 (기존 getStaticProps 와 유사)
```

## 클라이언트 컴포넌트 지정하기

https://yozm.wishket.com/magazine/detail/2271/

리액트 서버 컴포넌트 패러다임에서는 기본적으로 모든 컴포넌트가 서버 컴포넌트라고 가정합니다.  
그렇기 때문에 클라이언트 컴포넌트를 사용하려면 지시문을 사용해야 합니다.

`'use client'` 문자열은 이 파일의 컴포넌트들이 클라이언트 컴포넌트이며,  
클라이언트에서 다시 렌더링할 수 있도록 JS 번들에 포함해야 한다는 것을 리액트에 알리는 역할을 합니다.

## SSR 과 비교되는 렌더링 방법

https://leetrue-log.vercel.app/rsc-ssr

https://tech.kakaopay.com/post/react-server-components/

https://ui.toast.com/weekly-pick/ko_20210119

## RSC 이전에는, 모든 리액트 컴포넌트는 '클라이언트' 컴포넌트 이며, 모두 브라우저에서 실행된다.

https://yceffort.kr/2022/01/how-react-server-components-work

RSC를 활용하면 서버와 브라우저가 각자 잘 수행하는 작업을 처리할 수 있다.  
서버 컴포넌트는 데이터를 가져오고 콘텐츠를 렌더링하는데 초점을 맞출 수 있으며 페이지 로딩 속도가 빨라지고 자바스크립트 번들 크기가 작아져서 사용자의 환경이 향상될 수 있다.

## 서버컴포넌트 패턴

https://patterns-dev-kr.github.io/rendering-patterns/react-server-components/

## 서버 컴포넌트가 Next.js SSR을 대체할까?

https://ui.toast.com/weekly-pick/ko_20210119

https://news.ycombinator.com/item?id=25499171

- `서버 컴포넌트 코드는 절대 클라이언트에게 전달되지 않는다.` 많은 React를 사용한 SSR의 구현은 자바스크립트 번들을 통해 클라이언트로 컴포넌트 코드가 보내지게 된다. 이로 인해 상호작용이 지연될 수 있다.

- `서버 컴포넌트를 사용하면 트리의 어느 곳에서나 백엔드에 접근할 수 있다.` Next.js를 사용한다면, 최상위 페이지에서만 가능한 getServerProps()를 통해 백엔드에 접근하는 것에 익숙할 것이다. 하지만, 임의 npm 컴포넌트는 이런 동작이 불가능하다.

- `트리 내부에서 클라이언트 측의 상태(state)를 유지하면서 서버 컴포넌트를 다시 가져올 수 있다.` 이는 주요 전송 메커니즘이 HTML보다 훨씬 풍부하기 때문이다. 따라서, 내부 상태(e.g 검색 입력 텍스트, 포커스, 텍스트 선택)를 없애지 않고 서버에서 렌더링 한 부분(e.g 검색 결과 목록)을 다시 가져올 수 있게 한다.

# 서버사이드가 더 빠른가 아니면 캐시가 더 빠른가? - 22.11 기준

https://mycodings.fly.dev/blog/2022-11-16-nextjs-13-how-to-ssg-isr-and-not-found

```
Remix 프레임워크가 온전히 서버사이드로 Next.js를 스피드에서 압도하는 사례가 많은데요.
서버 사이드 렌더링도 충분히 빠를 수 있다는 걸 증명한 Remix로 인해 Next.js가 드디어 서버사이드 렌더링을 들고 나왔는데요.
React 개발팀에서도 아직 React 컴포넌트를 서버사이드로 개발할지는 확정된 바가 없지만 Next.js 개발팀은 향후 서버사이드 컴포넌트가 대세라고 생각하고 있는 듯합니다.
최근 Shopify가 Remix 프레임워크를 인수한 것을 볼 때 Shopify는 서버사이드가 대세가 될 거라고 확신한 듯합니다.
```
