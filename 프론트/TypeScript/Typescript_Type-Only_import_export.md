# Type-Only Imports and Exports

Type-only import/export 는 TypeScript 3.8 에 추가됨  
https://www.typescriptlang.org/ko/docs/handbook/release-notes/typescript-3-8.html

- import type
  타입 표기와 선언에 사용될 선언만 import 한다.
- export type
  타입 문맥에서 사용할 export만 제공하며, 추후 TS의 출력물에서 제거된다.

원래의 import, export 문법과 동일하나 뒤에 type 만 덧붙여주면 된다.

## 주의!

import type으로 받아온 class는 확장이 불가능하다.

## import type

1.  type-only imports and exports

- 이 방식을 통해 모듈에서 타입 정보만을 가져오므로 불필요한 값이 메모리에 로딩되는 문제를 해결하였다.
  - import type 을 사용할 경우 이러한 import 는 항상 컴파일 과정에서 완전히 제거되어 런타임에는 남아있지 않게 된다.
  - export type 또한 타입의 맥락에서만 사용되는 export 구문이므로, 변환 과정에서 삭제된다.
- 명시적으로 타입만을 가져온다고 보장되므로 JS 변환 시 삭제된다.
- Babel 등의 도구가 isolatedModules 옵션을 통해 코드를 추정하기 더 용이해진다.
- 위의 복잡한 이유에 덧붙여, 명시적으로 타입 import 를 나타낼 수 있으므로 개발자의 입장에서 가독성이 좋아지는 효과도 있다.

2. importsNotUsedAsValues

- 런타임 시 사용되지 않는 import 에서 발생하는 작업을 제어하기 위해 TypeScript 3.8 에서 추가된 기능이다.
- JS로 변환되었을 때 절대 사용되지 않을 import 구문들을 import type 을 통해 명시적으로 작성할 수 있으므로 작동하는 플래그이다.
