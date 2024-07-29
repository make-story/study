# Browserslist

https://github.com/browserslist/browserslist

browserslist 는 caniuse-lite 라는 브라우저 사용 통계나 버전 정보를 들고 있는 프로젝트의 정적인 데이터를 사용

## 사용 방법

쿼리 추가(정의)

- 방법1) .browserslistrc 파일안에 정의
- 방법2) package.json 파일에 browserslist 키를 사용해 정의

## .browserslistrc

```
 > 1%
last 2 versions
not ie <= 10
```

## package.json

```javascript
{
    // ...
    "browserslist": [
        "> 1%",
        "last 2 versions",
        "not ie <= 10"
    ],
    // ...
}
```

## 쿼리 디버깅

```
$ npx browserslist
```

## 이슈경험

'yarn why' 명령어로 영향을 받을(의존) 라이브러리가 있는지 먼저 확인

```bash
$ yarn why caniuse-lite
```

오류 발생시 도구 업데이트 필요!  
(warn 이라고 생각하고 넘겼던 메시지가 어느순간 fail 로 출력되기 시작)

```
Browserslist: caniuse-lite is outdated. Please run:
```

https://github.com/browserslist/browserslist/issues/492

https://stackoverflow.com/questions/55271798/browserslist-caniuse-lite-is-outdated-please-run-next-command-npm-update-cani

```bash
$ npx browserslist@latest --update-db
```

그래도 해결이 안될 경우, '.browserslistrc' 파일 또는 package.json 'browserslist' 필드 제거
