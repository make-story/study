# JavaScript : 키보드 이벤트 keyCode 사용안함
https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode  
code 권장  
https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code  


# CSS: CSS코드로 PC/Mobile 구분 (hover와 pointer 쿼리)
https://codepen.io/paperblock/pen/wvzrezj  
```html
<h3 class="pc-view"> PC 사용중! </h3>
<h3 class="mobile-view"> 모바일 사용중</h3>
<h4> Media Query Test: </h4>
 
<div class="output">
   
    <div>
        <div class="demo hover--none">
            hover: none
        </div>
        <div class="demo hover--hover">
            hover: hover
        </div>
    </div>
   
  <div>      
        <div class="demo pointer--none">
            pointer: none
        </div>
        <div class="demo pointer--coarse">
            pointer: coarse
        </div>
        <div class="demo pointer--fine">
            pointer: fine
        </div>
    </div>
 
  <div>
    <div class="demo any-hover--none">
      any-hover: none
    </div>
    <div class="demo any-hover--hover">
      any-hover: hover
    </div>
  </div>
   
  <div>  
    <div class="demo any-pointer--none">
      any-pointer: none
    </div>
    <div class="demo any-pointer--coarse">
      any-pointer: coarse
    </div>
    <div class="demo any-pointer--fine">
      any-pointer: fine
    </div>
  </div>
 
</div>
```
```css
.pc-view, .mobile-view {
  color:blue;
}
 
@media (hover: none) {
  .pc-view { display:none;}
}
@media (hover: hover) {
  .mobile-view { display:none; }
}
 
.demo {
  display: inline-block;
  width: 200px;
  height: 100px;
  line-height: 100px;
  background: #aaa;
  text-align: center;
  opacity: 0.4;
  margin: 4px;
  border-radius: 1px;
  text-decoration: line-through;
  -webkit-user-select: none;
  user-select: none;
}
.demo:hover {
  background: #c00;
  color: white;
}
 
 
/** hover options */
 
@media (hover: none) {
  .demo.hover--none {
    opacity: 1.0;
    text-decoration: none;
  }
}
@media (hover: hover) {
  .demo.hover--hover {
    opacity: 1.0;
    text-decoration: none;
  }
}
 
/** pointer options */
 
@media (pointer: none) {
  .demo.pointer--none {
    opacity: 1.0;
    text-decoration: none;
  }
}
@media (pointer: coarse) {
  .demo.pointer--coarse {
    opacity: 1.0;
    text-decoration: none;
  }
}
@media (pointer: fine) {
  .demo.pointer--fine {
    opacity: 1.0;
    text-decoration: none;
  }
}
 
 
 
/** any-hover options */
@media (any-hover) {
  .demo.any-hover {
    opacity: 1.0;
    text-decoration: none;
  }
}
@media (any-hover: none) {
  .demo.any-hover--none {
    opacity: 1.0;
    text-decoration: none;
  }
}
@media (any-hover: hover) {
  .demo.any-hover--hover {
    opacity: 1.0;
    text-decoration: none;
  }
}
 
/** any-pointer options */
@media (any-pointer) {
  .demo.any-pointer {
    opacity: 1.0;
    text-decoration: none;
  }
}
@media (any-pointer: none) {
  .demo.any-pointer--none {
    opacity: 1.0;
    text-decoration: none;
  }
}
@media (any-pointer: coarse) {
  .demo.any-pointer--coarse {
    opacity: 1.0;
    text-decoration: none;
  }
}
@media (any-pointer: fine) {
  .demo.any-pointer--fine {
    opacity: 1.0;
    text-decoration: none;
  }
}
```

# CSS : 아이폰 X 하단바
아이폰 X의 경우 하단 검은 길다란 바와 겹치는 issue가 생길 수 있음  
상하단에 생기는 브라우저 버튼들에 가려지는 상황도 생길 수 있는데 이를 대응하는 방법  
```html
<meta name="viewport" content="viewport-fit=cover">
<style>
  .floating-button {
    padding-top: env(safe-area-inset-bottom);
  }
</style>
```
env(safe-area-inset-bottom); // IOS 11.0 이상 (신)  
constant(safe-area-inset-bottom); // IOS 11.0 버전 (구)  

padding-bottom: calc(env(safe-area-inset-bottom) - 5px);  
padding-bottom: calc(constant(safe-area-inset-button) - 5px);  

https://github.com/ionic-team/cordova-plugin-ionic-webview/issues/49  
https://webkit.org/blog/7929/designing-websites-for-iphone-x/  



# JavaScript -> CSS 로 구현 가능한 것 (기능구현, 이슈처리 등)
## 랜더링 성능을 향상 시키는 새로운 CSS 속성 content-visibility  
https://wit.nts-corp.com/2020/09/11/6223    


## 사용자가 터치, 휠 스크롤 조작을 마쳤을 때의 오프셋을 설정  
https://wit.nts-corp.com/2018/08/28/5317  


## 하위 스크롤 컨테이너가 스크롤 포트의 끝에 도달했을 때, 상위 스크롤이 움직이는 것을 비활성화  
https://www.bram.us/2017/12/10/customizing-pull-to-refresh-and-overflow-effects-with-css-overscroll-behavior/    


## touch-action 속성의 값으로 auto 이외의 값을 줄 경우, 해당 속성에 명시해준 터치 액션만이 브라우저에 의해 처리  
https://wit.nts-corp.com/2018/08/28/5317  