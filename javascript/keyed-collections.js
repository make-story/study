/**
 * Map, Set
 * https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Keyed_collections
 */


/**
 * Mao
 */
const sayings = new Map();
sayings.set("dog", "woof");
sayings.set("cat", "meow");
sayings.set("elephant", "toot");
sayings.size; // 3
sayings.get("fox"); // undefined
sayings.has("bird"); // false
sayings.delete("dog");

for (const [key, value] of sayings) {
console.log(key + " goes " + value);
}
// "cat goes meow"
// "elephant goes toot"


/**
 * Map 의 iterable object
 */
// map.keys(), map.values()
let me = new Map().set('a', 1).set('b', 2);
console.log([...me.keys()]); // ['a', 'b']
console.log([...me.values()]); // [1, 2]


// map.entries(), map.next()
let you = new Map().set('Seoul', 28).set('Tokyo', 26);
let iterObj = you.entries();
console.log(iterObj.next()); // {value: ['Seoul', 28], done: false}
console.log(iterObj.next()); // {value: ['Tokyo', 26], done: false}
console.log(iterObj.next()); // {value: undefined, done: true}


// for-of, map.forEach();
let we = new Map().set('car', 30).set('bus', 45);
// for-of 로 map 순회하기
for (let [key, value] of we) {
  console.log(key + '^' + value);
}
// 차례대로 'car^30', 'bus^45' 출력
// forEach 로 map 순회하기
we.forEach((value, key, map) => {
  console.log(key + '$' + value);
});
// 차례대로 'car$30', 'bus$45' 출력


// -----


/**
 * Set
 */
const mySet = new Set();
mySet.add(1);
mySet.add("some text");
mySet.add("foo");

mySet.has(1); // true
mySet.delete("foo");
mySet.size; // 2

for (let item of mySet) {
	console.log(item);
}
// 1
// "some text"


// set.values();
let setA = new Set();
setA.add('a');
setA.add('b');
setA.add('a');
console.log([...setA.keys()]); // ['a', 'b']
console.log([...setA.values()]); // ['a', 'b']


// set.entries();
let setB = new Set();
setB.add('Korea');
setB.add('Japan');
setB.add('China');
let entries = setB.entries();
console.log(entries.next()); 
// {value: ['Korea', 'Korea'], done: false}
console.log(entries.next()); 
// {value: ['Japan', 'Japan'], done: false}
console.log(entries.next()); 
// {value: ['China', 'China'], done: false}
console.log(entries.next()); 
// {value: undefined, done: true}


// for-of, set.forEach();
let setC = new Set();
setC.add('Korea');
setC.add('Japan');
setC.add('China');
for (let key of setC) {
  console.log(key);
}
// 차례대로 'Korea', 'Japan', 'China' 출력
setC.forEach((v, k) => {
  console.log(v);
})
// 차례대로 'Korea', 'Japan', 'China' 출력


/**
 * Set: 집합연산
 */
let setA = new Set([1, 2, 3, 4, 5]);
let setB = new Set([4, 5, 6, 7, 8]);

// 합집합
let unionSet = new Set([...setA, ...setB])
for (let value of unionSet) {
console.log(value);
}
// 차례대로 1, 2, 3, 4, 5, 6, 7, 8 출력

// 교집합
let intersectionSet = new Set(
[...setA].filter(v => setB.has(v))
);
for (let value of intersectionSet) {
console.log(value);
}
// 차례대로 4, 5 출력

// 차집합
let differenceSet = new Set(
[...setA].filter(v => !setB.has(v))
);
for (let value of differenceSet) {
console.log(value);
}
// 차례대로 1, 2, 3 출력

// Symmetric Difference
let set1 = new Set([1, 2, 3, 4, 5]);
let set2 = new Set([3, 4, 5, 6, 7]);
let symmetricDifferenceSet = new Set(
[...[...set1].filter(x => !set2.has(x)), ...[...set2].filter(x => !set1.has(x))]
)
for (let value of symmetricDifferenceSet) {
  console.log(value);
}
// 차례대로 1, 2, 6, 7 출력