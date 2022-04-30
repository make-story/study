# NPM
npm 은 자바스크립트 프로그래밍 언어를 위한 패키지 관리자  
- https://docs.npmjs.com/about-npm  

## 참고  
- https://www.hamadevelop.me/packagelock/?fbclid=IwAR1y3fmMaOrHqAE9L9JbQit80yMjiI6KjRxIdB6UhGwTp_PG94tK7rfgQTs  


-----


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


-----


# .npmrc
https://docs.npmjs.com/cli/v8/configuring-npm/npmrc  
npm 구성 파일  


-----


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


## 로그인 확인
```
$ npm whoami
```


## 배포!
```
$ npm publish
```
배포된 패키지는 72시간이 지나면 삭제할 수 없어서 불필요한 패키지라면 미리 삭제하자.
```
$ npm unpublish <PACKAGE_NAME> -f
```
OTP 값 입력 요구할 수 있음
```
Enter OTP: <값입력>
```


## .npmrc 파일을 통해 배포할 경우
배포한 NPM 패키지 폴더에 .npmrc 파일생성(package.json 파일과 동일 위치)  
```
registry=
email=
always-auth=true
_auth=
```
`_auth`값 생성 방법  
```
$ echo -n '<Username값>:<Password값>' | openssl base64
```
