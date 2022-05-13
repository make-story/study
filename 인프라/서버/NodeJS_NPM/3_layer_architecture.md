# 3 layer architecture
https://velog.io/@ju_h2/Node-express-%EC%84%9C%EB%B2%84%EC%97%90-3-Layer-Architecture-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0  
https://medium.com/machine-words/separation-of-concerns-1d735b703a60  
https://www.codementor.io/@evanbechtol/node-service-oriented-architecture-12vjt9zs9i  

3 layer architecture는 비즈니스 로직을 분리하는 것을 목적으로 하며 Controller, Service Layer , Data Access Layer 라는 세개의 층으로 나뉩니다.  
간단히 설명하면 controller는 client와의 통신에서 필요한 req, res를 다루는 부분이고,  
service layer은 business logic을 Data Access Layer은 디비와의 직접적인 통신을 다룹니다.  
이때, business logic은 client와 Data Acees Layer 사이에서 데이터를 조종하는 작업입니다.  
  
1. controller  
컨트롤러는 들어오는 클라이언트 요청을 받고 서비스에 전달한다.  
서비스에서 작업을 마친 데이터를 받아 클라이언트에게 응답한다.  
  
2. service   
서비스 계층은 나머지 애플리케이션에서 모든 비즈니스 로직을 캡슐화하고 추상화합니다.  

- Service Layer Sould.  
비즈니스 로직 포함  
데이터 액세스 계층을 활용하여 데이터베이스와 상호 작용  
controller 계층에 전달할 데이터 리턴  

- Service Layer Sould Not.   
req , res 활용  
클라이언트에 대한 응답 처리  
데이터베이스와 직접 상호 작용  
  
3. data Access Layer  
데이터 액세스 계층은 쿼리를 수행하여 데이터베이스와 상호 작용합니다. 제가 사용하고 있는 Sequelize는 Data Access Layer의 역할의 일부를 대체해줍니다.  
sequelize를 사용하지 않으면 아래와 같이 data Access Layer를 담당하는 파일에 쿼리문을 모아서 필요할 때 service 계층에서 호출해서 사용합니다.  

## server -> router -> controller -> service -> model  

## node js business logic  