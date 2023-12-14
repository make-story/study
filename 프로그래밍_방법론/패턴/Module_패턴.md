# 코드를 재사용 가능하면서도 작게 나눈다

https://patterns-dev-kr.github.io/design-patterns/module-pattern/  
https://www.patterns.dev/posts/module-pattern/

코드베이스가 커져갈 수록 코드들을 유지보수하기 좋게 쪼개는 것이 중요해진다.  
`모듈 패턴이 이 때 코드들을 재사용 가능하면서도 작게 나눌 수 있게 해 준다.`

또 모듈을 코드를 나누는 과정에 특정 변수들을 파일 내에 private 하게 할 수 있는데.  
모듈 스코프 내에 변수를 선언하고 명시적으로 외부에 export 하지 않으면 바깥에서 해당 변수에 접근할 수 없다.  
이를 통해 전역 스코프의 변수들과 이름이 충돌하는 문제를 줄일 수 있다.
