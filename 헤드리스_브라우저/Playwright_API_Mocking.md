# Playwright API Mocking

https://playwright.dev/docs/api/class-route#route-fulfill

https://blog.delpuppo.net/playwright-mock-api

https://shorttrack.tistory.com/12

```javascript
await page.route('**/xhr_endpoint', async route => {
  const json = {
    message: { test_breed: [] },
  };
  await route.fulfill({ json });
});
```
