# `Node.js 교과서` 책 정리

# 동기외 비동기, 블로킹과 논 블로킹

동기와 비동기, 블로킹과 논 블로킹이라는 네 개의 용어가 노드에서 혼용되고 있으며, 의미도 서로 다릅니다.

- 동기와 비동기 : 백그라운드 작업 완료 확인 여부
- 블로킹과 논 블로킹 : 함수가 바로 return 되는지 여부  
  노드에서는 동기-블로킹과 비동기-논 블로킹 방식이 대부분입니다. 동기-논 블로킹이나 비동기-블로킹은 없다고 봐도 됩니다.

동기-블로킹 방식에서는 백그라운드 작업 완료 여부를 계속 확인하여, 호출한 함수가 바로 return 되지 않고 백그라운드 작업이 끝나야 return 됩니다.  
비동기-논 블로킹 방식에서는 호출한 함수가 바로 return 되어 다음 작업으로 넘어가며, 백그라운드 작업 완료 여부는 신경 쓰지 않고 나중에 백그라운드가 알림을 줄 때 비로소 처리합니다.

```javascript
// 동기-블로킹 방식
const fs = require('fs');

console.log('시작');
let data = null;

data = fs.readFileSync('./readme2.txt');
console.log('1번', data.toString());

data = fs.readFileSync('./readme2.txt');
console.log('2번', data.toString());

data = fs.readFileSync('./readme2.txt');
console.log('3번', data.toString());

console.log('끝');
```

```javascript
// 비동기-논 블로킹 방식
const fs = require('fs').promises;

console.log('시작');

fs.readFile('./readme2.txt')
  .then(data => {
    console.log('1번', data.toString());
    return fs.readFile('./readme2.txt');
  })
  .then(data => {
    console.log('2번', data.toString());
    return fs.readFile('./readme2.txt');
  })
  .then(data => {
    console.log('3번', data.toString());
    console.log('끝');
  })
  .catch(error => {
    console.error(error);
  });
```

---

# 버퍼와 스트림

파일을 읽거나 쓰는 방식에는 크게 두 가지 방식, 즉 버퍼를 이용하는 방식과 스트림을 이용하는 방식이 있습니다.  
노드는 파일을 읽을 때 메머리에 파일 크기만큼 공간을 마련해두며, 파일 데이터를 메모리에 저장한 뒤 사용자가 조작할 수 있도록 합니다.  
이때 메모리에 저장된 데이터가 바로 버퍼입니다.

readFile 방식의 버퍼가 편리하기는 하지만 문제점도 있습니다.  
만약 용량이 100MB인 파일이 있으면 읽을 때 메모리에 100MB의 버퍼를 만들어야 합니다. 이 작업을 동시에 열 개만 해도 1GB에 달하는 메모리가 사용됩니다.  
특히 서버처럼 몇 명이 이용할지 모르는 환경에서는 메모리 문제가 발생할 수 있습니다.  
또한, 모든 내용을 버퍼에 다 쓴 후에야 다음 동작으로 넘어가므로 파일 읽기, 압축, 파일 쓰기 등의 조작을 연달아 할 때 매번 전체 용량을 버퍼로 처리해야 다음 단계로 넘어갈 수 있습니다.

그래서 버퍼의 크리를 작게 만든 후 여러 번으로 나눠 보내는 방식이 등장했습니다.  
예를 들면 버퍼 1MB를 만든 후 100MB 파일을 백 번에 걸쳐서 나눠 보내는 것입니다. 이로써 메모리 1MB로 100MB 파일을 전송할 수 있습니다.  
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

---

# 예외 처리하기

노드에서는 예외처리가 정말 중요합니다.  
예외란 보통 처리하지 못한 에러를 가리킵니다. 이러한 예외들은 실행 중인 노드 프로세스를 멈추게 만듭니다.  
멀티 스레드 프로그램에서는 스레드 하나가 멈추면 그 일을 다른 스레드가 대신합니다. 하지만 노드의 메인 스레드는 하나뿐이므로 그 하나를 소중히 보호해야 합니다.  
메인 스레드가 에러로 인해 멈춘다는 것은 스레드를 갖고 있는 프로세스가 멈춘다는 뜻이고, 전체 서버도 멈춘다는 뜻과 같습니다.  
아무리 신중을 가해 만들었다고 해도 항상 얘기치 못한 에러는 발생하는 법입니다.

