# 브라우저 히스토리 제거, 파라미터 정보 숨김 또는 페이지 이동 기록 제거 등

사용자에게 현재 url 숨겨야 하는 경우

- 서버사이드단 포워드
- 클라이언트단 `history.replaceState(null, 'title', '/path')`

# 대부분의 브라우저는 HTTP/1.x 규약에서 동시 호출 약 6개로 제한

HTTP 2.0 전환

https://tecoble.techcourse.co.kr/post/2021-09-20-http2/

# 'Pull to refresh' 혹은 'Pull down to refresh' - 당겨서 새로고침 (풀투 리프레쉬)

https://www.npmjs.com/package/react-simple-pull-to-refresh

css 로 기능 방지하기 (당겨서 새로고침 비활성화)

https://web.dev/learn/pwa/app-design/#pull-to-refresh

```css
body {
  overscroll-behavior-y: contain;
}
```

# PWA: 디스플레이 모드 값에 따른 반응형 CSS 적용

https://web.dev/learn/pwa/app-design/#media-queries

```css
/* It targets only the app used within the browser */
@media (display-mode: browser) {
}
/* It targets only the app used with a system icon in standalone mode */
@media (display-mode: standalone) {
}
/* It targets only the app used with a system icon in all mode */
@media (display-mode: standalone),
  (display-mode: fullscreen),
  (display-mode: minimal-ui) {
}
```
