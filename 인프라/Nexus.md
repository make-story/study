# 넥서스 (Nexus)

https://help.sonatype.com/repomanager3/nexus-repository-administration/formats/npm-registry

사내 레포지토리

1. 캐싱기능
2. private 저장소를 사용 가능
3. 외부 저장소의 라이브러리도 사용 가능
4. 인터넷과 상관없이 사용 가능

## 저장소 종류

| repository | 설명                      |
| ---------- | ------------------------- |
| Snapshots  | 수시로 릴리즈 되는 저장소 |
| Release    | 정식 릴리즈 되는 저장소   |
| 3rd party  | 외부 저장소               |
| Proxy      | 로컬 캐시용               |
| Virtual    | 여러 저장소를 그룹화      |

| repository type | 설명                |
| --------------- | ------------------- |
| Proxy           | 외부망 연동         |
| Hosted          | 내부망 연동         |
| Virtual         | 서로 다른 타입 연결 |
| Group           | 그룹화              |

npm-proxy : 외부 저장소와 연결 및 캐싱 (한번 가져온 파일 저장됨)
npm-private : 내부 저장소 역할
npm-group : npm-proxy 와 npm-private 를 그룹화 (NPM install 시 해당 npm-group 으로 연결, 이렇게 하면 private 의 내부모듈과 proxy 외부모듈 모두 검색가능 및 다운로드 가능)
