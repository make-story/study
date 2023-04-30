# 영역의 중간에 배치하기

```css
.prev,
.next {
  display: block;
  position: absolute;
  top: 50%; /* 영역 기준 상단 50% 이동 */
  transform: translateY(-50%); /* 대상의 높이 기준 위로 50% 이동 */
}
```

# 가로 중간에 배치하기

- auto 마진을 이용 방법

```css
#wrapper {
  width: 720px;
  margin: 0 auto;
}
```

- 포지셔닝과 음수 마진값 이용 방법
  먼저 래퍼 엘리먼트에 너비 폭을 지정합니다.  
  그 대음 position 속성값을 relative 로 지정하고, left 속성에 50%로 지정합니다.

```css
#wrapper {
  width: 720px;
  position: relative;
  left: 50%;
  margin-left: -360px; /* width 사이즈 절반 값 */
}
```

# Layer 화면 중앙정렬 방법

https://wit.nts-corp.com/2017/02/06/4123

1. position:absolute와 margin 마이너스값을 이용한 중앙 정렬  
   장점:  
   IE7 이상 모든 브라우저에서 지원 가능합니다.  
   단점:  
   width와 height값이 고정사이즈인 상태에서만 사용할 수 있습니다.

```html
<div class="layer">Layer Contents</div>
```

```css
.layer {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100px;
  height: 100px;
  background: #f00;
  margin: -50px 0 0 -50px;
}
```

2. position:absolute와 margin:auto를 이용한 중앙 정렬  
   장점:  
   IE8 이상 모든 브라우저에서 지원 가능합니다.  
   margin 마이너스 값과 달리 margin값에 대한 추가적 연산이 필요 없습니다.  
   단점:  
   width와 height값이 고정사이즈인 상태에서만 사용할 수 있습니다.

```html
<div class="layer">
  <span class="content">Layer Contents</span>
</div>
```

```css
.layer {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100px;
  height: 100px;
  background: #f00;
  margin: auto;
}
```

3. position:absolute와 inline-block을 이용한 중앙 정렬  
   장점:  
   IE7 이상 모든 브라우저에서 지원 가능합니다.  
   layer 안의 content 영역이 고정값이 아니라 가변이어도 자동으로 중앙정렬이 됩니다.  
   단점:  
   불필요한 span 태그가 하나 더 필요합니다. (IE8이상의 환경에서는 :after로 대체 가능)

```html
<div class="layer">
  <span class="content">Layer Contents</span>
  <span class="blank"></span>
</div>
```

```css
.layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  text-align: center;
}
.layer .content {
  display: inline-block;
  background: #f00;
  vertical-align: middle;
}
.layer .blank {
  display: inline-block;
  width: 0;
  height: 100%;
  vertical-align: middle;
}
```

4. position:absolute와 tabel-cell을 이용한 중앙 정렬  
   장점:  
   IE8 이상 모든 브라우저에서 지원 가능합니다.  
   layer 안의 content 영역이 고정값이 아니라 가변이어도 자동으로 중앙정렬이 됩니다.  
   단점:  
   코드 중첩이 여러번 되어야 합니다.

```html
<div class="layer">
  <div class="layer_inner">
    <div class="content">Layer Contents</div>
  </div>
</div>
```

```css
.layer {
  position: absolute;
  display: table;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.layer .layer_inner {
  display: table-cell;
  text-align: center;
  vertical-align: middle;
}
.layer .content {
  display: inline-block;
  background: #f00;
}
```

5. `position:absolute와 transform을 이용한 중앙 정렬`  
   장점:  
   IE9 이상 모든 브라우저에서 지원 가능합니다. (모바일 작업시 적합)  
   layer 안의 content 영역이 고정값이 아니라 가변이어도 자동으로 중앙정렬이 됩니다.  
   transform 속성은 GPU가속이 가능해서 속도향상에 도움이 됩니다.  
   짧은 소스로 간결하게 만들수 있습니다.  
   단점:  
   모바일에서 사용시 기기별로 버그가 생길 가능성이 있습니다. (폰트가 희미하게 번져보이는 버그)

```html
<div class="layer">Layer Contents</div>
```

```css
.layer {
  position: absolute;
  top: 50%;
  left: 50%;
  background: #f00;
  transform: translate(-50%, -50%);
}
```

6. `position:absolute와 flex를 이용한 중앙 정렬`  
   장점:  
   IE10 이상 모든 브라우저에서 지원 가능합니다. (모바일 작업시 적합)  
   layer 안의 content 영역이 고정값이 아니라 가변이어도 자동으로 중앙정렬이 됩니다.  
   짧은 소스로 간결하게 만들수 있습니다.  
   단점:  
   구버전 브라우저에서는 display:box와 병행해야 합니다.

```html
<div class="layer">
  <span class="content">Layer Contents</span>
</div>
```

```css
.layer {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  display: -webkit-flex;
  -webkit-align-item: center;
  -webkit-justify-content: center;
}
.layer .content {
  background: #f00;
}
```

7. position:absolute와 box를 이용한 중앙 정렬

```html
<div class="layer">
  <span class="content">Layer Contents</span>
</div>
```

```css
.layer {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-align-items: center;
  -webkit-justify-content: center;
  -webkit-box-pack: center;
  -webkit-box-align: center;
  -moz-box-pack: center;
  -moz-box-align: center;
  -ms-box-pack: center;
  -ms-box-align: center;
}
.layer .content {
  background: #f00;
}
```

---

# 양쪽 사이드바

https://jihyehwang09.github.io/2019/02/03/css-layout-float/

```html
<!DOCTYPE html>
<html>
  <head>
    <title>float로 사이드바 만들기</title>
    <style>
      p {
        margin: 0;
      }

      body {
        background-color: #ddd;
        color: dodgerblue;
      }

      .wrapper {
        width: 800px;
        margin: 50px auto;
        background-color: white;
        display: flow-root;
      }

      .sidebar {
        background-color: #c7e1fd;
        float: left;
        /* float가 적용되면, 왼쪽이든 오른쪽이든 컨텐츠가 붙어야하니까 
        contents 크기만큼 크기가 줄어버림 */
        /* sidebar랑 contents는 시작점이 같음
        sidebar랑 contents랑 겹치면 안되니까 contents가 오른쪽으로 밀린 것임  
         */
        width: 100px;
        height: 300px;
        /* 보통, height는 사이즈르 주지 않는 게 좋다. */
      }

      .contents {
        /* 1) 부모요소인 sidebar에 margin-right: 20px를 주면 된다.
          margin-left: 100px;(비추천!)


2) 유지보수를 위해서는 자식 요소인 contents에 margin-left: 100px을 주면 된다. 
-> 좋은 방법은 X (sidebar의 너비를 모르면 사용할 수 X)
3) flow-root는 가장 최상위 요소처럼 보여지게 하라는 뜻
float된 요소랑 float되지 않은 요소랑 독립되게 하려면, 자식 요소인 contents에
display: flow-root;를 준다.
*/
        display: flow-root;
        /* 장점: sidebar의 너비가 줄거나 늘어나도, 
    wrapper의 너비가 줄거나 늘어나도
    수정할 게 X
     */

        border: 5px solid mediumpurple;
        padding: 20px;
      }
      .sidebar.right {
        float: right;
      }
    </style>
  </head>
  <body>
    <div class="wrapper">
      <div class="sidebar">Sidebar</div>
      <div class="sidebar right">Sidebar</div>
      <p class="contents">
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum
        sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies
        nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel,
        aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum
        felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate
        ele
      </p>
      <!-- <div class="sidebar right">Sidebar</div> -->
    </div>
  </body>
</html>
```
