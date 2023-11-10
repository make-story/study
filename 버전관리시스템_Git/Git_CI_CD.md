# Gitlab CI / CD

https://insight.infograb.net/docs/user/quick_start_ci_cd/

## GitLab CI/CD를 사용하려면

Job을 실행할 수 있는 러너(Runner)가 있는지 확인합니다.  
러너가 없으면 GitLab Runner를 설치하고 인스턴스, 프로젝트 또는 그룹에 대한 Runner(러너)를 등록합니다.

.gitlab-ci.yml 파일을 리포지터리의 루트에 생성합니다.  
이 파일은 CI/CD job을 정의하는 곳입니다.  
파일을 리포지터리에 커밋하면 러너가 job을 실행합니다. Job 결과는 파이프라인에 표시됩니다.

## .gitlab-ci.yml

```yml
build-job:
  stage: build
  script:
    - echo "Hello, $GITLAB_USER_LOGIN!"

test-job1:
  stage: test
  script:
    - echo "This job tests something"

test-job2:
  stage: test
  script:
    - echo "This job tests something, but takes more time than test-job1."
    - echo "After the echo commands complete, it runs the sleep command for 20 seconds"
    - echo "which simulates a test that runs 20 seconds longer than test-job1"
    - sleep 20

deploy-prod:
  stage: deploy
  script:
    - echo "This job deploys something from the $CI_COMMIT_BRANCH branch."
  environment: production
```

이 예는 다음 4가지 job을 보여줍니다.  
build-job, test-job1, test-job2, deploy-prod.  
echo 명령에 열거된 코멘트는 job을 볼 때 UI에 표시됩니다.  
$GITLAB_USER_LOGIN 및 $CI_COMMIT_BRANCH는 job이 실행될 때 채워지는 미리 정의된 변숫값입니다.

Build > Pipelines 로 이동
