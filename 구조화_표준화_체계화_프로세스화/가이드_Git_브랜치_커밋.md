# Git-Flow

https://gist.github.com/ihoneymon/a28138ee5309c73e94f9

# Git 브랜치 전략

- master
  - 제품으로 출시될 수 있는 브랜치
  - PRD 환경 배포
- develop
  - 개발 테스트 브랜치 (develop -> feature, release, hotfix, master 등 타 브랜치로 머지 금지)
  - DEV 환경 배포
- feature/\*\*
  - 기능을 개발하는 브랜치
  - master 또는 release 로부터 현행화
  - DEV 환경 배포
- release/\*\*
  - 이번 출시 버전을 준비하는 브랜치
  - STG 환경 배포
- hotfix/\*\*
  - 출시 버전에서 발생한 버그를 수정 하는 브랜치
  - STG 환경 배포
- backup/\*\*
  - 백업 브랜치

# Git 브랜치 네이밍 규칙

영문의 경우 소문자  
프로젝트 또는 작업 종류

- feature
  - feature/프로젝트 또는 티켓
- release
  - release/배포일자
  - 예: release/20220101
- hotfix
  - hotfix/배포일자
  - 예: hotfix/20220102

# 커밋 메시지 규칙

`[작업자 이름][프로젝트명 또는 티켓구분값] 커밋내용`
