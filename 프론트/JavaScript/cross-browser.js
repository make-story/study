
//"use strict";
/*
// DOM
// http://quirksmode.org/dom/core/
// http://www.w3schools.com/jsref/dom_obj_all.asp
// http://youmightnotneedjquery.com/
// http://wiki.gurubee.net/pages/viewpage.action?pageId=6259958

1. Creating elements
createElement(); //var x = document.createElement('P'); //IE8 이하 부분 사용가능
createTextNode(); //var x = document.createTextNode('text'); //IE8 이하 부분 사용가능
createComment(); // html 주석 <!-- -->



2. Getting elements
getElementById(); //var x = document.getElementById('test'); //IE7 이하 부분 사용가능
getElementsByClassName(); //document.getElementsByClassName('test test2'); //IE8 이하 사용 불가능
getElementsByTagName(); //var x = document.getElementsByTagName('P'); //표준, return 타입이 브라우저마다 다를수 있음
querySelector(); //document.querySelector('.testClass + p') //IE8 이하 사용 불가능 - 해당 검색 요소 한개 반환
querySelectorAll(); //document.querySelectorAll('.testClass + p') //IE8 이하 사용 불가능 - 해당 검색 요소 전체 반환



3. Node information (https://developer.mozilla.org/en-US/docs/Web/API/Node)
tagName; //x.tagName; //표준

//노드의 이름
nodeName; //x.nodeName; //표준 (텍스트 노드의 경우 tagName은 undefined 반환하고 nodeName은 #text 반환, nodeName 사용권장)

//노드의 타입(숫자)
1 : Element 노드를 의미
2 : Attribute 노드를 의미
3 : Text 노드를 의미
4 : CDATASection 노드를 의미
5 : EntityReference 노드를 의미
6 : Entity 노드를 의미
7 : ProcessingInstruction 노드를 의미
8 : Comment 노드를 의미
9 : Document 노드를 의미
10 : DocumentType 노드를 의미
11 : DocumentFragment 노드를 의미
12 : Notation 노드를 의미
nodeType; //x.nodeType; //표준

//노드의 값
nodeValue; //x.nodeValue = 'Test'; //표준



4. The DOM tree
hasChildNodes(); //x.hasChildNodes(); //표준 (TextNode 포함)

//자식노드 리스트
childNodes[]; //x.childNodes[1]; //IE8 이하 사용 불가능 (TextNode 까지 검색)

//최초의 자식노드
firstChild; //x.firstChild; //IE8 이하 사용 불가능

//최후의 자식노드
lastChild; //x.lastChild; //IE8 이하 사용 불가능

//다음 노드
nextSibling; //x.nextSibling; //IE8 이하 사용 불가능

//부모노드
parentNode; //x.parentNode; //표준

//하나 전의 노드
previousSibling; //x.previousSibling; //IE8 이하 사용 불가능

//표준화된 자식노드 검색은 getElementById().getElementsByTagName() 을 사용하는 방식이 있다.



5. DOM Traversal
//자식요소의 수
childElementCount; //x.childElementCount; //IE8 이하 사용 불가능

//자식요소 리스트
children[]; //x.children[1]; //IE8 이하 사용 불가능

//최초의 자식 요소
firstElementChild; //x.firstElementChild; //IE8 이하 사용 불가능

//최후의 자식 요소
lastElementChild; //x.lastElementChild; //IE8 이하 사용 불가능

//다음 요소
nextElementSibling; //x.nextElementSibling; //IE8 이하 사용 불가능

//하나 전 요소
previousElementSibling; //x.previousElementSibling; //IE8 이하 사용 불가능



6. Node manipulation
cloneNode(); //x = y.cloneNode(true | false); //표준

//최후의 자식 요소로 추가
appendChild(); //x.appendChild(y); //표준

//어떤 요소의 위치에 노드를 삽입
insertBefore(); //x.insertBefore(y,z); //표준

//노드를 제거
removeChild(); //x.removeChild(y); //표준

//노드의 내용 변경
replaceChild(); //x.replaceChild(y,z); //표준

//시작 태그의 앞, 시작 태그의 뒤, 종료 태그 앞, 종료 태그 뒤
insertAdjacentHTML('위치', '값'); //위치: beforebegin, afterbegin, beforeend, afterend



7. Text data
appendData(); //x.appendData('some extra text'); //IE5 이하 사용 불가능
data; //x.data = 'The new text'; //표준
deleteData(); //x.deleteData(4,3); //IE5 이하 사용 불가능
insertData(); //x.insertData(4, 'and now for some extra text'); //IE5 이하 사용 불가능
normalize(); //x.normalize(); //IE5 이하 사용 불가능
replaceData(); //x.replaceData(4,3, 'and for some new text'); //IE5 이하 사용 불가능
splitText(); //x.splitText(5); //IE9 이하에서 사용이 다름
substringData(); //x.substringData(4,3); //IE5 이하 사용 불가능
wholeText; //IE8 이하 사용 불가능



8. Miscellaneous
createDocumentFragment(); //x = document.createDocumentFragment(); //IE5 이하 사용 불가능
document.documentElement; //<html> element //표준
document.head; //<head>
document.body; //<body>
getElementsByName(); //var x = document.getElementsByName('test'); //IE9 이하에서 사용이 다름
isEqualNode(); //x.isEqualNode(y); //IE8 이하 사용 불가능 (동일한, 같은 노드인지 검사)
//이 노드가 포함된 Document 객체
ownerDocument; //x.ownerDocument; //IE5 이하 사용 불가능


9. Attributes
createAttribute();
z = document.createAttribute('title');
z.value = 'Test title';
x.setAttributeNode(z)

getAttribute(); //x.getAttribute('align');
getAttributeNode(); //x.getAttributeNode('align');
hasAttribute(); //x.hasAttribute('align'); 
hasAttributes(); //x.hasAttributes();
name; //x.name;
removeAttribute(); //x.removeAttribute('align');

removeAttributeNode();
x.removeAttributeNode(x.attributes['align'])
x.removeAttributeNode(x.attributes[1])
x.removeAttributeNode(x.getAttributeNode('align'))

setAttribute(); //x.setAttribute('align','right');
setAttributeNode(); //x.setAttributeNode(node);
value; //x.value; //IE8 이하 부분 사용가능

//모바일
orientation



//CSS
//http://www.quirksmode.org/dom/w3c_cssom.html

1. WindowView properties
innerWidth; //window.innerWidth; //표준 (IE 부분 동작)
innerHeight; //window.innerHeight; //표준 (IE 부분 동작)
window.outerWidth; //IE9 이상가능
window.outerHeight; //IE9 이상가능



2. ScreenView properties
availWidth; //screen.availWidth; //표준
availHeight; //screen.availHeight; //표준
colorDepth; //screen.colorDepth; //FF 지원여부 확인필요
width; //screen.width; //표준
height; //screen.height; //표준



3. DocumentView and ElementView methods
//해당 좌표의 element 값 반환
elementFromPoint(); 
releaseElement: function(e) { // called onmouseup
	var evt = e || window.event;
	draggedObject.style.display = 'none';
	var receiver = document.elementFromPoint(evt.clientX,evt.clientY);
	if (receiver.nodeType == 3) { // Opera
		receiver = receiver.parentNode;
	}
	draggedObject.style.display = '';
}	

//window
function GetClientWindowSize () {
    if ('innerWidth' in window) {   // all browsers, except IE before version 9
        alert ("The width of the client area including the vertical scrollbar: " + window.innerWidth);
    }
    else {  // Internet Explorer before version 9
        alert ("The width of the client area without the vertical scrollbar: " + document.documentElement.clientWidth);
    }
    
    if ('innerHeight' in window) {  // all browsers, except IE before version 9
        alert ("The height of the client area including the horizontal scrollbar: " + window.innerHeight);
    }
    else {  // Internet Explorer before version 9
        alert ("The height of the client area without the horizontal scrollbar: " + document.documentElement.clientHeight);
    }
}


4. ElementView properties
pageX/pageY : <html> element in CSS pixels.
clientX/clientY : viewport in CSS pixels.
screenX/screenY : screen in device pixels.

//element 좌표 구하기
//속도: offsetWidth [빠름] > getBoundingClientRect().width [보통] > getClientRects()[0].width [느림]
getBoundingClientRect(); //x.getBoundingClientRect(); //표준
x = el.getBoundingClientRect()
y.top += x.top
//
getClientRects(); //x.getClientRects();
x = el.getClientRects()
y.top += x[0].top
//
scrollIntoView(); //x.scrollIntoView();

clientLeft; //x.clientLeft;
clientTop; //x.clientTop;
clientWidth; //x.clientWidth;
clientHeight; //x.clientHeight;
offsetLeft; //x.offsetLeft;
offsetTop; //x.offsetTop;
offsetParent; //x.offsetParent;
offsetWidth; //x.offsetWidth;
offsetHeight; //x.offsetHeight;
scrollLeft; //x.scrollLeft;
scrollTop; //x.scrollTop, x.scrollTop = 20;
scrollWidth; //x.scrollWidth;
scrollHeight; //x.scrollHeight;


-
offsetLeft/offsetTop, offsetWidth/offsetHeight, offsetParent
패딩과 보더 포함 (일반적으로 element 크기 등을 구할 떄 사용)

-
clientLeft/clientTop, clientWidth/clientHeight
패딩 포함 (실제로 보여지고 있는 컨텐츠가 얼마만큼의 공간을 차지하고 있는지 확인)

-
scrollLeft/scrollTop, scrollWidth/scrollHeight
보이는 것과 상관 없이 실제 컨텐츠 영역 (전체 스크롤바를 사용하게 되어 숨겨진 영역까지 포함)

-
x.getBoundingClientRect(); // top, bottom, left, right, [width, height (IE9 이상)]
렌더링된 크기

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

-
screenX/screenY : screen in device pixels. (모니터 화면 기준)
pageX/pageY : <html> element in CSS pixels. (html 기준 스크롤값 포함 위치)
clientX/clientY : viewport in CSS pixels. (브라우저 기준 스크롤값 제외 위치)

// ---------- ---------- ---------- ---------- ---------- ---------- ---------- 

// EVENT
event.target : event를 발생시킨 Target

event.currentTarget  : event 버블링으로 현재 이벤트 발생되는 Target

event.relatedTarget : 해당 이벤트와 관련된 다른 DOM 요소 선택

event.result :해당 이벤트가 실행한 이벤트 핸들러 함수에 의해 리턴되는 가장 마지막 값

event.data : event 대상이 가지고 있는 값

event.namespace : 이벤트가 tirgger 됐을때, 발생한 이벤트의 namespace

event.pageX : 이벤트가 발생한 요소의 문서의 왼쪽부터의 위치
event.pageY : 이벤트가 발생한 요소의문서의 상단으로부터의 위치

event.timeStamp : event가 실행된 시간

event.type : 실행된 event 타입

event.which : 이벤트가 발생된 요소의 key (키보드 값<숫자>, 마우스 <왼쪽 1, 중간 2, 오른쪽 3>)

event.preventDefault() : 해당 요소에 걸려있는 다른 이벤트를 무력화 한다. 
event.isDefaultPrevented() : event.preventDefault() 상태인지 체크 true / false

event.stopPropagation() : 다른 이벤트 핸들러가 호출되는 것을 막는다.(이벤트 버블링)
event.isPropagationStopped() : event.stopPropagation()이 호출 됐는지 여부 리턴 true / false

event.stopImmediatePropagation() : 다른 이벤트 핸들러가 호출되는 것을 막는다. (이벤트 버블링)
event.isImmediatePropagationStopped() : event.stopImmediatePropagation()이 호출됐는지 여부 리턴 true /false 


// ---------- ---------- ---------- ---------- ---------- ---------- ---------- 

MDN
Element.attributes // https://developer.mozilla.org/en-US/docs/Web/API/Element/attributes (표준)
Element.classList // https://developer.mozilla.org/en-US/docs/Web/API/Element/classList (IE10 이상)
Element.className // https://developer.mozilla.org/en-US/docs/Web/API/Element/className (표준)
Element.id // https://developer.mozilla.org/en-US/docs/Web/API/Element/id (표준)
Element.innerHTML // https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML
Element.name // https://developer.mozilla.org/en-US/docs/Web/API/Element/name
Element.outerHTML // https://developer.mozilla.org/en-US/docs/Web/API/Element/outerHTML (표준)
Element.scrollHeight // https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight
Element.scrollLeft // https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollLeft
Element.scrollTop // https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollTop
Element.scrollWidth // https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollWidth
Element.tagName

// ---------- ---------- ---------- ---------- ---------- ---------- ---------- 
1. String 객체(object)
String 객체중 문자열 처리 관련 메소드
- toLowerCase() : 소문자로 변환 
- toUpperCase() : 대문자로 변환 
- charAt(n) : n 번째의 문자열을 반환 
- charCodeAt(n) : n 번째의 문자의 유니코드 번호를 반환 
- fromCharCode(숫자) : 유니코드번호를 문자열로 변환 
- concat(문자열) : 두 개의 문자열을 합칩니다 
- indexOf(문자열) : 왼쪽부터 지정된 문자열의 위치를 반환 
- lastIndexOf(문자열) : 오른쪽부터 지정된 문자열의 위치를 
- split(분리자) : 분리자를 기준으로 문자열을 분리 
- substring(n1,n2) : n1부터 n2 이전까지의 문자열을 반환 
- substr(n1,n2) : n1 이후부터 n2 갯수 만큼의 문자열을 반환

2. Array() 객체(object)
- concat() Method
두 개의 배열을 합쳐서 하나의 새로운 배열을 만든다.
형식 : 배열객체명 = 배열객체명.concat(배열객체)
- join() Method 
배열 요소의 인수로 전달된 문자를 이용하여 문자열로 합친다.
괄호안의 문자들이 구분자의 역할을 하며, 구분자를 생략하였을 때는 생략하였을 때는 "," 로 구분된다.
형식 : 배열객체명.join(문자열) 
문자열을 생략하였을 때는 "," 로 구분된다. 
- reverse() Method
배열의 요소를 내림차순(역순)으로 정렬한다.
형식 : 배열객체명 = 배열객체명.reverse() 
- sort() Method
배열 요소를 오름차순으로 정렬한다.
비교함수를 지정해 주면 비교함수에서 지정한 대로 정열이 된다.
형식 : 배열객체명 = 배열객체명.sort() 
- slice() Method
배열 요소의 일부분을 사용하여 다른 하나의 배열을 만든다.
배열번호를 하나만 지정시 지정한 배열번호 부터 배열 끝까지 생성해준다.
형식 : 배열객체명 = 배열객체명.slice(배열번호1,배열번호2)
- push() Method
한 개 이상의 인수를 배열의 끝에 추가한 다음 배열을 돌려준다.
- shift() Method
배열의 첫 요소를 제거하고 리턴한다.
형식 : 배열객체명.shift()
- pop() Method
배열의 마지막 요소를 제거하고 리턴한다.
형식 : 배열객체명.pop()
- toString() Method
객체에서 문자열 부분만 리턴한다.
- unshift() Method
배열의 첫 부분에 요소를 추가하고, 배열의 길이를 리턴한다.
형식 : 배열객체명 = 배열객체명.unshift(배열요소1,배열요소2,배열요소n)

3. Math 객체(object)
- abs(x) : x의 절대(absolute Value)값
형식 : alert(Math.abs(5));
- acos(x) : x의 역 코사인(arccosine)값
형식 : alert(Math.acos(0.5));
- asin(x) : x의 역 사인(arcsine)값
형식 : alert(Math.asin(0.5));
- atan(x) : x의 역 탄젠트(arctangent)값
형식 : alert(Math.atan(0.5));
- atan2(x,y) : 좌표에서의 역 탄젠트(arctangent)값을 반환 
X 축과 어떤 좌표(x,y)가 이루는 각도(-pi ~ pi 사이의 radian 값)
형식 : alert(Math.atan2(4, 4));
- cos(x) : x의 코사인(cosine)값
형식 : alert(Math.cos(Math.PI/4));
- sin(x) : x의 사인(sine)값
형식 : alert(Math.sin(Math.PI/4));
- tan(x) : x의 탄젠트(arctangent)값
형식 : alert(Math.tan(Math.PI/4));
- sqrt(x) : x의 제곱근 값
형식 : alert(Math.sqrt(5));
- ceil(x) : x가 소수일 경우 무조건 반올림 또는 정수이면 x값
형식 : alert(Math.ceil(5.3));
- exp(x) : 자연 LOG E의 지수 (指數 : exponent) x 값 (Ex :E 의 x 乘 )
형식 : alert(Math.exp(5));
- floor(x) : 보다 작거나 같은 숫자 중에서 가장 큰 정수(x를 내림한 값)
형식 : alert(Math.floor(5.7));
- log(x) : x의 자연로그 값
형식 : alert(Math.log(5));
- max(n,m) : n,m중 최대값
형식 : alert(Math.max(4,5));
- min(n,m) : n,m중 최소값
형식 : alert(Math.min(4,5));
- pow(n,m) : n의 m 승
형식 : alert(Math.pow(5,5));
- random() : 0과 1사이의 난수 반환
형식 : alert(Math.random());
- round(x) : x을 반올림한 값
형식 : alert(Math.round(5.5));





//document.getElementsByClassName(); //IE8 이하 사용 불가능
if ( !document.getElementsByClassName ) {
	document.getElementsByClassName = function(cl, tag) {
		var els, matches = [],
			i = 0, len,
			regex = new RegExp('(?:\\s|^)' + cl + '(?:\\s|$)');
	     
		// If no tag name is specified,
		// we have to grab EVERY element from the DOM    
		els = document.getElementsByTagName(tag || "*");
		if ( !els[0] ) return false;
	 
		for ( len = els.length; i < len; i++ ) {
			if ( els[i].className.match(regex) ) {
				matches.push( els[i]);
			}
		}
		return matches; // an array of elements that have the desired classname
	};
}


//document.getElementsByTagName(); //Array 변환후 사용이 속도가 빠름(그러나 IE8에서는 반환값이 다르므로 별도 함수제어 필요)
var tagName = document.getElementsByTagName('span');
var array = [];
if(tagName instanceof NodeList) {
	array = Array.prototype.slice.call(tagName);
}else if(tagName instanceof HTMLCollection) {
	array = new Array(tagName.length);
	for(var i = 0, max = tagName.length; i < max; i++) {
		array[i] = tagName[i];
	}
}
alert(array[0].innerHTML);


//DOM 로드
if(document.addEventListener) {
	//DOMContentLoaded : HTML(DOM) 해석이 끝난 직후에 발생하는 이벤트
	document.addEventListener('DOMContentLoaded', function() {
		//alert(document.getElementById('test').innerHTML);
	});
}else { //IE 전용
	//IE 전용
	(function () {
		try {
			document.documentElement.doScroll('left');
		} catch(error) {
			setTimeout(arguments.callee, 0);
			return;
			callback();
		}
	}());
}
//onload : 모든 이미지 파일을 읽은 후 실행(용량이 큰 이미지가 있을 경우 필요 이상의 시간 소요)
window.onload = function() {
	//alert(document.getElementById('test').innerHTML);
};

//STYLE
classList; //document.getElementById('foo').classList.[toggle | contains | add | remove]('foo-after'); //HTML5 정의
var hasClass = function (el, cl) {
	var regex = new RegExp('(?:\\s|^)' + cl + '(?:\\s|$)');
	return !!el.className.match(regex);
},
addClass = function (el, cl) {
	el.className += ' ' + cl;
},
removeClass = function (el, cl) {
	var regex = new RegExp('(?:\\s|^)' + cl + '(?:\\s|$)');
	el.className = el.className.replace(regex, ' ');
},
toggleClass = function (el, cl) {
	hasClass(el, cl) ? removeClass(el, cl) : addClass(el, cl);
};

//이벤트 캡처링/버블링
var setStopCapture = function(event) { //표준 처리 작업의 취소
	if(event.preventDefault){
		event.preventDefault();
	}else {
		event.returnValue = false;
	}
};
var setStopBubbling = function(event) { //전파 취소
	if(event.stopPropagation){
		event.stopPropagation();
	}else {
		event.cancelBubble = true;
	}
};
*/



