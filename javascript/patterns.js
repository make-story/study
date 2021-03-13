/*
- 주로 사용하는 기능
메모이제이션
네임스페이스 패턴
샌드박스 패턴(기본 기능만 로드하면, 추가기능은 알아서 로드하도록?)
상속패턴
중재자 패턴 (MVC 로 활용?  M[기능 모듈] - C[중재자] - V[뷰 모듈])
*/

/*
- 웹 브라우저 제조사별 벤더 프리픽스 
익스플로러: -ms-
크롬: -webkit-
파이어폭스: -moz-
사파리: -webkit-
오페라: -o-
*/

/*
- 관심사의 분리
1. 내용 : HTML 문서
2. 표현 : CSS 스타일
3. 행동 : 자바스크립트

+ CSS를 끈 상태에서 페이지를 테스트한다.
+ 자바스크립트를 끈 상태에서 페이지를 테스트한다. (페이지 동작시 필수 요건이 되어서는 안된다)
+ onclick과 같은 인라인 이벤트 핸들러 또는 인라인 style 속성은 '내용'에 속하지 않으므로 사용하지 않는다.
+ 시맨틱하고 의미에 맞는 HTML 엘리먼트를 사용한다.
*/

/*
- 스트릭트(strict)
스트릭트(strict) 모드라는 기능 : 실제로는 기능을 추가한 것이 아니라 제거함으로써 프로그램을 더 간단하게 만들고 오류 발생 가능성을 낮춘 것이다.
스트릭트 모드는 'use strict'라는 일반 문자열에 의해서 구동되며 이전 버전에서는 단순하게 무시된다. 
즉, 구형 브라우저는 스트릭트 모드를 이해하지 못하고 오류를 발생하지도 않기 때문에 하위 호환성이 유지된다.
*/
function my() {
	'use strict';
	// 함수의 나머지 부분
}

/*
- 단일 var 패턴
함수에서 필요로 하는 모든 지역 변수를 한군데서 찾을 수 있다.
변수를 선언하기 전에 사용할 때 발생하는 로직상의 오류를 막아준다. (호이스팅)
변수를 먼저 선언한 후에 사용해야 한다는 사실을 상기시키기 대문에 전역 변수를 최소화하는 데 도움이 된다.
코드량이 줄어든다. (작성량과 전송량 모두 줄어든다.)
*/
function func() {
	var a = 1,
		b = 2,
		sum = a + b,
		myobject = {},
		i, j; //초기 값 없이 선언된 변수들은 모두 undefined라는 값으로 초기화된다
	// 함수 본문 ...
}

/*
- for-in 루프
for-in 루프는 배열이 아닌 객체를 순회할 때만 사용해야 한다. for-in으로 루프를 도는 것을 열거(enumeration)라고도 한다.
자바스크립트에서 배열은 곧 객체이기 때문에 기술적으로는 배열을 순회할 때에도 for-in 루프를 쓸 수 있지만, 권장사항은 아니다.
*/
// 객체
var man = {
	hands : 2,
	legs : 2,
	heads : 1
};

// 코드 어딘가에서
// 모든 객체에 메서드 하나가 추가되었다
if (typeof Object.prototype.clone == "undefined") {
	Object.prototype.clone = function() {};
}

// 1.
// for-in 루프
for (var i in man) {
	if (man.hasOwnProperty(i)) { // 프로토타입 프로퍼티를 걸러낸다.
		console.log(i, ":", man[i]);
	}
}
/*
콘솔에 출력되는 결과
hands : 2
legs : 2
heads : 1
*/

// 2.
// 안티패턴 : 
// hasOwnProperty()를 확인하지 않는 for-in 루프
for (var i in man) {
	console.log(i, ":", man[i]);
}
/*
콘솔에 출력되는 결과
hands : 2
legs : 2
heads : 1
clone : function()      // 의도하지 않은 출력 발생
*/


/*
- 내장 생성자 프로토타입 확장하기 / 확장하지 않기
Object(), Array(), Function()과 같은 내장 생성자의 프로토타입을 확장하는 것은 꽤 매력적이다.
하지만 이 때문에 코드의 지속성은 심각하게 저해될 수 있다. 코드가 예측에서 벗어나는 일이 많아지기 때문이다.

예외가 허용되려면 다음과 같은 조건을 모두 만족시켜야 한다.
1. 해당 기능이 ECMAScript의 향후 버전이나 자바스크립트 구현에서 일관되게 내장 메서드로 구현될 예정이다.
예를 들어 ECMAScript 5에 기술되었거나 아직 브라우저에 내장되지 않은 메서드라면 추가할 수 있다. 
이 경우에는 유용한 메서드를 미리 정의하는 것이라고 할 수 있다.

2. 이 프로퍼티 또는 메서드가 이미 존재하는지, 즉 이미 코드 어딘가에 구현되어 있거나, 지원 브라우저 중 일부 자바스크립트 엔진에 내장되어 있는지 확인한다.

3. 이 변경사항을 명확히 문서화하고 팀 내에서 공유한다.
*/

/*
- API 문서 작성
@namespace
객체를 가리키는 전역 참조
@class
객체 또는 생성자 함수를 가리키는 의도된 오칭이다. 자바스크립트에는 클래스가 존재하지 않는다.
@method
객체의 메서드를 정의하고 메서드의 이름을 지정한다.
@param
함수가 받는 매개변수를 열거한다. 중괄호 안에 매개변수의 타입을 넣고 그 뒤에 매개변수의 이름과 설명을 쓴다.
@return
문법은 @param과 비슷하다. 이 태그는 메서드에 의한 반환 값을 설명하며 이름은 쓰지 않는다.
*/

/**
 * Person 객체를 생성한다
 * @class Person
 * @constructor
 * @namespace MYAPP
 * @param {String} first 이름
 * @param {String} last 성
 */
MYAPP.Person = function (first, last) {
	/**
	 * 사람의 이름
	 * @property first_name
	 * @type String
	 */
	 this.first_name = first;
	 /**
	  * 사람의 성
	  * @property last_name
	  * @type String
	  */
	  this.last_name = last;
};

/**
 * person 객체의 성명을 반환한다
 *
 * @method getName
 * @return {String} 사람의 성명
 */
MYAPP.Person.prototype.getName = function() {
	return this.first_name + ' ' + this.last_name;
};

/*
참고
자바스크립트에 빈 객체란 없다는 사실을 알아두어야 한다. 
가장 간단한 {} 객체조차도 이미 Object.prototype에서 상속받은 프로퍼티와 메서드를 가진다.
*/

/*
- new와 함께 생성자 함수를 호출하면 함수 안에서 다음과 같은 일이 일어난다.
1. 빈 객체가 생성된다. 이 객체는 this라는 변수로 참조할 수 있고, 해당 함수의 프로토타입을 상속받는다.
2. this로 참조되는 객체에 프로퍼티와 메서드가 추가된다.
3. 마지막에 다른 객체가 명시적으로 반환되지 않을 경우, this로 참조된 이 객체가 반환된다.
*/
//예시
var Person = function(name) {
	//1. 객체 리터럴로 새로운 객체를 생성한다.
	//var this = {}; // 보이지는 않지만 실제로는 this 객체가 선언됨

	//2. 프로퍼티와 메서드를 추가한다.
	this.name = name;
	this.say = function() {
		return "I am " + this.name;
	};

	//3. this를 반환한다.
	return this;
};
//say() 라는 메서드를 this에 추가했다. 결과적으로 new Person()을 호출할 때마다 메모리에 새로운 함수가 생성된다.
//say() 라는 메서드는 인스턴스별로 달라지는 게 아니므로 이런 방식은 명백히 비효율적이다.
//이 메서드는 Person의 프로토타입에 추가하는 것이 더 낫다.
Person.prototype.say = function() {
	return "I am " + this.name;
};

