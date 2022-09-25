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

# 설치

```
$ yarn create playwright
```

위 명령어를 입력하면, 대화형 설치진행  
playwright, @playwright/test 등 설치

# 실행

https://playwright.dev/docs/cli

npx

```
$ npx playwright test
```

package.json

```javascript
{
    // ...
    "scripts": {
        "playwright": "playwright test"
    }
    // ...
}
```
