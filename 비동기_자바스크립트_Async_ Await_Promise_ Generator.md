# 비동기 작업 

> 참고 페이지  
https://medium.com/@kiwanjung/%EB%B2%88%EC%97%AD-async-await-%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0-%EC%A0%84%EC%97%90-promise%EB%A5%BC-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0-955dbac2c4a4  

-----


# Primise
프로미스는 비동기 상태를 값으로 다룰 수 있는 객체다. (ES6)

## 프로미스의 세 가지 상태
- 대기 중(pending) : 결과를 기다리는 중  
- 이행 됨(fulfilled) : 수행이 정상적으로 끝났고 결과값을 가지고 있음
- 거부 됨(rejected) : 수행이 비정상적으로 끝났음 

이행 됨, 거부 됨 상태를 `처리됨(settled)`상태라고 부른다.  

## 프로미스를 생성하는 세 가지 방식
```javascript
const p1 = new Promise((resolve, reject) => {
    // resolve(data);
    // reject('error message');
});
const p2 = Promise.reject('error message'); // 거부됨 상태인 프로미스가 생성
const p3 = Promise.resolve(123); // 만약 입력 값이 프로미스였다면 그 객체가 그대로 반환되고, 프로미스가 아니라면 이행됨 상태인 프로미스가 반환
console.log(p3 !== 123); // false
```
```javascript
const p = new Promise(resolve => setTimeout(() => resolve(10), 1));
console.log(Promise.resolve(p) === p); // true
```

## 프로미스 이용하기1 : then
then은 처리됨 상태가 된 프로미스를 처리할 때 사용되는 메서드다.  
프로미스가 처리됨 상태가 되면 then 메서드의 인수로 전달된 함수가 호출된다.  
```javascript
// 처리됨 상태의 호출
const onResolve = () => console.log('처리됨');
// 거부됨 상태의 호출
const onReject = () => console.log('거부됨');

Promise.resolve(123).then(onResolve, onReject);
Promise.reject('error').then(onResolve, onReject);

// 거부됨 상태인 프로미스는 처음으로 만나는 onReject 콜백함수를 호출
Promise.reject('error')
.then(() => console.log('then 1'))
.then(() => console.log('then 2'))
.then(() => console.log('then 3'), () => console.log('then 4')) // then 4 호출됨
.then(() => console.log('then 5'), () => console.log('then 6')) // then 5 호출됨
// 위와 같은 특징 덕에 프로미스로 비동기 프로그래밍을 할 때 동기 프로그래밍 방식으로 코드를 작성할 수 있다.
```

## 프로미스 이용하기2 : catch
catch 는 프로미스 수행 중 발생한 예외를 처리하는 메서드다.  
catch 메서드는 then 메서드의 onReject 함수와 같은 역할을 한다.
```javascript
Promise.resolve()
.then(
    () => {
        throw new Error('some error');
    },
    error => {
        console.log(error);
    }
);
// Unhandled promise rejection 에러가 발생
```
```javascript
Promise.resolve()
.then(() => {
    throw new Error('some error');
})
.catch(error => {
    console.log(error);
});
```

## 프로미스 이용하기 3 : finally
finally는 프로미스가 이행됨 또는 거부됨 상태일 때 호출되는 메서드다.  
프로미스 체인의 가장 마지막에 사용된다.  
```javascript
const p = new Promise();
p.then(data => {
    // ...
}).catch(error => {
    // ...
}).finally(() => {
    // ...
});
```


## 프로미스 사용 시 주의할 점
- return 키워드 깜빡하지 않기
then 메서드 내부 함수에서 return 키워드를 입력하는 것을 깜빡히기 쉽다.  
- 프로미스는 불변 객체라는 사실 명심하기  
```javascript
function requestData() {
    const p = Promise.resolve(10);
    p.then(() => { // then 메서드는 기존 객체를 수정하지 않고, 새로운 프로미스를 반환한다.
        return 20;
    });
    return p;
}
requestData().then(v => {
    console.log(v); // 10
});
```
```javascript
function requestData() {
    return Promise.resolve(10).then(v => {
        return 20;
    });
}
requestData().then(v => {
    console.log(v); // 20
});
```
- 동기 코드의 예외 처리 신경 쓰기  
프로미스를 동기(sync) 코드와 같이 사용할 때는 예외 처리에 신경 써야 한다.  
```javascript
const doSync => console.log('sync 실행');
function requestData() {
    return fetch()
    .then(data => {
        doSync();
        console.log(data);
    })
    .catch(error => console.log(error)); // doSync 에서 발생하는 예외는 catch 메서드에서 처리가 된다.
}
```

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

-----


# 제너레이터