/*
- 새로운 객체를 생성하여 that으로 참조하고 반환하는 것
생성자에서는 어떤 객체라도(객체이기만 하다면)반환할 수 있다.
객체가 아닌 것(예를들면 문자열이나 false 값)을 반환하려고 시도하면, 에러가 발생하진 않지만 그냥 무시되고 this에 의해 참조된 객체가 대신 반환된다.
*/
var Objectmaker = function() {
	//생성자가 다른 객체를 대신 반환하기로 결정했기 때문에
	//다음의 'name' 프로퍼티는 무시된다.
	this.name = "This is it";

	//새로운 객체를 생성하여 반환하다.
	var that = {};
	that.name = "And that's that";

	return that;
};
//테스트해보자
var o = new Objectmaker();
console.log(o.name); //"And that's that" 출력

/*
- 스스로를 호출하는 생성자
*/
function Waffle() {
	if(!(this instanceof Waffle)) {
		return new Waffle();
	}

	this.tastes = "yummy";
}
Waffle.prototype.wantAnother = true;

/*
- 배열인지 판별하는 방법
배열에 typeof 연산자를 사용하면 "object"가 반환된다.
배열도 객체이니 이 말도 맞기는 하지만 그리 도움이 되지는 않는다. 값이 실제로 배열인지 알아내야 하는 경우가 자주 있다.
length나 slice() 등 배열의 일부 프로퍼티나 메서드가 존재하는지 확인해 볼 수도 있다. 하지만 배열이 아닌 객체가 똑같은 이름의 프로퍼티나 메서드를 가지지 말란 법이 없으므로 
이런 판별 방법은 견고하다고 할 수 없다.
instanceof Array를 사용하는 사람들도 있는데, 이 방법은 IE일부 버전에서는 프레임간 사용시 올바르게 동작하지 않는다.
ECMAScript 5 : Array.isArray() 라는 새로운 메서드 정의됨
또는
Object.prototype.toString() 메서드를 호출하여 판별할 수 있다.
배열에 toString을 호출하면 "[object Array]"라는 문자열을 반환하게 되어 있다.
객체일 경우에는 문자열 "[object Object]"가 반환될 것이다.
*/
if(typeof Array.isArray === "undefined") {
	Array.isArray = function(arg) {
		return Object.prototype.toString.call(arg) === "[object Array]";
	};
}

/*
- 함수 호이스팅 (호이스팅이라는 용어는 ECMAScript에 정의되지는 않았지만 흔하게 사용되며 그 특성을 설명하기에 적절하다.)
*/
//전역함수
function foo() {
	alert('global foo');
}
function bar() {
	alert('global bar');
}

function hoistMe() {
	console.log(typeof foo); //"function"
	console.log(typeof bar); //"undefined"

	foo(); //"local foo"
	bar(); //TypeError : bar is not a function

	//함수 선언문:
	//변수 'foo'와 정의된 함수 모두 호이스팅된다.
	function foo() {
		alert('local foo');
	}

	//함수 표현식:
	//변수 'bar'는 호이스팅 되지만 정의된 함수는 호이스팅되지 않는다.
	var bar = function() {
		alert('local bar');
	};
	//bar(); //bar 함수는 여기에서 호출해야 정상 작동(즉, 값이 대입된 후 실행)
}
hoistMe();

/*
- 함수 반환하기
함수는 객체이기 때문에 반환 값으로 사용될 수 있다. 즉 함수의 실행 결과로 꼭 어떤 데이터 값이나 배열을 반환할 필요는 없다는 뜻이다.
*/
//일회적인 초기화 작업을 수행한 후 반환 값을 만든다.
var setup = function() {
	alert(1);
	return function() {
		alert(2);
	}
};
//setup 함수를 사용
var my = setup(); //alert으로 1이 출력된다.
my(); //alert으로 2가 출력된다.

//매번 호출할 때마다 값을 증가시키는 카운터
var setup = function() {
	var count = 0;
	return function() {
		return (count += 1);
	};
};
var next = setup();
next(); //1을 반환한다.
next(); //2를 반환한다.
next(); //3을 반환한다.

/*
- 자기 자신을 정의하는 함수
함수는 동적으로 정의할 수 있고 변수에 할당할 수 있다. 새로운 함수를 만들어 이미 다른 함수를 가지고 있는 변수에 할당한다면,
새로운 함수가 이전 함수를 덮어쓰게 된다.
어떤 면에서는 이전의 함수 포인터가 새로운 함수를 가리키도록 재사용 하는 것이다.
이 패턴은 함수가 어떤 초기화 준비 작업을 단 한 번만 수행할 경우에 유용하다.
*/
var scareMe = function() {
	alert("Boo!");
	scareMe = function() {
		alert("Double boo!");
	};
};

//자기 자신을 정의하는 함수를 사용
scareMe(); //Boo!
scareMe(); //Double boo!

/*
이 패턴의 단점은 자기 자신을 재정의한 이후에는 이전에 원본 함수에 추가했던 프로퍼티들을 모두 찾을 수 없게 된다는 점이다.
또한 함수가 다른 이름으로 사용된다면, 예를 들어 다른 변수에 할당되거나, 객체의  메서드로써 사용되면 재정의된 부분이 아니라 원본 함수의 본문이 실행된다.

scareMe() 함수를 다음과 같이 일급 객체로 사용하는 예
1. 새로운 프로퍼티가 추가된다.
2. 함수 객체가 새로운 변수에 할당된다.
3. 함수는 메서드로써도 사용된다.
*/

// 1. 새로운 프로퍼티를 추가한다.
scareMe.property = "property";

// 2. 다른 이름으로 할당한다.
var prank = scareMe;

// 3. 메서드로 사용한다.
var spooky = {
	boo: scareMe
};

// 새로운 이름으로 호출한다.
prank(); //"Boo!"
prank(); //"Boo!"
console.log(prank.property); //"property"

// 메서드로 호출한다.
spooky.boo(); //"Boo!"
spooky.boo(); //"Boo!"
console.log(spooky.boo.property); //"property"

// 자기 자신을 재정의한 함수를 사용한다.
scareMe(); //Double boo!
scareMe(); //Double boo!
console.log(scareMe.property); //undefined

/*
- 즉시 실행함수
즉시 실행 함수 패턴은 함수가 선언되자마자 실행되도록 하는 문법이다.
즉시 실행 함수라는 용어는 ECMAScript 표준에서 정의된 용어가 아니지만, 짧고 간단하며 이 패턴을 설명하고 논의하는데 유용하다.
*/
(function() {
	alert("watch out!");
})();

(function() {
	var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
		today = new Date(),
		msg = 'Today is ' + days[today.getDay()] + ', ' + today.getDate();

	alert(msg);
})(); // "Today is Fri, 13"

