/**
 * https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object
 */

// 객체 리스트 중 변수(key)값에 따른 선택
// 환경변수(NODE_ENV)에 따른 값 선택간 유용
const key1 = 'c';
const value1 = {
  a: 1,
  b: 2,
  c: 3,
}[key1];

/**
 * 객체 구조 분해 할당
 * https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
 */
var a, b, rest;
({ a, b, ...rest } = { a: 10, b: 20, c: 30, d: 40 });

/**
 * 객치 순회
 */
(() => {
  const object1 = {
    a: 'somestring',
    b: 42,
  };
  for (const [key, value] of Object.entries(object1)) {
    //object1.hasOwnProperty(key);
    console.log(`${key}: ${value}`);
  }
  // expected output:
  // "a: somestring"
  // "b: 42"
  // order is not guaranteed

  const obj = { a: 5, b: 7, c: 9 };
  Object.entries(obj).forEach(([key, value]) => {
    console.log(`${key} ${value}`); // "a 5", "b 7", "c 9"
  });
})();

// 비동기 순회
// for await 와 Promise.all()과의 차이
// promise.all()은 인자의 프로미스 배열을 동시에 실행한다.
// for await of 내의 비동기 작업은 루프를 돌며 순차적으로 실행된다.}
(async () => {
  const object1 = {
    a: 'somestring',
    b: 42,
  };
  for await (let [key, value] of Object.entries(object1)) {
    await console.log(key);
  }
})();

/**
 * 객체 펼침연산자로 값 갱신
 */
(() => {
  const book = {
    title: 'A',
    author: 'B',
  };
  const update = { ...book, year: 1984 };

  const defaultEmployee = {
    name: {
      first: '',
      last: '',
    },
    years: 0,
  };
  const employee = {
    ...defaultEmployee,
    name: {
      ...defaultEmployee.name,
    },
  };
})();

/**
 * 해체할당 통해 특정 값 제거
 * https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
 */
(() => {
  const test = { a: 1, b: 2, c: 3 };
  const { c, ...objWithoutC } = test;
  console.log(objWithoutC); // { a: 1, b: 2 }
})();

/**
 * Map 으로 key-value 관리
 */
(() => {
  let filters = new Map([
    ['견종', '래브라도레트리버'],
    ['크기', '대형견'],
    ['색상', '갈색'],
  ]);
  filters.get('색상'); // 갈색

  filters.delete('색상');
  filters.get('색상'); // undefined

  filters.clear();
  filters.get('크기'); // undefined

  filters.keys();

  let errors = new Map([
    [100, '이름이 잘못되었습니다'],
    [110, '이름에는 문자만 입력할 수 있습니다.'],
  ]);
  errors.get(100);
})();

/**
 * Map key-value 순회
 */
(() => {
  const filters = new Map()
    .set('견종', '래브라도레트리버')
    .set('크기', '대형견')
    .set('색상', '갈색');

  function getAppliedFilters(filters) {
    const applied = [];
    for (const [key, value] of filters) {
      applied.push(`${key}:${value}`);
    }
    return `선택한 조건은 ${applied.join(', ')} 입니다`;
  }

  getAppliedFilters(filters);
})();

/**
 * Map key 정렬
 */
(() => {
  const filters = new Map()
    .set('견종', '래브라도레트리버')
    .set('크기', '대형견')
    .set('색상', '갈색');

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

  getSortedAppliedFilters(filters);
})();

/**
 * Map key-value 합치기
 */
(() => {
  let filters = new Map().set('색상', '검정색');
  let filters2 = new Map().set('색상', '갈색');
  let update = new Map([...filters, ...filters2]);
  update.get('색상'); // 갈색

  function applyDefaults(map, defaults) {
    return new Map([...defaults, ...map]);
  }

  console.log(applyDefaults(filters, filters2));
})();

/**
 * Set 고유값 관리
 */
(() => {
  let names = new Set();
  names.add('joe');
  names.add('bea');
  names.add('joe');
  // Set { 'joe', 'bea' }

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
})();

// ----------

/**
 * 그룹, 그룹내 아이템
 */
const store = new Map();

