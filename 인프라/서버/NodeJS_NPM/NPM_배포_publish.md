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

## 로그인 확인

```
$ npm whoami
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
