# GitHub Action (깃허브 액션) - 젠킨스 대안

`모던 리액트 Deep Dive` 책 내용 중 - p548

## 젠킨스

- 기본적으로 설치형 솔루션이기 때문에 별도의 서버를 구축해야 함
- 젠킨스를 사용 중인 저장소와 연결하는 작업 필요

## 깃허브 액션

- 엄밀히 말하면 깃허브 액션은 젠킨스 같은 CI 솔루션을 대체하기 위해 만들어진 도구는 아니다.
- 깃허브 액션의 목적은 깃허브 저장소를 기반으로 깃허브에서 발생하는 다양한 이벤트를 트리거 삼아 다양한 작업을 할 수 있게 도와주는 것이다.
  - 깃허브의 어떤 브랜치에 푸시가 발생하면 빌드를 수행한다.
  - 깃허브의 특정 브랜치가 메인 브랜치를 대상으로 풀 리퀘스트가 열리면 빌드, 테스트, 정적 분석을 수행한다.

## 깃허브 액션의 가격정책

https://github.com/pricing

## 깃허브 액션의 기본 개념

깃허브 액션에서 자주 언급되는 개념

요약하자면  
스탭들을 엮어서 잡을 만들고,  
이러한 여러 개의 잡은 병렬로 실행되며,  
이러한 잡을 하나 이상 모다운 것을 액션이라고 한다.  
그리고 이 액션을 실행하는 것이 러너다.

### 러너(runner)

러너란 파일로 작성된 깃허브 액션이 실행되는 서버를 의미한다.  
특별히 지정하지 않으면 공용 깃허브 액션 서버를 이용하며, 별도의 러너를 구축해 자체적으로 운영할 수도 있다.

### 액션(action)

러너에서 셀행되는 하나의 작업 단위를 의미한다.  
yaml 파일로 작성된 내용을 하나의 액션으로 볼 수 있다.

### 이벤트(event)

깃허브 액션의 실행을 일으키는 이벤트를 의미한다.  
개발자의 필요에 따라 한 개 이상의 이벤트를 지정할 수 있다.  
또한 특정 브랜치를 지정하는 이벤트도 가능하다.  
주로 사용되는 이벤트는 다음과 같다.

- pull_request
  PR(pull request) 과 관련된 이벤트로서, PR이 열리거나, 닫히거나, 수정되거나, 할당되거나, 리뷰 요청되는 등의 PR과 관련된 이벤트를 의미한다.
- issues
  이슈와 관련된 이벤트로서 이슈가 열리거나, 닫히거나, 삭제되거나, 할당되는 등 이슈와 관련된 이벤트를 의미한다.
- push
  커밋이나 태그가 푸시될 때 발생하는 이벤트를 의미한다.
- schedule
  저장소에서 발생하는 이벤트와 별개로 특정 시간에 실행되는 이벤트를 의미한다.  
  여기서 말하는 시간은 cron 에서 사용되는 시간을 의미한다.  
  cron 이란 유닉스 계열 운영체제에서 실행되는 시간 기반 잡 스케줄러로, 여기서는 특정 시간을 표현할 때 다음과 같은 형식을 취한다.  
  5 4 \* \* _  
  매일 4시 5분에 실행. 분. 시간. 일. 월. 요일 순으로 표현하며, _ 는 모든 값을 의미한다.
- 잡(job)
  잡이란 하나의 러너에서 실행되는 여러 스탭의 모음을 의미한다.  
  하나의 액션에서 여러 잡을 생성할 수 있으며, 특별히 선언한 게 없다면 내부 가상머신에서 각 잡은 병렬로 실행된다.
- 스탭(steps)
  잡 내부에서 일어나는 하나하나의 작업을 의미한다.  
  셀 명령어나 다른 액션을 실행할 수도 있다.  
  이 작업은 병렬로 일어나지 않는다.

## 깃허브 액션 작성하기

