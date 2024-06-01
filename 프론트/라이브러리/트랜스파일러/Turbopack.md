# Turbopack

웹팩(Webpack) 대체를 위한 도구  
Rust 기반의 번들러

https://turbo.build/pack

## Next.js

https://nextjs.org/docs/architecture/turbopack

23.12 현재, 터보팩은 현재 next dev만 지원하고 next build는 지원하지 않음  
Next.js 14 버전에서 안정화 진행중

## '모던 리액트 Deep Dive' 책 내용 중 - p750

Next.js 13 에서는 웹팩의 후계자를 자처하고 있는 터보팩(Turbopack)이 출시됐다.  
터보팩은 웹팩 대비 최대 700배, Vite 대비 최대 10배 빠르다고 하며,  
러시트 기반으로 작성됐기 때문에 가능하다고 소개하고 있다.

https://turbo.build/pack

다만 Next.js 13.1.x 를 기준으로 베타이며, 현재는 개발 모드에서만 제한적으로 사용 가능하기 때문에 실제로 프로덕션 모드에까지 사용할 수 있기까지는 어느 정도 시간이 걸릴 것으로 보인다.  
SWC 가 베타로 첫선을 보였을 때도 많은 버그가 있었고 이를 고치는데 어느 정도 시간이 소요됐던 것을 미루어 보면 터보팩도 실무에 섣불리 적용하기에는 시기상조로 보인다.
