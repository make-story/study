# Upstream, Origin, Local repository

https://git-scm.com/book/ko/v2/%EC%8B%9C%EC%9E%91%ED%95%98%EA%B8%B0-Git-%EC%B5%9C%EC%B4%88-%EC%84%A4%EC%A0%95
https://meetup.toast.com/posts/116  
https://wikidocs.net/74836  

Upstream repository를 folk  
그러면 '[관리자 계정]/[프로젝트 명]'과 별개로 '[내 계정]/[프로젝트 명]'이 생성 (Origin repository)  

# 요약
```
# 작업 환경 세팅
(master) $ git pull upstream master
(master) $ git push origin master
(master) $ git checkout -b work

/* 작업 */

# origin 업데이트
(work) $ git commit -am "Update"
(work) $ git push origin work

/* origin에서 pull request */
/* upstream master에 merge 후 origin work 삭제 */

# 작업 환경 정리
(work) $ git checkout master
(master) $ git pull upstream master
(master) $ git push origin master
(master) $ git branch -d work

# 확인
(master) $ git log --oneline --branches --graph
```

-----

## 사용자 설정 
```
$ git config --global user.name "[이름]"
$ git config --global user.email [이메일]
```

## 사용자 설정 확인
```
$ git config --list
```

## Clone public repository
```
$ git clone https://github.com/[내 계정]/[Project].git
```

## Clone private repository
```
$ git clone https://[이름]:[Token]@github.com/[내 계정]/[Project].git
```

## 개인 컴퓨터에 Upstream repository를 등록
```
$ cd [Project]
$ git remote add upstream https://github.com/[관리자 게정]/[Project].git

# 다음의 명령어로 확인 가능
$ git remote
> origin
> upstream
```

## local Repository의 master branch에서 Upstream Repository의 master branch를 pull (git pull upstream master)
## Local Repository의 master branch에서 Origin Repository의 master branch로 push (git push origin master)
```
(master) $ git pull upstream master
# 이때 --rebase parameter를 추가하면 commit history 관리가 더 좋다고 한다.

(master) $ git push origin master
```

## Local Repository의 master branch에서 작업 branch ('work')를 생성
```
(master) $ git branch work
(master) $ git checkout work
> Switched to branch 'work'

# 혹은 아래와 같이 한번에 할 수 있다.
(master) $ git checkout -b work
Switched to a new branch 'work'
```

## Origin에도 작업 branch 생성
```
(work) $ git push origin work
```


-----


# 작업 브랜치 (Branch) 정리
## squash: 여러 개의 commit을 하나로 묶어줌.
```
(work) $ git rebase -i HEAD~5 # (함께 뭉칠 commit 수)
# vim 창이 뜨면 남길 첫 줄을 제외하고 pick 대신 f로 바꿔주면 된다. 첫 줄은 그대로 pick.
```

## rebase: 그래프 단순화를 위해 Upsteam Repository의 master branch 내용을 rebase.
```
(work) $ git pull --rebase upstream master # eclipse에서도 가능.

# git log --oneline --branches --graph 로 graph 확인 가능
```

-----

# 작업 브랜치 업데이트
## Upstream master에 내가 개발한 내용을 업데이트할 필요가 있다면 먼저 Origin work에 Local work의 내용을 push
```
(work) $ git push -u origin work
```
Origin Repository의 작업 branch를 Upstream Repository의 master branch로 pull request

# 작업 브랜치 제거
## Origin work와 Local work 삭제
```
(work) $ git push origin --delete work
(work) $ git checkout master
(master) $ git branch -d work
```

# Master 브랜치 내용을 작업 브랜치로 업데이트
## Upstream master 내용이 local의 작업 branch에 필요하다면 내용을 받아서 진행
## 먼저 local Repository의 work branch에서 Upstream Repository의 master branch를 pull (git pull upstream master)하고, 
## Local Repository의 work branch에서 Origin Repository의 work branch로 push (git push origin work)
```
(work) $ git pull upstream master
(work) $ git add .
(work) $ git commit -m "Sync with upstream master"

(work) $ git push origin work
```