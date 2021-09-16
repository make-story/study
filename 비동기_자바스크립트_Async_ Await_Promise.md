# 비동기 작업 

> 참고 페이지  
https://medium.com/@kiwanjung/%EB%B2%88%EC%97%AD-async-await-%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0-%EC%A0%84%EC%97%90-promise%EB%A5%BC-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0-955dbac2c4a4  

-----

1. Promise.all()
다수의 비동기 작업이 한 번에 실행되는가? : O  
다수의 비동기 작업이 모두 끝나기를 기다리는가? : O  
```javascript
async function runPromiseAll() {
    const times = [3000, 1000, 7000, 5000];
  
    await Promise.all(times.map((time) => timer(time)));
  
    console.log('모든 타이머 끝');
}
/*
$ 3000 타이머 시작
$ 1000 타이머 시작
$ 7000 타이머 시작
$ 5000 타이머 시작
$ 1000 타이머 끝
$ 3000 타이머 끝
$ 5000 타이머 끝
$ 7000 타이머 끝
$ 모든 타이머 끝
*/
```

2. for await of문
다수의 비동기 작업이 한 번에 실행되는가? : X  
다수의 비동기 작업이 모두 끝나기를 기다리는가? : O  
```javascript
async function runForAwait() {
    const times = [3000, 1000, 7000, 5000];
  
    for await (let time of times) {
        await timer(time);
    }
  
    console.log('모든 타이머 끝');
}
/*
$ 3000 타이머 시작
$ 3000 타이머 끝
$ 1000 타이머 시작
$ 1000 타이머 끝
$ 7000 타이머 시작
$ 7000 타이머 끝
$ 5000 타이머 시작
$ 5000 타이머 끝
$ 모든 타이머 끝
*/
```

3. forEach 메소드 안에 async function을 사용
다수의 비동기 작업이 한 번에 실행되는가? : O  
다수의 비동기 작업이 모두 끝나기를 기다리는가? : X  
```javascript
async function runForEach() {
    const times = [3000, 1000, 7000, 5000];
  
    times.forEach(async (time) => {
      await timer(time);
    })
  
    console.log('모든 타이머 끝');
}
/*
$ 3000 타이머 시작
$ 1000 타이머 시작
$ 7000 타이머 시작
$ 5000 타이머 시작
$ 모든 타이머 끝
$ 1000 타이머 끝
$ 3000 타이머 끝
$ 5000 타이머 끝
$ 7000 타이머 끝
*/
```

-----

```javascript
let myFirstPromise = new Promise((resolve, reject) => {
  setTimeout(function(){
    resolve("Success!"); // Yay! Everything went well!
  }, 250);
});

myFirstPromise.then((successMessage) => {
  console.log("Yay! " + successMessage);
});
```

```javascript
var promiseCount = 0;

function testPromise() {
    var thisPromiseCount = ++promiseCount;

    var log = document.getElementById('log');
    log.insertAdjacentHTML('beforeend', thisPromiseCount + ') 시작 (<small>동기적 코드 시작</small>)<br/>');

    // 새 프로미스 생성 - 프로미스의 생성 순서를 전달하겠다는 약속을 함 (3초 기다린 후)
    var p1 = new Promise(
        // 실행 함수는 프로미스를 이행(resolve)하거나
        // 거부(reject)할 수 있음
        function(resolve, reject) {
            log.insertAdjacentHTML('beforeend', thisPromiseCount + ') 프로미스 시작 (<small>비동기적 코드 시작</small>)<br/>');
            // setTimeout은 비동기적 코드를 만드는 예제에 불과
            window.setTimeout(function() {
                // 프로미스 이행 !
                resolve(thisPromiseCount);
            }, Math.random() * 2000 + 1000);
        }
    );

    // 프로미스를 이행했을 때 할 일은 then() 호출로 정의하고,
    // 거부됐을 때 할 일은 catch() 호출로 정의
    p1.then(function(val) { // 이행 값 기록
        log.insertAdjacentHTML('beforeend', val + ') 프로미스 이행 (<small>비동기적 코드 종료</small>)<br/>');
    })
    .catch(function(reason) { // 거부 이유 기록
        console.log('여기서 거부된 프로미스(' + reason + ')를 처리하세요.');
    });

    log.insertAdjacentHTML('beforeend', thisPromiseCount + ') 프로미스 생성 (<small>동기적 코드 종료</small>)<br/>');
}
```

```javascript
// error 처리
async function getFirstUser() {
    try {
        let users = await getUsers();
        return users[0].name;
    }catch (err) {
        return {
            name: 'default user'
        };
    }
}
```

```javascript
// 다수의 값을 await 하는 상황
//let [foo, bar] = await* [getFoo(), getBar()]; // ES2016에서 채택되지 않음
let [foo, bar] = await Promise.all([getFoor(), getBar()]);
```

```javascript
let fooPromise = getFoo();
let barPromise = getBar();
let foo = await fooPromise;
let bar = await barPromise;
```

```javascript
// ES6에서 callback을 promise로 바꾸는 과정
function callbackToPromise(method, ...args) {
    return new Promise(function(resolve, reject) {
        return method(...args, function(err, result) {
            return err ? reject(err) : resolve(result);
        });
    });
}

async function getFirstUser() {
    let users = await callbackToPromise(getUsers);
    return users[0].name;
}
```
```javascript

```


