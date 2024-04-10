# Changeset - 모노레포 구성에서 NPM 패키지 배포

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

## 설치

```
$ yarn add @changesets/cli && yarn changeset init
```

## 환경설정

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

## changeset command

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

## version

배포하기로 결정한 후, 다음과 같이 버전 업데이트를 진행  
설정된 업데이트 규칙에 따라 메이저 또는 마이너 버전이 증가하고, 의존하고있는 패키지들도 같이 업데이트  
또한 로그 파일(CHANGELOG.md)도 함께 생성

```
$ yarn changeset version
```

이 단계 이후 changeset publish 명령어를 사용해 내부적으로 .npmrc 파일을 참조해 레지스트리에 배포  
`자동 배포를 원하시면 publish 를 GitHub Actions 에 스크립트를 작성하고 push를 수행`

## publish

changeset publish를 실행하면 이전 단계에서 수행한 자동으로 업데이트 예정인 패키지들을 레지스트리에 배포

```
$ yarn changeset publish
```
