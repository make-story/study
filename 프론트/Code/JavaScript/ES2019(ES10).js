
/**
 * Array.prototype.{flat,flatMap}
 */
// flat()
['Dog', ['Sheep', 'Wolf']].flat()
//[ 'Dog', 'Sheep', 'Wolf' ]

// flatMap()
let arr1 = ["it's Sunny in", "", "California"];

arr1.map(x=>x.split(" "));
// [["it's","Sunny","in"],[""],["California"]]

arr1.flatMap(x => x.split(" "));
// ["it's","Sunny","in", "", "California"]


/**
 * 선택적 catch 할당(Optional catch binding)
 */
try {
    //...
} catch /*(e)*/ {
    //handle error
}


/**
 * Object.fromEntries()
 */
const entries = new Map([
    ['foo', 'bar'],
    ['baz', 42]
]);

const obj = Object.fromEntries(entries);

console.log(obj);
// expected output: Object { foo: "bar", baz: 42 }


/**
 * String.prototype.{trimStart,trimEnd}
 */
// trimStart()
'Testing'.trimStart() //'Testing'
' Testing'.trimStart() //'Testing'
' Testing '.trimStart() //'Testing '
'Testing '.trimStart() //'Testing '

// trimEnd()
'Testing'.trimEnd() //'Testing'
' Testing'.trimEnd() //' Testing'
' Testing '.trimEnd() //' Testing'
'Testing '.trimEnd() //'Testing'


/**
 * Symbol.prototype.description
 * 심벌 객체의 description은 해당 심벌 객체의 설명을 반환한다.
 */
Symbol('desc').toString();   // "Symbol(desc)"
Symbol('desc').description;  // "desc"


/**
 * JSON 개선사항(JSON improvements)
 * 이 변경 이전에는 JSON 으로 구문 분석된 문자열에서 줄 구분 기호(\u2028) 및 단락 구분 기호(\u2029)가 허용되지 않았다. 이제 JSON.parse()를 사용하면 해당 문자 SyntaxError가 JSON 표준에 정의된 대로 올바르게 구문 분석된다.
 */


/**
 * Well-formed JSON.stringify()
 * 잘못된 형식의 유니코드 문자열을 반환하지 않도록 JSON.stringify를 변경되었다.
 */
JSON.stringify("\uD800"); // 변경 전 --> '"�"' // 잘못된 형식의 유니코드 문자를 반환
JSON.stringify("\uD800"); // 변경 후 --> '"\ud800"' // 유효한 유니코드를 반환


/**
 * Function.prototype.toString()
 * toString() 메서드는 함수의 소스 코드를 나타내는 문자열을 반환한다.
 * ES2016까지는 소스 코드에서 주석이나 공백 문자를 제거했지만, ES2019에서 개정되어 문자열에 주석 등도 포함된다.
 */
function /* this is bar */ bar() {}

// old
bar.toString() //'function bar() {}

// new
bar.toString() // 'function /* this is bar */ bar () {}'