//참고 : http://javascriptweblog.wordpress.com/2011/08/08/fixing-the-javascript-typeof-operator/
/*
toType({a: 4}); //"object"
toType([1, 2, 3]); //"array"
(function() {console.log(toType(arguments))})(); //arguments
toType(new ReferenceError); //"error"
toType(new Date); //"date"
toType(/a-z/); //"regexp"
toType(Math); //"math"
toType(JSON); //"json"
toType(new Number(4)); //"number"
toType(new String("abc")); //"string"
toType(new Boolean(true)); //"boolean"
*/
var toType = function(obj) {
	return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
}


// 객체 선언 참고 !! 생각하지 못한 방식
// Use native String.trim function wherever possible
{
	trim: core_trim && !core_trim.call("\uFEFF\xA0") ?
		function( text ) {
			return text == null ?
				"" :
				core_trim.call( text );
		} :

		// Otherwise use our own trimming functionality
		function( text ) {
			return text == null ?
				"" :
				( text + "" ).replace( rtrim, "" );
		}
}


//html 태그 변수에 대입할 때 탭 방법 참고!!
var $item 	= $( this ),
	img		= $item.children( 'img' ).attr( 'src' ),
	struct	= '<div class="slice s1">';
		struct	+='<div class="slice s2">';
			struct	+='<div class="slice s3">';
				struct	+='<div class="slice s4">';
					struct	+='<div class="slice s5">';
					struct	+='</div>';
				struct	+='</div>';
			struct	+='</div>';
		struct	+='</div>';
	struct	+='</div>';

