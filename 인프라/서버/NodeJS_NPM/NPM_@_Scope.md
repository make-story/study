# 패키지 네이밍 룰

https://www.npmjs.com/package/validate-npm-package-name

https://docs.npmjs.com/package-name-guidelines

- 패키지 이름의 모든 문자는 소문자여야 합니다. 즉, 대문자 또는 대소문자 혼합 이름은 허용되지 않습니다.
- 패키지 이름은 하이픈으로 구성될 수 있습니다.
- 패키지 이름은 URL에 안전하지 않은 문자를 포함하지 않아야 합니다
- 패키지 이름은 . 또는 \_ 로 시작할 수 없습니다.
- 패키지 이름에는 공백이 없어야 합니다.
- ~)('!\* 문자가 포함되면 안됩니다.

## `패키지 그룹(또는 범위) '@' - NPM Scope`

https://docs.npmjs.com/cli/using-npm/scope

https://docs.npmjs.com/using-npm/scope.html/

`그룹명을 지정할 것이며, NPM 공유저장소에 배포할 것이라면, 필히 사전에 그룹(Scope) 생성가능한지 확인필요! (중복 등)`  
https://www.npmjs.com/org/create

package.json

```
$ npm init --scope=<그룹명>
```

```javascript
{
  // ...
  "name": "@<그룹명>/<그룹 하위 네이밍>",
  // ...
}
```

`패시지명이 '@' 시작할 경우(그룹) '/' 뒤에 하위 네이밍을 붙여야 한다! (예: '@monorepo' 오류 -> '@monorepo/test' 수정시 정상)`

`범위(@)가 지정된 패키지는 기본적으로 비공개로 설정되어 있으므로, 배포시 플래그 --access=public 를 전달하여 이 패키지를 공개용으로 배포`  
https://blog.npmjs.org/post/168978377570/new-package-moniker-rules.html

```
$ npm publish --access=public
```

누구나 공개 범위 패키지를 npm 레지스트리(공용)에 게시할 수 있지만, `비공개 패키지를 게시하려면, NPM 유료 사용 필요함`  
https://docs.npmjs.com/about-scopes

참고자료
https://docs.npmjs.com/creating-and-publishing-scoped-public-packages
https://stackoverflow.com/questions/36667258/what-is-the-meaning-of-the-at-prefix-on-npm-packages

### NPM Scope 의 사용

NPM Scope 패키지는 일반 패키지와 동일하게 배포할 수는 없다.  
배포를 위해서는 두 가지의 NPM Registry 형태로만 가능하다.

1. 비공개 패키지 게시 권한이 있는 개인 Registry

개인 비공개 패키지를 배포하기 위해서는 $7의 결제가 필요하다.  
만약 개인 비공개 Registry로 업그레이드하였다면 npm publish 또는 npm publish --access=restricted 로 모듈을 게시 할 수 있다.

2. 조직(Organizations)으로 생성된 Registry

조직(Organizations) 생성  
NPM에 로그인 후 개인 Package 항목으로 가서 생성

https://www.npmjs.com/org/create

### @makeapi/\* 의 이름을 가진 패키지는 private npm 서버를 바라보도록 설정

```
# 설정
$ npm config set @makeapi:registry http://localhost:4873

# 설정확인
$ npm config get @makeapi:registry

# 설정제거
$ npm config rm @makeapi:registry
```

명령어를 입력하면 .npmrc 파일에 저장
또는 .npmrc 파일을 직접 생성하여 추가

```
@makeapi:registry=http://localhost:4873
```

.npmrc 파일을 두고 관리할 경우, 매번 npm 명령어에서 --registry 를 명시하는 부분 생략이 가능하게 됨

```
# before
$ npm install react
$ npm install --registry http://localhost:4873 @makeapi/module1
```

```
# after
$ npm install react
$ npm install @makeapi/module1
```
