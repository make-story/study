# 안드로이드, 일부 모바일 회전 문제

```javascript
var time = 0;
$(window).on('onorientationchange' in window ? 'orientationchange' : 'resize', function () {
  window.clearTimeout(time);
  time = window.setTimeout(function () {
    // window.orientation -90, 90 의 경우 가로
    if ($(window).width() > $(window).height()) {
    } else {
    }
  }, 250);
});
```

# 안드로이드 CSS orientation

가로모드, 세로모드 적용시 키패드 문제  
input에 포커스가 들어와 키패드가 올라왔을 때, CSS orientation 가 예상한 것과 다르게 동작할 수 있다.  
https://stackoverflow.com/questions/8883163/css-media-query-soft-keyboard-breaks-css-orientation-rules-alternative-solut
