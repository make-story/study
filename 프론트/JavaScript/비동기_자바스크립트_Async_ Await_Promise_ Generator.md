# 비동기 작업 

> 참고 페이지  
https://medium.com/@kiwanjung/%EB%B2%88%EC%97%AD-async-await-%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0-%EC%A0%84%EC%97%90-promise%EB%A5%BC-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0-955dbac2c4a4  
  
https://velog.io/@dltjq2323/%EB%B9%84%EB%8F%99%EA%B8%B0%EC%A0%81-JavaScript%EB%8F%99%EC%9E%91-%EC%9B%90%EB%A6%AC-%EB%B0%8F-%EB%B0%A9%EB%B2%95  
  
https://velog.io/@hiro2474/understandfor-await-of    
  
https://helloworldjavascript.net/pages/285-async.html  
  
  
-----


# Primise
프로미스는 비동기 상태를 값으로 다룰 수 있는 객체다. (ES6)


## 프로미스의 세 가지 상태
- 대기 중(pending) : 결과를 기다리는 중  
- 이행 됨(fulfilled) : 수행이 정상적으로 끝났고 결과값을 가지고 있음
- 거부 됨(rejected) : 수행이 비정상적으로 끝났음 

이행 됨, 거부 됨 상태를 `처리됨(settled)`상태라고 부른다.    
`프로미스는 처리된 상태가 되면 더 이상 다른 상태로 변경되지 않는다.`  
대기 중 상태일 때만 이행됨 또는 거부됨 상태로 변할 수 있다.


## 프로미스를 생성하는 세 가지 방식
```javascript
const p1 = new Promise((resolve, reject) => {
    // resolve(data);
    // reject('error message');
});

// new 키워드를 사용하지 않고 Promise.reject 를 호출하면, 거부됨 상태인 프로미스가 생성
const p2 = Promise.reject('error message'); 

// 만약 입력 값이 프로미스였다면 그 객체가 그대로 반환되고, 프로미스가 아니라면 이행됨 상태인 프로미스가 반환
const p3 = Promise.resolve(123);  // p3 는 123을 데이터로 가진 프로미스다.
console.log(p3 !== 123); // false
const p4 = new Promise(resolve => setTimeout(() => resolve(10), 1)); 
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

Promise.resolve(123).then(onResolve, onReject); // onResolve 호출됨
Promise.reject('error').then(onResolve, onReject); // onReject 호출됨

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
// 같은 기능을 하는 then 메서드와 catch 메서드
Promise.reject(1).then(null, error => {
    console.log(error);
});
Promise.reject(1).catch(error => {
    console.log(error);
})
```
```javascript
// then 메서드의 onReject 를 사용했을 때의 문제점
Promise.resolve()
.then(
    () => {
        // onResolve 내부에서 예외를 발생시켰을 경우
        throw new Error('some error');
    },
    error => {
        // onResolve 내부에서 발생한 예외를 처리하지 못한다!!!
        console.log(error);
    }
);
// Unhandled promise rejection 에러가 발생
```
```javascript
// onResolve 내부 예외를 처리를 위한 catch 사용
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

- 동기 코드의 예외 처리 신경 쓰기 (`Promise 비동기 프로그래밍 대표적 예, API 데이터 호출`)   
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


# async await  
async await 함수는 프로미스를 반환한다.  
```javascript
async function getData() {
    return 123;
}
getData().then(data => console.log(data)); // 123
```
```javascript
async function getData() {
    return Promise.resolve(123);
}
getData().then(data => console.log(data)); // 123
```

async await 함수에서 예외가 발생하는 경우
```javascript
async function getData() {
    throw new Error('123');
}
getData().catch(error => console.log(error)); // 123
```

async await 와 프로미스 비교하기
```javascript
function getDataPromise() {
    asyncFunc1()
    .then(data => {
        console.log(data);
        return asyncFunc2();
    })
    .then(data => {
        console.log(data);
    });
}

