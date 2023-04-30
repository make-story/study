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