프로세스가 멈추지 않도록 에러를 찾는 것은,  
에러가 발생할 것 같은 부분을 `try / catch`문으로 감싸면 됩니다.

```javascript
setInterval(() => {
  console.log('시작');
  try {
    throw new Error('서버를 고장내주마!');
  } catch (err) {
    console.error(err);
  }
}, 1000);
```

setInterval 을 사용한 것은 프로세스가 멈추는지 여부를 체크하기 위해서 입니다.  
프로세스가 에러로 인해 멈추면 setInverval 도 멈출 것입니다.  
setInterval 내부에 throw new Error()를 써서 에러를 강제로 발생시켰습니다.

위 코드를 실행시키면,  
에러는 발생하지만 try / catch 로 잡을 수 있고 setInterval도 직접 멈추기 전(Ctrl+C)까지 계속 실행됩니다.
`이렇게 에러가 발생할 것 같은 부분을 try / catch로 감싸면 됩니다.`  
`throw 만하면 노드 프로세스가 멈춰버립니다. 따라서 throw 를 하는 경우에는 반드시 try / catch 문으로 throw 한 에러를 잡아야 합니다.`

프로미스의 에러는 catch 하지 않아도 알아서 처리됩니다.  
다만 프로미스의 에러를 알아서 처리하는 동작은 노드 버전이 올라감에 따라 바뀔 수 있습니다.  
따라서 `프로미스를 사용할 때는 항상 catch 를 붙여주는 것을 권장`합니다.

`process 객체에 uncaughtException 이벤트`가 있습니다.  
처리하지 못한 에러가 발생 했을 때 이벤트 리스너가 실행되고 프로세스가 유지됩니다.

```javascript
process.on('uncaughtException', error => {
  console.log('예기치 못한 에러', error);
});

// 실행 후 1초만에 throw 에러가 발생하며 프로세스가 멈출 것 같지만,
// uncaughtException 이벤트 리스너가 연결되어 있으므로 프로세스가 멈추지 않습니다.
setInterval(() => {
  throw new Error('throw 를 사용해 서버를 멈추게 해본다!!!!');
}, 1000);
setTimeout(() => {
  console.log('실행됩니다!');
}, 2000);
```

노드 공식 문서에서는 uncaughtException 이벤트를 최후의 수단으로 사용할 것을 명시하고 있습니다.  
노드는 uncaughtException 이벤트 발생 후 다음 동작이 제대로 동작하는지를 보증하지 않습니다. 즉, 복구 작업 코드를 넣어 두었더라도 그것이 동작하는지 확신할 수 없습니다.  
따라서 uncaughtException 은 단순히 에러 내용을 기록하는 정도로 사용하고, 에러를 기록한 후 process.exit()으로 프로세스를 종료하는 것이 좋습니다.  
에러가 발새앟는 코드를 수정하지 않는 이상, 프로세스가 실행되는 동안 에러는 계속 발생할 것입니다.

---

# 서버사이드 렌더링 캐싱하기

```
$ npm install lru-cache
```

server.js

