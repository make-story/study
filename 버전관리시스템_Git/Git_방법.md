# 원 브랜치 전략

master -> feature 생성 -> 스쿼시 머지(squash merge) master  
master -> 개발환경(alpha 환경) 배포  
master -> release 머지 -> Tag 생성 -> 운영환경 배포  
master -> hotfix 생성 -> release 머지 -> Tag 생성 -> 운영환경 배포

# 스쿼시 머지(squash merge)

여러개의 commit 들을 merge 시에 하나로 묶어 1개 commit 만을 남기는 병합 방식

https://www.lesstif.com/gitbook/git-squash-commit-24445167.html
