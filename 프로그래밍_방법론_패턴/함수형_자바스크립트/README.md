`현실에서의 실행 경험`

https://boxfoxs.tistory.com/434

함수형 프로그래밍에서 배열의 값을 변경할 수 있는 메소드를 사용해서는 안됩니다.  
값을 가져오기만 하거나 배열의 수정이 필요하다면 새로운 배열로 만들어야 합니다.

`불변!!!!! 기존 객체는 유지(불변)하면서 수정이 필요할 때는 새로운 객체(메모리주소) 생성!!`

```javascript
// 원본 배열을 수정하는 것 대신 아래와 같이 새로운 배열을 만들어 사용하세요.
const arr2 = [...arr, 38, 52];
const even = filter(x => x % 2 === 0, arr);
```

# 챗GPT 답변

JavaScript에서 반복되는 코드를 함수형 프로그래밍으로 효율화하는 방법은 여러 가지가 있습니다.  
몇 가지 일반적인 방법은 다음과 같습니다

1. 고차 함수(Higher-Order Functions) 사용

map, filter, reduce와 같은 고차 함수를 사용하여 배열을 조작합니다.  
예를 들어, 반복문 대신 map을 사용하여 배열의 각 요소를 변환하거나, filter를 사용하여 조건에 맞는 요소만 선택할 수 있습니다.

2. 순수 함수(Pure Functions) 활용

부작용을 최소화하고 입력에만 의존하는 순수 함수를 작성합니다.  
상태를 변경하는 대신 값을 반환하도록 합니다.

3. 재귀 함수(Recursive Functions) 활용

반복 대신 재귀를 사용하여 문제를 해결할 수 있습니다.  
주의해야 할 점은 적절한 종료 조건을 설정하여 무한 재귀에 빠지지 않도록 하는 것입니다.

4. 커링(Currying) 및 함수 합성(Composition)

함수를 여러 개의 작은 함수로 나누어 작성하고, 필요에 따라 조합합니다.  
함수 합성을 통해 코드를 더 모듈화하고 가독성을 높일 수 있습니다.

5. 모나드(Monads) 사용

모나드를 활용하여 부작용을 추상화하고, 코드를 더 안전하게 만들 수 있습니다.

6. ES6+ 기능 활용

화살표 함수, 펼침 연산자, 비구조화 할당 등을 사용하여 간결하고 효율적인 코드를 작성합니다.

# 함수 내부 if 조건문 깊이를 줄이는 방법으로 빠르게 리턴하는 방법 추천

```javascript
function test1() {
  const a = '';
  if (a) {
    const { b, c } = { b: '', c: '' };
    if (b && c) {
      const d = 0;
      if (d) {
        // ...비즈니스 실행코드
      }
    }
  }
}

function test2() {
  const a = '';
  if (!a) {
    return;
  }

  const { b, c } = { b: '', c: '' };
  if (!b || !c) {
    return;
  }

  const d = 0;
  if (!d) {
    return;
  }

  // ...비즈니스 실행코드
}
```

# 클로저

`함수가 생성되는 시점의 스코프 체인을 기억하고 접근가능한 함수` - 내부함수

```javascript
const instructors = [
  {
    name: '짐',
    libraries: ['미디어교육정보 도서관'],
  },
  {
    name: '새라',
    libraries: ['기념 도서관', '문헌정보학 도서관'],
  },
];

const findByLibrary =
  (
    libarary = '기념 도서관', // 공통 코드에서 구분해야하는 것 (조건, 필터 등)
  ) =>
  instructor => {
    // 공통 코드
    return instructor.libraries.includes(libarary);
  };
const librarian = instructors.find(findByLibrary('미디어교육정보 도서관'));
/*
{
	name: '짐',
	libraries: ['미디어교육정보 도서관']
}
*/
```

# 고차함수

https://velog.io/@wltnrms0629/BEB-Section-1-JS-%EA%B3%A0%EC%B0%A8%ED%95%A8%EC%88%98-map-filter-reduce-%EB%A9%94%EC%84%9C%EB%93%9C-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0

고차 함수(Higher order function)는 `함수를 인자로 전달받거나 함수를 결과로 반환하는 함수`

## 활용 1

개선전 : 외부 참조가 있는 함수 - 테스트할 때 어려운 부분

```javascript
import { getTaxInformation } from './taxService';

function formatPrice(user, { price, location }) {
  const rate = getTaxInformation(location); // <label id="test.external" />
  const taxes = rate ? `plus $${price * rate} in taxes.` : 'plus tax.';

  return `${user} your total is: ${price} ${taxes}`;
}

export { formatPrice };
```

개선후 : `코드의 결합을 제거하려면 getTaxInformation() 을 인자로 전달하는 것만으로 충분합니다. - 고차함수`

```javascript
function formatPrice(user, { price, location }, getTaxInformation) {
  const rate = getTaxInformation(location);
  const taxes = rate ? `plus $${price * rate} in taxes.` : 'plus tax.';
  return `${user} your total is: ${price} ${taxes}`;
}

export { formatPrice };
```

## 활용 2

`여러 매개변수가 있는 특정함수를 호출할 때마다 전달하는 첫 번째 매개변수가 항상 동일할 때 사용 추천!`