async function getDataAsync() {
    const data1 = await asyncFunc1();
    console.log(data1);
    const data2 = await asyncFunc2();
    console.log(data2);
}
```

async await 활용 병렬로 실행
```javascript
async function getData() {
    const p1 = asyncFunc1();
    const p2 = asyncFunc2();
    const data1 = await p1;
    const data2 = await p2; 
}
```
```javascript
async function getData() {
    const [data1, data2] = await Promise.all([asyncFunc1(), asyncFunc2()]);
    // ...
}
```


-----


```javascript
const timer = (time) => {
  return new Promise((resolve, reject) => {
    console.log(`${time} 타이머 시작`);
    setTimeout(() => {
      console.log(`${time} 타이머 끝`);
      resolve();
    }, time);
  });
};
```


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
제너레이터(generator)는 함수의 실행을 중간에 멈추고 재개할 수 있는 독특한 기능이다.  
실행을 멈출 때 값을 전달할 수 있기 때문에 반목분에서 제너레이터가 전달하는 값을 하나씩 꺼내서 사용할 수 있다.  
이는 배열이 반복문에서 사용되는 방식과 같다.  다만, 제너레이터는 보통의 컬렉션(collection)과 달리 값을 미리 만들어 놓지 않는다.  
값을 미리 만들어 놓으면 불필요하게 메모리를 사용하는 단점이 있다. 제너레이터를 사용하면 필요한 순간에 값을 계산해서 전달할 수 있기 때문에 메모리 측면에서 효율적이다.  

제너레이터 객체는 next, return, throw 메서드를 가지고 있다.  
```javascript
function* f1() {
    console.log('f1-1');
    yield 10;
    console.log('f1-2');
    yield 20;
    console.log('f1-3');
    yield 30;
}

const gen1 = f1();
console.log(gen1.next());
// f1-1
// { value: 10, done: false }
console.log(gen1.next());
// f1-2
// { value: 20, done: false }
console.log(gen1.next());
// f1-3
// { value: 30, done: true }

const gen2 = f1();
console.log(gen2.next());
// f1-1
// { value: 10, done: false }
console.log(gen2.return('abc')); // 제너레이터 return
// { value: 'abc', done: true }
console.log(gen2.next());
// { value: undefined, done: true }
```

## 반복 가능하면서 반복자인 제너레이터 객체
다음 조건을 만족하는 객체는 `반복자`이다.  
- next 메서드를 가지고 있다.  
- next 메서드는 value와 done속성값을 가진 객체를 반환한다.  
- done 속성값은 작업이 끝났을 때 참이 된다.  

다음 조건을 만족하면 `반복 가능(iterable)한 객체`다.  
- Symbol.interator 속성값으로 함수를 가지고 있다.  
- 해당 함수를 호출하면 반복자를 반환한다.  

배열은 대표적인 반복 가능한 객체다.    
```javascript
const arr = [10, 20, 30];
const iter = arr[Symbol.iterator](); // 배열은 Symbol.iterator 속성값으로 함수를 갖고 있으므로 첫 번째 조건을 만족한다.
console.log(iter.next()); // 함수가 반환한 iter 변수는 반복자이므로 두 번째 조건도 만족한다.
// { value: 10, done: false }
```

## 제너레이터로 구현한 map, filter, take 함수
```javascript
function* map(iter, mapper) {
    for(const v of iter) {
        yield mapper(v);
    }
}

function* filter(iter, test) {
    for(const v of iter) {
        if(test(v)) {
            yield v;
        }
    }
}

function* take(n, iter) {
    for(const v of iter) {
        if(n <= 10) return;
        yield v;
        n--;
    }
}

const value = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const result = take(3, map(filter(values, n => n % 2 === 0), n => n * 10));
console.log([ ...result ]); // [ 20, 40, 60 ]
```


## 제너레이터 함수끼지 호출하기  
제너레이터 함수에서 다른 제너레이터 함수를 호출할 때는 `yield* 키워드`를 이용한다.
```javascript
function* f1() {
    yield 2;
    yield 3;
}
function* f2() {
    yield 1;
    yield* f1();
    yield 4;
}
console.log([ ...f2() ]); // [ 1, 2, 3, 4, ]
```


## 제너레이터 함수로 데이터 전달하기
```javascript
function* f1() {
    const data1 = yield;
    console.log(data1); // 10
    const data2 = yield;
    console.log(data2); // 20
}

const gen = f1();
gen.next(); // 첫 번째 next 메서드의 호출은 제너레이터 함수의 실행이 시작되도록 하는 역할만 수행한다.  
gen.next(10);
gen.next(20);
```


## 제너레이터 함수에서 예외 발생한 경우
```javascript
function* genFunc() {
    throw new Error('some error');
}
function func() {
    const gen = genFunc();
    try {
        gen.next();
    }catch (e) {
        console.log('in catch:', e); // 'in catch: Error: some error' 에러 발생!
    }
}
```

