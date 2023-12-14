# 안드로이드, 일부 모바일 회전 문제

```javascript
var time = 0;
$(window).on(
  'onorientationchange' in window ? 'orientationchange' : 'resize',
  function () {
    window.clearTimeout(time);
    time = window.setTimeout(function () {
      // window.orientation -90, 90 의 경우 가로
      if ($(window).width() > $(window).height()) {
      } else {
      }
    }, 250);
  },
);
```

# 안드로이드 CSS orientation

가로모드, 세로모드 적용시 키패드 문제  
input에 포커스가 들어와 키패드가 올라왔을 때, CSS orientation 가 예상한 것과 다르게 동작할 수 있다.  
https://stackoverflow.com/questions/8883163/css-media-query-soft-keyboard-breaks-css-orientation-rules-alternative-solut

# net::ERR_UPLOAD_FILE_CHANGED in Chrome

https://stackoverflow.com/questions/61916331/re-uploading-a-file-with-ajax-after-it-was-changed-causes-neterr-upload-file-c

https://12hong.tistory.com/35

input 태그의 file type을 이용할 때,  
파일을 한번 선택해놓고 다시 같은 파일을 선택하면 변경이 일어나지 않았다고 판단하여 파일을 새로 읽지 않는다.  
이게 변경사항을 저장한 후 다시 파일을 첨부했을 때에도 계속 위 에러가 발생하는 이유다.

form reset 실행  
https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/reset
