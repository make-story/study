# Buffer - Node.js

https://tk-one.github.io/2018/08/28/nodejs-buffer/

https://nodejs.org/api/buffer.html

Node.js 공식문서에서는 Buffer를 다음과 같이 정의합니다.

바이너리 데이터들의 스트림을 읽거나, 조작하는 매커니즘.  
이 Buffer 클래스는 Node.js의 일부로 도입되어  
TCP 스트림이나 파일시스템같은 작업에서의  
octet 스트림과의 상호작용을 가능하기 위해 만들어졌습니다.
(Buffer클래스는 바이너리 데이터들의 스트림을 직접 다루기 위해 Node.js API에 추가)

- octet Stream 은 일반적으로 8bit 형식으로 된 데이터를 의미
- Node.js 에서의 스트림은 간단하게 한 지점에서 다른 지점으로 이동하는 일련의 데이터를 의미

일반적으로 데이터의 이동은 그 데이터를 가지고 작업을 하거나, 그 데이터를 읽거나, 무언가를 하기 위해 일어납니다.  
하지만 한 작업이 특정시간동안 데이터를 받을 수 있는 데이터의 최소량과 최대량이 존재합니다.  
그래서 만약에 한 작업이 데이터를 처리하는 시간보다 데이터가 도착하는 게 더 빠르다면,  
초과된 데이터는 어디에선가 처리되기를 기다리고 있어야 합니다.  
데이터를 처리하는 시간보다 훨씬빠르게 계속해서 새로운 데이터가 도착하면 어딘가에는 도착한 데이터들이 미친듯이 쌓일것이기 때문이죠.

반면에, 한 작업이 데이터를 처리하는 시간이 데이터가 도착하는 시간보다 더 빠르다면,  
먼저 도착한 데이터는 처리되기 전에 어느정도의 데이터량이 쌓일때까지 기다려야 합니다.

바로 그 기다리는 영역이 buffer 입니다!  
컴퓨터에서 일반적으로 RAM이라고 불리는 영역에서 streaming 중에 데이터가 일시적으로 모이고,  
기다리며 결국에는 데이터가 처리되기위해 내보내어 집니다.

## 버퍼 생성 Buffer.from

```javascript
// (1)
const buf1 = Buffer.from("abc");
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
for (const key of buf.keys()) console.log("key: ", key);
for (const value of buf.values()) console.log("value: ", value);
for (const entry of buf.entries()) console.log("entry: ", entry);

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
