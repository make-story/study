# NPM 배포(publish)

## .npmignore

npm에 패키지를 배포할 때 배포하지 않을 파일들 목록입니다.

## .npmrc

각종 설정 (로그인, 저장소 등 설정)
https://docs.npmjs.com/cli/v7/configuring-npm/npmrc/

## lerna.json

하나의 프로젝트에서 여러 패키지를 관리할 수 있게 해주는 lerna입니다. 그에 관한 설정 파일입니다.

## .nvmrc

NVM 은 node version manager 로 노드 버전을 쉽게 변경하고 관리할 수 있다.  
.nvmrc 는 NVM(node version manager) 의 개별 프로젝트를 위한 설정 파일

각 프로젝트별로 요구하는 노드 버전이 다를 수 있기 때문에 매번 node를 재설치하고 삭제하기 보다는 NVM을 이용해 해당 프로젝트에서 쓸 노드 버전을 바뀌주는 게 편리하다.

---

# 패키지 네이밍 룰

https://www.npmjs.com/package/validate-npm-package-name

- 패키지 이름의 모든 문자는 소문자여야 합니다. 즉, 대문자 또는 대소문자 혼합 이름은 허용되지 않습니다.
- 패키지 이름은 하이픈으로 구성될 수 있습니다.
- 패키지 이름은 URL에 안전하지 않은 문자를 포함하지 않아야 합니다
- 패키지 이름은 . 또는 \_ 로 시작할 수 없습니다.
- 패키지 이름에는 공백이 없어야 합니다.
- ~)('!\* 문자가 포함되면 안됩니다.

## 패키지 그룹(또는 범위) '@'

package.json

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

예를 들어, @tistory/\* 의 이름을 가진 패키지는 private npm 서버를 바라보도록 설정

```
# 설정
$ npm config set @tistory:registry http://localhost:4873

# 설정확인
$ npm config get @tistory:registry

# 설정제거
$ npm config rm @tistory:registry
```

명령어를 입력하면 .npmrc 파일에 저장
또는 .npmrc 파일을 직접 생성하여 추가

```
@tistory:registry=http://localhost:4873
```

.npmrc 파일을 두고 관리할 경우, 위 처럼 매번 npm 명령어에서 --registry 를 명시하는 부분 생략이 가능하게 됨

```
# before
$ npm install react
$ npm install --registry http://localhost:4873 @tistory/module1
```

```
# after
$ npm install react
$ npm install @tistory/module1
```

---

# 패키지 버전

http://blog.foundy.io/npm-version/  
https://outofbedlam.gitbooks.io/npm-handbook/content/cli/npm-version.html  
https://github.com/npm/node-semver#functions  
https://kevinkreuzer.medium.com/publishing-a-beta-or-alpha-version-to-npm-46035b630dd7

## 버전규칙 참고

package.json 의 version 은 Semantic Versioning 을 기준으로 명시  
https://semver.org/lang/ko/

npm 문서  
https://docs.npmjs.com/cli/v8/commands/npm-version

`<major>.<minor>.<patch>[-<pre-release>+<metadata>]`

## 버전변경

### 1. package.json

```json
{
  "version": "1.0.0-stg.0"
}
```

### 2. npm version 명령

> `Usage`

```
npm version [<newversion> | major | minor | patch | premajor | preminor | prepatch | prerelease | from-git]
```

> `Version format`

```
<major>.<minor>.<patch>[-<pre-release>+<metadata>]
```

> `Release arguments`  
> 각 argument에 따라 해당 자리의 버전이 증가되고, Commit과 Tag가 자동으로 생성됩니다.

#### 사용자 정의 버전

```
$ npm version 1.0.0-stg.0
```

#### major

```
$ cat package.json | grep version
"version": "1.0.0",

$ npm version major
v2.0.0

$ git log --oneline -1
beda9bf 2.0.0

$ git tag -l
v2.0.0

$ cat package.json | grep version
"version": "2.0.0",
```

자동으로 Commit과 Tag가 생성되고, 버전은 v1.0.0에서 v2.0.0으로 업데이트

#### minor

```
$ cat package.json | grep version
"version": "1.0.0",

$ npm version minor
v1.1.0

$ git log --oneline -1
16acfc8 1.1.0

$ git tag -l
v1.1.0

$ cat package.json | grep version
"version": "1.1.0",
```

자동으로 Commit과 Tag가 생성되고, 버전은 v1.0.0에서 v1.1.0으로 업데이트

#### patch

```
$ cat package.json | grep version
"version": "1.0.0",

$ npm version patch
v1.0.1

$ git log --oneline -1
51d070c 1.0.1

$ git tag -l
v1.0.1

$ cat package.json | grep version
"version": "1.0.1",
```

자동으로 Commit과 Tag가 생성되고, 버전은 v1.0.0에서 v1.0.1로 업데이트

> `Pre-release arguments`  
> 정식 배포를 하기 전 버전의 업데이트 명령어를 살펴보겠습니다.  
> 정식 버전 명령어와는 다르게 - 구분자가 추가되고, 구분자 뒤에 정식 배포 전 버전을 표기하기 위한 카운트가 추가됩니다.

#### premajor

```
$ cat package.json | grep version
"version": "1.0.0",

$ npm version premajor
v2.0.0-0
```

major 버전이 증가하고, - 구분자 뒤에 pre-release를 위한 카운트가 추가

#### preminor

```
$ cat package.json | grep version
"version": "1.0.0",

$ npm version preminor
v1.1.0-0
```

minor 버전이 증가하고, - 구분자 뒤에 pre-release를 위한 카운트가 추가

#### prepatch

```
$ cat package.json | grep version
"version": "1.0.0",

$ npm version prepatch
v1.0.1-0
```

patch 버전이 증가하고, - 구분자 뒤에 pre-release를 위한 카운트가 추가

### prerelease

```
$ cat package.json | grep version
"version": "1.0.0",

$ npm version prerelease
v1.0.1-0
```

pre-release를 위한 카운트가 없을 경우 기본으로 patch 버전이 증가하고, - 구분자 뒤에 pre-release를 위한 카운트가 추가

> `from-git`  
> 최근 Tag의 버전을 적용합니다.

```
$ cat package.json | grep version
"version": "1.0.0",

$ echo 'foo' >> README.md

$ git commit -am 'update README.md'
[master 4ed3042] update README.md
 1 file changed, 1 insertion(+)

$ git tag -a v1.0.1 -m 'Version 1.0.1'

$ git log --oneline --decorate=full -1
4ed3042 (HEAD -> refs/heads/master, tag: refs/tags/v1.0.1) update README.md

$ npm version from-git
v1.0.1

$ git log --oneline --decorate=full -2
5536080 (HEAD -> refs/heads/master) 1.0.1
4ed3042 (tag: refs/tags/v1.0.1) update README.md
```

> `Options`  
> arguments와 함께 사용되는 옵션입니다.

#### -m or --message

Commit 메시지를 정의할 수 있습니다.

```
$ cat package.json | grep version
"version": "1.0.0",

$ npm version patch -m 'Version: %s'
v1.0.1

$ git log --oneline -1
60c5544 Version: 1.0.1
```

%s를 사용하면 적용되는 버전으로 바꿔줍니다. 보시다시피 Commit 메시지에 %s가 1.0.1로 변경되어 있습니다.

#### --no-git-tag-version

Commit과 Tag 생성을 비활성화 합니다.

```
$ cat package.json | grep version
"version": "1.0.0",

$ npm version patch --no-git-tag-version
v1.0.1

$ git status
...생략
modified:   package.json
...생략

$ cat package.json | grep version
"version": "1.0.1",
```

git status로 보면 package.json 파일이 modified 상태로 출력됩니다. Commit과 Tag가 자동으로 생성되지 않고 변경된 상태로만 남게 됩니다.

#### -f or --force

기본적으로 작업 디렉토리가 Clean 상태가 아닌 경우에는 버전 업데이트가 실패됩니다.  
이 옵션을 사용하면 Clean 상태가 아닌 경우에도 강제로 버전 업데이트를 실행 할 수 있습니다.

```
$ cat package.json | grep version
"version": "1.0.0",

$ echo 'foo' >> README.md

$ git status
...생략
modified:   README.md
...생략

$ npm version patch
...생략
npm ERR! Git working directory not clean.
npm ERR! M README.md
...생략

$ npm version patch -f
npm WARN using --force I sure hope you know what you are doing.
v1.0.1

$ git log --oneline -1
96deed7 1.0.1

$ git status
...생략
modified:   README.md
...생략
```

---

# NPM 모듈 만들어서 배포

http://makestory.net/media/#/view/856

## 로그인

```
$ npm login
Username: yusungmin
Password:
Email: (this IS public)
```

```
npm notice Please check your email for a one-time password (OTP)
Enter one-time password from your authenticator app:
```

위와 같은 메시지가 나오면, `OTP 인증`이 필요하다는 것
https://docs.npmjs.com/configuring-two-factor-authentication

`NPM 인증 관련 페이지`  
https://www.npmjs.com/settings/yusungmin/tfa  
본인 인증 접속 -> `Authorization and Publishing` 선택 -> App으로 QR코드 찍어서 해당 URL이동 -> App에 설치된 OTP 실행됨 -> OTP 값 입력

## .npmrc 파일 이용 로그인

auth base64 생성

```
$ echo -n 'myuser:mypassword' | openssl base64
```

.npmrc

```
email=이메일정보
_auth=키
```

## 로그인 확인

```
$ npm whoami
```

---

# Tag 를 붙여 배포

https://docs.npmjs.com/cli/v7/commands/npm-publish  
https://docs.npmjs.com/cli/v7/commands/npm-dist-tag

```
$ npm publish --tag stg
```

## 환경 단위 Tag 예

--tag dev
--tag qa  
--tag stg  
--tag latest

# Tag 붙은 버전 나열

```
$ npm dist-tag ls
```

## Tag 의 마지막 버전 설치

```
$ yarn add <name>@<tag>
```

## Tag 의 버전지정 설치

```
$ yarn add apcp-css@1.0.0-stg.0
```

---

# 배포!

```
$ npm publish
```

## 배포된 패키지는 72시간이 지나면 삭제할 수 없어서 불필요한 패키지라면 미리 삭제하자.

```
$ npm unpublish <PACKAGE_NAME> -f
```

## 배포 중 대부분의 오류

1. NPM Registry 가입 후 E-Mail 인증을 하지 않은 경우
   E-Mail 인증을 시도하자.
2. 패키지의 이름이 이미 다른 패키지와 중복이 된 경우
   package.json의 name 속성을 바꿔주자.
3. 이미 같은 버전으로 배포가 된 경우
   npm version [major, minor, path, x.x.x] 명령어로 버전을 올려 배포하자.

## npm 저장소 확인 (사설 저장소 확인은 별도)

https://www.npmjs.com/settings/yusungmin/packages