```javascript
const building = {
	hours: '8 a.m.'
	address: '',
};

const manager = {
	name: 'Augusto',
	phone: '000-000-0000',
};

const program = {
	name: 'Presenting',
	room: '415',
	horus: '3 - 6',
};

const exhibit = {
	name: 'Emerging',
	contact: 'Dyan',
};

// 하나의 정보 집합으로 결합하는 함수 - 일반적 방식
function mergeProgramInformation(building, manager, event) {
	const { hours, address } = building;
	const { name, phone } = manager;
	const defaults = {
		hours,
		address,
		contact: name,
		phone,
	};

	return { ...defaults, ...event };
}

// 코드를 살펴보면, 함수를 호출할 때마다 전달하는 첫 번째 매개변수는 building 으로 항상 동일합니다.
const programInfo = mergeProgramInformation(building, manager, program);
const exhibitInfo = mergeProgramInformation(building, manager, exhibit);
```

```javascript
// 하나의 정보 집합으로 결합하는 함수 - 추천 방식
function mergeProgramInformation(building, manager) {
  const { hours, address } = building;
  const { name, phone } = manager;
  const defaults = {
    hours,
    address,
    contact: name,
    phone,
  };

  return program => {
    return { ...defaults, ...program };
  };
}

const programInfo = mergeProgramInformation(building, manager)(program);
const exhibitInfo = mergeProgramInformation(building, manager)(exhibit);
```

# 추상화

명령형(imperative) 프로그래밍이란 컴파일러에게 특정 작업을 어떻게 해야 하는지 알려주는 것이다.
선언형 프로그래밍에서는 컴파일러가 어떻게 작업해야 하는지보다 어떤 것이 필요한지가 중요하다.  
`'어떻게'라는 부분은 일반적인 함수 내에 추상화된다.`

```javascript
// 선언형 형태의 배열 반복
const array = [1, 2, 3];
array.forEach(element => console.log(element));
```

`추상화된 함수를 사용해서 개발자가 '어떻게'라는 부분을 다루고, 직접(어떻게) 문제를 걱정할 필요가 없게 됐다.`

고차 함수를 통한 추상화

```javascript
const forEach1 = (array, fn) => {
  for (let i = 0; i < array.length; i++) {
    fn(array[i]);
  }
};
```

위의 forEach 함수는 배열을 순회하는 문제를 추상화 했다.  
forEach API 사용자는 forEach 함수에서 순회 부분이 어떻게 구현됐는지 이해할 필요가 없으므로,  
`이 문제를 추상화 했다.`

고차 함수가 개발자로 하여금 일반적인 문제를 추상화로 만들 수 있게 어떻게 도와주는지 살펴봤다.

# 커링

커링(Currying)이란 f(a, b, c)처럼 여러개의 인자를 한번의 호출로 처리하던 함수를  
f(a)(b)(c)처럼 분리하여 인자를 하나씩만 받는 여러개의 함수로 변환하는 과정

한 번에 인수를 하나만 받는 함수를 '커링(curring)'이라고 함

# 체이닝

```javascript
const sailors = [
  {
    name: 'test1',
    active: true,
    email: 'test1@test.com',
  },
  {
    name: 'test2',
    active: true,
    email: '',
  },
  {
    name: 'test3',
    active: false,
    email: '',
  },
];
// 체이닝
sailors
  .filter(sailor => sailor.active)
  .map(sailor => sailor.email || `${sailor.name}@test.com`)
  .forEach(sailor => sendEmail(sailor));
```

# new Map : 키-값 데이터 관리

```javascript
const filters = new Map()
  .set('견종', '래브라도레트리버')
  .set('크기', '대형견')
  .set('색상', '갈색');
```

```javascript
function ckeckFilters(filters) {
  for (const entry of filters) {
    console.log(entry);
    // ['견종', '래브라도레트리버']
    // ['크기', '대형견']
    // ['색상', '갈색']
  }
}
```

```javascript
function getAppliedFilters(filters) {
  const applied = [];
  for (const [key, value] of filters) {
    applied.push(`${key}:${value}`);
  }
  return `선택한 조건은 ${applied.join(', ')} 입니다`;
}
```

```javascript
// Map 정렬
function sortByKey(a, b) {
  return a[0] > b[0] ? 1 : -1;
}
function getSortedAppliedFilters(filters) {
  const applied = [];
  for (const [key, value] of [...filters].sort(sortByKey)) {
    applied.push(`${key}:${value}`);
  }
  return `선택한 조건은 ${applied.join(', ')} 입니다`;
}
```

```javascript
// 함수형(선언적) 프로그래밍
function getSortedAppliedFilters(filters) {
  const applied = [...filters]
    .sort(sortByKey)
    .map(([key, value]) => {
      return `${key}:${value}`;
    })
    .join(', ');
  return `선택한 조건은 ${applied.join(', ')} 입니다`;
}
```

# new Set : 고유값 관리

```javascript
const colors = ['검정색', '검정색', '갈색'];
const unique = new Set(colors); // {'검정색', '갈색'}
```

```javascript
function getUnique(attributes) {
  return [...new Set(attributes)];
}
```

```javascript
let names = new Set();
names.add('joe');
names.add('bea');
names.add('joe');
// Set { 'joe', 'bea' }
```

```javascript
const dogs = [
  {
    name: '맥스',
    color: '검정색',
  },
  {
    name: '도니',
    color: '검정색',
  },
  {
    name: '섀도',
    color: '갈색',
  },
];
function getUniqueColors(dogs) {
  const unique = new Set();
  for (const dog of dogs) {
    unique.add(dog.color);
  }
  return [...unique];
}
```
