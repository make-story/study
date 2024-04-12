# Vue 에서 Next.js 로 마이그레이션

https://yozm.wishket.com/magazine/detail/2248/

# React 에서 Next.js 로 마이그레이션 (migration)

https://nextjs.org/learn/foundations/from-react-to-nextjs

## CRA 에서 Next.js 전환 (마이그레이션, CRA Migration)

https://nextjs.org/docs/app/building-your-application/upgrading/codemods#migrate-from-cra

이슈경험  
https://bsnn.tistory.com/131

```
$ npx @next/codemod cra-to-next
```

# 우리는 왜 Next.js 를 도입하려고 하는가? (목적과 목표)

SPA 만 가능한 환경, SPA 뿐만아닌 SSR/SSG 등 상황에 따라 렌더링 방식 확장 또는 선택 가능하도록 한다.  
널리 사용되면서 참고자료가 많은, 안정된 Next.js 아키텍처 기반 환경 구축 한다.  
현재의 개발환경에서 개선필요 부분을 찾고, 이를 신규 환경에 순차 적용 한다.

"타입스크립트, 리액트, Next.js 로 배우는 실전 웹애플리케이션 개발" 책 내용 중...  
Next.js 개발자들의 사상은 클라이언트와 서버 사이에서 코드를 공유할 수 있는 유니버설한 자바스크립트 애플리케이션을 만드는 것입니다.

리액트의 특징인 렌더링 함수와 컴포넌트 라이프 사이클을 활용함으로써  
자바스크립트를 사용해 보다 효율적으로 애플리케이션을 개발할 수 있는 세계를 구현하고 있습니다.  
또한, Next.js 의 SSR 기능을 활용해 웹 브라우저의 부담을 줄이고, 보안도 강화할 수 있습니다.

SSR 은 애플리케이션의 모든 부분에 대해, 또는 프로젝트 전체에 대해 수행할 수 있으며,  
`콘텐츠가 풍부한 페이지를 선택해 SSR 을 수행하는 등으로 유연하게 설계(렌더링 기법 선택 가능)`할 수 있습니다.  
그리고 SSG 를 사용함으로써 보다 뛰어난 성능의 웹 애플리케이션을 구현할 수 있습니다.

# 디렉토리(폴더) 구조

자료

- https://www.robinwieruch.de/react-folder-structure/
- https://nextjs.org/docs/getting-started/project-structure
- https://wityan.medium.com/next-js-project-structure-1531610bed71

각 서비스별(각 영역/종류별) 폴더 그룹화 - 서비스별 확장성 고려한 설계  
apps 와 packages, documents 각 역할별로 분리  
라이브러리, 애플리케이션, 문서 등 폴더로 명시적 구분

# Next.js 환경변수 (public, private 환경변수는 프리픽스로 자동 구분)

기존 사용하던 환경변수 Next.js (브라우저 환경에서 변수 접근가능)에서도 사용가능하도록 next.config.js 설정  
고려해야 할 점은 Node.js 의 dotenv-flow 라이브러리 우선순위와 Next.js 우선순위 확인 해야한다!

- dotenv-flow
  https://www.npmjs.com/package/dotenv-flow#variables-overwritingpriority
- Next.js
  https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables#environment-variable-load-order

"타입스크립트, 리액트, Next.js 로 배우는 실전 웹애플리케이션 개발" 책 내용 중...  
Next.js 는 내부적으로 환경 변수를 위한 .env 파일을 처리할 수 있습니다.  
프로젝트 루트에 위치한 환경 변수 파일 .env 는 자동으로 로딩되어 코드상에서 참조할 수 있습니다.

.env 를 포함해 다음 형식의 파일을 참조할 수 있습니다.

- .env
- .env.local
- .env.${NODE_ENV}
- .env.${NODE_ENV}.local

.local 이 붙은 것은 .gitignore 에 추가되는 것을 의도한 것으로 API 키 등의 공개하고 싶지 않은 값을 저장하기 위해 사용합니다.

로딩된 환경 변수는 서버 사이드에서 실행하는 처리에서 참조할 수 있습니다.  
즉, getServerSideProps 등의 함수나 빌드 중 SSG 페이지를 그릴 때, SSR 를 서버 사이드에서 그릴 때 환경 변수의 값을 참조할 수 있습니다.  
(클라이언트에서 사용하려면 next.config.js 에서 주입 필요)

클라이언트 사이드에서도 접근하고 싶은 값에 대해서는 환경 변수 이름 앞에 NEXT*PUBLIC* 을 붙입니다.

# Next.js 미들웨어

특정 요청 전에 무언가를 수행할 수 있게 해주는 기능  
https://velog.io/@pds0309/nextjs-%EB%AF%B8%EB%93%A4%EC%9B%A8%EC%96%B4%EB%9E%80  
https://nextjs.org/docs/pages/building-your-application/routing/middleware

# Next.js 디렉토리 라우팅 (파일시스템 기반 라우팅)

pages 폴더 하위 디렉토리 라우팅

# Next.js CSR 라우팅

https://nextjs.org/docs/pages/api-reference/functions/use-router

## useRouter

## next/link

<Link /> 방식사용시 주의사항!  
https://nextjs.org/docs/pages/api-reference/functions/use-router#resetting-state-after-navigation

## withRouter

HOC 방식  
props 로 정보 주입  
https://nextjs.org/docs/pages/api-reference/functions/use-router#withrouter

# Next.js window 전역변수 사용방식

핵심! Next.js 의 경우, 기존 React CRA 와 다르게 SSR 고려하면서 코드작업해야 함 (window 전역변수 접근)

- typeof window !== undefined
- useEffect 함수로 감싸기
- Next.js 의 next/dynamic 활용하기

# Next.js next.config.js 각 설정 항목 설명

https://nextjs.org/docs/pages/api-reference/next-config-js  
기존 페이지 경로가 변경되었을 때(앱이나 타서비스 페이지에서 기존 URL을 바라볼 때) rewrites 활용가능  
https://nextjs.org/docs/pages/api-reference/next-config-js/rewrites

# Next.js 코드 스플리팅(코드분할) 자동화

`study.git/프론트/NextJS_React/React_Suspense.md` 참고!

Next.js 동적 js 파일 import  
다이나믹 임포트 당장 필요 없음 (선택적으로 필요 시 사용하는 부분)

React 서스펜스(Suspense)  
https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming

참고: SWR 데이터 패칭 도구에서는 서스펜스 사용권장 안함  
https://swr.vercel.app/ko/docs/suspense
