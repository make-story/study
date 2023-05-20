# Authentication bearer

`bearer 는 JWT와 OAuth를 타나내는 인증 타입`

https://velog.io/@tosspayments/Basic-%EC%9D%B8%EC%A6%9D%EA%B3%BC-Bearer-%EC%9D%B8%EC%A6%9D%EC%9D%98-%EB%AA%A8%EB%93%A0-%EA%B2%83

https://velog.io/@cada/%ED%86%A0%EA%B7%BC-%EA%B8%B0%EB%B0%98-%EC%9D%B8%EC%A6%9D%EC%97%90%EC%84%9C-bearer%EB%8A%94-%EB%AC%B4%EC%97%87%EC%9D%BC%EA%B9%8C

세션의 경우 세션ID를 보내므로 쿠키에 비해 보안성이 높다고 볼 수 있지만 서버에 추가적인 데이터베이스 공간이 필요하다는 단점이 있습니다.

이러한 단점들을 해결할 수 있는 방법이 바로 토큰 기반 인증입니다.  
토큰에는 암호화 방식과 타입 등을 나타내는 헤더, 전송할 데이터가 담긴 페이로드, 토큰 검증을 위한 서명을 각각 인코딩(해싱)한 값이 포함되어 있습니다.

일반적으로 토큰은 요청 헤더의 Authorization 필드에 담아져 보내집니다.  
`Authorization: <type> <credentials>`

## 인증 타입 <type>

- Basic
  사용자 아이디와 암호를 Base64로 인코딩한 값을 토큰으로 사용한다. (RFC 7617)

- Bearer
  JWT 혹은 OAuth에 대한 토큰을 사용한다. (RFC 6750)

- Digest
  서버에서 난수 데이터 문자열을 클라이언트에 보낸다. 클라이언트는 사용자 정보와 nonce를 포함하는 해시값을 사용하여 응답한다 (RFC 7616)

- HOBA
  전자 서명 기반 인증 (RFC 7486)

- Mutual
  암호를 이용한 클라이언트-서버 상호 인증 (draft-ietf-httpauth-mutual)

- AWS4-HMAC-SHA256
  AWS 전자 서명 기반 인증