```javascript
// ...

const url = request('url');
const lruCache = request('lru-cache'); // 서버사이드 렌더링 결과를 캐싱하기 위해 lru-cache 패키지를 이용한다.

const ssrCache = new lruCache({
  // 최대 100개의 항목을 저장하고 각 항목은 60초 동안 저장한다.
  max: 100,
  maxAge: 1000 * 60,
});

// ...

// ...('/page/:id' 를 처리하는 코드)
server.get(/^\/page[1-9]/, (req, res) => {
  // page1, page2, page* 요청에 대해 서버사이드 렌더링 결과를 캐싱한다.
  return renderAndCache(req, res);
});

async function renderAndCache(req, res) {
  const parseUrl = url.parse(req.url, true);
  const cacheKey = parseUrl.path;

  // 캐시가 존재하면 캐시에 저장된 값을 사용한다.
  if (ssrCache.has(cacheKey)) {
    console.log('캐시 사용');
    res.send(ssrCache.get(cacheKey));
    return;
  }

  // 캐시가 없으면 넥스트의 renderToHTML 메서드를 호출하고, await 키워드를 사용해서 처리가 끝날 때까지 기다린다.
  try {
    const { query, pathname } = parseUrl;
    const html = await app.renderToHTML(req, res, pathname, query);
    if (res.statusCode === 200) {
      // renderToHTML 함수가 정상적으로 처리됐으면 그 결과를 캐싱하다.
      ssrCache.set(cacheKey, html);
    } catch (err) {
      app.renderError(err, req, res, pathname, query);
    }
  }
}
```

---

# Express

## express 미들웨어

미들웨어는 app.use 와 함께 사용됩니다. app.use(미들웨어)  
app.use 에 매개변수가 request, response, next 인 함수를 넣으면 됩니다.  
미들웨어는 위에서부터 아래로 순서대로 실행되면서 요청과 응답 사이에 특별한 기능을 추가할 수 있습니다.  
next 라는 세변째 매개변수는, 다음 미들웨어로 넘어가는 함수입니다. next 를 실행하지 않으면 다음 미들웨어가 실행되지 않습니다.  
첫 번째 매체변수(인수)로 주소를 넣어주지 않는다면, 미들웨어는 모든 요청에서 실행되고, 주소를 넣는다면 해당하는 요청에서만 실행된다고 보면 됩니다.

```
app.use(미들웨어)
app.use('/abc', 미들웨어)
app.use('/abc', 미들웨어, 미들웨어, 미들웨어...)
app.post('/abc/', 미들웨어)
```

## express use / get 차이

'/' 를 "마운트"경로로 지정하면 app.use() 는 '/' 로 시작하는 모든 경로에 응답합니다.

app.use('/', ...); 경우

GET /
PUT /foo
POST /foo/bar

위 경로 모두 응답 합니다.

반면 app.get() 는 HTTP GET 요청 될 때, 특정 경로를 일치시키고 처리하기위한 것 입니다.

## express next

next 함수에 인수를 넣을 수 있습니다. 단, 인수를 넣는다면 특수한 동작을 합니다.  
route 라는 문자열을 넣으면 다음 라우터의 미들웨어로 바로 이동하고,  
그 외의 인수를 넣는다면 바로 에러 처리 미들웨어로 이동합니다. 이때의 인수는 에러 처리 미들웨어의 err 매개변수가 됩니다. 라우터에서 에러가 발생할 때 에러를 next(err)을 통해 에러 처리 미들웨어로 넘깁니다.  
next(err)  
(err, req, res, next) => {}

## 미들웨어 간에 데이터를 전달하는 방법도 있습니다.

세션을 사용한다면 req.session 객체에 데이터를 넣어도 되지만, 세션이 유지되는 동안에 데이터도 계속 유지된다는 단점이 있습니다.  
만약 요청이 끝날 때까지만 데이터를 유지하고 싶다면 req 객체에 데이터를 넣어두면 됩니다.

```javascript
app.use(
  (request, response, next) => {
    request.data = '데이터 넣기'; // 새로운 요청이 오면 request.data 는 초기화됩니다.
    next();
  },
  (request, response, next) => {
    console.log(request.data);
    next();
  },
);
app.use((request, response, next) => {
  console.log(request.data);
  next();
});
```

---

# `한권으로 끝내는 Node & Express` 책 정리

# 스캐폴딩

p53

# 모범사례

p68

# 요청 / 응답 헤더

## 인터넷 미디어 타입

p107

## 요청 객체

p108

## 응답 객체

p110

# 서버 사이트 템플릿

p130

# 쿠키 세션

p157

## 자격 증명 위임

p159

# 미들웨어

p171

## 미들웨어 원칙

p172

# 앱 클러스터를 통한 스케일 아웃

# 지속성

p213

# 라우팅

p245

# 보안

## 인증서 직접 생성

p308

---
