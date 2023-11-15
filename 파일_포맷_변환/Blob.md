# 로우 데이터를 File src URL 주입

## script src
```javascript
var src = '(' + bundleFn + ')({'
    + Object.keys(workerSources).map(function (key) {
        return stringify(key) + ':['
            + sources[key][0]
            + ',' + stringify(sources[key][1]) + ']'
        ;
    }).join(',')
    + '},{},[' + stringify(skey) + '])'
;

var URL = window.URL || window.webkitURL || window.mozURL || window.msURL;

var blob = new Blob([src], { type: 'text/javascript' });
if (options && options.bare) { return blob; }
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