액션을 작성하려면 저장소의 루트에 .github/workflows 폴더를 생성하고 내부에 파일을 작성하면 된다.  
파일명은 마음대로 지정할 수 있으며, yaml 파일 작성을 위해 확장자는 .yml 또는 .yaml 로 지정해야 한다.

```yml
name: chapter7 build
run-name: ${{ github. actor }} has been added new commit.

on:
    push:
        branches-ignore:
            - 'main'

jobs:
    build:
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@v3
            - uses: actions/setup-node@v3
                with:
                    node-version: 16
            - name: 'install dependencies'
                working-directory: ./chapter7/my-app
                run: npm ci
            - name: 'build'
                working-directory: ./chapter7/my-app
                run: npm run build
```

https://github.com/wikibook/react-deep-dive-example/blob/main/.github/workflows/build.yaml

```yml
name: chapter9 build
run-name: ${{ github. actor }} has been added new commit.

on:
  push:
    branches-ignore:
      - 'main'
    paths:
      - ./chapter9/zero-to-next

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 16
      - name: 'install dependencies'
        working-directory: ./chapter9/zero-to-next
        run: npm ci
      - name: 'build'
        working-directory: ./chapter9/zero-to-next
        run: npm run build
```

저장소에 Prettier 가 설치돼 있다면 yaml 파일도 함께 포함시켜 코드 스타일을 유지하는 것이 좋다.

해당 파일을 ./github/workflow/build.yaml 이라는 이름으로 저장한 다음, 별도 브랜치에서 푸시하고 풀 리퀘스트를 만들어 확인해 보자.

### name

name 은 액션의 이름이다.  
필수 값은 아니지만, 액션을 구별하는 데 도움이 되므로 이름을 지정하는 것이 좋다.

### run-name

run-name 은 액션이 실행될 떄 구별할 수 있는 타이틀명이다.  
이 또한 필수값은 아니다.  
다만 예제와 같이 github.actor 를 활용해 어떤 사람이 해당 액션을 트리거했는지 정도를 구별하는 데 쓸 수 있다.  
만약 설정돼 있지 않다면 풀 리퀘스트 이름이나 마지막 커밋 메시지 등이 출력된다.

### on

on 은 필수 값으로, 언데 이 액션을 실행할지를 정의한다.  
이 예제에서는 원격 저장소의 푸시가 발생했을 때 실행하도록 했으며,  
main 브랜치에 푸시가 발생했을 때는 실행하지 않도록 설정했다.  
그 이유는 main 브랜치의 직접적인 푸시는 풀 리쉐스트가 머지됐을 때만 일어나며, 이 풀 리퀘스트 머지 단계에서 이미 해당 액션으로 CI 를 통과했을 것이기 때문이다.  
main 브랜치를 제외하지 않는다면 CI 중복 실행이 발생하기 때문에 별도로 막아뒀다.  
이 밖에도 다양한 옵션을 확이할 수 있는데, 자세한 옵션은 깃허브 문서를 참고하자.  
https://docs.github.com/ko/actions/using-workflows/workflow-syntax-for-github-actions

### jobs

jobs 는 필수 값으로, 해당 액션에서 수행할 잡을 의미한다.  
한 개 이상 설정할 수 있으며, 여러 개를 지정하면 병렬로 실행된다.

- jobs.build
  build 는 GitHub Action 의 예약어가 아니다. 임의로 지정한 이름으로, name 과 같은 역할을 한다고 보면 된다.
- jobs.build.runs-on
  어느 환경에서 해당 작업이 실행될지를 결정한다.
- jobs.build.steps
  이제 해당 잡에서 순차적으로 수행할 작업을 정의한다.

## 깃허브에서 제공하는 기본 액션 - p557

https://docs.github.com/ko/actions

### actions/checkout

### actions/setup-node

### actions/github-script

### actions/stale

### actions/dependency-review-action

### actions/codeql-action
