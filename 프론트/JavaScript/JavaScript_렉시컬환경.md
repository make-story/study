# 렉시컬(Lexical) 환경이란?

https://velog.io/@wltnrms0629/BEB-Section-1-JS-%EA%B3%A0%EC%B0%A8%ED%95%A8%EC%88%98-map-filter-reduce-%EB%A9%94%EC%84%9C%EB%93%9C-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0

자바스크립트는 `함수가 호출되는 환경과는 별개로 기존에 선언되어 있던 환경 을 기준으로 변수를 조회`한다.  
이를 어휘적(Lexical) 환경이라 한다.

쉽게 말하면, 자신을 감싸고 있는 바깥 환경을 기준으로 변수를 조회하는 것이다.  
첫번째로 내부에서 변수를 찾고 없으면 외부, 그리고 전역(global)변수에도 접근 가능하다.