/*
일반적으로 전역 객체가 즉시 실행 함수의 인자로 전달된다. 따라서 즉시 실행 함수 내에서
window를 사용하지 않고도 전역 객체에 접근할 수 있다.

일반적으로는 즉시 실행 함수에 대한 인자를 너무 많이 전달하지 않는 것이 좋다.
코드의 동작을 이해하려고 계속해서 코드의 맨 윗부분과 아랫부분 사이를 오가며 스크롤하기가 부담스럽기 때문이다.
*/
(function(global) {
	//전역 객체를 'global' 로 참조
})(window);


/*
- 즉시 실행 함수의 반환 값
즉시 실행 함수의 유효범위를 사용해 특정 데이터를 비공개 상태로 저장하고,
반환되는 내부 함수에서만 접근하도록 할 수도 있다.
*/
var getResult = (function() {
	var res = 2 + 2;
	return function() {
		return res;
	};
})();

/*
즉시 실행 함수는 객체 프로퍼티를 정의할 때에도 사용할 수 있다.
어떤 객체의 프로퍼티가 객체의 생명주기 동안에는 값이 변하지 않고, 처음에 값을 정의할 때는 
적절한 계산을 위한 작업이 필요하다고 가정해보자. 그렇다면 이 작업을 즉시 실행 함수로 감싼 후,
즉시 실행 함수의 반환 값을 프로퍼티 값으로 할당하면 된다.
*/
var o = {
	message : (function() {
		var who = "me",
			what = "call";
		return what + " " + who;
	})(),
	getMsg : function() {
		return this.message;
	}
};
// 사용방법
o.getMsg(); //"call me"
o.message; //"call me"

/*
템플릿을 활용하면 기능을 단위별로 정의할 수 있다.
이 템플릿을 따라 또 다른 모듈도 코딩할 수 있다. 그리고 실제 사이트에 코드를 올릴 때,
어떤 기능이 사용될 준비가 되었는지 결정하고 빌드 스크립트를 사용해 해당 파일들을 병합하면 된다.
*/
// module1.js 에서 정의한 module1
(function() {
	// 모든 module1 코드 ...
})();

/*
- 즉시 객체 초기화
객체가 생성된 즉시 init() 메서드를 실행해 객체를 사용한다. 

({...}).init();
({...}.init());

이 패턴은 주로 일회성 작업에 적합하다. init()이 완료되고 나면 객체에 접근할 수 없다.
init()이 완료된 이후에도 객체의 참조를 유지하고 싶다면 init()의 마지막에 return this; 를 추가하면 된다.
*/
({
	// 여기에 설정 값(설정 상수)들을 정의할 수 있다.
	maxwidth: 600,
	maxheight: 400,

	// 유틸리티 메서드 또한 정의할 수 있다.
	gimmeMax: function() {
		return this.maxwidth + "x" + this.maxheight;
	}

	// 초기화
	init: function() {
		console.log(this.gimmeMax());
		// 더 많은 초기화 작업들 ...
	}
}).init();

/*
- 초기화 시점 분기

어떤 조건이 프로그램의 생명주기 동안 변경되지 않는 게 확실한 경우, 조건을 단 한 번만 확인하는 것이 바람직하다.
브라우저 탐지(또는 기능 탐지)가 전형적인 예다.
예를 들어, XMLHttpRequest가 내장 객체로 지원되는 걸 확인했다면, 프로그램 실행 중에 브라우저가 바뀌어 난데없이 ActiveX 객체를 다루게 될 리는 없다.
실행 환경은 변하지 않기 때문에 코드가 XHR 객체를 지원하는지 매번 다시 확인할 필요가 없다.(확인한다 해도 결과는 같을 것이다.)
*/

// 변경 이전
var utils = {
	addListener: function(el, type, fn) {
		if(typeof window.addEventListener === 'function') {
			el.addEventListener(type, fn, false);
		}else if(typeof document.attachEvent === 'function') { // IE
			el.attachEvent('on' + type, fn);
		}else { // 구형의 브라우저
			el['on' + type] = fn;
		}
	},
	removeListener: function(el, type, fn) {
		// 거의 동일한 코드 ...
	}
};

/*
이 코드는 약간 비효율적이다. util.addListener()나 utils.removeListener()를 호출할 때마다 똑같은 확인 작업이 반복해서 실행된다.
*/

// 변경 이후

// 인터페이스
var utils = {
	addListener: null,
	removeListener: null
};

// 구현
if(typeof window.addEventListener === 'function') {
	utils.addListener = function(el, type, fn) {
		el.addEventListener(type, fn, false);
	};
	utils.removeListener = function(el, type, fn) {
		el.removeListener(type, fn, false);
	};
}else if(typeof document.attachEvent === 'function') { // IE
	utils.addListener = function(el, type, fn) {
		el.attachEvent('on' + type, fn);
	};
	utils.removeListener = function(el, type, fn) {
		el.detachEvent('on' + type, fn);
	};
}else { // 구형 브라우저
	utils.addListener = function(el, type, fn) {
		el['on' + type] = fn;
	};
	utils.removeListener = function(el, type, fn) {
		el['on' + type] = null;
	};
}

/*
- 함수 프로퍼티 (메모이제이션 패턴)
언제든지 함수에 사용자 정의 프로퍼티를 추가할 수 있다. 함수에 프로퍼티를 추가하여 결과(반환 값)를 캐시하면
다음 호출 시점에 복잡한 연산을 반복하지 않을 수 있다. 이런 활용 방법을 메모이제이션 패턴이라고 한다.

예를 들어, 객체 인자를 JSON 문자열로 직렬화하고 이 문자열을 cache 객체에 키로 사용할 수 있다.
*/
var myFunc = function() {

	var cachekey = JSON.stringify(Array.prototype.slice.call(arguments)),
		result;

	if(!myFunc.cache[cachekey]) {
		result = {};
		// ... 비용이 많이 드는 수행 ...
		myFunc.cache[cachekey] = result;
	}
	return myFunc.cache[cachekey];
}

// 캐시 저장공간
myFunc.cache = {};

/*
직렬화하면 객체를 식별할 수 없게 되는 것을 주의하라.
만약 같은 프로퍼티를 가지는 두 개의 다른 객체를 직렬화하면, 이 두 객체는 같은 캐시 항목을 공유하게 될 것이다.
*/

/* 
- 함수적용
순수한 함수형 프로그래밍 언어에서, 함수는 불려지거나 호출된다고 표현하기 보다 적용(apply)된다고 표현한다.
자바스크립트에서도 Function.prototype.apply()를 사용하면 함수를 적용할 수 있다.
*/

// 함수를 정의한다.
var sayHi = function(who) {
	return "Hello" + (who ? ", " + who : "") + "!";
};

// 함수를 호출한다.
sayHi(); //"Hello"
sayHi('world'); //"Hello, world!"

// 함수를 적용한다.
sayHi.apply(null, ["hello"]); //"Hello, hello!"

/*
함수가 객체의 메서드일 때는, (위 예제처럼) null을 전달하지 않는다.
*/
var alien = {
	sayHi : function(who) {
		return "Hello" + (who ? ", " + who : "") + "!";
	}
};
alien.sayHi('world'); //"Hello, world!"
sayHi.apply(alien, ["humans"]); //"Hello, humans!"

