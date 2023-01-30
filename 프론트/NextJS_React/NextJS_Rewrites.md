# Rewrites
들어오는 요청 경로를 다른 대상 경로에 매핑  
(사용자가 사이트에서 자신의 위치를 ​​변경하지 않은 것처럼 보이게 합니다.)

next.config.js
```javascript
module.exports = {
  async rewrites() {
    return [
      {
        source: '/about',
        destination: '/',
      },
    ]
  },
}
```
