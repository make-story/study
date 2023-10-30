# npm 5.2버전부터, npx가 기본 패키지로 제공되기 시작

https://docs.npmjs.com/  
npm을 통해 모듈을 로컬에 설치했어야만 실행시킬 수 있었던 기존 문제점의 해결책  
모듈을 로컬에 저장하지 않고, 매번 최신 버전의 파일만을 임시로 불러와 실행 시킨 후에, 다시 그 파일은 없어지는 방식  
(`명령어를 입력하면 먼저 local이나 global에서 해당 패키지가 설치되어 있는지 확인하고 존재한다면 설치없이 해당 패키지를 실행`)

## NPX를 통한 실행파일 실행

- 실행에 필요한 패키지(NPM)가 설치되어 있는지 확인
- 설치되어 있다면 실행, 설치가 안되어 있다면 임시설치 및 실행

1. npm 사용시

```
$ npm i prettier
./node_modules/.bin/prettier -v
```

2. npx 사용시

```
npx prettier -v
```

## create-react-app같은 보일러 플레이트 모듈에 효과적

npx를 통해 create-react-app을 설치할 경우에는 매번 최신 버전만을 가져와서 설치해 주기 때문에 지금 어떤 버전을 사용하고 있는 지 신경쓸 필요가 없어짐

### 보일러 플레이트란

여러곳에서 재사용되며, 반복적으로 비슷한 형태를 띄는 코드

## gist-based scripts

https://gist.github.com/  
Github gist 스크립트를 올리고 실행할 때 유용하게 사용할 수 있음
