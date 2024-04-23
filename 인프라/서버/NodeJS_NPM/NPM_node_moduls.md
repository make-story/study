# node_modules 의 문제

https://d2.naver.com/helloworld/7553804

## 의존성 탐색 알고리즘의 비효율

node.js에서 require() 함수를 실행하면 모듈을 찾을 때까지 상위 node_modules 디렉터리를 순회한다.  
이때 느린 디스크 I/O 동작이 경로의 깊이만큼 발생한다.  
https://github.com/nodejs/node/blob/24fc302eadf64d2518733a2ae40355916e6990f7/lib/internal/modules/cjs/loader.js#L321-L336

## 저장 공간과 설치 시간

node_modules 디렉터리는 흔히 매우 큰 공간을 필요로 하고, 그만큼 설치에도 오랜 시간이 걸린다.

## 유령 의존성(phantom dependency)

의존성 중복 방지를 위해 호이스팅 기법을 이용하는데 이것은 의도치 않은 side effect을 발생시킨다.
