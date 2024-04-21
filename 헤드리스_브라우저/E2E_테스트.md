# E2E TEST

`monorepo-nodejs20.git/apps/e2e-test` 참고!

https://fe-developers.kakaoent.com/2023/230209-e2e/

https://ui.toast.com/posts/ko_20210818/

`https://tech.wonderwall.kr/articles/learningwithtest`

https://www.freecodecamp.org/news/end-to-end-testing-tutorial/

사용자 중심으로 애플리케이션의 흐름을 처음부터 끝까지 테스트하는 것을 의미

개발자 중심의 유닛 테스트나 통합 테스트는 모듈의 무결성을 증명할 수 있는 강력한 테스트이지만,
모듈의 무결성이 애플리케이션 동작의 무결성까지는 증명해 줄 수 없습니다. 
E2E 테스트 과정에서는 실제 사용자의 시나리오를 테스트함으로써 애플리케이션 동작을 테스트하게 되고,
이 테스트를 통과함으로써 애플리케이션의 무결성을 증명할 수 있게 됩니다.

조금 더 성공적으로 E2E 테스트를 도입하고 운영하기 위해서는 이런 걸림돌과 해결책에 대해서 집중

- QA 팀과 협업 및 프로세스 정의
- 테스트 코드 관리 (지속가능성, Developer Experience)
- 테스트 실행 속도 및 정확도, 확장성

# 용어

## 테스트, 테스트 케이스, 테스트 시나리오

- 테스트 시나리오(Test Scenario)는 테스트 실행을 위한 일련의 활동을 구체적으로 기술해둔 문서
- 테스트 케이스(Test Case)는 특정 목적 또는 테스트 조건의 확인을 위해 개발된 입력 값, 실행 사전 조건, 예상 결과 및 실행 사후 조건 등을 포함은 내용의 집합
- 테스트(Test)란 한 개 이상의 테스트 케이스의 집합

https://softwaretestingreference.tistory.com/221

네이밍 관련  
https://docs.aws.amazon.com/ko_kr/cloud9/latest/user-guide/build-run-debug.html

## 러너(runner), 런(run)

- 러너(runner): 실행기
- 런(run): 실행