// ---------- ---------- ---------- ---------- ---------- ---------- ----------
//html5 data attribute
/*
<div id='strawberry-plant' data-fruit='12'></div>

<script>
// 'Getting' data-attributes using getAttribute
var plant = document.getElementById('strawberry-plant');
var fruitCount = plant.getAttribute('data-fruit'); // fruitCount = '12'

// 'Setting' data-attributes using setAttribute
plant.setAttribute('data-fruit','7'); // Pesky birds
</script>


<div id='sunflower' data-leaves='47' data-plant-height='2.4m'></div>

<script>
// Use the .dataset property

// 'Getting' data-attributes using dataset 
var plant = document.getElementById('sunflower');
var leaves = plant.dataset.leaves; // leaves = 47;

// 'Setting' data-attributes using dataset
var tallness = plant.dataset.plantHeight; // 'plant-height' -> 'plantHeight'
plant.dataset.plantHeight = '3.6m';  // Cracking fertiliser
</script>
*/
// ---------- ---------- ---------- ---------- ---------- ---------- ----------


// ---------- ---------- 크로스브라우저 관련 코드 ---------- ----------

var isTouchPad = (/hp-tablet/gi).test(navigator.appVersion),
		
//터지여부
hasTouch = 'ontouchstart' in window && !isTouchPad,
		
