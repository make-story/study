`완성된 웹사이트로 배우는 HTML & CSS 웹 디자인` 책 내용중

# 배경에 동영상 넣는 법 - video 태그, object-fit CSS

동영상을 넣기 위해 <video> 태그를 사용합니다.  
CSS에서 설정한 크기로 표시되도록 object-fit: cover; 를 활용해서 정해진 크기보다 큰 부분을 잘라냅니다.

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <title>Test</title>
    <style>
      header {
        position: relative;
        margin-bottom: 0.5rem;
      }
      .header-text {
        position: absolute;
        top: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
      }
      header video {
        object-fit: cover;
        object-position: center top;
        opacity: 0.5;
        width: 100vw;
        height: 90vh;
      }
      .header-text,
      header video {
        width: 100vw;
        height: 90vh;
      }
    </style>
  </head>
  <body>
    <div id="media">
      <h2>media</h2>
      <header>
        <div class="header-text">
          <p class="header-title">Title</p>
          <h1 class="header-name">Name</h1>
        </div>
        <!-- poster 속성을 추가해 이미지 파일을 설정. 동영상 재생 이슈 또는 동영상 로딩이 완료될 때까지 대체 이미지가 표시됩니다. -->
        <video
          src="./photo-movie.mp4"
          poster="./hero.jpg"
          autoplay
          loop
          muted
        ></video>
      </header>
    </div>
  </body>
</html>
```

## iOS 환경에서 비디오 최적화 및 성능 개선 사례

https://techtopic.skplanet.com/ios15-rendering/

---

# object-fit

https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit

대체되는 엘리먼트의 내용물과 컨테이너 사이 관계 지정  
이미지나 비디오 화면노출 영역 방식

img, video 등과 같이, 내용물이 HTML 문서의 바깥에 존재하는 엘리먼트를 대체되는 엘리먼트라 부른다.
이 때, 외부에 존재하는 내용물의 크기가 컨테이너의 그것과 차이날 때, 화면에는 어떻게 나타나야 할지 지정할 필요가 생긴다.

## object-fit: fill

내용물의 가로세로비를 무시하고 컨테이너의 크기에 맞추어 늘리거나 줄인다.  
원래 비율이 유지되지 않으므로, 컨테이너의 크기에 따라 내용물이 가로 혹은 세로로 늘어날 수 있다.

## object-fit: contain

내용물의 가로세로비를 유지하는 채로, 내용물이 컨테이너에 포함되는 최대 크기가 되도록 늘리거나 줄인다.

## object-fit: cover

내용물의 가로세로비를 유지하는 채로, 내용물이 컨테이너 전체를 덮는 최소 크기가 되도록 늘리거나 줄인다.

## object-fit: none

내용물이 전혀 리사이징 되지 않는다.

## object-fit: scale-down

none 과 contain 중 내용물의 크기가 더 적은 쪽과 동일하게 동작한다.
