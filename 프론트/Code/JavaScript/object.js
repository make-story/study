/**
 * https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object
 */

/**
 * 객치 순회
 */
(() => {
	const object1 = {
		a: 'somestring',
		b: 42
	};
	for (const [key, value] of Object.entries(object1)) {
		console.log(`${key}: ${value}`);
	}
	// expected output:
	// "a: somestring"
	// "b: 42"
	// order is not guaranteed
})();

// 비동기 순회
// for await 와 Promise.all()과의 차이
// promise.all()은 인자의 프로미스 배열을 동시에 실행한다.
// for await of 내의 비동기 작업은 루프를 돌며 순차적으로 실행된다.}
(async () => { 
	const object1 = {
		a: 'somestring',
		b: 42
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
			...defaultEmployee.name
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
	let filters = new Map(
		[
			['견종', '래브라도레트리버'],
			['크기', '대형견'],
			['색상', '갈색'],
		]
	);
	filters.get('색상'); // 갈색
	
	filters.delete('색상');
	filters.get('색상'); // undefined
	
	filters.clear();
	filters.get('크기'); // undefined
	
	filters.keys();
	
	let errors = new Map(
		[
			[100, '이름이 잘못되었습니다'],
			[110, '이름에는 문자만 입력할 수 있습니다.'],
		]
	);
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
		for(const [key, value] of filters) {
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
		for(const [key, value] of [ ...filters].sort(sortByKey)) {
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
	let filters = new Map()
		.set('색상', '검정색');
	let filters2 = new Map()
		.set('색상', '갈색');
	let update = new Map(
		[
			...filters,
			...filters2,
		]
	);
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
	]
	function getUniqueColors(dogs) {
		const unique = new Set();
		for(const dog of dogs) {
			unique.add(dog.color)
		}
		return [ ...unique ];
	}
})();


// ----------


const store = new Map();

const initalGroupItem = {
    groupCode: '',
    text: '',
    todoList: [],
};
const initalTodoItem = {
    todoCode: '',  // 고유값
    text: '',  // 할일
    rank: 0, 
    time: 0, 
    minute: 0, // 타이머 작동시 사용 : 분
    second: 0, // 타이머 작동시 사용 : 초
    timer: false, // 타이머 작동여부
    done: false,  // 종료여부
};
const groupCode = '111111';
const todoCode = '222222';
store.set(groupCode, { ...initalGroupItem, groupCode });
store.set(groupCode, { ...store.get(groupCode), text: 'TEST' });

let groupData, todoData;
groupData = store.get(groupCode);
groupData.todoList = [ ...groupData.todoList, { ...initalTodoItem, todoCode } ];
groupData = store.get(groupCode);
console.log(groupData);

[ todoData ] = groupData.todoList.filter(value => value.todoCode === todoCode);
let todoUpdate = {
    text: 'TEST',
};
for(const key in todoUpdate) {
    todoData[key] = todoUpdate[key];
}

groupData = store.get(groupCode);
console.log(groupData);


// ----------


// 중복 제거
export const removeObjectDuplicates = (list=[], key='') => {
	// list = [ {id: 1}, {id: 4}, {id: 1}, {id: 5}, {id: 4}, ];
	const set = new Set();
	return list.filter(obj => {
		const existing = set.has(obj[key]);
		set.add(obj[key]);
		return !existing;
	});
}


// 깊은 복사
export const deepClone = (obj={}) => {
	let clone = obj;
	if(obj && typeof obj === "object") {
		clone = new obj.constructor();
		Object.getOwnPropertyNames(obj).forEach(prop => (clone[prop] = deepClone(obj[prop])));
	}
	return clone;
}


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
	if(!sources.length) {
		return target;
	}
	const source = sources.shift();
	if(!source || typeof source !== 'object') {
		return target;
	}
	Object.keys(source).forEach((key) => {
		if(source[key] && typeof source[key] === 'object') {
			if(!Object.keys(target).includes(key)) {
				Object.assign(target, { [key]: {} });
			}
			extend(target[key], source[key]);
		}else {
			Object.assign(target, { [key]: source[key] });
		}
	});
	return extend(target, ...sources);
}