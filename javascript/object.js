
// 객체 펼침연산자로 값 갱신
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


// Map 으로 key-value 관리
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



// Map key-value 순회
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


// Map key 정렬
// Map 정렬
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


// Map key-value 합치기
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


// Set 고유값 관리
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