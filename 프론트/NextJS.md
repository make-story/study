
## Next.js 필요한 것만 빨리 배우기  
https://velog.io/@jakeseo_me/Next.js-%EB%B9%A8%EB%A6%AC-%EB%B0%B0%EC%9A%B0%EA%B8%B0-y0jz9oebn0  

## next-redux-wrapper가 필요한 이유  
https://simsimjae.medium.com/next-redux-wrapper%EA%B0%80-%ED%95%84%EC%9A%94%ED%95%9C-%EC%9D%B4%EC%9C%A0-5d0176209d14  

## Next.js pre-rendering 정리  
https://helloinyong.tistory.com/306  

## Script 로드 우선순위  
https://nextjs.org/docs/basic-features/script  
https://themarketer.tistory.com/82   

'next/script' 를 사용하면, 'strategy' 속성을 정의할 수 있고,   
Next.js가 스크립트 로딩을 최적화합니다.   

- 'beforeInteractive'   
페이지가 상호작용하기 전에 가져오고 실행되어야 할 필요가 있는 중요한 스크립트의 경우 사용합니다.   
- 'afterInteractive' (default)   
해당 페이지의 상호작용 이후에 가져오고 실행되는 스크립트의 경우 사용합니다.   
- 'lazyOnload'   
유휴 시간동안 로드를 기다릴 수 있는 스크립트의 경우에 사용합니다.   

## 이제는 Next.js 페이지의 본문(body) 안에서 'next/script' 를 사용합니다.   
```javascript
import Script from 'next/script'

export default function Home() {
  return (
    <>
      <Script src="https://www.google-analytics.com/analytics.js" />  
      <Script src="https://connect.facebook.net/en_US/sdk.js" strategy="lazyOnload" />  
      <Script
        src="https://cdn.jsdelivr.net/npm/cookieconsent@3/build/cookieconsent.min.js"
        strategy="beforeInteractive"
      />
    </>
  )
}
```