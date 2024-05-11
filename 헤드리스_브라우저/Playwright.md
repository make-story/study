# 참고

https://hyperconnect.github.io/2022/01/28/e2e-test-with-playwright.html

https://learn.microsoft.com/en-us/microsoft-edge/playwright/

---

# Playwright 는 MS에서 만든 오픈소스 웹 테스트, 자동화 라이브러리

하나의 API로 Chromium, Firefox, WebKit까지 테스트 할 수 있습니다.

Puppeteer처럼 브라우저를 컨트롤할 수 있는 API를 제공하는 프로그램  
테스트를 하려면, Playwright에서 만든 @playwright/test를 같이 사용
크로스 브라우징 테스트가 가능해졌고, @playwright/test같은 자체적인 Test runner도 제공

## 문서

https://playwright.dev/docs/intro

## Puppeteer 팀에 MS로 가서 만든 게 Playwright

https://www.infoq.com/news/2020/01/playwright-browser-automation/

## Selenium(셀레늄) vs Playwright(플레이라이트) vs Puppeteer(퍼피티어)

https://www.browserstack.com/guide/playwright-vs-selenium  
https://www.browserstack.com/guide/playwright-vs-puppeteer  
https://npmtrends.com/playwright-vs-puppeteer

Google 최초 작업 Microsoft 발전  
Chrome 개발자 팀은 브라우저 자동화에서 Selenium의 불안정성을 보완하기 위해 2017년에 Puppeteer를 만들었습니다.  
얼마 지나지 않아 상위 2명의 Puppeteer 개발자는 방향을 바꿔 Google에서 Microsoft로 이동하여 새로운 솔루션인 Playwright를 개발했습니다.

Playwright 와 Puppeteer 는 모두 브라우저 자동화를 위한 Node.js 라이브러리

Playwright 는 Microsoft가 시작한 오픈소스 Node.js 라이브러리로 2020년에 탄생  
Chromium, Firefox, WebKit 기반의 브라우저를 단일 API를 통해 자동화하기 위해 개발  
Playwright는 Linux, Windows, macOS 등 거의 모든 운영 체제와 호환  
Playwright는 복잡한 애플리케이션에 대한 크로스 브라우저 테스트를 수행하는 데 매우 유용  
Jenkins, Azure, CircleCI, TravisCI 등과 같은 주요 CI/CD 도구 및 Jasmine, Jest, JavaScript 및 Mocha와 같은 테스트 프레임워크와 통합될 수도 있음  
주목할 만한 점은 Playwright의 자동 대기 기능. 로그인 양식을 작성한 후 버튼을 클릭하기 전에 일정 시간을 기다려 (인간) 사용자를 모방. 예를 들어 Page.waitForSelector() 메서드 를 사용하여 수동으로 타이머를 설정

Puppeteer는 브라우저 기반 프레임워크이자 Chrome DevTools 팀에서 유지 관리하는 Node.js 라이브러리이며 Firefox 및 Microsoft Edge 지원이 제한
테스트 프레임워크를 번들로 제공하지 않음  
Puppeteer의 주요 기능에는 스크린샷 테스트, 성능 테스트, 웹 스크래핑 및 자동화가 포함

2023년에 Playwright와 Puppeteer 중 하나를 선택하는 것은 전적으로 선택을 하는 사용 사례에 달려 있습니다.

참고: 테스트 프레임워크  
https://www.browserstack.com/guide/top-javascript-testing-frameworks

## Playwright 의 Selenium Grid 연동

https://playwright.dev/docs/selenium-grid

## 웹 자동화는 Selenium 대신 Playwright를 쓰자

2022-11-14 작성된 글  
https://news.hada.io/topic?id=7809

## Puppeteer / Playwright 동일 기능 코드 가이드

https://playwright.dev/docs/puppeteer#cheat-sheet

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

> 브라우저 설치 중 권한 문제 발생하는 경우

```
$ cd /Users/사용자/Library/Caches
$ sudo chown -R 사용자 ms-playwright
```

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

# 관련 도구

## Codegen

작업을 기록하여 테스트를 생성. 어떤 언어로든 저장. https://playwright.dev/docs/codegen

## Playwright inspector

페이지를 검사하고, 선택기를 생성하고, 테스트 실행을 단계별로 진행하고, 클릭 지점을 확인하고, 실행 로그를 탐색합니다.

## Trace Viewer

테스트 실패를 조사하기 위해 모든 정보를 캡처합니다. 극작가 추적에는 테스트 실행 스크린캐스트, 라이브 DOM 스냅샷, 액션 탐색기, 테스트 소스 등이 포함됩니다.

## Playwright Test for VSCode

VSCode 에 plugin 을 설치하면 실행과 디버깅이 유리합니다.

# 테스트 코드 생성기

https://playwright.dev/docs/codegen-intro

```
$ npx playwright codegen <URL>
$ npx playwright codegen playwright.dev
```

# 도커 이미지 실행시 참고!

`지원 시스템`  
https://playwright.dev/docs/intro#system-requirements

https://github.com/microsoft/playwright/issues/29559

https://github.com/microsoft/playwright/issues/26482

https://hub.docker.com/r/arm64v8/node/

```Dockerfile
FROM arm64v8/node:<version>
```
