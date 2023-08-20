# 바니시 캐시 (Varnish Cache)

https://d2.naver.com/helloworld/352076

Varnish는 BSD 라이선스를 따르는 오픈 소스 웹 캐시 소프트웨어

Varnish는 HTTP 요청에 신속한 응답을 제공하기 위해 결과 데이터를 캐싱(Caching)한 뒤
동일한 요청이 다시 들어오면 캐시된 데이터로 내려줘서 응답 시간을 줄여줄 수 있는 리버스 프록시(Reverse Proxy)이다.  
흔히 웹 가속기라고도 불려진다.

요청한 URL을 기준으로 캐시 데이터를 생성하고,  
만료 시간(TTL)을 설정해서 캐시가 자동 소멸되는 라이프 타임을 유지한다.
