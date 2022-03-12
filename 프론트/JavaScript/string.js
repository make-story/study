/**
 * https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String
 */

// match()
var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
var regexp = /[A-E]/gi;
var matches_array = str.match(regexp);
console.log(matches_array); // ['A', 'B', 'C', 'D', 'E', 'a', 'b', 'c', 'd', 'e']



// replace()
// 예제1
function replacer(match, p1, p2, p3, offset, string) {
	// p1 is nondigits, p2 digits, and p3 non-alphanumerics
	return [p1, p2, p3].join(' - ');
}
var newString = 'abc12345#$*%'.replace(/([^\d]*)(\d*)([^\w]*)/, replacer); // abc - 12345 - #$*%

// 예제2
var re = /apples/gi;
var str = 'Apples are round, and apples are juicy.';
var newstr = str.replace(re, 'oranges');
console.log(newstr);  // oranges are round, and oranges are juicy.

// 예제3
var re = /(\w+)\s(\w+)/;
var str = 'John Smith';
var newstr = str.replace(re, '$2, $1');
console.log(newstr);  // Smith, John



// charAt()
// 메서드는 문자열에서 특정 문자를 반환
var anyString = 'Brave new world';
console.log(anyString.charAt(0)); // Logs "B"



// 문자열 slice(beginIndex[, endIndex])
var str = 'The morning is upon us.';
str.slice(-3);     // returns 'us.'
str.slice(-3, -1); // returns 'us'
str.slice(0, -1);  // returns 'The morning is upon us'

// 배열 slice([start[, end]])
var fruits = ['Banana', 'Orange', 'Lemon', 'Apple', 'Mango'];
var citrus = fruits.slice(1, 3);
// fruits contains ['Banana', 'Orange', 'Lemon', 'Apple', 'Mango']
// citrus contains ['Orange','Lemon']

// 배열 복사하기
fruits.slice(); // ["Banana", "Orange", "Lemon", "Apple", "Mango"] 



// substr(start[, length]) 
const str = 'Mozilla';
console.log(str.substr(1, 2)); // expected output: "oz"
console.log(str.substr(2)); // expected output: "zilla"



// substring(indexStart[, indexEnd]) 
const str = 'Mozilla';
console.log(str.substring(1, 3)); // expected output: "oz"
console.log(str.substring(2)); // expected output: "zilla"



// split()
// 예제1
var names = 'Harry Trump ;Fred Barney; Helen Rigby ; Bill Abel ;Chris Hand ';
var re = /\s*;\s*/;
var nameList = names.split(re);
console.log(nameList); // [ "Harry Trump", "Fred Barney", "Helen Rigby", "Bill Abel", "Chris Hand " ]

// 예제2
var myString = 'Hello World. How are you doing?';
var splits = myString.split(' ', 3); 
console.log(splits); // [ "Hello", "World.", "How" ]

// 문자열 뒤집기
var str = 'asdfghjkl';
var strReverse = str.split('').reverse().join(''); // 'lkjhgfdsa'



// toLowerCase()
console.log('ALPHABET'.toLowerCase()); // 'alphabet'
// toUpperCase()
console.log('alphabet'.toUpperCase()); // 'ALPHABET'
