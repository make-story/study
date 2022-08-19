# NPM

npm 은 자바스크립트 프로그래밍 언어를 위한 패키지 관리자

- https://docs.npmjs.com/
- https://docs.npmjs.com/about-npm

## 참고

- https://outofbedlam.gitbooks.io/npm-handbook/content/
- https://www.hamadevelop.me/packagelock/?fbclid=IwAR1y3fmMaOrHqAE9L9JbQit80yMjiI6KjRxIdB6UhGwTp_PG94tK7rfgQTs

---

## package.json

노드 프로젝트에 대한 정보, 설정, 사용중인 패키지를 기록하는 파일  
패키지에 대한 정보(의존성 등)를 명시

## package-lock.json

노드 패키지 간의 의존 관계를 고정시켜둔 파일  
npm 패키지를 설치하거나 수정, 삭제 등의 작업을 진행할 때 생성  
패키지(모듈)내 다른 모듈의 의존성등 각 패키지에 대한 의존성 관리  
하나의 패키지를 여러 패키지에서 사용할 수 있고 하나의 패키지는 여러 개의 버전을 가지며 또 이 여러 버전을 다른 패키지에서 사용할 수 있음.  
이렇게 되면 패키지 버전 간의 충돌과 호환이 되지 않는 경우가 있는데 이를 미연에 방지하기 위한 것  
하나의 패키지에 dependencies(종속)가 어떤 패키지인지 버전 정보와 이름이 나열되어 있고 dependencies에 명시된 특정 패키지를 다시 검색 및 추적하다 보면 여러 패키지에서 사용하는 것을 볼 수 있음

## .nvmrc

노드 버전 관리자로 nvm을 사용하는 경우 어떤 노드 버전을 사용할 지 적혀있습니다.  
https://docs.npmjs.com/cli/v8/configuring-npm/npmrc  
npm 구성 파일

## .npmignore

npm에 패키지를 배포할 때 배포하지 않을 파일들 목록입니다.

## .npmrc

각종 설정 (로그인, 저장소 등 설정)  
https://docs.npmjs.com/cli/v7/configuring-npm/npmrc/

## lerna.json

하나의 프로젝트에서 여러 패키지를 관리할 수 있게 해주는 lerna입니다. 그에 관한 설정 파일입니다.

---

# package.json 생성

```
$ npm init -y
```

-y를 입력하지 않으면 package.json에 들어가 값들을 직접 입력하면서 package.json을 생성할 수 있으며 -y를 입력할 경우 기본값으로 설정

# package.json 수정

```json
{
  "name": "패키지명",
  "version": "1.0.0",
  "description": "패키지설명",
  "author": "",
  "license": "MIT",
  "keywords": ["npm 저장소 검색 키워드"],
  "files": ["npm에 배포할 경우 실제로 패지키에 포함될 파일들, 폴더 이름을 지정하면 폴더안의 파일을 포함"],
  "dependencies": {}
}
```

## 패키지 저장소 지정 install

```
$ npm set registry "http://registry.npmjs.org/"
$ npm config get registry
```

## 패키지 그룹(또는 범위) '@'

@tistory/\* 의 이름을 가진 패키지는 private npm 서버를 바라보도록 설정

```
$ npm config set @tistory:registry http://localhost:4873
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

# 의존성 형태

종속성은 tarball 또는 git URL로도 저장소 지정 가능(install url)  
https://docs.npmjs.com/cli/v8/configuring-npm/package-json#dependencies

## Git URLs as Dependencies

```
{
  "dependencies": {
    "bar": "<protocol>://[<user>[:<password>]@]<hostname>[:<port>][:][/]<path>[#<commit-ish> | #semver:<semver>]"
  }
}
```

## Local Paths

```
{
  "dependencies": {
    "bar": "file:../foo/bar"
  }
}
```

---

# 패키지 잠금 파일 (package-lock.json, yarn.lock)

- https://docs.npmjs.com/cli/v7/configuring-npm/package-lock-json
- https://classic.yarnpkg.com/en/docs/yarn-lock/

패키지를 프로젝트에 설치하거나 갱신 또는 삭제하는데 사용되는 도구를 패키지 매니저(npm yarn 등)  
npm 은 package-lock.json 파일을, yarn 은 yarn.lock 파일을 패키지 잠금 파일로 사용

## 설치 시점에 따라 달라지는 패키지 버전 (package-lock.json 또는 yarn.lock 파일이 필요한 이유)

`모든 개발자가 정확히 같은 시각 동시에 패키지를 설치하지 않는 이상 개발자들은 서로 상이한 버전의 패키지를 설치할 확률이 발생`  
`가장 큰 이유는 package.json 파일에 등록된 패키지의 버전이 ^나 ~ 등을 이용해서 범위로 지정된 경우가 많기 때문`

예를 들어,  
package.json: ^16.8.2  
개발자 A의 PC: 16.8.2  
개발자 B의 PC: 16.8.3  
개발자 C의 PC: 16.9.1  
개발/상용 서버: 16.10.0

## 패키지 잠금 (작업자 모두 동일한 패키지 버전 사용이 가능)

`package.json 파일을 사용해도 시간과 장소에 따라서 서로 다른 버전의 패키지가 설치되는 문제는 패키지 잠금을 통해 해결`  
`package-lock.json 이나 yarn.lock 과 같은 패키지 잠금 파일에는 프로젝트에 패키지에 최초로 추가될 당시에 정확히 어떤 버전이 설치가 되었는지를 기록`

## 주의 사항

프로젝트를 최초 셋업하는 개발자는 패키지 잠금 파일을 Git 저장소에 반드시 올려서 다른 개발자들이 패키지 잠금 파일을 기준으로 패키지를 설치할 수 있도록 해야 함  
패키지 잠금 파일은 패키지 매니저가 신규 패키지를 설치하거나 기존 패키지를 갱신/제거할 때마다 package.json과 자동으로 동기를 맞춰주기 때문에 개발자가 이 파일을 직접 수정해야 할 필요는 없으며 해서도 안 됨  
신규 패키지를 설치하거나 기존 패키지를 갱신/제거한 개발자는 package.json과 더불어 함께 업데이트된 패키지 잠금 파일을 반드시 커밋

---

# 버전

http://blog.foundy.io/npm-version/  
https://outofbedlam.gitbooks.io/npm-handbook/content/cli/npm-version.html  
https://github.com/npm/node-semver#functions  
https://kevinkreuzer.medium.com/publishing-a-beta-or-alpha-version-to-npm-46035b630dd7

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

---

# NPM 설치 항목 리스트 조회

-g 옵션은 글로벌 설치 리스트

```
$ npm ls -g
$ npm list -g
$ npm list -global
$ npm ls -g --depth=0
```

# 명령어 처리 결과 파일로 저장

일반 출력 리다이렉션

- (명령) > (파일명) : 새로운 파일 생성, 기존 파일 내용 사라짐
- (명령) >> (파일명) : 기존 파일 끝에 내용 추가

```
$ ls -al > directory.txt
$ npm list --depth=0 > npm-list.txt
```