/*
- 부분적인 적용
*/
var add = function(x, y) {
	return x + y;
};

// 모든 인자를 적용한다.
add.apply(null, [5, 4]); //9
// 인자를 부분적으로만 적용한다.
var newadd = add.partialApply(null, [5]);
// 새로운 함수에 인자를 적용
newadd.apply(null, [4]); //9
//add.partialApply(null, [5]).apply(null, [4]);

/*
예제에서 보는 것처럼, 부분적인 적용을 실행한 결과는 또다른 함수이며, 이 함수는 다른 인자 값을 적용하여 호출할 수 있다.
이것은 사실 add(5)(4)와 같다. add(5)가 (4)로 호출할 수 있는 함수를 반환하기 때문이다.
partialApply() 메서드는 존재하지 않고, 자바스크립트의 함수는 기본적으로는 이렇게 동작하지 않는다.
그러나 자바스크립트는 굉장히 동적이기 때문에 이렇게 동작하도록 만들 수 있다.
함수가 부분적인 적용을 이해하고 처리할 수 있도록 만드는 과정을 커링 이라고 한다.
*/

/*
- 커링
*/

// 커링된 add()
// 부분적인 인자의 목록을 받는다.
function add(x, y) {
	var oldx = x, oldy = y;
	if(typeof oldy === "undefined") { // 부분적인 적용
		return function(newy) {
			return oldx + newy;
		}
	}
	// 전체 인자를 적용
	return x + y;
}

// 테스트
typeof add(5); //"function"
add(3)(4); //7

// 새로운 함수를 만들어 저장
var add2000 = add(2000);
add2000(10); // 2010

/*
어떤 함수라도 부분적인 매개변수를 받는 새로운 함수로 변경할 수 있을까?
*/
function schonfinkelize(fn) {
	var slice =  Array.prototype.slice,
		stored_args = slice.call(arguments, 1);
	return function() {
		var new_args = slice.call(arguments),
			args = stored_args.concat(new_args);
		return fn.apply(null, args);
	};
}

/*
schonfinkelize() 함수가 조금 복잡해지는 이유는 단지 자바스크립트에서 arguments가 실제로는 배열이 아니기 때문이다.
Array.prototype 으로부터 slice() 메서드를 빌려오면 arguments를 배열로 바꿔 사용하기 더 편리하게 만들 수 있다.
*/

// 일반 함수
function add(x, y) {
	return x + y;
}

// 함수를 커링하여 새로운 함수를 얻는다.
var newadd = schonfinkelize(add, 5);
newadd(4); // 9

// 반환되는 새로운 함수를 바로 호출할 수도 있다.
schonfinkelize(add, 6)(7); // 13

// 일반 함수
function add(a, b, c, d, e) {
	return a + b + c + d + e;
}

// 여러 개의 인자를 사용할 수도 있다.
schonfinkelize(add, 1, 2, 3)(5, 5); // 16

// 2단계의 커링
var addOne = schonfinkelize(add, 1);
addOne(10, 10, 10, 10); // 41
var addSix = schonfinkelize(addOne, 2, 3);
addSix(5, 5); // 16

/*
- 커링을 사용해야 할 경우
어떤 함수를 호출할 때 대부분의 매개변수가 항상 비슷하다면, 커링의 적합한 후보라고 할 수 있다.
매개변수 일부를 적용하여 새로운 함수를 동적으로 생성하면 이 함수는 반복되는 매개변수를 내부적으로 저장하여,
매번 인자를 전달하지 않아도 원본 함수가 기대하는 전체 목록을 미리 채워놓을 것이다.
*/

/*
- 범용 네임스페이스 함수
해당 네임스페이스가 존재하면 덮어쓰지 않기 때문에 기존 코드를 망가뜨리지 않는다.
*/
var MYAPP = MYAPP || {};

MYAPP.namespace = function(ns_string) {
	var parts = ns_string.split('.'),
		parent = MYAPP,
		i;

	// 처음에 중복되는 전역 객체명은 제거한다.
	if(parts[0] === "MYAPP") {
		parts = parts.slice(1);
	}

	for(i=0, i<parts.length; i+=1) {
		// 프로퍼티가 존재하지 않으면 생성한다.
		if(typeof parent[parts[i]] === "undefined") {
			parent[parts[i]] = {};
		}

		parent = parent[parts[i]];
	}

	return parent;
};

// 반환 값을 지역 변수에 할당한다.
var module2 = MYAPP.namespace('MYAPP.modules.module2');
module2 === MYAPP.modules.module2; // true

// 첫부분의 'MYAPP' 을 생략하고 쓸 수 있다.
MYAPP.namespace('modules.module51');

/*
- 의존 관계 선언
자바스크립트 라이브러리들은 대개 네임스페이스를 지정하여 모듈화 되어 있기 때문에, 
필요한 모듈만 골라서 쓸 수 있다.
*/
var myFunction = function() {
	// 의존 관계에 있는 모듈들
	var event = YAHOO.util.Event,
		dom = YAHOO.util.Dom;

	// 이제 event 와 dom  이라는 변수를 사용한다...
};

/*
- 객체 리터럴과 비공개 멤버
*/
var myobj; // 이 변수에 객체를 할당할 것이다.
(function() {
	// 비공개 멤버
	var name = "my, oh my";

	// 공개될 부분을 구현한다.
	// var를 사용하지 않았다는 데 주의하라.
	myobj = {
		// 특권 메서드
		getName : function() {
			return name;
		}
	};
})();

myobj.getName(); //"my, oh my"

// 다음 예제는 기본 개념은 동일하지만 약간 다르게 구현
var obj = (function() {
	// 비공개 멤버
	var name = "my, oh my";

	// 공개될 부분을 구현한다.
	return {
		getName : function() {
			return name;
		}
	};
})();
myobj.getName(); //"my, oh my"

/*
- 프로토타입과 비공개 멤버
생성자를 사용하여 비공개 멤버를 만들 경우, 생성자를 호출하여 새로운 객체를 만들 때마다 비공개 멤버가 재생성된다는 단점이 있다.
사실 생성자 내부에서 this에 멤버를 추가하면 항상 이런 문제가 발생한다.
이러한 중복을 없애고 메모리를 절약하려면 공통 프로퍼티와 메서드를 생성자의 prototype 프로퍼티에 추가해야 한다.
이렇게 하면 동일한 생성자로 생성한 모든 인스턴스가 공통된 부분을 공유하게 된다. 감취진 비공개 멤버들도 모든 인스턴스가 함께 쓸 수 있다.
이를 위해서는 두 가지 패턴, 즉 생성자 함수 내부에 비공개 멤버를 만드는 패턴과 객체 리터럴로 비공개 멤버를 만드는 패턴을 함께 써야 한다.
*/

function Gadget() {
	// 비공개 멤버
	var name = 'iPod';
	// 공개 함수
	this.getName = function() {
		return name;
	};
}

Gadget.prototype = (function() {
	// 비공개 멤버
	var browser = "Mobile Webkit";

	// 공개된 프로토타입 멤버
	return {
		getBrowser : function() {
			return browser;
		}
	};
})();

