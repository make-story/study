# AWS Lambda 활용 

![xaas](https://user-images.githubusercontent.com/10363214/103265139-3a0f6c00-49f0-11eb-8763-3d7db05ffb86.png)

- Legacy :   
기존 시스템은 인프라부터 소프트웨어까지 전부 구축하고 개발해야 합니다.  
- Infrastructure-as-a-Service (IaaS):  
필요한 하드웨어와 가상화, OS 등 인프라 요소를 서비스 형태로 제공합니다. 원하는 사양의 서버를 VM 으로 생성할 수 있습니다.  
- Container-as-a-Service (CaaS):   
서비스 형태로 제공되는 컨테이너를 활용해 애플리케이션을 배포합니다.  
- Platform-as-a-Service (PaaS):   
애플리케이션 개발에 집중할 수 있도록 인프라와 런타임 환경을 제공합니다. 
- `Function-as-a-Service` (FaaS):   
실행할 함수 코드에만 집중할 수 있습니다.  
- Software-as-a-Service (SaaS):   
제공되는 소프트웨어를 사용하는 형태입니다.  

-----

### Function 내부 구조
![faas-architecture](https://user-images.githubusercontent.com/10363214/103265181-527f8680-49f0-11eb-8110-9e31683e5d59.jpg)  
> `Event Source` -> `Function` -> `Service`  
- Event Source: 함수가 실행될 조건이자 이벤트 소스 (HTTP 요청, 메시징, Cron 등)  
- Function: 작업할 내용  
- Service: 작업 결과를 처리(DB 저장, 다른 서비스로 전달, 메시징, 출력 등)  

-----

### TEST API 예제
1. https://console.aws.amazon.com/lambda/home  
2. `함수생성` 버튼  
3. `새로작성` 선택  
4. 함수이름: `API_Example` 입력  
5. 런타임: `Node.js <버전>` 선택  
6. `함수생성` 버튼  
  
- 게이트웨이
1. `+ 트리거 추가` 버튼 
2. `API 게이트웨이` 선택 
3. API: `API 생성` 선택 
4. API유형: `HTTP API` 선택 
5. 보안: `열기` 선택 
6. `추가` 버튼  
7. 디자인에 추가된 `API 게이트웨이` 클릭  
8. 하단 API 게이트웨이의 `세부 정보` 클릭 
9. `API 엔드포인트` 주소 확인 (브라우저에서 해당 URL로 접근)  
  
index.js
```javascript
exports.handler = async (event, context, callback) => {
    const { headers={}, requestContext={}, } = event;
    const { http={}, } = requestContext;
    
    // TODO implement
    const response = {
        statusCode: 200,
        body: JSON.stringify(`HTTP method: ${http.method}, path: ${http.path}`),
    };
    return response;
};
```

-----

### DynamoDB 연동
1. https://console.aws.amazon.com/dynamodb/home  
2. `테이블 만들기` 버튼  
3. 테이블 이름: `User` 
4. 기본키(Primary Key): `id` 입력, `번호(Number)` 선택
5. `생성` 버튼  
6. `항목` 탭 선택 
7. `항목 만들기` 버튼
8. `Append` 또는 `Insert` 통해 필드:값 형태로 입력
9. `저장` 버튼  

- 권한
1. https://console.aws.amazon.com/iam/home#/roles
2. 역할 이름 목록에서 `<람다 함수명 링크>` 클릭 (권한 변경할 람다 함수 선택)
3. `AWSLambdaBasicExecutionRole-*** 링크` 클릭
4. `권한` 탭의 `정책 편집` 버튼 클릭  
5. `권한 추가` 클릭
6. `서비스 선택` 클릭
7. `DynamoDB` 선택
8. `모든 DynamoDB 작업` 체크
9. `리소스` 클릭 
10. `모든 리소스` 라디오 버튼 클릭
11. `정책 검토` 버튼
12. `변경 내용을 저장합니다` 버튼  
  
또는(정책연결)  
  
1. https://console.aws.amazon.com/iam/home#/roles
2. 역할 이름 목록에서 `<람다 함수명 링크>` 클릭 (권한 변경할 람다 함수 선택)
3. `정책 연결` 버튼
4. 정책필터: `AmazonDynamoDBFullAccess` 입력
5. 검색결과에서 `AmazonDynamoDBFullAccess` 에 체크
6. `정책 연결` 버튼  

```javascript
//const doc = require('dynamodb-doc'); 
//const dynamo = new doc.DynamoDB();
const AWS = require("aws-sdk");
AWS.config.update({
    region: 'us-east-1',
    endpoint: "http://dynamodb.us-east-1.amazonaws.com"
})
const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {
    const { headers={}, requestContext={}, } = event;
    const { http={}, } = requestContext;
   
    // upsert: insert 또는 update
    /*const params = { 
        TableName: "User",
        Item: {
            name: 'test123',
            id: 3
        },
    };
    dynamo.put(params, function(error, data) {
        if(error) {
            callback(error, null);
        }else {
            callback(null, data);
        }
    });*/
    
    // scan, query
    /*const params = {
        TableName: "User",
        ProjectionExpression: "#val, test, id", // select
        FilterExpression: "#val between :start and :end", // where
        ExpressionAttributeNames: {
            "#val": "val",
        },
        ExpressionAttributeValues: {
            ":start": 1,
            ":end": 100 
        }
    };*/
    const params = {
        TableName: "User",
    };
    //dynamo.scan(params, callback);
    dynamo.scan(params, (error, data) => {
        if(error) {
            callback(error);   
        }else {
            callback(null, {
                'statusCode': 200,
                'headers': {
                    'Access-Control-Allow-Origin': '*'
                },
                'body': JSON.stringify(data, null, 2),
            });
        }
    });

    /*callback(null, {
        statusCode: 200,
        body: JSON.stringify(`${http.method}, ${http.path}`),
    });*/
    /*const response = {
        statusCode: 200,
        body: JSON.stringify(`${http.method}, ${http.path}`),
    };
    return response;*/
};
```

-----

### FaaS 성능 최적화 (AWS Lambda 함수의 라이프사이클)
> 처음에 해당 함수 코드를 찾아 다운로드하고 새로운 실행 환경을 구성합니다.   
> 이 과정을 차갑게 식은 서버를 실행하는 것에 비유해 콜드 스타트(Cold Start)라고 합니다.  
> 함수를 처음 호출할 때나 업데이트 된 후 실행할 경우 어쩔 수 없이 발생하는 지연(delay)입니다.
- 해당 서버가 아직 내려가지 않은 따뜻한(warm) 상태라면 준비 과정(Cold Start)을 거치지 않고 빠르게 함수가 수행됩니다. 
이를 이용해 주기적으로 함수를 호출하도록 스케줄링하면, 서버가 내려가지 않도록 warm 상태를 유지하게 됩니다.

-----

### 일반적인 웹 애플리케이션을 서버리스 형태로 구성한 아키텍처
- 사용자에게 보여줄 웹 페이지 및 정적 콘텐츠는 S3 에 저장 후 호스팅  
- 사용자 요청은 API Gateway 로 받기  
- 처리할 내용은 Lambda 에 작성  
- 데이터 저장은 DB 서비스(DynamoDB) 사용  
- 사용자 인증은 Amazon Cognito 사용  
- Route 53으로 도메인 구입 및 제공  