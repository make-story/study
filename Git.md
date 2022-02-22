
https://medium.com/@_diana_lee/github-gitlab%EC%9C%BC%EB%A1%9C-%ED%98%91%EC%97%85%ED%95%98%EB%8A%94-%ED%95%9C%EA%B0%80%EC%A7%80-%EB%B0%A9%EB%B2%95-feature-branch-workflow-9034441cf285  

# Feature Branch WorkFlow
1. 구현해야 하는 기능 별로 브랜치를 생성한다.
2. 생성한 브랜치 내에서 진행한 작업들을 Commit한다.
3. 로컬에서만 작업하면 다른분들과 공유가 안되니 원격 저장소에 Push한다. (최소 하루에 한번은 내 작업을 커밋, 푸시한다)
4. 기능구현이 완료 되면 마스터 브랜치에 Merge Request를 보낸다.
5. 동료분의 코드 리뷰가 끝나고 이상이 없으면 마스터 브랜치에 내 작업물이 Merge 된다.  

`GitHub은 Pull Request, GitLab은 Merge Request라는 용어를 사용하고 있다`  

1. git checkout -b feature/issues#1-Login-Page  
브랜치를 생성하고 해당 브랜치로 이동할거에요. 이 브랜치는 첫번째 이슈이며 로그인 기능을 하는 페이지를 만들거에요.
2. git add .  
모든 변경사항을 tracking 되는 상태로 변경할거에요.
3. git commit -m “ENH: Add Input Form for Login”  
이번 작업은 로그인을 위한 폼을 만든 거에요. 커밋 할게요!
4. git push -set-upstream origin feature/issues#1-Login-Page  
내가 작업하고 있는 브랜치를 동료들도 볼 수 있게 원격에 올릴게요
5. push하면 gitlab/github에 Pull Request나 Merge Request 생성하는 버튼이 활성화  
6. (메신저로) @동료님 저 이번에 로그인 페이지 작업했고 해당 작업 사항 MR(PR) 올렸습니다! 피드백 부탁드립니다! 감사합니다~  

`Sourcetree 라는 툴을 이용해 2, 3번 작업을 명령어가 아닌 GUI로 쉽게 할 수 있음`  

# 충돌이 없으면 협업이 아니지!
4번 — 즉, Merge Request(Pull Request)를 보내기 전  

1. 내가 작업하는 동안 변경된 최신 코드가 있는지 확인하기 위해 원격에 있는 마스터 브랜치를 Pull 받는다.
2. 그리고 다시 내가 작업하던 브랜치로 돌아가서 방금 pull 받은 마스터 브랜치와 병합을 시도한다.
3. 충돌을 해결 한 후 Commit, 원격 저장소로 Push 한다.

이걸 명령어로 치환하면  

1. git checkout master  
마스터 브랜치로 이동할게요
2. git pull  
마스터 브랜치의 최신 변경 사항 내려받을게요
3. git checkout feature/issues#1-Login-Page  
다시 내가 작업하던 브랜치로 돌아갑니다  
git merge master OR git rebase master  
마스터 브랜치랑 내 브랜치랑 병합할거에요   

`이 후, 코드를 보면서 마스터 브랜치의 코드와 내 새로운 코드를 하나하나 비교해가면서 수정해 나가야 한다.`  
수정이 완료 되면 변경사항을 Commit, Push하면 된다. (위의 2, 3번 과정과 동일하다)  