var toy = new Gadget();
console.log(toy.getName()); // 객체 인스턴스의 특권 메서드
console.log(toy.getBrowser()); // 프로토타입의 특권 메서드

/*
- 모듈 패턴
*/
MYAPP.namespace('MYAPP.utilities.array');

MYAPP.utilities.array = (function() {
	// 의존 관계
	var uobj = MYAPP.utilities.object,
		ulang = MYAPP.utilities.lang,

		/// 비공개 프로퍼티
		array_string = "[object Array]",
		ops = Object.prototype.toString;

	// 비공개 메서드들
	// ...

	// var 선언을 마친다.

	// 필요하면 일회성 초기화 절차를 실행한다.
	// ...

	// 공개 API
	return {
		inArray: function(needle, haystack) {
			for(var i=0, max=haystack.length; i<max; i+=1) {
				if(haystack[i] === needle) {
					return true;
				}
			}
		},

		isArray: function(a) {
			return ops.call(a) === array_string;
		}
		// ... 더 필요한 메서드와 프로퍼티를 여기 추가한다.
	}
})();

/*
- 생성자를 생성하는 모듈
*/
MYAPP.namespace('MYAPP.utilities.Array');

MYAPP.utilities.Array = (function() {
	// 의존 관계 선언
	var uobj = MYAPP.utilities.object,
		ulang = MYAPP.utilities.lang,

		// 비공개 프로퍼티와 메서드를 선언한 후 ...
		Constr;

		// var 선언을 마친다.

	// 필요하면 일회성 초기화 절차를 실행한다.
	// ...

	// 공개 API - 생성자 함수
	Constr = function(o) {
		this.elements = this.toArray(o);
	};
	// 공개 API - 프로토타입
	Constr.prototype = {
		constructor: MYAPP.utilities.Array,
		version: "2.0",
		toArray: function(obj) {
			for(var i=0, a=[], len=obj.length; i<len; i+=1) {
				a[i] = obj[i];
			}
			return a;
		}
	};

	// 생성자 함수를 반환한다.
	// 이 함수가 새로운 네임스페이스에 할당될 것이다.
	return Constr;
})();

//이 생성자 함수는 다음과 같이 사용한다.
var arr = new MYAPP.utilities.Array(obj);

/*
- 모듈에 전역 변수 가져오기
보통 전역 변수에 대한 참조 또는 전역 객체 자체를 전달한다. 이렇게 전역 변수를 전달하면 즉시 실행 함수 내에서
지역 변수로 사용할 수 있게 되기 때문에 탐색 작업이 좀 더 빨라진다.
*/
MYAPP.utilities.module = (function(app, global) {
	// 전역 객체에 대한 참조와
	// 전역 애플리케이션 네임스페이스 객체에 대한 참조가 지역 변수화 된다.
})(MYAPP, this);

/*
- 샌드박스 패턴
샌드박스 패턴은 네임스페이스 패턴의 다음과 같은 단점을 해결한다.
1. 애플리케이션 전역 객체가 단 하나의 전역 변수에 의존한다. 따라서 네임스페이스 패턴으로는 동일한 애플리케이션이나 
라이브러리의 두 가지 버전을 한 페이지에서 실행시키는 것이 불가능하다. 여러 버전들이 모두 이를테면 MYAPP이라는 
동일한 전역 변수명을 쓰기 때문이다.
2. MYAPP.utilities.array와 같이 점으로 연결된 긴 이름을 써야 하고 런타임에는 탐색 작업을 거쳐야 한다.
*/

// 샌드박스 사용법은 다음과 같다
new Sandbox(function(box) {
	// 여기에 코드가 들어간다...
});
/*
box 객체는 네임스페이스 패턴에서의 MYAPP과 같은 것이다. 코드가 동작하는데 필요한 모든 라이브러리 기능들이 여기에 들어간다. 
*/

Sandbox(['ajax', 'event'], function(box) {
	// console.log(box);
});
Sandbox('ajax', 'dom', function(box) {
	// console.log(box);
});
Sandbox('*', function(box) {
	// console.log(box);
});
Sandbox(function(box) {
	// console.log(box);
});

/*
샌드박스 객체의 인스턴스를 여러 개 만드는 예제를 살펴보자.
심지어 한 인스턴스 내부에 다른 인스턴스를 중첩시킬 수도 있다.
이 때도 두 인스턴스 간의 간접 현상은 일어나지 않는다.
*/

Sandbox('dom', 'event', function(box) {
	// dom과 event를 가지고 작업하는 코드
	Sandbox('ajax', function(box) {
		// 샌드박스된 box 객체를 또 하나 만든다.

		// 이 "box" 객체는 바깥쪽 함수의 "box"객체와는 다르다.

		// ...

		// ajax를 사용하는 작업 완료
	});

	// 더 이상 ajax 모듈의 흔적은 찾아볼 수 없다.

});

/*
- 모듈 추가하기
*/
Sandbox.module = {};

Sandbox.module.dom = function(box) {
	box.getElement = function() {};
	box.getStyle = function() {};
	box.foo = "bar";
};

Sandbox.module.event = function(box) {
	// 필요에 따라 다음과 같이 Sandbox 프로토타입에 접근할 수 있다.
	// box.constructor.prototype.m = "mmm";
	box.attachEvent = function() {};
	box.detachEvent = function() {};
};

Sandbox.module.ajax = function(box) {
	box.makeRequest = function() {};
	box.getResponse = function() {};
};

/*
- 생성자 구현
*/
function Sandbox() {
	// arguments를 배열로 바꾼다.
	var args = Array.prototype.slice.call(arguments),
		// 마지막 인자는 콜백 함수다.
		callback = args.pop(),
		// 모듈은 배열로 전달될 수도 있고 개별 인자로 전달될 수도 있다.
		modules = (args[0] && typeof args[0] === "string") ? args : args[0],
		i;

	// 함수가 생성자로 호출되도록 보장한다.
	if(!(this instanceof Sandbox)) {
		return new Sandbox(modules, callback);
	}

	// this에 필요한 프로퍼티들을 추가한다.
	this.a = 1;
	this.b = 2;

	// 코어 'this' 객체에 모듈을 추가한다.
	// 모듈이 없거나 '*' 이면 사용 가능한 모든 모듈을 사용한다는 의미다.
	if(!modules || modules === '*' || modules[0] === '*') {
		modules = [];
		for(i in Sandbox.modules) {
			if(Sandbox.modules.hasOwnProperty(i)) {
				modules.push(i);
			}
		}
	}

	// 필요한 모듈들을 초기화한다.
	for(i = 0; i < modules.length; i += 1) {
		Sandbox.modules[modules[i]](this);
	}

	// 콜백 함수를 호출한다.
	callback(this);
}

// 필요한 프로토타입 프로퍼티들을 추가한다.
Sandbox.property = {
	name: "My Application",
	version: "1.0",
	getName: function() {
		return this.name;
	}
};

