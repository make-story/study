# 테스트케이스 작성 참고 자료

`https://tech.wonderwall.kr/articles/playwrighte2etestforuser/`
https://tech.wonderwall.kr/articles/learningwithtest

click 은 말 그대로 클릭
fill 은 값을 입력
clear 는 지울 때 사용
waitFor 는 화면에 이 요소가 나타나기를 기다릴 때 사용

playwright는 당장 클릭할 대상이 보이지 않아도 자동으로 기다립니다.  
https://playwright.dev/docs/actionability

화면에 보이더라도 애니메이션이 끝날 때까지 기다리고요.  
화면에 보이더라도 disable 되지 않고 상호작용이 가능해질 때까지 기다리면서 재시도를 합니다.

timeout도 있습니다. 기본은 5000ms, 5초

## waitForTimeout 사용 권장하지 않음

자동 대기 활용!

```javascript
await expect(page.getByRole('listitem')).toHaveCount(12);
```

https://playwright.dev/docs/test-assertions#auto-retrying-assertions

# 성능 검사

https://addyosmani.com/blog/puppeteer-recipes/#devtools-screenshots

https://media-codings.com/articles/automatically-detect-memory-leaks-with-puppeteer