//이벤트 종류
RESIZE_EV = 'onorientationchange' in window ? 'orientationchange' : 'resize',
START_EV = hasTouch ? 'touchstart' : 'mousedown',
MOVE_EV = hasTouch ? 'touchmove' : 'mousemove',
END_EV = hasTouch ? 'touchend' : 'mouseup';


//필수 : 이벤트값
getEvent = function(event){
	return event || window.event;
	//var target = event.target || event.srcElement; //타겟
},
//필수 : 이벤트 전파 중지관련
/*
 * 캡쳐단계(capture phase) : 이벤트가 발생 대상까지 전달되는 단계(아래로)
 * - 설명1 : 이벤트가 다른 이벤트로 전파되기 전에 폼 전송과 같은 이벤트를 취소
 * - 설명2 : 처리를 완료하기 전에 이벤트(기본 또는 다른이벤트)를 취고하고 싶을 때
 * 대상단계(target phase) : 이벤트가 발생 대상에 도달한 단계
 * 버블링단계(bubbling phase) : 발생 대상에서 document까지 전달되는 단계(위로)
 * - 설명1 : 내부에 다른 요소를 포함한 어떤 요소(<div><div></div></div>)가 있습니다. 두요소 모두 클릭 이벤트를 캡쳐합니다. 안쪽요소에서 발생한 클릭 이벤트가 바깥쪽 요소로 전파되는 것을 막음
 * - 설명2 : 이벤트를 취소하고 싶지는 않지만 저저파하는 것을 막을 때
 */