/*
이 구현에서 핵심적인 사항들은 다음과 같다.
1. this가 Sandbox의 인스턴스인지 확인하고, 그렇지 않으면 (즉 Sandbox()가 new 없이 호출되었다면) 함수를 생성자로 호출한다.

2. 생성자 내부에서 this에 프로퍼티를 추가한다. 생성자의 프로토타입에도 프로퍼티를 추가할 수 있다.

3. 필요한 모듈은 배열로도, 개별적인 인자로도 전달할 수 있고, * 와일드카드를 사용하거나, 쓸 수 있는 모듈을 모두 쓰겠다는 의미로 생략할 수도 있다.
이 예제에서는 필요한 기능을 다른 파일로부터 로딩하는 것까지는 구현하지 않았지만, 이러한 선택지도 확실히 고려해보아야 한다.
예를 들어 YUI3에서는 이 기능이 지원된다. 먼저 '시드(seed)' 라고도 불리는 가장 기본적인 모듈만을 로드해 놓으면,
나머지 필요한 모듈에 대응하는 외부 파일들은 알아서 로드된다.
모듈에 대응하는 파일명을 찾는데는 명명 규칙을 사용한다.

4. 필요한 모듈을 모두 파악한 다음에는 각 모듈을 초기화한다. 다시 말해 각 모듈을 구현한 함수를 호출한다.

5. 생성자의 마지막 인자는 콜백 함수다. 이 콜백 함수는 맨 마지막에 호출되며, 새로 생성된 인스턴스가 인자로 전달된다.
이 콜백 함수가 실제 사용자의 샌드박스이며 필요한 기능을 모두 갖춘 상태에서 box 객체를 전달받게 된다.
*/

/*
- 공개 스태틱 멤버
클래스의 인스턴스를 생성하지 안고도 사용가능
*/
// 생성자
var Gadget = function() {};

// 스태틱 메서드
Gadget.isShiny = function() {
	return "you bet";
};

// 프로토타입에 일반적인 함수를 추가했다.
Gadget.prototype.setPrice = function(price) {
	this.price = price;
};

// 스태틱 메서드를 호출하는 방법
Gadget.isShiny(); //"you bet"

// 인스턴스를 생성한 후 메서드를 호출한다.
var iphone = new Gadget();
iphone.setPrice(500);

/*
스태틱한 방법으로도, 스태틱하지 않은 방법으로도 호출될 수 있는 어떤 메서드를 호출 방식에 따라 살짝 다르게 동작하는 예제
instanceof 연산자 사용
*/

// 생성자
var Gadget = function(price) {
	this.price = price;
};

// 스태틱 메서드
Gadget.isShiny = function() {
	// 다음은 항상 동작한다.
	var msg = "you bet";

	if(this instanceof Gadget) {
		// 다음은 스태틱하지 않은 방식으로 호출되었을 때만 동작한다.
		msg += ", it costs $" + this.price + '!';
	}

	return msg;
};

// 프로토타입에 일반적인 메서드를 추가한다.
Gadget.prototype.isShiny = function() {
	return Gadget.isShiny.call(this);
};

// 스태틱 메서드 호출 테스트
Gadget.isShiny(); //"tou bet"

// 인스턴스를 통한 테스트
var a = new Gadget('499.99');
a.isShiny(); //"you bet, it costs $499.99!"

/*
- method() 메서드
*/
var Person = function(name) {
	this.name = name;
}.
	method('getName', function() {
		return this.name;
	}).
	method('setName', function(name) {
		this.name = name;
		return this;
	});

// ---------- ---------- ---------- ---------- 상속패턴

/*
- 클래스 방식의 상속을 사용할 경우 예상되는 산출물
*/
// 부모 생성자
function Parent(name) {
	this.name = name || 'Adam';
}

// 생성자의 프로토타입에 기능을 추가한다.
Parent.prototype.asy = function() {
	return this.name;
};

// 아무 내용이 없는 자식 생성자
function Child(name) {}

// 여기서 상속의 마법이 일어난다.
inherit(Child, Parent); //inherit() 는 사용자 함수

/*
- 클래스 방식의 상속 패턴 #1 - 기본 패턴
*/
function inherit(C, P) {
	C.prototype = new P();
}
/*
패턴 #1 의 단점
1. 부모 객체의 this에 추가된 객체 자신의 프로퍼티와 프로토타입 프로퍼티를 모두 물려받게 된다는 점이다.
대부분의 경우 객체 자신의 프로퍼티는 특정 인스턴스에 한정되어 재사용할 수 없기 때문에 필요가 없다.
2. 범용 inherit() 함수는 인자를 처리하지 못하는 문제도 가지고 있다.
*/


/*
- 클래스 방식의 상속 패턴 #2 - 생성자 빌려쓰기
자식에서 부모로 인자를 전달하지 못했던 패턴 #1의 문제를 해결한다.
*/

// 부모 생성자
function Article() {
	this.tags = ['js', 'css'];
}
var article = new Article();

// 클래스 방식의 패턴 #1을 사용해 article 객체를 상속하는 blog 객체를 생성한다.
function BlogPost() {}
BlogPost.prototype = article;
var blog = new BlogPost();
// 여기서는 이미 인스턴스가 존재하기 때문에 'new Article()'을 쓰지 않았다.

// 생성자 빌려쓰기 패턴을 사용해 article을 상속하는 page 객체를 생성한다.
function StaticPage() {
	Article.call(this);
}
var page = new StaticPage();

alert(article.hasOwnProperty('tags')); // true
alert(blog.hasOwnProperty('tags')); // false
alert(page.hasOwnProperty('tags')); // true

/*
상속된 tags 프로퍼티를 수정할 때의 차이점
blog 객체가 tags 프로퍼티를 수정하면 동시에 부모의 멤버도 수정된다.
본질적으로 blog.tags와 article.tags 는 동일한 배열을 가리키고 있기 때문이다.
그러나 page.tags 에 적용된 변경 사항은 부모인 article에 영향을 미치지 않는다.
page.tags는 상속 과정에서 별개로 생성된 복사본이기 때문이다.
*/
blog.tags.push('html');
page.tags.push('php');
alert(article.tags.join(', ')); // "js, css, html"

/*
패턴 #2 의 단점
프로토타입이 전혀 상속되지 않는다는 점은 분명히 이 패턴의 한계라 할 수 있다.
*/

/*
- 클래스 방식의 상속 패턴 #3 - 생성자 빌려쓰고 프로토타입 지정해주기
*/
// 부모 생성자
function Parent(name) {
	this.name = name || 'Adam';
}

// 프로토타입에 기능을 추가한다
Parent.prototype.say = function() {
	return this.name;
};

// 자식생성자
function Child(name) {
	Parent.apply(this, arguments);
}
Child.prototype = new Parent();

var kid = new Child("Patrick");
kid.name; // "Patrick"
kid.say(); // "Patrick"
delete kid.name;
kid.say(); // "Adam"

/*
- 클래스 방식의 상속 패턴 #4 - 프로토타입 공유
원칙적으로 재사용할 멤버는 this가 아니라 프로토타입에 추가되어야 한다.
따라서 상속되어야 하는 모든 것들도 프로토타입 안에 존재해야 한다.
그렇다면 부모의 프로토타입을 똑같이 자식의 프로토타입으로 지정하기만 하면 될 것이다.
*/
function inherit(C, P) {
	C.prototype = P.prototype;
}
/*
패턴 #4 의 단점
상속 체인의 하단 어딘가에 있는 자식이나 손자가 프로토타입을 수정할 경우, 모든 부모와 손자뻘의 객체에 영향을 미친다.
*/

