# SWR

https://swr.vercel.app/ko

https://fe-developers.kakaoent.com/2022/220224-data-fetching-libs/

https://www.npmjs.com/package/swr

"SWR"이라는 이름은 HTTP RFC 5861에 의해 알려진 HTTP 캐시 무효 전략인 stale-while-revalidate에서 유래되었다.

SWR은 먼저 캐시(stale)로부터 데이터를 반환한 후,  
fetch 요청(revalidate)을 하고,  
최종적으로 최신화된 데이터를 가져오는 전략이다.

SWR은 Nextjs 로 유명한 vercel 에서 만든 원격데이터 fetch 를 위한 커스텀 훅 npm 모듈입니다.  
SWR은 원격서버의 상태를 가져와서 리액트 컴포넌트에 꽂아주는 기능을 제공합니다.