setStopCapture = function(event){
	if(event.preventDefault){
		event.preventDefault();
	}else {
		event.returnValue = false;
	}
},
setStopBubbling = function(event){
	if(event.stopPropagation){
		event.stopPropagation();
	}else {
		event.cancelBubble = true;
	}
},
//필수 : 윈도우 사이즈
getWindowSize = function(){
	var width = 0, height = 0;
	if( typeof( window.innerWidth ) == 'number' ) {
		//Non-IE
		width = window.innerWidth;
		height = window.innerHeight;
	}else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
		//IE 6+ in 'standards compliant mode'
		width = document.documentElement.clientWidth;
		height = document.documentElement.clientHeight;
	} else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
		//IE 4 compatible
		width = document.body.clientWidth;
		height = document.body.clientHeight;
	}
	
	return {w: width, h: height};
},

//필수 : 스크롤값
getScrollSize = function() {
	var scrollX = 0, scrollY = 0;
	if( typeof( window.pageYOffset ) == 'number' ) {
		//Netscape compliant
		scrollY = window.pageYOffset;
		scrollX = window.pageXOffset;
	}else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
		//DOM compliant
		scrollY = document.body.scrollTop;
		scrollX = document.body.scrollLeft;
	} else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
		//IE6 standards compliant mode
		scrollY = document.documentElement.scrollTop;
		scrollX = document.documentElement.scrollLeft;
	}
  
	return {x: scrollX, y: scrollY};
},