/*
- 클래스 방식의 상속 패턴 #5 - 임시 생성자
프로토타입 체인의 이점은 유지하면서, 동일한 프로토타입을 공유할 때의 문제를 해결하기 위해
부모와 자식의 프로토타입 사이에 직접적인 링크를 끊는다.
빈 함수 F()가 부모와 자식 사이에서 프록시(proxy) 기능을 맡는다.
F()의 prototype 프로퍼티는 부모의 프로토타입을 가리킨다. 이 빈 함수의 인스턴스가 자식의 프로토타입이 된다.

부모 생성자에서 this에 추가된 멤버는 상속되지 않는다. (재사용한다는 prototype 의미를 정확히 사용)
*/
function inherit(C, P) {
	var F = function() {};
	F.prototype = P.prototype;
	C.prototype = new F();
}

/*
상위 클래스 저장
부모 원본에 대한 참조를 추가할 수도 있다.
다른 언어에서 상위 클래스에 대한 접근 경로를 가지는 것과 같은 기능으로,
경우에 따라 매우 편리하게 쓸 수 있다.
*/
function inherit(C, P) {
	var F = function() {};
	F.prototype = P.prototype;
	C.prototype = new F();
	C.uder = P.prototype; // 상위 클래스 접근경로
}

/*
생성자 포인터 재설정
나중을 위해 생성자 함수를 가리키는 포인터를 재설정하는 것이다.
생성자 포인터를 재설정하지 않으면 모든 자식 객체들의 생성자는 Parent()로 지정돼 있을 것이고,
이런 상황은 유용성이 떨어진다.
*/
function Parent() {}
function Child() {}
inherit(Child, Parent);

// 생성자를 확인해 본다.
var kid = new Child();
kid.constructor.name; // "Parent"
kid.constructor === Parent; // true

/*
constructor 프로퍼티는 자주 사용되진 않지만 런타임 객체 판별에 유용하다.
거의 정보성으로만 사용되는 프로퍼티이기 때문에, 원하는 생성자 함수를 가리키도록 재설정해도 기능에는
영향을 미치지 않는다.
*/

// 최종버전
function inherit(C, P) {
	var F = function() {};
	F.prototype = P.prototype;
	C.prototype = new F();
	C.uber = P.prototype; // 상위 클래스 접근경로
	C.prototype.constructor = C; // 생성자 재설정 (런타임시 객체 판별)
}

/*
- Klass (클래스 모방)
*/
var klass = function(Parent, props) {
	var Child, F, i;

	// 1.
	// 새로운 생성자
	Child = function() {
		if(Child.uder && Child.uder.hasOwnProperty("__construct")) {
			Child.uder.__construct.apply(this, arguments);
		}
		if(Child.prototype.hasOwnProperty("__construct")) {
			Child.prototype.__construct.apply(this, arguments);
		}
	};

	// 2.
	// 상속
	Parent = Parent || Object;
	F = function() {}; // 임시 생성자는 this가 없으므로, prototype 만 상속
	F.prototype = Parent.prototype;
	Child.prototype = new F();
	Child.uder = Parent.prototype; // 상속 받은 부모 클래스로 접근할 수 있는 경로
	Child.prototype.constructor = Child; // 생성자 정보를 임시 함수가 아닌 자식 본인으로 재설정 (런타임 객체 판별에 사용, 정보 제공용도)

	// 3.
	// 구현 메서드를 추가한다.
	for(i in props) {
		if(props.hasOwnProperty(i)) {
			Child.prototype[i] = props[i];
		}
	}

	// '클래스'를 반환한다.
	return Child;
};

/*
klass() 구현은 세 개의 흥미로운 부분으로 나뉜다.
1. Child() 생성자 함수가 생성된다. 마지막에 이 함수가 반환되어 클래스로 사용될 것이다.
__construct 메서드가 있다면 이 함수 안에서 호출된다. 
그 전에 부모의 __construct가 있다면 uder 스태틱 프로퍼티를 사용하여 호출한다.
Man 클래스처럼 별도의 부모 클래스 없이 Object를 상속했다면 uder 라는 프로퍼티는 정의되어 있자 않을 수 있다.
2. 두 번째 상속을 처리한다.
상속받을 클래스에 Parent가 존재하지 않을 경우 Object가 지정되도록 한 것이다.
3. 마지막 부분에서는 루프를 돌면서 클래스를 실제로 정의하는 구현 메서드들(__construct, getName 등)을 
Child의 프로토타입에 추가한다.

사실 이런 패턴은 피하는 것이 좋다. 기술적으로는 언어에 존재하지 않는 혼란스러운 개념들을 온통 끌고 들어오기 때문이다. (연구용)
*/

// klass 사용 예
var Man = klass(null, {
	__construct: function(what) {
		console.log("Man's constructor");
		this.name = what;
	},
	getName: function() {
		return this.name;
	}
});

var first = new Man('Adam'); // "Man's constructor" 가 출력된다.
first.getName(); // "Adam"

var SuperMan = klass(Man, {
	__construct: function(what) {
		console.log("SuperMan's constructor");
	},
	getName: function() {
		var name = SuperMan.uder.getName.call(this);
		return "I am " + name;
	}
});

var clark = new SuperMan("Clark Kent");
clark.getName(); // "I am Clark Kent"
/*
"Man's constructor" 가 출력된 다음 "SuperMan's constructor" 가 출력된다.
*/

clark.instanceof Man; // true
clark.instanceof SuperMan; // true

/*
- 프로토타입을 활용한 상속
*/
function object(o) {
	function F() {}
	F.prototype = o;
	return new F();
}

// 예제 1
// 부모 생성자
function Person() {
	// 부모 생성자 자신의 프로퍼티
	this.name = "Adam";
}
// 프로토타입에 추가된 프로퍼티
Person.prototype.getName = function() {
	return this.name;
};
// Person 인스턴스를 생성한다.
var papa = new Person();
// 이 인스턴스를 상속한다.
var kid = object(papa);
// 부모 자기 자신의 프로퍼티와 프로토타입의 프로퍼티가 모두 상속되었는지 확인해보자.
kid.getName(); // "Adam"

// 예제 2
// 부모 생성자
function Person() {
	// 부모 생성자 자신의 프로퍼티
	this.name = "Adam";
}
// 프로토타입에 추가된 프로퍼티
Person.prototype.getName = function() {
	return this.name;
};
// 상속
var kid = object(Person.prototype);

typeof kid.getName; // 이 메서드는 프로토타입 안에 존재하기 때문에 "function"이 출력된다.
typeof kid.name; // 프로토타입만 상속되었기 때문에 "undefined"가 출력된다.

/*
- 프로퍼티 복사를 통한 상속 패턴
객체가 다른 객체의 기능을 단순히 복사를 통해 가져온다.
*/

// 얕은 복사 (shallow copy)
function extend(parent, child) {
	var i;
	child = child || {};
	for(i in parent) {
		if(parent.hasOwnProperty(i)) {
			child[i] = parent[i];
		}
	}

	return child;
}
/*
자바스크립트에서 객체는 참조만 전달되기 때문에 얕은 복사를 통해 상속을 실행한 경우,
자식 쪽에서 객체 타입인 프로퍼티 값을 수정하면 부모의 프로퍼티도 수정되어 버린다.
*/
var dad = {
	counts: [1, 2, 3],
	reads: {paper: true}
};
var kid = extend(dad);
kid.counts.push(4); // dad 객체까지 영향을 미침
dad.counts.toString(); // "1, 2, 3, 4"
dad.reads === kid.reads;

