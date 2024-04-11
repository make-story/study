# 버퍼 (Buffer)

`study.git/인프라/서버/NodeJS_NPM/NodeJS_스트림_버퍼.md` 참고!

## 버퍼 생성 Buffer.from

```javascript
// (1)
const buf1 = Buffer.from('abc');
// (2)
const buf2 = Buffer.from([1, 100, 255]);
```

지정한 값을 담는 버퍼를 생성한다. 딱 지정한 값이 가지는 byte만큼의 메모리가 버퍼에 할당된다.

(1) 문자열을 넣어 생성하면, 문자 하나당 1Byte의 크기를 가지기 때문에 3Byte만큼의 메모리를 할당받고, 각 바이트에는 a,b,c 문자를 나타내는 이진데이터가 기록된다.

(2) 배열을 넣으면 배열의 길이만큼의 바이트를 가지게 된다. 위에서는 배열에 요소가 3개이므로 3Byte를 할당받는다. 여기서 배열의 각 요소는 8bit 이진데이터를 10진수로 표현한 number이어야 한다.

https://velog.io/@bvv8808/JS-Buffer.from%EB%A9%94%EC%84%9C%EB%93%9C%EC%97%90-%EB%B0%B0%EC%97%B4%EC%9D%84-%EC%9D%B8%EC%9E%90%EB%A1%9C-%EB%84%98%EA%B8%B0%EB%A9%B4-%EC%9D%BC%EC%96%B4%EB%82%98%EB%8A%94-%EC%9D%BC

## 버퍼 담긴 값 읽기

### toString(encoding)

### Buffer.prototype.values

```javascript
const buf = Buffer.from([16, 173, 159]); // <Buffer 10 ad 9f>

for (const data of buf.values()) {
  console.log(data); // 16, 173, 159 순으로 출력
}

console.log(buf.values()); // Object [Array Iterator] {}
```

### Buffer.prototype.keys, Buffer.prototype.entries

```javascript
for (const key of buf.keys()) console.log('key: ', key);
for (const value of buf.values()) console.log('value: ', value);
for (const entry of buf.entries()) console.log('entry: ', entry);

// key: 0
// key: 1
// key: 2
// value: 16
// value: 173
// value: 159
// entry: [0, 16]
// entry: [1, 173]
// entry: [2, 159]
```
