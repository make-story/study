/**
 * 숫자 또는 날짜 확인
 */
isNaN('문자');
isNaN(new Date('TEST'));

/**
 * 공색제거
 */
const text1 = ' 1, 2, 3 '.replace(/(\s*)/g, '');

// ---------- ----------

/**
 * 특정 문자열 기준 분리
 */
const list1 = text1.split(',');

/**
 * 배열에서 특정 값 제외
 */
const list2 = list1.filter(item => item !== '1');

/**
 * 특정값으로 배열 채우기
 */
const list5 = new Array(5).fill(0); //  [0,0,0,0,0];

// ---------- ----------

/**
 * 배열에서 최대값 / 최소값
 */
const maxValue1 = Math.max(1, 2, 3, 4, 5);
const minValue1 = Math.min(1, 2, 3, 4, 5);

const arr = [1, 2, 3, 4, 5];
const maxValue2 = Math.max.apply(null, arr);
const minValue2 = Math.min.apply(null, arr);
const maxValue3 = Math.max(...arr);
const minValue3 = Math.min(...arr);

/**
 * JSON 에서 최대값 / 최소값
 */
const list6 = [
  {
    x: '8/11/2009',
    y: 0.026572007,
  },
  {
    x: '8/12/2009',
    y: 0.025057454,
  },
  {
    x: '8/13/2009',
    y: 0.024530916,
  },
  {
    x: '8/14/2009',
    y: 0.031004457,
  },
];
Math.max.apply(
  Math,
  array.map(function (item) {
    return item.y;
  }),
);

// ---------- ----------

/**
 * 배열에서 특정 값 존재 확인
 */
list2.includes('1');

// Set 활용
const set = new Set([1, 2, 3]);
set.has(4); // false
set.has(2); // true

// ---------- ----------

/**
 * 배열 정렬
 * array.sort(), array.reverse()
 */
const list3 = [1, 2, 11, 34, 22];
list3.sort((a, b) => a - b);
// a - b: 오름차순 정렬
// b - a: 내림차순 정렬
// a = b: 순서를 변경하지 않음

/**
 * JSON 특정값 기준 정렬
 */
const json1 = [
  { name: 'Amelia', age: 23 },
  { name: 'Grace', age: 32 },
  { name: 'Belita', age: 54 },
  { name: 'Isabel', age: 17 },
  { name: 'Luara', age: 48 },
  { name: 'Jessie', age: 73 },
];
// order by age asc
json1.sort((a, b) => {
  if (a.age < b.age) return -1;
  if (a.age > b.age) return 1;

  return 0;
});
console.log(json1);
// order by name desc
json1.sort((a, b) => {
  a = a.name.toLowerCase();
  b = b.name.toLowerCase();
  if (a < b) return 1;
  if (a > b) return -1;

  return 0;
});
console.log(json1);

// ---------- ----------

/**
 * 반복되는 숫자가 몇번나오는지 카운트
 */
const input = '44433322222';
const list = input.split('');
//const list = ['a', 'b', 'a', 'b', 'c'];
const result = {};

// forEach
list.forEach(x => {
  result[x] = (result[x] || 0) + 1;
});

// reduce
result = list.reduce((accu, curr) => {
  accu[curr] = (accu[curr] || 0) + 1;
  return accu;
}, {});

// Map
result = list.reduce((accu, curr) => {
  accu.set(curr, (accu.get(curr) || 0) + 1);
  return accu;
}, new Map());
for (let [key, value] of result.entries()) {
  document.write(key + ' : ' + value + '<br>');
}

// ---------- ----------

/**
 * 배열 값 중복제거
 */
const arrDup = ['라이언', '어피치', '프로도', '콘', '라이언', '프로도'];
const arrUnique = arrDup.filter((val, idx) => {
  return arrDup.indexOf(val) === idx; //값이 처음나오는 배열 인덱스와 현재 인덱스가 같으면 포함
});
console.log(arrUnique); // ['라이언', '어피치', '프로도', '콘']

// Set 활용
let dupList = ['key', 'value', 'key', 'value'];
let uniqueList = [...new Set(dupList)];

const data1 = [{ category: 'a', category: 'a', category: 'b' }];
const menuItems = [...new Set(Data.map(Val => Val.category))];

// Array.from 활용
const cars = ['Mazda', 'Ford', 'Renault', 'Opel', 'Mazda'];
const uniqueWithArrayFrom = Array.from(new Set(cars));
console.log(uniqueWithArrayFrom);

/**
 * JSON 값 중복제거
 */
let example1 = [{ id: 123 }, { id: 456 }, { id: 123 }];
const list4 = example1.reduce(function (acc, current) {
  if (acc.findIndex(({ id }) => id === current.id) === -1) {
    acc.push(current);
  }
  return acc;
}, []);

// Set 활용
const example2 = [
  { id: 123, name: 'nkh' },
  { id: 123, name: 'ddd' },
  { id: 5456, name: 'zxc' },
];
console.log([...new Set(example2.map(JSON.stringify))].map(JSON.parse));
// [{id: 123,  name: 'nkh'}, {id: 123, name: 'ddd'}, {id: 5456, name: 'zxc'}]

// ---------- ----------

/**
 * 배열 내부 정보 선택 제거
 * https://stackoverflow.com/questions/5767325/how-can-i-remove-a-specific-item-from-an-array
 */
(() => {
  const list = [{ code: 'a' }, { code: 'a' }, { code: 'b' }, { code: 'c' }, { code: 'c' }, { code: 'd' }];
  const setListRemoveItem = (list, key, value) => {
    let index = 0;
    while (index < list.length) {
      if (list[index][key] === value) {
        // 배열에서 제거
        list.splice(index, 1);
      } else {
        ++index;
      }
    }
    return list;
  };
})();

// ---------- ----------

/**
 * 배열 합치기
 */
const arr11 = [1, 2, 3];
const arr22 = [4, 5, 6];
const arr33 = [7, 8, 9];

const newArr = [...arr11, ...arr22, ...arr33];

// push 활용
const arr44 = [1, 2, 3];
const arr55 = [4, 5, 6];

arr44.push(arr55);

/**
 * 객체 합치기
 */
// merging objects
const product = { name: 'Milk', packaging: 'Plastic', price: '5$' };
const manufacturer = { name: 'Company Name', address: 'The Company Address' };

const productManufacturer = { ...product, ...manufacturer };
console.log(productManufacturer);
// outputs { name: "Company Name", packaging: "Plastic", price: "5$", address: "The Company Address" }
