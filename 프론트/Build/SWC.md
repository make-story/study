# SWC (Speedy Web Compiler)

https://swc.rs/docs/getting-started

https://fe-developers.kakaoent.com/2022/220217-learn-babel-terser-swc/

SWC는 자바스크립트 프로젝트의 컴파일과 번들링 모두에 사용될 수 있는, Rust라는 언어로 제작된 빌드 툴

`Next.js에서는 SWC를 기반으로 개발한 컴파일러를 통해 기존 빌드에 활용하던 바벨과 Terser를 대체 (Next.js 12 버전부터 정식으로 도입된 SWC)`  
즉, Next.js의 빌드 과정 중 트랜스파일링을 수행했던 바벨과, 코드 경량화를 수행했던 Terser가 SWC로 대체된다는 뜻

SWC라는 툴이 바벨이나 Terser보다 월등하게 빠른 이유가 대체 뭘까요?  
가장 큰 이유는 바로 Rust라는 프로그래밍 언어가 이벤트 루프 기반의 싱글 스레드 언어인 자바스크립트와는 다르게 병렬 처리를 고려해서 설계된 언어라는 점

자바스크립트와는 달리 병렬 처리가 가능하도록 설계된 Rust 언어로 작성된 SWC는 의존성이 없는 파일들을 동시에 변환할 수 있습니다.  
따라서, 만약 현재 컴퓨터가 최대 4개의 작업을 동시에 할 수 있다면 SWC를 사용한 빌드 속도는 바벨이나 Terser를 통해 빌드했을 때 보다 최대 4배까지 더 빨라질 수 있을 것입니다.

---

# Next.js

https://nextjs.org/docs/advanced-features/compiler

Next.js 12 버전부터 기본적으로 SWC 컴파일러가 바벨을 대체하도록 설정되어 있지만, Terser의 코드 경량화 작업도 SWC가 담당하도록 하려면 별도의 설정을 추가

next.config.js

```javascript
module.exports = {
  reactStrictMode: true, // 초기 세팅에 이미 포함된 내용입니다.
  swcMinify: true, // 코드 경량화 작업에 Terser가 아닌 SWC를 사용합니다.
};
```

`Next.js 12 이후 버전에서 SWC 대신 바벨을 사용하도록 설정하는 방법은 매우 간단` - 참고용, Next.js 12 버전부터는 기본 설정을 통해 SWC 사용권장  
프로젝트에 바벨 설정 파일인 .babelrc 파일이 존재하면 됨

.babelrc

```javascript
{
    "presets": ["next/babel"] // Next.js 프로젝트 빌드를 위한 플러그인들이 모여있는 프리셋입니다.
}
```