const initalGroupItem = {
  groupCode: '', // 고유값
  text: '', // 그룹명
  todoList: [], // 할일 리스트
};
const initalTodoItem = {
  todoCode: '', // 고유값
  text: '', // 할일
  rank: 0,
  time: 0,
  minute: 0, // 타이머 작동시 사용 : 분
  second: 0, // 타이머 작동시 사용 : 초
  timer: false, // 타이머 작동여부
  done: false, // 종료여부
};

const groupCode = '111111'; // 그룹 고유값
const todoCode = '222222'; // 할일 고유값
store.set(groupCode, { ...initalGroupItem, groupCode }); // 그룹 생성
store.set(groupCode, { ...store.get(groupCode), text: 'TEST' }); // 특정 그룹 정보 수정

let groupData, todoData;
groupData = store.get(groupCode); // 특정 그룹값 불러오기
groupData.todoList = [...groupData.todoList, { ...initalTodoItem, todoCode }]; // 특정 그룹에 신규 할일 추가
groupData = store.get(groupCode); // 특정 그룹값 불러오기
console.log(groupData);

[todoData] = groupData.todoList.filter(value => value.todoCode === todoCode); // 할일 리스트에서 특정 할일 불러오기
let todoUpdate = {
  text: 'TEST',
};
for (const key in todoUpdate) {
  todoData[key] = todoUpdate[key]; // 특정 할일 정보 수정
}
groupData = store.get(groupCode);
console.log(groupData);

// ----------

// 중복 제거
export const removeObjectDuplicates = (list = [], key = '') => {
  // list = [ {id: 1}, {id: 4}, {id: 1}, {id: 5}, {id: 4}, ];
  const set = new Set();
  return list.filter(obj => {
    const existing = set.has(obj[key]);
    set.add(obj[key]);
    return !existing;
  });
};

// 깊은 복사
export const deepClone = (obj = {}) => {
  let clone = obj;
  if (obj && typeof obj === 'object') {
    clone = new obj.constructor();
    Object.getOwnPropertyNames(obj).forEach(
      prop => (clone[prop] = deepClone(obj[prop])),
    );
  }
  return clone;
};

// Deep extend destination object with N more objects
/*export const extend = (out={}) => {
	let i, key;
	for(i=1; i<arguments.length; i++) {
		if(!arguments[i]) {
			continue;
		}
		for(key in arguments[i]) {
			if(arguments[i].hasOwnProperty(key)) {
				out[key] = arguments[i][key];
			}
		}
	}
	return out;
}*/
export function extend(target = {}, ...sources) {
  if (!sources.length) {
    return target;
  }
  const source = sources.shift();
  if (!source || typeof source !== 'object') {
    return target;
  }
  Object.keys(source).forEach(key => {
    if (source[key] && typeof source[key] === 'object') {
      if (!Object.keys(target).includes(key)) {
        Object.assign(target, { [key]: {} });
      }
      extend(target[key], source[key]);
    } else {
      Object.assign(target, { [key]: source[key] });
    }
  });
  return extend(target, ...sources);
}

// -----

/**
 * 특정 JSON key 기준으로 값 추가
 */
// 방법 1
// Merge List of JSON Objects on Same Key and Drop Un-merged Objects
let arrObjA = [
  { index: 114, realName: 'kevin', bucket: 'boss', react_name: 'BossKevin' },
  { index: 115, realName: 'angela', bucket: 'boss', react_name: 'BossAngela' },
  {
    index: 116,
    realName: 'james',
    bucket: 'janitor',
    react_name: 'JanitorJames',
  },
  {
    index: 117,
    realName: 'arthur',
    bucket: 'employee',
    react_name: 'EmployeeArthur',
  },
];
let arrObjB = [
  { boxName: 'building', realName: 'angela', boxValue: '2' },
  { boxName: 'building', realName: 'james', boxValue: 'false' },
  { boxName: 'building', realName: 'arthur', boxValue: '0' },
];
let result = arrObjB.map(item => ({
  ...arrObjA.find(({ realName }) => item.realName == realName),
  ...item,
}));
console.log(result);

