// 콜백실행 값 반환
const setTest = (callback) => callback();
console.log(setTest(() => 'test'));


// ----------


// https://velog.io/@hiro2474/understandfor-await-of

// 타이머 함수 정의
const timer = (time) => {
    return new Promise((resolve, reject) => {
        console.log(`${time} 타이머 시작`);
        setTimeout(() => {
            console.log(`${time} 타이머 끝`);
            resolve();
        }, time);
    });
};


// 1. Promise.all()
// 다수의 비동기 작업이 한 번에 실행되는가? : O
// 다수의 비동기 작업이 모두 끝나기를 기다리는가? : O
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

// 2. for await of문
// 다수의 비동기 작업이 한 번에 실행되는가? : X
// 다수의 비동기 작업이 모두 끝나기를 기다리는가? : O
// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/for-await...of
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

// 3. forEach 메소드 안에 async function을 사용
// 다수의 비동기 작업이 한 번에 실행되는가? : O
// 다수의 비동기 작업이 모두 끝나기를 기다리는가? : X
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