//필수 : 마우스 X, Y 좌표값	
getMouseXY = function(event) {
	var 
		mouseX = event.clientX, //clientX: 브라우저 내부영역, screenX: 해당도 영역
		mouseY = event.clientY;
	//모바일 확인
	if(hasTouch){
		event = event.originalEvent.touches[0] || event.originalEvent.changedTouches[0];
	} 
	mouseX = event.clientX,
	mouseY = event.clientY;
	mouseX += $(document).scrollLeft(); //추후 크로스브라우저 문제발생시 getScrollSize() 함수호출하여 사용하자.
	mouseY += $(document).scrollTop();
	
	return {x: mouseX, y: mouseY};
},

//필수 : 요소(element) 위치 출력
getXY = function(el) {
	
	//el은 문서에 포함되어 있어야 하고, 화면에 보여야 한다.
	if(el.parentNode === null || el.style.display == 'none') {
		return false;
	}
	
	var parent = null,
		pos = [], //pos[0]에 x 좌표, pos[1]에 y 좌표 값 저장
		box;
	
	if(document.getBoxObjectFor) { //gecko 엔진 기반
		box = document.getBoxObjectFor(el); //파이어폭스 등 gecko 엔진 기반에서 x, y좌표 구하기
		pos = [box.x, box.y];
	}else { //기타 브라우저
		//offsetLeft와 offsetTop을 최상위 offsetParent 까지 반복적으로 더한다.
		pos = [el.offsetLeft, el.offsetTop];
		parent = el.offsetParent;
		if(parent != el){
			while(parent){
				pos[0] += parent.offsetLeft;
				pos[1] += parent.offsetTop;
				parent = parent.offsetParent;
			}
		}
		//오페라와 사파리의 'absolute' position의 경우
		//body의 offsetTop을 잘못 계산하므로 보정해야 한다.
		var ua = navigator.userAgent.toLowerCase();
		
		if(ua.indexOf('opera') != -1 || (ua.indexOf('safari') != -1 && getStyle(el, 'position') == 'absolute')) {
			pos[1] -= document.body.offsetTop;
		}
	}
	
	if(el.parentNode) { parent = el.parentNode; }
	else { parent = null; }
	
	//body 또는 html 이외의 부모 노드 중에 스크롤되어 있는
	//영역이 있다면 알맞게 처리한다.
	while(parent && parent.tagName != 'BODY' && parent.tagName != 'HTML') {
		pos[0] -= parent.scrollLeft;
		pos[1] -= parent.scrollTop;
		
		if(parent.parentNode) { parent = parent.parentNode; }
		else { parent = null; }
	}
	return {x: pos[0], y: pos[1]}
},
//필수 : 요소(element) 위치 설정
setXY = function(el, x, y){
	var pageXY = getXY(el);
	if(pageXY === false) {return false;}
	var position = getStyle(el, 'position'); //Javascript 사용자함수
	//position이 static인 경우, left와 top이 적용되지 않으므로,
	//position을 relative로 변경
	if(!position || position == 'static') {
		el.style.position = 'relative';
	}
	var delta = {
		x: parseInt(getStyle(el, 'left'), 10), //position이 relative인 경우 보정을 위한 값 저장
		y: parseInt(getStyle(el, 'top'), 10)
	};
	if(isNaN(delta.x)) { delta.x = 0; } //position이 static이었던 경우, left와 top값이 없으므로 x와 y의 값에 0을 할당
	if(isNaN(delta.y)) { delta.y = 0; }
	
	if(x != null) {
		el.style.left = (x - pageXY.x + delta.x) + 'px';
	}
	if(y != null) {
		el.style.top = (y - pageXY.y + delta.y) + 'px';
	}
},
//필수 : 마우스 왼쪽 클릭여부
isLeftButton= function(event) {
	return (event.which) ? event.which == 1 && event.button == 0 : (event.type == 'click') ? event.button == 0 : event.button == 1;
};
 
