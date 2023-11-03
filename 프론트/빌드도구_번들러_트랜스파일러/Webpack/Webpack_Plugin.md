# 웹팩 플러그인 (plugin)

## 빌드 결과 정보

### WebpackBundleTracker

https://www.npmjs.com/package/webpack-bundle-tracker

번들의 결과와 public path 추출

### WebpackManifestPlugin

https://github.com/shellscape/webpack-manifest-plugin

## webpack-stats-plugin

https://www.npmjs.com/package/webpack-stats-plugin

웹팩이 번들링 도중에 분석한 다양한 정보 파일로 반환

```javascript
const { StatsWriterPlugin } = require("webpack-stats-plugin");

module.exports = {
  plugins: [
    new StatsWriterPlugin({
      stats: {
        all: false,
        assets: true,
      },
    }),
  ],
};
```
