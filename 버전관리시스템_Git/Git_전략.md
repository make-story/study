# 원 브랜치 전략

master -> feature 생성 -> 스쿼시 머지(squash merge) master  
master -> 개발환경(alpha 환경) 배포  
master -> release 머지 -> Tag 생성 -> 운영환경 배포  
master -> hotfix 생성 -> release 머지 -> Tag 생성 -> 운영환경 배포

# 스쿼시 머지(squash merge)

여러개의 commit 들을 merge 시에 하나로 묶어 1개 commit 만을 남기는 병합 방식

https://www.lesstif.com/gitbook/git-squash-commit-24445167.html

# 업스트림 (Upstream), 다운스트림 (Downstream)

## 용어

- Fork
  fork는 다른 사람의 repository를 내 소유의 repository로 복사하는 일

- 업스트림(Upstream) remote
  메인 저장소

- 오리진(Origin) remote, 다운스트림(Downstream) remote
  개발하는 저장소, fork한 리모트
  메인 저장소를 복제한 저장소
