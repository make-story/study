# 타입스크립트 전환 가이드

`모던 리액트 Deep Dive` 책 내용 중 - p112

## tsconfig.json 먼저 작성하기

```json
{
  "compilerOptions": {
    "outDir": "./dist",
    "allowJs": true,
    "target": "es5"
  },
  "include": ["./src/**/*"]
}
```

- outDir 은 .ts 나 .js 가 만들어진 결과를 넣어두는 폴더다. tsc 는 타입스크립트를 자바스크립트로 변환하는 명령어인데, 이 tsc 를 사용하면 결과물이 outDir 로 넘어간다.
- allowJs 는 .js 파일을 허용할 것인지 여부다. 자바스크립트가 존재하는 과도기적인 프로젝트이므로 true 로 설정해둔다.
- target 에는 결과물이 될 자바스크립트 버전을 지정한다.
- include 에는 트랜스파일할 자바스크립트와 타입스크립트 파일을 지정한다.

## JSDoc 과 @ts-check 를 활용해 점진적으로 전환하기

자바스크립트 파일을 굳이 타입스크립트로 전환하지 않더라도 타입을 체크하는 방법이 있다.  
먼저 파일 상단에 `// @ts-check` 를 선언하고,  
JSDoc 을 활용해 변수나 함수에 타입을 제공하면  
타입스크립트 컴파일러가 자바스크립트 파일의 타입을 확인한다.

```jsx
// @ts-check

/**
 * @type {string}
 */
const str = true;

/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
function sum(a, b) {
  return a + b;
}

/**
 * 함수 설명
 * @return {JSX.Element}
 */
export function SampleComponent() {
  const result1 = sum('a', 'b');
  const result2 = sum(10, str);

  if (result1 && result2) {
    return (
      <>
        {result1} {result2}
      </>
    );
  }
}
```

바로 .ts 로 파일 확장자를 변경하고 바로 작업하는 편이 더 빠르게 전환할 수 있다.

## 타입 기반 라이브러리 사용을 위해 @types 모듈 설치하기

## 파일 단위로 조금씩 전환하기
