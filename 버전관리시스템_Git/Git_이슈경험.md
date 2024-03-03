# Git 이슈 슈팅 (트러블슈팅, 이슈경험)

## Git 대소문자 커밋

```
$ git mv --force a.png A.png
$ git commit
$ git push
```

위 방법으로 적용이 안된다면

```
$ git config core.ignorecase false
```

## fatal: Need to specify how to reconcile divergent branches.

https://sanghye.tistory.com/43

```
hint: You have divergent branches and need to specify how to reconcile them.
hint: You can do so by running one of the following commands sometime before
hint: your next pull:
hint:
hint:   git config pull.rebase false  # merge
hint:   git config pull.rebase true   # rebase
hint:   git config pull.ff only       # fast-forward only
hint:
hint: You can replace "git config" with "git config --global" to set a default
hint: preference for all repositories. You can also pass --rebase, --no-rebase,
hint: or --ff-only on the command line to override the configured default per
hint: invocation.
fatal: Need to specify how to reconcile divergent branches.
```

hint 중 하나를 선택
아래 명령어는 머지방식으로 해결 선택

```
$ git config --global pull.rebase false
```

## hint: Updates were rejected because the tag already exists in the remote.

https://perihelion.co.jp/updates-were-rejected-because-the-tag-already-exists-in-the-remote/

tag 정보가 리모트와 일치하지 않다

커멘드 라인

```
$ git pull -t
```

또는

```
$ git pull --tags
```

소스트리의 경우  
"패치" 버튼 클릭 -> "모든 원격에서 가져오기"와 "모든 태그 가져와서 로컬에 저장하기" 체크 -> 확인 클릭

확인 클릭 후 이슈가 발생한 경우

```
$ git pull -t -f
```

또는

```
$ git pull --tags --force
```

---

## Git을 사용하면서 겪는 문제들에 대한 해결책 설명

https://dangitgit.com/ko

### 이런, 뭔가 단단히 잘못됐는데, 다 뒤엎고 예전으로 돌리고 싶어!

```
git reflog
# git의 모든 브랜치에서 있었던
# 지금까지의 모든 기록을 볼 수 있다
# 각각 HEAD@{index} 형태로 index를 가지고 있으니,
# 잘못되기 전에 해당하는 index를 찾고
git reset HEAD@{index}
# 타임머신을 타자!
```

### 이런, 방금 커밋했는데 하나 깜빡한 걸 발견했어!

```
# 새로 바뀐 파일들을 add 하고
git add . # 또는 각각의 파일들을 add
git commit --amend --no-edit
# 마지막 커밋에 바뀐 파일이 등록된다
# 주의: 절대로 원격 저장소에 push 된 커밋을 고치지 말 것
```

### 이런, 커밋 메세지를 잘못 썼어!

```
git commit --amend
# 에디터가 켜지고 커밋 메세지를 수정할 수 있다
```

### 이런, 다른 브랜치에 커밋해야 하는 걸 실수로 master에 커밋해 버렸어!

```
# 현재 master의 상태로 새로운 브랜치를 만든다
git branch some-new-branch-name
# master 브랜치의 마지막 커밋을 제거한다
git reset HEAD~ --hard
git checkout some-new-branch-name
# 이 브랜치에는 그 커밋이 남아있다 :)
```

### 이런, 실수로 이상한 브랜치에 커밋을 해버렸어!

```
# 마지막 커밋을 취소하되, 변경된 사항은 남겨둔다
git reset HEAD~ --soft
git stash
# 올바른 브랜치로 이동
git checkout name-of-the-correct-branch
git stash pop
git add . # 또는 각각의 파일들을 add
git commit -m "your message here";
# 이제 올바른 브랜치에 커밋이 됐다
```

### 이런, diff를 실행했는데 아무 것도 안 보이잖아?!

```
git diff --staged
```

### 이런, 다섯 커밋 전에 한 커밋을 되돌려야 하잖아!

```
# 되돌려야 할 커밋을 찾는다
git log
# 방향키로 예전 커밋을 살펴보고
# 원하는 커밋을 찾으면 해당 커밋의 hash를 기억한다
git revert [saved hash]
# git이 해당 커밋을 되돌리는 새로운 커밋을 생성할 것이다
# 에디터 창이 나타나면, 새로 커밋 메세지를 입력하거나,
# 그냥 저장하고 종료한다
```

### 이런, 파일을 수정한 걸 되돌려야 하잖아!

```
# 해당 파일이 수정되기 전의 커밋 해시를 찾는다
git log
# 방향키로 예전 커밋을 살펴보고
# 커밋을 찾으면, 해시를 기록
git checkout [saved hash] -- path/to/file
# 예전 버전 파일로 바뀌어 있을 것이다
git commit -m "Wow, you don't have to copy-paste to undo"
```

---
