# Node.js는 V8 자바스크립트 엔진으로 돌아가는 C++ 프로그램이다

https://dongmin-jang.medium.com/node-js-memory-leak-%EB%A9%94%EB%AA%A8%EB%A6%AC-%EB%88%84%EC%88%98-ac32234cb9e0

https://v8.dev/

Google V8 은 초기에 구글 크롬을 위해 만든 자바스크립트 엔진이다. 그러나 개별적으로도 사용이 가능하다.  
V8은 node.js에 딱 맞게 만들어 졌다. 그리고 자바스크립트 플랫폼의 한 부분이다. V8은 자바스크립트를 native code로 컴파일해서 실행한다. 실행되는 동안 메모리를 필요한 만큼 할당하고 회수한다. 이는 우리가 node.js의 메모리 관리에 대해서 논한다면 반드시 V8에 대해서 언급할 수 밖에 없다는 것을 뜻한다.

## V8의 메모리 정책

실행되고 있는 프로그램은 항상 메모리의 빈공간에 할당되어 나타난다. 이 공간은 Resident Set 이라고 불린다. V8 은 JVM과 비슷한 정책을 사용하며 메모리를 세그먼트로 나눈다.

- Code: 실행될 실제 코드
- Stack: 힙에 있는 오브젝트를 참조하는 포인터와 함께 모드 value 타입을 포함 ( integer, boolean과 같은 기본 요소 )
- Heap: 오브젝트, 스트링, 클로저와 같은 레퍼런스 타입을 저장하기 위한 전용 메모리 세그먼트

## Node.js내에서 현재 메모리 사용은 process.memoryUsage()를 이용해 쉽게 이용할 수 있다.

https://nodejs.org/api/process.html#process_process_memoryusage

```javascript
import { memoryUsage } from 'node:process';

console.log(memoryUsage());
// Prints:
// {
//  rss: 4935680,
//  heapTotal: 1826816,
//  heapUsed: 650472,
//  external: 49879,
//  arrayBuffers: 9386
// }
```
