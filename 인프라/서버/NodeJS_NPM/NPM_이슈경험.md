# ERESOLVE unable to resolve dependency tree 해결하기
https://www.korecmblog.com/ERESOLVE-unable-to-resolve-dependency-tree/  

# npm의 의존성 관리
npm은 아래 5가지 종류의 의존성을 제공하고 있다.

- dependencies
프로젝트에서 실제로 의존하고 호출하는 의존성들

- devDependencies
개발할 때만 의존하는 의존성들(예를 들면 코드 포맷팅을 예쁘게 해주는 라이브러리)

- peerDependencies
내 패키지가 다른 패키지로부터 직접 불려지는(require) 것은 아니지만 특정 버전의 패키지와 호환된다는 것을 명시  
즉, 내가 다른 패키지의 특정 버전과 호환된다는 것을 뜻한다
https://medium.com/angular-in-depth/npm-peer-dependencies-f843f3ac4e7f

- optionalDependencies
선택적인 의존성으로 없거나 설치에 실패해도 npm 패키지 설치 과정이 중단되지 않아 다른 라이브러리 설치에 영향을 주지 않는 의존성들  

- bundledDependencies
내 패키지와 함께 제공되는 일련의 패키지들. 타사 라이브러리가 NPM에 없거나 일부 프로젝트를 모듈에 포함하려는 경우 사용할 수 있다.

# 해결 방법
1. 
```
$ npm install --force
```
로컬에 다운로드 복제본이 존재하더라도 다시 온라인에서 다운로드 받는다.

2. 
```
$ npm install --legacy-peer-deps
```
마치 6버전 이하에서 동작하던 것처럼 peerDependencies를 무시한다.

3. 
```
$ npm config set legacy-peer-deps true
```
모든 npm install에서 legacy-peer-deps로 동작하도록 설정한다. npm에서 권장하지 않는 방법이다.

4. 
```
$ yarn install
```