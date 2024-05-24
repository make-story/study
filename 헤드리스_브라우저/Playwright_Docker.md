# Docker 이미지

## Playwright 이미지

https://hub.docker.com/_/microsoft-playwright

https://github.com/microsoft/playwright/blob/main/utils/docker/Dockerfile.jammy

## Playwright 지원 운영체재

https://playwright.dev/docs/intro#system-requirements

## Playwright 브라우저 설치

```
RUN npx -y playwright install --with-deps
```

## Arm-AMD CPU 사이 문제 해결

`standard_init_linux.go:211: exec user process caused "exec format error"`

https://kimjingo.tistory.com/221
