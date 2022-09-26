# 참고

https://hyperconnect.github.io/2022/01/28/e2e-test-with-playwright.html

https://learn.microsoft.com/en-us/microsoft-edge/playwright/

---

# Playwright는 MS에서 만든 오픈소스 웹 테스트, 자동화 라이브러리

하나의 API로 Chromium, Firefox, WebKit까지 테스트 할 수 있습니다.

Puppeteer처럼 브라우저를 컨트롤할 수 있는 API를 제공하는 프로그램  
테스트를 하려면, Playwright에서 만든 @playwright/test를 같이 사용
크로스 브라우징 테스트가 가능해졌고, @playwright/test같은 자체적인 Test runner도 제공

## 문서

https://playwright.dev/docs/intro

## Puppeteer 팀에 MS로 가서 만든 게 Playwright

https://www.infoq.com/news/2020/01/playwright-browser-automation/

---

# 설치

```
$ npm init playwright@latest
또는
$ yarn create playwright
```

위 명령어를 입력하면, 대화형 설치진행  
playwright, @playwright/test 등 설치

> 위 명령어 진행간 브라우저 다운로드 진행, 다운로드 이슈가 있을 경우

```
$ npx playwright install
```

직접 다운로드 진행

## playwright, @playwright/test 차이

`https://playwright.dev/docs/library`

- playwright  
  브라우저 실행 및 상호 작용 통합 테스트
- @playwright/test  
  각각의 테스트 (단위테스트)

---

# 실행

https://playwright.dev/docs/cli

## npx

```
$ npx playwright test
```

## package.json script 명령

```javascript
{
    // ...
    "scripts": {
        "playwright": "playwright test"
    }
    // ...
}
```

## 특정 테스트 실행

```
$ npx playwright test landing-page.spec.ts
```

## 특정 테스트 폴더 실행

```
$ npx playwright test tests/todo-page/ tests/landing-page/
```

## 헤드리스 모드 테스트 실행

```
$ npx playwright test landing-page.spec.ts --headed
```

## 디버깅 모드로 테스트 실행

```
$ npx playwright test --debug
$ npx playwright test example.spec.ts --debug
```

---

# 테스트 코드 생성기

https://playwright.dev/docs/codegen-intro

```
$ npx playwright codegen playwright.dev
```
