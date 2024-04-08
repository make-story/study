# className 조건, 여러개 사용

https://npmtrends.com/classname-vs-classnames-vs-cls-vs-clsx

## classnames

classnames 는 CSS 클래스를 조건부로 설정할 때 매우 유용한 라이브러리입니다.  
또한, CSS Module을 사용할 때 이 라이브러리를 사용하면 여러 클래스를 적용할 때 매우 편리합니다.

```
$ yarn add classnames
```

```javascript
import classNames from 'classnames';

classNames('one', 'two'); // = 'one two'
classNames('one', { two: true }); // = 'one two'
classNames('one', { two: false }); // = 'one'
classNames('one', ['two', 'three']); // = 'one two three'

const myClass = 'hello';
classNames('one', 'myClass', { myCondition: true }); // = 'one hello myCondition'
```

## clsx

tailwind 는 뒤에 클래스명을 선언한다고 해서 덮여 씌워지지 않는다.

```bash
$ yarn add clsx tailwind-merge
```

libs/utils

```typescript
import type { ClassValue } from 'clsx';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```
