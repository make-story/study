# GitLab CI CD

https://workshop.infograb.io/gitlab-ci/11_introduction-to-gitlab-cicd/1_ci_cd_concepts/

https://danawalab.github.io/gitlab/2020/03/11/GitLab-GitLab_CI_CD.html

https://docs.gitlab.com/ee/ci/

https://medium.com/@itsinil/gitlab-%EB%A5%BC-%ED%86%B5%ED%95%9C-ci-cd-pipeline-%EA%B5%AC%EC%B6%95%ED%95%98%EA%B8%B0-d7dd25e79283

## GitLab CI/CD 용어 및 개념

### Pipelines

파이프라인은 지속적 통합, 전달 및 배포의 최상위 구성 요소입니다.

파이프라인은 다음으로 구성됩니다.

- 수행할 작업을 정의하는 Jobs.
  예를 들어, 코드를 컴파일하거나 테스트하는 Job.
- 작업을 실행할 시기를 정의하는 Stages.
  예를 들어, 코드를 컴파일하는 단계 후에 테스트를 실행하는 단계.
- Job은 러너에 의해 실행됩니다.
  동시(concurrent) 러너가 충분한 경우, 동일한 단계의 여러 Job이 병렬로 실행됩니다.
- 한 단계의 모든 Job이 성공하면, 파이프라인은 다음 단계로 넘어갑니다.
- 한 단계의 어떤 Job이 실패하면, 다음 단계는 (일반적으로) 실행되지 않고 파이프라인이 일찍 종료됩니다.

### Jobs

파이프라인 구성은 Job 으로 시작됩니다.  
Job 은 .gitlab-ci.yml 파일의 가장 기본적인 요소입니다.
Job 은 Runner 가 실행해야 하는 명령 모음입니다.  
Job 의 결과물(Output)이 무엇인지 실시간으로 볼 수 있으므로, 개발자는 Job이 실패한 이유를 이해할 수 있습니다.

Job 은

- 어떤 조건에서 실행되어야 하는지를 명시하는 제약 조건으로 정의됩니다.
- 임의의 이름을 가진 최상위 요소이며 최소한 script 절을 포함해야 합니다.
- 정의할 수 있는 수에는 제한이 없습니다.

```yml
job1:
  script: 'execute-script-for-job1'
job2:
  script: 'execute-script-for-job2'
```

### Variables

CI/CD 변수는 환경 변수의 한 유형입니다.  
이를 사용하여 다음을 수행할 수 있습니다.

- Jobs 및 파이프라인의 동작을 제어
- 재사용하려는 값을 저장
- .gitlab-ci.yml 파일에 값을 하드 코딩하는 것을 방지

GitLab CI/CD 에는 파이프라인 구성 및 Job 스크립트에서 사용할 수 있는 `사전 정의된 CI/CD 변수의 기본 세트`가 있습니다.

.gitlab-ci.yml 에서 미리 정의된 CI/CD 변수를 먼저 선언하지 않고도 사용할 수 있습니다.

이 예에서는 CI_JOB_STAGE 사전 정의된 변수를 사용하여 Job 의 단계를 출력하는 방법을 보여줍니다.

```yml
test_variable:
  stage: test
  script:
    - echo "$CI_JOB_STAGE"
```

### EnvironmentsPermalink

환경은 코드가 배포되는 위치를 설명합니다.

GitLab CI/CD가 환경에 코드 버전을 배포할 때마다 배포(Deployment)가 생성됩니다.

GitLab :

- 각 환경에 대한 전체 배포 이력을 제공합니다.
- 배포를 추적하므로 서버에 배포된 항목을 항상 알 수 있습니다.

## 사전 준비

gitlab 을 이용하여 CI & CD 를 진행하기 위해서는 아래 서비스들이 사전에 준비되어 있어야 합니다.

- Gitlab
- Gitlab-runner: gitlab 과 연동 되어 스크립트를 실행 할 remote server
- Private Docker Repository: 빌드한 결과물을 CI & CD 할 docker repository

## Gitlab Plpline 설정

GitLab CI/CD 는 gitlab-ci.yml 설정한 대로 수행하게 됩니다.  
따라서 프로젝트 루트에 .gitlab-ci.yml 을 생성하고 원하는 파이프라인 형태를 작성합니다.

```yml
stages:
  - build
  - test
  - package
build:
  image: adoptopenjdk/openjdk11
  stage: build
  only:
    - develop
  script:
    - ./gradlew clean
    - ./gradlew build
  artifacts:
    paths:
      - build/libs/*.jar
    expire_in: 5 min
test:
  image: adoptopenjdk/openjdk11
  stage: test
  needs: ['build']
  only:
    - develop
  script:
    - ./gradlew test
  artifacts:
    when: always
    reports:
      junit: build/test-results/test/**/TEST-*.xml
package:
  image: docker:latest
  stage: package
  needs: ['test']
  only:
    - develop
    - tags
  variables:
    IMAGE_NAME: baas/homepage-api
    TAG: $CI_COMMIT_REF_NAME
    CA_CERTIFICATE: $CA
  services:
    - name: docker:dind
      command:
        - /bin/sh
        - -c
        - echo "CA_CERTIFICATE" > /usr/local/share/ca-certificates/my-ca.crt && update-ca-certificates && dockerd-entrypoint.sh || exit
  before_script:
    - docker login $PRI_DOCKER_REPO -u $PRI_DOCKER_USER -p $PRI_DOCKER_PW
  script:
    - docker build -t $IMAGE_NAME:$TAG .
    - docker push $IMAGE_NAME:$TAG
  after_script:
    - docker logout
```

### Build Stage

해당 스테이지에서는 adoptopenjdk/openjdk11 라는 docker image를 통해 내부에서 gradlew 명령어를 통해 프로젝트를 build 합니다.  
그 후 artifacts 명령어를 통해 build 한 xx.jar 결과물을 산출합니다.

### Test Stage

해당 스테이지에서는 adoptopenjdk/openjdk11 라는 docker image 를 통해 Test 를 진행합니다.  
그후 artifacts 명령어를 통해 test reports 결과물을 산출합니다.

### Package State

해당 스테이지에서는 docker:latest 라는 docker image 를 통해 docker image 를 생성 및 push 합니다.
