# Blob

https://ko.wikipedia.org/wiki/%EB%B0%94%EC%9D%B4%EB%84%88%EB%A6%AC_%EB%9D%BC%EC%A7%80_%EC%98%A4%EB%B8%8C%EC%A0%9D%ED%8A%B8

https://www.w3.org/TR/FileAPI/#blob-section

JavaScript 에서 Blob(Binary Large Object, 블랍) 은 이미지, 사운드, 비디오와 같은 멀티미디어 데이터를 다룰 때 사용할 수 있습니다.

Blob 은 웹에서 사용되는 데이터 형식으로, 이진 데이터를 나타내며, 텍스트, 이미지, 오디오, 비디오 등 다양한 형식을 지원합니다.

바이너리

- 바이너리는 0과 1, 두 숫자로만 이루어진 이진법을 의미한다.
- 컴퓨터에서 정보는 이진 형태로 저장되며, 바이너리는 이진 파일을 의미한다.

# 로우 데이터를 File src URL 주입

## script src

```javascript
var src =
  '(' +
  bundleFn +
  ')({' +
  Object.keys(workerSources)
    .map(function (key) {
      return (
        stringify(key) +
        ':[' +
        sources[key][0] +
        ',' +
        stringify(sources[key][1]) +
        ']'
      );
    })
    .join(',') +
  '},{},[' +
  stringify(skey) +
  '])';
var URL = window.URL || window.webkitURL || window.mozURL || window.msURL;

var blob = new Blob([src], { type: 'text/javascript' });
if (options && options.bare) {
  return blob;
}
var workerUrl = URL.createObjectURL(blob);
```

## json src

```javascript
const jsonData = {
    // ...
};
// URL 형태
window.URL.createObjectURL(
    new Blob([JSON.stringify(jsonData, null, 2)], {
        type: 'application/json',
    }),
),
```
