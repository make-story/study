# Next.js 14 신규 기능

https://nextjs.org/blog/next-14

https://modulabs.co.kr/blog/react-next-js-14/

## 메타데이터 설정 변경

기존 Next.js 13 버전의 head 정의 방식과 다름  
viewport, colorScheme, themeColor 정보는 기존 Metadata 타입과 분리되어 별도로 정의

## 서버액션 안정화

Next.js는 예전부터 API 라우터도 제공하고 있었습니다.  
Next.js는 여기서 더 나아가서 서버 액션을 통해 API 라우터를 별도로 생성하지 않아도 되도록 만들었습니다.  
동일한 Next.js 프로젝트에서만 사용할 거라면, 별도로 API 라우터까지 만들지 않고 서버 컴포넌트에서 한 번에 데이터베이스에 값을 저장할 수 있도록 제공한 것입니다.  
‘use server’를 함수나 파일에 작성해 두면, 함수 내용을 자동으로 서버 API로 만들어 주고,  
개발자는 유저에게 코드가 노출될 걱정 없이 자유롭게 데이터베이스를 관리할 수 있습니다.

## 기타 변경사항

터보팩
