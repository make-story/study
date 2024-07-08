# act를 이용해 Github Action의 Workflow를 로컬환경에서 실행

https://github.com/nektos/act  
https://nektosact.com/

https://zion830.tistory.com/163

https://malwareanalysis.tistory.com/726

https://www.freecodecamp.org/news/how-to-run-github-actions-locally

https://negabaro.github.io/archive/github-action-act

## 설치

```bash
$ brew install act
```

## 실행 가능한 workflow 확인하기

```bash
# 기본
$ act -l

# m1 mac일 경우
$ act -l --container-architecture linux/amd64

# 특정한 job들만 확인하기
$ act -j job_name -l
```

## workflow 실행하는 명령어 예시

```bash
# 푸시 이벤트 시작 (기본)
$ act

# 푸시 이벤트 시작 (기본), m1 mac일 경우
$ act --container-architecture linux/amd64

# 특정한 이벤트 시작
$ act pull_request

# 특정한 job만 실행하기
$ act -j job_name

# 특정한 workflow만 실행하기
$ act -j lint -W .github/workflows/checks.yml
```

## secret value와 함께 실행하기

값이 하나일 경우

```bash
$ act -s KEY=VALUE
```

값이 여러개일 경우 my.secret이라는 파일을 현재 경로에 만들고, 아래와 같은 형식으로 key-value를 작성한다.

```
KEY1=VALUE1
KEY2=VALUE2
```

아래의 명령어로 실행한다

```bash
$ act --secret-file my.secrets
```

## [중요!] 참고

```
Default image and other options can be changed manually in ~/.actrc (please refer to https://github.com/nektos/act#configuration for additional information about file structure)
```

act 파일 저장 경로!  
(act 를 통해 GitHub Actions 수행간 Docker 이미지 다운로드 경로, Docker 이미지 재설치가 필요한 경우 해당 경로가서 파일 제거 필요!)

https://github.com/nektos/act/issues/2219#issuecomment-1991311613

~/Library/Application Support/act/actrc

```bash
# macOS 의 경우 /Users/[username]/Library/Application Support/act 삭제!
$ rm /Users/$USER/Library/Application\ Support/act/actrc
```

https://github.com/adrg/xdg?tab=readme-ov-file#xdg-base-directory
