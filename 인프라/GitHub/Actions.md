# GitHub Action (깃허브 액션) - 젠킨스 대안

`모던 리액트 Deep Dive` 책 내용 중 - p548

## 젠킨스

- 기본적으로 설치형 솔루션이기 때문에 별도의 서버를 구축해야 함
- 젠킨스를 사용 중인 저장소와 연결하는 작업 필요

## 깃허브 액션

- 엄밀히 말하면 깃허브 액션은 젠킨스 같은 CI 솔루션을 대체하기 위해 만들어진 도구는 아니다.
- `깃허브 액션의 목적은 깃허브 저장소를 기반으로 깃허브에서 발생하는 다양한 이벤트를 트리거 삼아 다양한 작업을 할 수 있게 도와주는 것`이다.
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
  jobs 의 하위 항목이므로 반드시 들여쓰기를 해야한다.
- jobs.build.runs-on
  어느 환경에서 해당 작업이 실행될지를 결정한다.  
  `별도의 러너를 설정하고 싶지 않고, 깃허브에서 제공하는 서버를 쓰고 싶다면 ubuntu-latest 를 선언하면 된다.`  
  만약 커스텀 러너를 쓴다면 해당 러너명을 지정하면 된다.  
  커스텀 러너를 쓰고 싶다면 저장소의 Strrings -> Actions -> Runners 에 추가할 수 있다.
- jobs.build.steps
  이제 해당 잡에서 순차적으로 수행할 작업을 정의한다.
  - uses
    actions/checkout@v3 해당 스텝에서 작업을 actions/checkout@v3 을 사용해서 작업하겠다는 것을 의미한다.  
    actions/checkout@v3 은 깃허브에서 제공하는 기본 액션으로, 별도 파라미터를 제공하지 않으면 해당 브랜치의 마지막 커밋을 기준으로 체크아웃한다.  
    최신 코드를 기준으로 작동해야 하는 CI 액션에서는 필수적으로 사용된다.
  - uses
    actions/setup-node@v3 해당 스텝에서 작업을 actions/setup-node@v3 를 사용해서 작업하겠다는 것을 의미한다.  
     actions/setup-node@v3 역시 깃허브에서 제공하는 기본 액션으로, 해당 러너에 Node.js 를 설치한다.  
     with.node-version.16 을 함께 지정했는데, 이름에서 유추할 수 있는 것처럼 Node.js 16 버전을 설치한다.
  - name:
    'install dependencies' 해당 스텝의 명칭을 지정했다. 여기서는 의존성을 설치하는 작업을 수행한다.  
    working-directory 는 터미널의 cd 명령과 비슷한 역할을 하는데, 뒤이어 수행할 작업을 해당 디렉토리에서 수행하겠다는 뜻이다. 만약 그냥 루트에서 실행해도 된다면 따로 지정하지 않아도 된다.  
    그리고 run 을 통해 수행할 작업을 명시 했다. 여기서는 의존성을 설치하기 위해 npm ci 를 선언했다. (npm ci 는 npm install 과 다르게 package-lock.json 파일만 보고 의존성 설치)
  - name:
    'build' CI 를 위한 작업, git checkout, Node.js 설치, 의존성 설치까지 마무리했으니 마지막 작업으로 빌드를 수행한다.

## 깃허브에서 제공하는 기본 액션 - p557

https://docs.github.com/ko/actions

### actions/checkout

깃허브 저장소를 체크아웃하는 액션이다.

### actions/setup-node

Node.js 를 설치하는 액션이다.

### actions/github-script

GitHub API 가 제공하는 기능을 사용할 수 있도록 도와주는 액션이다.

### actions/stale

오래된 이슈나 PR 을 자동으로 닫거나 더 이상 커뮤니케이션하지 못하도록 닫는다.

### actions/dependency-review-action

의존성 그래프에 대한 변경, 즉 package.json, package-lock.json, pmp-lock.yaml 등의 내용이 변경됐을 때 실행되는 액션으로, 의존성을 분석해 보안 또는 라이선스에 문제가 있다면 이를 알려준다.

### actions/codeql-action

깃허브의 코드 분석 솔루션인 code-ql 을 활용해 저장소 내 코드의 취약점을 분석해 준다.

---

# NPM 배포 자동화

https://blog.outsider.ne.kr/1559

https://docs.github.com/en/actions/using-workflows/manually-running-a-workflow

```yml
name: Bump Version

on: workflow_dispatch

jobs:
  bump-version:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: git config --global user.email "github-actions@example.com"
      - run: git config --global user.name "GitHub Actions"
      - uses: actions/setup-node@v1
        with:
          node-version: 16
      - run: npm version patch
      - run: git push origin master --tags
      - uses: actions/upload-artifact@v2
        with:
          name: src
          path: ./
```

## 버전체크 actions

https://github.com/technote-space/package-version-check-action

---

# NPM 패키지 자동배포

https://jinyisland.kr/post/changeset/

https://github.com/changesets/changesets

```yml
name: Release

on:
  push:
    branches:
      - main

concurrency: ${{ github.workflow }}-${{ github.ref }}

jobs:
  release:
    name: Release
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repo
        uses: actions/checkout@v3

      - name: Setup Node.js 16.x
        uses: actions/setup-node@v3
        with:
          node-version: 16.x

      - name: Install Dependencies
        run: yarn

      - name: Create Release Pull Request or Publish to npm
        id: changesets
        uses: changesets/action@v1
        with:
          # This expects you to have a script called release which does a build for your packages and calls changeset publish
          publish: yarn release
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}

      - name: Send a Slack notification if a publish happens
        if: steps.changesets.outputs.published == 'true'
        # You can do something when a publish happens.
        run: my-slack-bot send-notification --message "A new version of ${GITHUB_REPOSITORY} was published!"
```
