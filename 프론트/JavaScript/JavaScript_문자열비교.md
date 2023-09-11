# 문자열 비교

https://codechacha.com/ko/javascript-compare-strings/

문자열의 ASCII 값을 비교하여 결과를 리턴

- 알파벳 순서가 앞에 있을 수록 더 크기가 작으며, 문자열의 앞에서 뒤의 순서대로 비교를 합니다.
- 문자열이 길어도 같은 위치(Index)의 문자의 알파벳 순서가 작다면 문자열의 크기가 작다고 계산됩니다.
- 문자열 길이가 짧아서 같은 Index에 문자가 없으면 더 작은 문자열로 계산됩니다.

```javascript
const str1 = "abcd";
const str2 = "ab";
const str3 = "abd";
const str4 = "aba";
const str5 = "bbcd";

console.log(str1 > str2); // true
console.log(str1 < str3); // true
console.log(str1 > str4); // true
console.log(str1 < str5); // true
```