/*
깊은 복사
복사하려는 프로퍼티가 객체나 배열인지 확인해보고, 객체 또는 배열이면 
중첩된 프로퍼티까지 재귀적으로 순회하여 복사하는 것을 말한다.
*/
function extendDeep(parent, child) {
	var i,
		toStr = Object.prototype.toString,
		astr = "[object Array]";

	child = child || {};

	for(i in parent) {
		if(parent.hasOwnProperty(i)) { // 오염된 프로퍼티인지 확인
			if(typeof parent[i] === "object") { // 값이 객체인지 확인 (내부 순회)
				child[i] = (toStr.call(parent[i]) === astr) ? [] : {};
				extendDeep(parent[i], child[i]);
			}else {
				child[i] = parent[i];
			}
		}
	}

	return child;
}

//깊은 복사 사용 예
var dad = {
	counts: [1, 2, 3],
	reads: {paper: true}
};
var kid = extendDeep(dad);
kid.counts.push(4);
kid.counts.toString(); // "1, 2, 3, 4"
dad.counts.toString(); // "1, 2, 3"

dad.reads === kid.reads; // fasle (바라보는 객체 주소가 서로 다르다.)
kid.reads.paper = false; // 값 변경
kid.reads.web = true;
dad.reads.paper; // true

/*
- 믹스인
하나의 객체를 복사하는 게 아니라 여러 객체에서 복사해온 것을 한 객체 안에 섞어 넣을 수도 있을 것이다.
*/
function mix() {
	var arg, prop, child = {};
	for(arg = 0; arg < arguments.length; arg += 1) {
		for(prop in arguments[arg]) {
			if(arguments[arg].hasOwnProperty(prop)) {
				child[prop] = arguments[arg][prop];
			}
		}
	}

	return child;
}

// 사용 예
var cake = mix(
	{eggs: 2, large: true},
	{butter: 1, salted: true},
	{flour: "3 cups"},
	{sugar: "sure!"}
);

/*
- 싱글톤
자바스크립트는 싱클톤을 만들기 위한 별도의 문법이 존재하지 않는다고 할 수 있다.
클래스 기반 언어, 즉 함수가 일급 객체가 아닌 정적이고 엄격한 자료형 언어에서 설계상의 문제를 
우회하기 위해 고안해 낸 이론적인 해결책을 모방해보는 것에 불과하다.
*/
function Universe() {
	// 캐싱된 인스턴스
	var instance;

	// 생성자를 재작성한다.
	Universe = function Universe() {
		return instance;
	};

	// prototype 프로퍼티를 변경한다.
	Universe.prototype = this;

	// instance
	instance = new Universe();

	// 생성자 포인터를 재지정한다.
	instance.constructor = Universe;

	// 정상적으로 진행한다.
	instance.start_time = 0;
	instance.bang = "Big";

	return instance;
}

/*
- 반복자(Iterator)
객체는 일종의 집합적인 데이터를 가진다. 데이터가 저장된 내부 구조는 복잡하더라도 개별 요소에 쉽게 접근할 방법이 필요한 것이다.
객체의 사용자는 데이터가 어떻게 구조화되었는지 알 필요가 없고 개별 요소로 원하는 작업을 할 수만 있으면 된다.
*/
var agg = (function() {
	var index = 0,
		data = [1, 2, 3, 4, 5],
		length = data.length;

	return {
		next: function() {
			var element;
			if(!this.hasNext()) {
				return null;
			}
			element = data[index];
			index = index + 2;
			return element;
		},

		hasNext: function() {
			return index < length;
		},
		rewind: function() { // 포인터를 다시 처음으로 되돌린다.
			index = 0;
		},
		current: function() { //현재의 요소를 반환한다.
			return data[index];
		}

	};
})();

// 사용예
var element;
while(element = add.next()) {
	// element로 어떤 작업을 수행한다.
	console.log(element);
}
while(add.hasNext()) {
	// 다음 요소로 어떤 작업을 수행한다.
	console.log(add.next()); // 1, 3, 5 를 출력한다.
}

/*
- 퍼사드(Facade)
객체의 대체 인터페이스를 제공한다.
메서드를 짧게 유지하고 하나의 메서드가 너무 많은 작업을 처리하지 않게 하는 방법은 설계상 좋은 습관이다.
하지만 이렇게 하다보면 메서드 숫자가 엄청나게 많아지거나 uber 메서드에 엄청나게 많은 매게변수를 전달하게 될 수 있다.

두 개 이상의 메서드가 함께 호출되는 경우가 많다면, 이런 메서드 호출들을 하나로 묶어주는 새로운 메서드를 만드는게 좋다.
*/
// stopPropagation(), preventDefault() 
// 위 두 메서드는 서로 다른 목적을 가지고 있기 때문에 별도로 유지되어야 하지만, 한꺼번에 호출되는 일이 많은 것도 사실이다.
// 사용 예
var myevent = {
	// ...
	stop: function(e) {
		e.preventDefault();
		e.stopPropagation();
	}
};

/*
- 프록시(Proxy)
하나의 객체가 다른 객체에 대한 인터페이스로 동작한다.
이 패턴은 비용이 증가하는 것처럼 보일 수 있지만 실제로는 성능 개선에 도움을 준다.
프록시는 실제 대상 객체를 보호하여 되도록 일을 적게 시키기 때문이다.

프록시 패턴의 한 예로, 게으른 초기화(lazy initialization)를 들 수 있다.
객체를 초기화하는 데 많은 비용이 들지만, 실제로 초기화한 후에는 한 번도 사용하지 않는다고 해보자. 이런 경우에 실제 대상 객체에 대한
인터페이스로 프록시를 사용하면 도움이 된다.
프록시는 초기화 요청을 대신 받지만, 실제 대상 객체가 정말로 사용되기 전까지는 이 요청을 전달하지 않는다.

동작이 필요한 시점이 되면 프록시가 초기화의 동작 요청을 한꺼번에 전달한다.
*/

/*
- 중재자(Mediator)
크기에 상관없이 애플리케이션은 독립된 객체들로 만들어진다.
객체간의 통신은 유지보수가 쉽고 다른 객체를 건드리지 않으면서, 애플리케이션의 일부분을 안전하게 
수정할 수 있는 방식으로 이루어져야 한다.

객체들이 강하게 결합되면, 다른 객체들에 영향을 주지 않고 하나의 객체를 수정하기가 어렵다.
매우 간단한 변경도 어려워지고, 수정에 필요한 시간을 예측하는 것이 사실상 불가능해진다.
중재자 패턴은 결합도를 낮추고 유지보수를 쉽게 개선하여 이런 문제를 완화시킨다.

독립된 동료 객체들은 직접 통신하지 않고, 중재자 객체를 거친다. 동료 객체들은 자신의 상태가 변경되면 중재자에게 알리고,
중재자는 이 변경사항을 알아야 하는 다른 동료 객체들에게 알린다.
*/