// 방법 2
// https://stackoverflow.com/questions/35903850/combine-json-arrays-by-key-javascript
const json1 = [
  { id: 1, name: 'aaa' },
  { id: 5, name: 'ccc' },
  { id: 3, name: 'bbb' },
];
const json2 = [
  { id: 3, parameter1: 'x', parameter2: 'y', parameter3: 'z' },
  { id: 1, parameter1: 'u', parameter2: 'v', parameter3: 'w' },
  { id: 5, parameter1: 'q', parameter2: 'w', parameter3: 'e' },
];
const example = [
  { id: 3, name: 'bbb', parameter1: 'x', parameter2: 'y', parameter3: 'z' },
  { id: 1, name: 'aaa', parameter1: 'u', parameter2: 'v', parameter3: 'w' },
  { id: 5, name: 'ccc', parameter1: 'q', parameter2: 'w', parameter3: 'e' },
];
// lodash
const merge1 = _(json1)
  .concat(json2)
  .groupBy('id')
  .map(_.spread(_.assign))
  .value();
// ES2015
const merge2 = json2.map(x =>
  Object.assign(
    x,
    json1.find(y => y.id == x.id),
  ),
);

/**
 * key 기준으로 두 JSON 합치기
 * merge two json object based on key value in javascript
 * https://stackoverflow.com/questions/30093561/merge-two-json-object-based-on-key-value-in-javascript
 */
// 방법 1
const a = [
  { id: 36, name: 'AAA', goal: 'yes' },
  { id: 40, name: 'BBB', goal: 'yes' },
  { id: 57, name: 'CCC', goal: 'yes' },
  { id: 4, name: 'DDD', goal: 'yes' },
  { id: 39, name: 'EEE', goal: 'yes' },
  { id: 37, name: 'FFF', goal: 'yes' },
  { id: 59, name: 'GGG', goal: 'yes' },
  { id: 50, name: 'III', goal: 'yes' },
  { id: 43, name: 'HHH', goal: 'yes' },
  { id: 35, name: 'JJJ', goal: 'yes' },
];

const b = [
  { id: 36, name: 'AAA', circle: 'yes' },
  { id: 40, name: 'BBB', circle: 'yes' },
  { id: 57, name: 'CCC', circle: 'yes' },
  { id: 42, name: 'ZZZ', circle: 'yes' },
  { id: 4, name: 'DDD', circle: 'yes' },
  { id: 39, name: 'EEE', circle: 'yes' },
  { id: 37, name: 'FFF', circle: 'yes' },
  { id: 59, name: 'GGG', circle: 'yes' },
  { id: 43, name: 'HHH', circle: 'yes' },
  { id: 35, name: 'JJJ', circle: 'yes' },
  { id: 100, name: 'JJJ', circle: 'yes' },
];

function merge_object_arrays(arr1, arr2, match) {
  return _.union(
    _.map(arr1, function (obj1) {
      const same = _.find(arr2, function (obj2) {
        return obj1[match] === obj2[match];
      });
      return same ? _.extend(obj1, same) : obj1;
    }),
    _.reject(arr2, function (obj2) {
      return _.find(arr1, function (obj1) {
        return obj2[match] === obj1[match];
      });
    }),
  );
}
merge_object_arrays(a, b, 'id');

// 방법 2
const request1 = [
  {
    ObjId: 174864,
    ObjMutationD: '2010-07-09T00:00:00.000Z',
    ObjMitarbeiterS: 'epf',
    ObjAufId: 142,
  },
  {
    ObjId: 175999,
    ObjMutationD: '2010-07-09T00:00:00.000Z',
    ObjMitarbeiterS: 'epf',
    ObjAufId: 149,
  },
];
const request2 = [
  {
    ObjId: 174864,
    MulPfadS: 'M:\\Originalbilder\\FGS\\95nn',
    MulDateiS: '9576.305-034-1',
    MulExtentS: 'jpg',
  },
  {
    ObjId: 177791,
    MulPfadS: 'M:\\Originalbilder\\FGS\\95nn',
    MulDateiS: '9576.305-035-1',
    MulExtentS: 'jpg',
  },
];

const resultMerge = [
  ...[request1, request2]
    .reduce(
      (m, a) => (
        a.forEach(
          o =>
            (m.has(o.ObjId) && Object.assign(m.get(o.ObjId), o)) ||
            m.set(o.ObjId, o),
        ),
        m
      ),
      new Map(),
    )
    .values(),
];

console.log(result);

/**
 * 하나의 json 데이터 안에서 특정 key 값 기준 고유값 조립
 */
// lodash
// _.uniqBy
