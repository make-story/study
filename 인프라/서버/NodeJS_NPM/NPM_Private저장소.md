# NPM 사내 저장소 구축

`study.git/인프라/Nexus.md` 참고!

https://devblog.kakaostyle.com/ko/2022-03-07-1-npm-private-repository/

https://productive.me/self-hosted-nexus-for-private-scoped-npm-packages/

https://ftredblog.wordpress.com/2018/03/05/nexus-3-x%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%9C-%EC%82%AC%EC%84%A4-npm-%EC%A0%80%EC%9E%A5%EC%86%8C-%EB%A7%8C%EB%93%A4%EA%B8%B0/

https://help.sonatype.com/repomanager3/nexus-repository-administration/formats/npm-registry/npm-security

- Repository -> Repositories 에서 Create repository 클릭
- Recipe 중에 npm (hosted) Recipe 를 선택
- Name 에 본인이 사용할 저장소 이름을 입력해주고 별다른 설정 없이 하단의 Create repository 를 클릭
- 생성 이후 리스트에서 본인이 만든 저장소를 클릭해서 들어간 뒤 화면과 같이 URL: 옆에 나와 있는 주소를 잘 메모
- 생성한 저장소에 사용자가 접근할 수 있도록 읽기 권한과 패키지 작업을 위한 쓰기 권한을 만들어 줍니다.
- Security -> Roles 에서 Create role(Nexus role)을 클릭
- Privileges 에서 npm 을 검색하여 `nx-repository-view-npm-{생성한 저장소 이름}-browse` 및 `nx-repository-view-npm-{생성한 저장소 이름}-read` 를 추가
- 그리고 똑같은 방식으로 쓰기(add) 및 수정(edit) 권한을 추가해주고 Roles에 방금 만든 읽기 권한(npm-read)도 같이 Contained에 추가해줍니다.
- Security -> Users에서 본인이 추가할 사용자에 들어가 Roles Granted에 추가

npm registry login

```
$ npm login --registry={{본인이 만든 hosted npm 저장소 URL}}
$ Username: 본인의 Sonatype 계정 ID
$ Password: 본인의 Sonatype 계정 Password
$ Email: 본인의 이메일
```

https://productive.me/self-hosted-nexus-for-private-scoped-npm-packages/
