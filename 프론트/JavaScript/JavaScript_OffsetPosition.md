
# jQuery 기준 요소위치 용어
- offset : HTML 문서(document)를 기준으로 선택한 요소의 오프셋 좌표  
- position : 선택한 요소가 웹 페이지에 위치할 때 기준이 되었던 부모 요소(offset parent)를 기준으로 하는 상대 위치

-----

# 이벤트 타겟
let event = (typeof e === 'object' && e.originalEvent || e) || window.event; // originalEvent: jQuery Event
let self = event.currentTarget; // event listener element (event 실행 element)
let target = event.target || event.srcElement; // event 가 발생한 element
let touch = event.touches; // touchstart


# offsetLeft/offsetTop, offsetWidth/offsetHeight, offsetParent
패딩과 보더 포함 (일반적으로 element 크기 등을 구할 떄 사용)
offsetWidth/offsetHeight -> display: none 되어 있는 것에 주의! (visibility: hidden 경우는 값 반환가능)


# clientLeft/clientTop, clientWidth/clientHeight
패딩 포함 (실제로 보여지고 있는 컨텐츠가 얼마만큼의 공간을 차지하고 있는지 확인)


# scrollLeft/scrollTop, scrollWidth/scrollHeight
보이는 것과 상관 없이 실제 컨텐츠 영역 (전체 스크롤바를 사용하게 되어 숨겨진 영역까지 포함)


# 렌더링된 크기
x.getBoundingClientRect(); // top, bottom, left, right, [width, height (IE9 이상)]
문서의 스크롤값 미포함 (정확한 계산을 위해 스크롤값 'window.pageYOffset' 또는 'window.scrollY' 을 더해줘야 한다. 일부 오래된 브라우저는 scrollY 대신 pageYOffset만 지원하는 경우가 있지만, 노후 환경을 신경쓰지 않아도 된다면 둘 중 아무거나 사용해도 괜찮습니다.)



# getBoundingClientRect() 와 offsetWidth, offsetHeight 차이
대부분의 경우엔 getBoundingClientRect()은 offsetWidth, offsetHeight와 거의 같은 값을 리턴한다.
하지만, transform이 적용되어 있다면 조금 달라진다.

offsetWidth와 offsetHeight 속성은 엘리먼트의 레이아웃 크기를 리턴하는 반면,
getBoundingClientRect()는 렌더링된 크기를 리턴한다.

예를 들어, 엘리먼트에 다음과 같은 속성이 적용되어 있다고 가정해보자.
width: 100px;
transform: scale(0.5);

이 경우, offsetWidth는 100을 리턴하지만, getBoundingClientRect()는 50을 리턴한다.

offsetWidth 뿐 아니라, 위에서 언급한, clientWidth, scrollWidth 모두 tranform에 의해 변경된 값은 적용되지 않는다.
따라서, 최종 렌더링된 값을 가져오고 싶다면, offsetWidth 대신 getBoundingClientRect()를 사용하는 것이 좋다.


# 포인터 위치값
screenX/screenY : screen in device pixels. (모니터 화면 기준)
pageX/pageY : <html> element in CSS pixels. (html 기준 스크롤값 포함 위치)
clientX/clientY : viewport in CSS pixels. (브라우저 기준 스크롤값 제외 위치)


# JavaScript 미디어쿼리
window.matchMedia
window.matchMedia('(min-width: 760px)').matches // true or false


# 모바일 키보드(키패드)에 따른 높아
모바일의 경우 text값을 입력할때 모바일 키보드가 올라오게 되는데 이때 window.innerHeight의 값이 줄어들게 됩니다.   
그래서 웹페이지를 로드하거나 혹은 키보드를 누르지 않았을 때의 window.innerHeight값을 변수에 선언해두고 키보드를 입력했을 때의 window.innerHeight값과 비교하는 로직을 같이 쓴다면, 터치가능한 노트북의 경우를 피할 수 있을 것입니다.  
```javascript
let defaultInnerHeight = window.innerHeight;
function isMobile() {
	return navigator.maxTouchPoints && window.innerHeight !== defaultInnerHeight;
}
```