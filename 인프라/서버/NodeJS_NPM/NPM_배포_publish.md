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

# NPM 설정된 저장소 확인

package.json

```json
{
  "publishConfig": {
    "registry": "https://registry.npmjs.org/"
  }
}
```

또는 .npmrc
(@그룹 - NPM Scope)

```
@ysm:registry=https://registry.npmjs.org/
```

또는 npm config

```bash
$ npm config list
$ npm config get registry
```

---

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

---

# NPM 모듈 만들어서 배포

http://makestory.net/media/#/view/856

## 배포전 로컬환경에서 테스트 (모노레포가 아닌 환경)

신규 개발 또는 수정한 패키지에서 아래 명령 실행

npm link 를 명령어를 실행시키면 npm 이 해당 폴더에 링크를 생성해주고 다른 폴더에서 링크된 패키지를 사용할 수 있도록 해줍니다.

```
$ npm link
```

## 로그인

```
$ npm login
# 또는
$ npm login --registry {repositoyURL}

Username: yusungmin
Password:
Email: (this IS public)
```

### OTP 인증

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

# NPM 저장소에 패키지 존재여부 확인

```
$ npm info 패키지명
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

또는 '@그룹' 의 경우
('@그룹' 경우는 기본 private 배포로 설정됨)

```
$ npm publish --access=public
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

---

#### -m or --message

Commit 메시지를 정의할 수 있습니다.

```
# 버전 확인
$ cat package.json | grep version
"version": "1.0.0",

# 버전 변경
$ npm version patch -m 'Version: %s'
v1.0.1

$ git log --oneline -1
60c5544 Version: 1.0.1
```

%s 를 사용하면 적용되는 버전으로 바꿔줍니다.  
보시다시피 Commit 메시지에 %s 가 1.0.1로 변경되어 있습니다.

#### --no-git-tag-version

Commit 과 Tag 생성을 비활성화 합니다.

```
# 버전 확인
$ cat package.json | grep version
"version": "1.0.0",

# 버전 변경
$ npm version patch --no-git-tag-version
v1.0.1

$ git status
...생략
modified:   package.json
...생략

# 버전 확인 (변경되었는지)
$ cat package.json | grep version
"version": "1.0.1",
```

git status 로 보면 package.json 파일이 modified 상태로 출력됩니다.  
Commit 과 Tag가 자동으로 생성되지 않고 변경된 상태로만 남게 됩니다.

#### -f or --force

기본적으로 작업 디렉토리가 Clean 상태가 아닌 경우에는 버전 업데이트가 실패됩니다.  
이 옵션을 사용하면 Clean 상태가 아닌 경우에도 강제로 버전 업데이트를 실행 할 수 있습니다.

```
# 버전 확인
$ cat package.json | grep version
"version": "1.0.0",

# 명령결과 파일로 생성
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

## Changeset - 모노레포 구성에서 NPM 패키지 배포

Changeset 은 멀티 패키지 환경(monorepo)에서 상호 의존하는 패키지들의 일관성을 유지하기 위한 라이브러리

https://github.com/changesets/changesets

https://github.com/changesets/changesets/blob/main/docs/intro-to-using-changesets.md

https://turbo.build/repo/docs/handbook/publishing-packages/versioning-and-publishing

https://jinyisland.kr/post/changeset/

```json
{
  "scripts": {
    "publish-packages": "changeset version && changeset publish"
  }
}
```

### 설치

```
$ yarn add @changesets/cli && yarn changeset init
```

### 환경설정

.changeset/config.json

```
{
  "$schema": "https://unpkg.com/@changesets/config@2.3.0/schema.json",
  "changelog": "@changesets/cli/changelog",
  "commit": false,
  "fixed": [],
  "linked": [],
  "access": "public",
  "baseBranch": "main",
  "updateInternalDependencies": "patch",
  "ignore": []
}
```

- access: 액세스 권한 설정 (restricted, public)
- baseBranch: 변경 감지를 위한 대상 브랜치
- updateInternalDependencies: 종속된 패키지가 변경될 때 같이 업데이트 patch
- commit: false 를 통해 사용자가 직접 커밋

### changeset command

changeset 커맨드를 입력하면 패키지들의 변경 사항을 감지  
그런 다음 semver 규칙에 따라 메이저 버전으로 업데이트할지, 아니면 마이너 버전으로 업데이트할지 질의

```
$ yarn changeset

# step01) 업데이트 패키지가 무엇인지 설정한다.
# 🦋  Which packages would you like to include? ...

# step02) 패키지의 SEMVER를 결정한다. 선택되지 않은 패키지는 minor 버전으로 업데이트
# 🦋  Which packages should have a major bump? ...

# step03) 변경 사항을 간략하게 입력합니다.
# 🦋  Please enter a summary for this change (this will be in the changelogs). Submit empty line to open external
```

### version

배포하기로 결정한 후, 다음과 같이 버전 업데이트를 진행  
설정된 업데이트 규칙에 따라 메이저 또는 마이너 버전이 증가하고, 의존하고있는 패키지들도 같이 업데이트  
또한 로그 파일(CHANGELOG.md)도 함께 생성

```
$ yarn changeset version
```

이 단계 이후 changeset publish 명령어를 사용해 내부적으로 .npmrc 파일을 참조해 레지스트리에 배포  
`자동 배포를 원하시면 publish 를 GitHub Actions 에 스크립트를 작성하고 push를 수행`

### publish

changeset publish를 실행하면 이전 단계에서 수행한 자동으로 업데이트 예정인 패키지들을 레지스트리에 배포

```
$ yarn changeset publish
```
