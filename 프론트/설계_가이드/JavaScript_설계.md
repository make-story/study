
하나의 화면(page)에 비즈니스 로직, 데이터, 컴포넌트를 모두 관리하는 것이 아니라 pages, containers, components로 나누어 화면을 관리하였습니다.

## components
재사용이 가능한 요소들을 모아 컴포넌트로 구성되어 있습니다. 순수한 데이터 형태를 props로 받아오며, 다양한 container에서 사용 됩니다.

## containers
container는 화면을 구성하기 위한 영역에 해당하며 이며 여러개의 section을 가지고 있습니다. (container내 하위 폴더가 section 입니다.) 또한 section은 여러개의 component들의 조합으로 구성되어있습니다.

기본적으로 page와 container는 1:1 매칭 된 구조를 가지고 있으며 데이터를 가져오거나, 비즈니스 로직이 포함됩니다.

## pages
pages에 존재하는 파일 이름을 기준으로 서비스의 경로가 생성됩니다. 해당 파일은 경로 이름과 SEO를 위한 title, description 등을 추가하며 콘텐츠들은 모두 container에서 관리하였습니다.


-----


# Javascript에서도 SOLID 원칙이 통할까?
https://velog.io/@teo/Javascript%EC%97%90%EC%84%9C%EB%8F%84-SOLID-%EC%9B%90%EC%B9%99%EC%9D%B4-%ED%86%B5%ED%95%A0%EA%B9%8C?fbclid=IwAR3Q9yeXJNSYNOqMWF-CBqtZHNpf8FSZ9BspxCLRPFYzdouJ2EvySeyzFRc  
