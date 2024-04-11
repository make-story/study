# Node.js 스트림(Stream)과 버퍼(Buffer)

https://real-dongsoo7.tistory.com/70

https://curryyou.tistory.com/440

## Buffer - Node.js

https://tk-one.github.io/2018/08/28/nodejs-buffer/

https://nodejs.org/api/buffer.html

Node.js 공식문서에서는 Buffer를 다음과 같이 정의합니다.

바이너리 데이터들의 스트림을 읽거나, 조작하는 매커니즘.  
이 Buffer 클래스는 Node.js의 일부로 도입되어  
TCP 스트림이나 파일시스템같은 작업에서의  
옥텟(octet) 스트림과의 상호작용을 가능하기 위해 만들어졌습니다.
(Buffer클래스는 바이너리 데이터들의 스트림을 직접 다루기 위해 Node.js API에 추가)

- 옥텟(octet) Stream 은 일반적으로 8bit 형식으로 된 데이터를 의미
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

# 버퍼와 스트림

파일을 읽거나 쓰는 방식에는 크게 두 가지 방식, 즉 버퍼를 이용하는 방식과 스트림을 이용하는 방식이 있습니다.  
노드는 파일을 읽을 때 메모리에 파일 크기만큼 공간을 마련해두며,  
`파일 데이터를 메모리에 저장한 뒤 사용자가 조작 할 수 있도록 합니다.`  
`이때 메모리에 저장된 데이터가 바로 버퍼입니다.`

readFile 방식의 버퍼가 편리하기는 하지만 문제점도 있습니다.  
만약 용량이 100MB인 파일이 있으면 읽을 때 메모리에 100MB의 버퍼를 만들어야 합니다.  
이 작업을 동시에 열 개만 해도 1GB에 달하는 메모리가 사용됩니다.

특히 서버처럼 몇 명이 이용할지 모르는 환경에서는 메모리 문제가 발생할 수 있습니다.  
또한, 모든 내용을 버퍼에 다 쓴 후에야 다음 동작으로 넘어가므로
파일 읽기, 압축, 파일 쓰기 등의 조작을 연달아 할 때 매번 전체 용량을 버퍼로 처리해야 다음 단계로 넘어갈 수 있습니다.

그래서 `버퍼의 크리를 작게 만든 후 여러 번으로 나눠 보내는 방식이 등장`했습니다.  
`예를 들면 버퍼 1MB를 만든 후 100MB 파일을 백 번에 걸쳐서 나눠 보내는 것`입니다.  
이로써 메모리 1MB로 100MB 파일을 전송할 수 있습니다.  
이를 편리하게 만든 것이 스트림 입니다.  
스트림 메서드로는 createReadStream, createWriteStream 이 있습니다.

```javascript
/**
 * 파일 읽는 스트림
 */
const fs = require('fs');

const readStream = fs.createReadStream('./readme3.txt', { highWaterMark: 16 }); // highWaterMark : 버퍼의 크기(기본값 64KB)
const data = [];
readStream.on('data', chunk => {
  data.push(chunk);
  console.log('data :', chunk, chunk.length);
});
readStream.on('end', () => {
  console.log('end :', Buffer.concat(data).toString());
});
readStream.on('error', error => {
  console.log('error :', error);
});
```

```javascript
/**
 * 파일 쓰는 스트림
 */
const fs = require('fs');

const writeStream = fs.createWriteStream('./writeme2.txt');
writeStream.on('finish', () => {
  console.log('파일 쓰기 완료');
});

writeStream.write('이 글을 씁니다.\n');
writeStream.write('한 번 더 씁니다.\n');
writeStream.end();

// createReadStream 으로 파일을 읽고 그 스트림을 전달받아
// createWriteStream 으로 파일을 쓸 수도 있습니다. 파일 복사와 비슷합니다.
// 스트림끼리 연결하는 것을 '파이핑한다'고 표현합니다.
const readStreamPipe = fs.createReadStream('./readme4.txt');
const writeStreamPipe = fs.createWriteStream('./writeme3.txt');
readStreamPipe.pipe(writeStreamPipe);
```

## 스트림

1.입출력 데이터를 입출력 순서에 의해서 순차적으로 처리되는 데이터 열  
2.데이터를 이동시킬 수 있는 다리  
3.전송되어야할 크기만큼 바이트들이 모여 만들어진 통로  
4.통신을 목적으로한 바이트 단위의 집합

Node.js에서 스트림의 타입은 총 4가지가 있습니다.

- Writable : 데이터를 작성할 수 있는 스트림입니다. ex) fs.createWriteStream()
- Readable : 데이터를 읽어들일 수 있는 스트림입니다. ex) fs.createReadStream()
- Duplex : 데이터의 읽기(Readable)과 쓰기(Writable) 모두 가능합니다. (ex net.Socket)
- Transform - Duplex 스트림은 수정하거나 변환이 가능합니다. ex) zlib.createDeflate()
  부가적으로 이 모듈은 pipeline과 finished를 포함하고 있습니다.

Node.js Stream에서는 Buffer기능 또한 제공합니다.  
Writable 그리고 Readable 스트림은 내부 버퍼에 데이터를 저장 하며, writable.writableBuffer 혹은 readableBuffer를 통해 검색이 가능합니다.

## 버퍼

버퍼는 기본적으로 입출력 전송 속도차이에 대한 성능을 보완하기 위해 사용합니다.  
입력속도에 비해 출력속도가 느린경우 데이터를 임시 저장하는 공간을 말하며, 임시저장장치라고도 합니다.

예를들어 사용자는 1초에 100개의 데이터, 프로그램은 1초에 5개의 데이터를 처리 할 수있다고 가정해봅시다.  
프로그램에서 처리를 진행하는 동안 입력장치를 통해 들어오는 데이터는 대기를 해야하는 상황이 됩니다.  
이러한 상황을 방지하기 위해 입력받은 데이터를 버퍼라는 임시공간에 저장해두고 프로그램에서 처리할 수 있는 상황이 혹은 버퍼가 꽉차게 되거나  
개행문자가 입력되게 되면 버퍼에 저장된 데이터를 한 번에 전송하게 됩니다.

# Node.js Stream

https://the-amy.tistory.com/8