//스타일 값 구하기
var getStyle = function(el, property) { //property : 스타일에서 구하고자 하는 속성
	var value = null,
		dv = document.defaultView;
		
	if(property == 'opacity' && el.filters) { //IE opacity
		value = 1;
		try {
			value = el.filters.item('alpha').opacity / 100;		
		}catch(e) {}
	}else if(el.style[property]) { //style로 값을 구할 수 있는 경우
		value = el.style[property];
	}else if(el.currentStyle && el.currentStyle[property]) { //IE의 경우
		value = el.currentStyle[property];
	}else if(dv && dv.getComputedStyle) {
		//대문자를 소문자로 변환하고 그 앞에 '-'를 붙인다.
		var converted = '';
		for(var i = 0, len = property.length; i < len; ++i) {
			if(property.charAt(i) == property.charAt(i).toUpperCase()) {
				converted = converted + '-' + property.charAt(i).toLowerCase();
			}else {
				converted = converted + property.charAt(i);
			}
		}
		if(dv.getComputedStyle(el, '').getPropertyValue(converted)) {
			value = dv.getComputedStyle(el, '').getPropertyValue(converted);
		}
	}
	return value;
};

//Array 판별
//ECMAScript 5 에서는 Array.isArray()라는 새로운 메서드 정의
if(typeof Array.isArray === 'undefined') {
	Array.isArray = function(arg) {
		return Object.prototype.toString.call(arg) === '[object Array]';
	};
}