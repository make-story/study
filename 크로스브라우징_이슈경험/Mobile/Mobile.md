# Mobile (모바일 공통)

## input file 처리 방법

https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file

accept 속성이 없을 경우, 일부 디바이스에서 에러

아래와 같은 방식으로 사용 추천!

```html
<input type="file" accept="image/*" />
<input type="file" accept="image/*" capture="camera" /> 
```

```html
<input type="file" accept=".jpg, .png" />
<input type="file" accept="application/vnd.ms-powerpoint, .jpg, .png" />
```

capture 속성

- 모바일에서 이미지 업로드 할때 사용합니다.
- capture 속성 값으로 전/후면 카메라를 우선 작동시킬수 있습니다.

---

안드로이드일때 강제로 모바일에있는 크롬브라우저로 해당 페이지를 띄우는 방법이 있어 이걸 시도

```
location.href='intent://<url>#Intent;scheme=http;package=com.android.chrome;end'
```

## button 클릭 또는 터치 반응이 없을 경우

CSS 포지션, z-index 등 확인 필요!
