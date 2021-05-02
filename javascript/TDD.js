/*
테스트

-
테스트 수준에 따른 분류
개발 프로세스 중 하나인 폭포수 모델은 분석->디자인->구현->테스트->유지보수 단계를 순차적으로 진행한다.
순차적 절차의 특성상 이미 구현이 완료된 상태에서 테스트를 진행하기 때문에 문제가 발견되면 해결하는 데 많은 비용이 든다.

V모델은 폭포수 모델의 확장된 형태로, 개발 완료 후가 아니라 프로젝트 중간에 테스트를 한다. 따라서 문제 발생 시 폭포수 모델에 비해 빠르게 대응할 수 있기 때문에 프로젝트에 소요되는 비용과 시간이 줄어든다.

V모델에서는 테스트의 수준에 따라 다음과 같이 구분한다.
> 단위 테스트(Unit Test)
단위 테스트는 테스트 가능한 소프트웨어의 최소 단위가 정상적으로 동작하는지 확인하기 위한 테스트이다. '작은 단위'란 모듈이나 컴포넌트가 될 수도 있지만, 일반적으로 함수를 말한다. 해당 테스트는 프로그래머가 작성하며, 자신의 코드가 정상적으로 동작하는지 확인하는 것을 목적으로 한다.

> 통합 테스트(Integration Test)
통합 테스트는 단위 테스트로 검증한 단위 모듈들을 통합한 후에, 모듈이 정상적으로 동작하는지 확인하기 위한 테스트이다. 일반적으로 통합 테스트 역시 프로그래머가 작성한다. 단위 테스트가 정상적으로 동작하더라도 통합한 후에 제대로 동작하지 않는 경우가 많아서 통합테스트가 필요하다.

> 시스템 테스트(System Test)
시스템 테스트는 정의했던 요구사항뿐 아니라 전체 시스템이 정상적으로 구축되었는지 확인하기 위한 테스트이다. 단위 테스트나 통합 테스트와 달리 코드에 대한 설계나 구현 내용을 자세히 이해할 필요는 없으며, 별도의 팀이나 담당자가 진행한다.

> 인수 테스트(Acceptance Test)
인수 테스트는 고객이 명시한 요구사항대로 개발했는지, 고객(사용자) 스스로 확인하는 테스트이다. 시스템 테스트와 마찬가지로 코드를 이해할 필요는 없고, 일반적으로 고객보다는 별도의 팀이나 담당자가 진행한다.

-
테스트 목적에 따른 분류
크게 '긍정(positive) 테스트'와 '부정(negative) 테스트'가 있다.

긍정테스트는 해당 기능이 명세서대로 동작하는지 확인하는 테스트로, 오류를 발견하기보다는 기본적인 기능 구현을 확인하는 목적으로 진행한다.

부정테스트는 소프트웨어를 비정상적인 방법으로 동작시켰을 때 어떻게 반응하는지에 대한 테스트다. 예를 들어 숫자만 입력 받을 수 있는 입력 박스에 문자나 특수 문자를 넣었을 때 어떤 결과가 나오는지를 테스트한다.

세부적으로 살펴보면 보다 다양한 테스트 방법들이 존재하는데, 그중 많이 사용되는 테스트는 다음과 같다.
> 새너티 테스트(Sanity Test)
소프트웨어가 정상적으로 동작하는지 간단하고 빠르게 테스트하는 방법으로, 자세한 테스트를 하기 위한 기준으로 사용한다.

> 희귀 테스트(Regression Test)
소프트웨어에 새로운 기능 추가처럼 변경이 생겼을 때, 기존 기능이 정상적으로 동작하는지 테스트하는 방법을 의미한다. 보통 비용이 많이 들기 때문에 자동화한다.

> 부하 테스트(Stress Test)
시스템에 명세서에서 정의한 정상 범위 이상의 부하를 가했을 때, 어떤 장애가 발생하는지 확인하는 테스트이다. 예를 들어 명세서에 10만 건 정도의 트랜잭션에 대해 정상 작동하도록 정의되어 있다면, 천만 건의 트랜잭션이 발생했을 때는 어떤 문제가 생기는지 테스트해 보는 방법이다.

> 로드 테스트(Load Test)
로드 테스트는 시스템이 어느 정도의 부하까지 정상적으로 처리할 수 있는지 확인하는 테스트이다. 로드 테스트와 부하 테스트는 의미를 헷갈리기 쉽다. 로드 케스트를 통해 시스템에 부하를 가했을 때 어느 정도까지 정상적으로 처리되는지 확인한다면, 부하 테스트는 로드 테스트로 얻어낸 정상 범위 이상의 부하를 가했을 때 오류가 발생하는 시점과 오작동의 구체적인 양상을 확인하는 테스트다.

-
테스트 방법에 따른 분류
블랙박스 테스트, 화이트박스 테스트, 그레이 박스 테스트
> 블랙박스 테스트(Block Box)
일반적으로 우리가 알고 있는 테스트 방법이다. 소프트웨어 내부 구현을 모르는 상태에서, 정의된 명세서를 기반으로 무엇이 어떻게 수행되는지 확인하는 테스트이다. 내부 구현을 모르기 때문에 들여다보지 못한다는 의미로 블랙박스라고 말한다.

> 화이트박스 테스트(White Box)
블랙박스 테스트와 반대로 소프트웨어의 내부 구현을 확인해서 이해한 후, 에러가 발생할 것 같은 부분이 어떻게 수행되는지 확인하는 테스트이다.
블랙박스와 달리 소프트웨어에 대한 이해가 필요하며 소스 코드 분석이 가능해야 한다. 안쪽을 들여다볼 수 있기 때문에 화이트 박스 테스트 혹은 글래스(Glass)테스트라고 한다.

> 그레이박스 테스트(Gray Box)
블랙박스 테스트와 그래이박스 테스트의 중간 단계 정도 되는 테스트이다. 담당자는 화이트박스 테스트처럼 소스 코드를 분석하지만, 수행 과정을 확인하는 것이 아니라 블랙박스 테스트에서와 같이 결과를 확인한다. 그래서 화이트박스보다는 적은 시간으로, 블랙박스보다는 자세히 테스트할 수 있다.

-
테스트 주도 개발이란 무엇인가
TDD란 Test Driven Development의 준말로, 개발보다 테스트를 먼저 하는 개발 방법론이다.
기존 방식이라면 먼저 개발을 완료한 후 테스트를 진행하게 될 것이다. 결과적으로 테스트는 '남은 시간에 하는' 별도의 후반 작업이 되고, 충분한 테스트를 거치지 못한 소프트웨어는 버그가 존재할 확률이 높을 뿐만 아니라 버그를 수정하는 데도 많은 비용이 발생한다.
반면에 TDD는 테스트를 먼저 하고 개발하기 때문에 버그를 사전에 찾아낼 확률이 높아 진다. 초기 개발 기간이 길어진다는 우려가 있을 수 있지만, 유지 보수 비용까지 계산한다면 오히려 전반적인 개발 비용을 낮추는 방법이라고 할 수 있다.

-
TDD 진행방법
TDD는 단순하게 진행된다.
우선 구현할 내용을 먼저 명시하고, 테스트가 실패하면 테스트를 성공할 수 있는 가장 간단한 코드를 작성한다. 그 후에 해당 코드를 좋은 코드로 만들기 위해 리팩터링(Refactoring)한다. 또 다시 다른 구현할 내용을 명시하여 테스트가 실패하면, 가장 간단한 코드를 구현하고 다시 리팩터링 한다. 이렇게 실패 -> 성공 -> 리팩터링의 순서로 프로그램을 작성해 간다.

자바스크립트 단위 테스트 라이브러리 중 가장 널리 사용하는 QUnit이라는 도구다.
http://qunitjs.com/


-
QUnit에서 가장 자주 사용하는 메서드
test(sName, fpFun)
equal(실제 값, 기대 값, 해당 assertion 설명)
*/
test("해당 테스트는 xx을 위한 테스트이다", function() { 
	equl(setComma(1), 1, "test");
});

/*
-
TDD에서 유의해야 할 점
첫 번째는 작은 보폭으로 테스트 케이스를 작성하는 것이다. 테스트 케이스를 작은 보폭으로 작성하면, 보폭을 크게 했을 때에 비해 빠르게 실패를 확인할 수 있다. 즉, 큰 보폭에 비해 작은 보폭은 실패했을 때 적은 비용이 들기 때문에 디버깅에 소요되는 시간이 줄어든다. 그렇다고 늘 작은 보폭으로 하라는 것은 아니다. 익숙한 구현이면 큰 보폭으로, 익숙하지 않은 구현이라면 작은 보폭으로 하는 것이 좋다.

두 번째로 각 테스트 케이스는 독립적이어야 한다. 테스트 케이스가 독립적이지 않으면 해당 코드에 오류가 없어도 실패하는 경우가 발생하기 때문에 디버깅하는데 시간이 소요된다. 또한 하나의 테스트 케이스가 실패했을 때 그와 연관된 테스트 케이스들이 줄줄이 실패할 가능성이 크며, 실패요인을 찾아 내는 데 불필요한 시간이 많이 소모된다. 따라서 각 테스트 케이스는 독립적으로 작성해야 한다. 그래야 케이스가 실패할 때 문제의 원인을 찾기 쉽다.
독립적으로 테스트 케이스를 만들기가 어려운 경우도 있다. 그럴 때는 설계 자체가 잘못된 게 아닌지 고민해 보고, 가능하면 테스트 케이스를 독립적으로 작성할 수 있도록 설계를 수정해야 한다.

-
TDD의 장점
첫 번째, 테스트 케이스를 먼저 작성한 후 코드를 작성하므로 자연스레 각 구현 코드에 테스트 케이스가 존재하게 되고, 이를 통해 프로그램의 버그가 줄어들고 안정적으로 개발할 수 있다는 점이다.

두 번째, 프로그램이 군더더기 없이 개발된다는 점, 즉 디자인이 단순해진다. TDD는 작은 보폭으로 진행하며, 미리 정의된 테스트 케이스에 맞추어 개발이 이루어지기 때문에 프로그램 디자인이 단순하고 간결해 진다. 단순 명료한 디자인은 코드의 가독성도 좋아지고 유지 보수하기도 편하다.

세 번째, 개발 방향이 잘못된 길로 들어설 때 빠르게 알려 준다는 점이다. 버그를 수정해 보면 누구나 경험하는 일이지만, 문제를 일으킨 원인을 수정하고 나면 그 때문에 다른 버그가 발생하는 경우가 다반사다. 수정 사항이 또 다른 문제를 일으키는 것까지 확인하지 못한 채 소프트웨어를 배포하는 일도 많다. 이 경우 사용자에게 불편을 초래할 뿐 아니라 파생된 버그를 수정하여 재배포하는 데도 많은 비용이 들아간다.

만약 TDD로 개발하고 있다면 각 코드에 대해 테스트 케이스가 존재하기 때문에, 버그를 수정하는 과정에서 또 다른 버그가 발생할 경우 바로 확인할 수 있다. 구글에서 작성한 논문(Google's Innovation Factory)에 의하면 단위 테스트에서 발견된 버그를 수정하는 비용은 5달러, 시스템 테스트에서 발견된 버그를 수정하는 비용은 5,000달러라고 한다.

프로그램 전체를 보는 안목 없이 당장 오류만 덮을 수 있도록 코드를 수정
땜질형 코드가 축적되면 '깨진 유리창 이론' 처럼 순식간에 프로그램 전체가 누더기로 변한다.
죄 없는 후임자들을 야근하게 만드는 코드가 되는 것이다.

-
테스텀(Testem)

자바스크립트는 브라우저나 플랫폼에 따라 작동 방식이 조금씩 다르다. 주요 OS와 브라우저만으로 수십여 개의 조합이 있으며, 버그 하나를 수정할 때마다 각 환경별로 테스트를 실행하고, 정상적으로 동작하는지 확인 하는데, 이 일은 거의 불가능에 가깝다. 
결국 개발자는 테스트 실행에 소극적일 수밖에 없고, 개발과 테스트의 간격이 벌어져 폭포수 모델의 문제점이 다시 나타나게 된다.

따라서 가능한 한 테스트를 쉽게 실행할 수 있는 개발 환경을 구축하는 일은 완성도 높은 개발를 내는 데 영향을 준다. CI(Continuous Integration, 지속적인 통합)도구를 사용할 수 있지만, 그보다 빠르고 쉽게 다양한 환경의 테스트를 하는 방법이 필요하다.

테스텀은 node.js 기반 도구이므로 node.js를 먼저 설치해야 하고, node.js 기반의 도구들은 대부분 npm을 사용해 설치하므로 테스텀도 커맨드 창에 npm을 이용하여 설치한다.


npm install -g testem

테스텀은 코드를 수정할 때마다 자동으로 다양한 환경에서 테스트한 결과를 반환해 주므로, 코드를 수정한 후 테스트하려는 브라우저를 일일이 새로고침하지 않아도 된다.

테스텀은 기본적으로 자스민(jasmine)이란 테스트 프레임워크를 사용
root 경로에 JSON 타입의 testem.json 이나 YAML 타입의 testem.yml 파일을 만들어 프레임워크를 설정하면, 테스텀이 테스트를 실행하기 전에 해당 파일을 읽고 동작한다.

testem.json 설정 (아래 설정은 모두 옵션)
{
	"framework": "qunit", // 자스민이 아닌 다른 프레임워크를 사용할 때 설정한다.
	"src_files": ["src/a.js", "src/b.js"], // 테스텀 기본 폴더가 아닌 다른 폴더의 소스 파일을 테스트할 때 설정한다.
	"test_page": "tests.html" // 테스트 페이지를 설정한다.
}


CI 모드
여러 브라우저를 대상으로 테스트를 진행하는 CI모드 제공
CI모드로 실행하면 현재 환경에서 실행할 수 있는 모든 브라우저에서 테스트한 후 TAP포맷으로 결과를 반환한다.
실행할 수 있는 브라우저는 launchers 명령어로 확인이 가능하며, 시스템에 IE 9만 설치되어 있는 경우에는 실행 가능한 브라우저 목록에
IE7, IE8이 나타날 것이다. 테스텀이 IE7 ~ IE9를 호환하는 모드로 실행되기 때문이다. (테스텀의 최신 버전은 다를 수 있음)

CI모드로 실행하면 브라우저에서 테스트가 진행되고 결과를 반환하는데, 테스트를 실행할 때 오류가 발생하면 브라우저 동작이 멈추고, CI도 테스트 결과를 기다리고 있으므로 멈추게 된다.
이렇게 응답이 없어 테스트가 진행되지 않는 상황은 CI자체적인 설정을 통해 해결할 수 있지만, 테스트텀에서도 이런 경우를 대비해 대기시간을 지정할 수 있는 -t 옵션이 있다.
-t 옵션 뒤에 대기 시간을 초 단위로 입력하면 해당 시간 안에 응답이 없는 브라우저를 종료해서 테스트에 문제가 발생해도 CI에 영향을 미치지 않도록 한다.

-
자바스크립트 단위 테스트 패턴
일반적인 규칙 Given/When/Then 패턴
Given/When/Then 패턴은 테스트 케이스를 쉽게 작성하고, 코드의 가독성을 높일 수 있는 방법이다.

Given은 테스트 케이스를 작성할 때 사전 조건을 설정하는 과정(setup)이고,
When은 구문을 실행하는 과정,
Then은 실행을 검증하는 과정이다.

테스트 케이스의 가독성은 코드의 유지 보수와 직결되는 중요한 가치 중 하나다. 읽고 이해하기 어려운 테스트 케이스는 수정하기도 어려워서 버려질 확률이 높아지고, 힘들게 만들어 놓은 테스트 케이스를 정작 필요할 때는 사용하지 않게 된다. 따라서 Given/When/Then 패턴으로 작성하는 것이 좋으며, 이 패턴을 테스트 케이스를 작성하는 방법은 아래와 같다.
*/
test("적금을 선택하면 이율을 계산하여 표시한다.", function() {
	// Given (선언)
	$("type").selectedIndex = 0;
	$("period").value = 12;
	$("money").value = 1000;
	$("rate").value - 4.5;

	// When (실행)
	Calculate.exec();

	// Then (검증/결과)
	equal($("result").innerHTML, 12248);
});


/*
-
기본적인 DOM테스트
기본적인 DOM 테스트는 DOM을 추가/삭제하거나 class나 style과 같은 속성을 변경한 후, 의도대로 변경되었는지 검증하는 테스트이다.

<ul id="tree">
	<li>한국</li>
	<li>일본</li>
	<li>중국</li>
</ul>
<script>
function add(name) {
	var li = document.createElement('LI');
	li.innerHTML = name;
	document.getElementById("tree").appendChild(li);
}
</script>

HTML 문서에는 개행문자가 있다는 것을 알아야 하고,
브라우저마다 DOM인터페이스 구현이 다르다. 다른 브라우저와 달리 IE는 innerHTML로 반환된 엘리먼트를 모두 대분자로 변경시킨다. DOM노드에 속성을 추가했다면, 그 순서 역시 브라우저마다 다르게 반환될 것이다.

> li의 변경된 개수를 비교하는 방법
<script>
test("add 메서드는 인자로 받은 문자를 li로 만들어서 ul에 삽입한다.", function() {
	// Given

	// When
	add("미국");

	// Then
	equal(document.querySelectorAll("#tree li").length, 4, "추가 후 li개수는 4");
});
</script>

> 테스트용으로 동일한 DOM을 생성한 후 양쪽의 innerHTML을 비교하는 방법
<ul id="tree"><li>한국</li><li>일본</li><li>중국</li></ul>
<ul id="fakeTreeForTesting"></ul>

<script>
test("add 메서드는 인자로 받은 문자를 li로 만들어서 ul에 삽입한다.", function() {
	// Given
	$("fakeTreeForTesting")[0].innerHTML = "<li>한국</li><li>일본</li><li>중국</li><li>미국</li>";

	// When
	add("미국");

	// Then
	equal($("tree")[0].innerHTML, $("fakeTreeForTesting")[0].innerHTML);
});
</script>
*/


/*
-
시스템 창 테스트 (alert, confirm)
alert, confirm 과 같은 시스템 창은 일반적인 방법으로는 테스트를 할 수 없다.

<script>
function checkNumber(num) {
	if(Object.prototype.toString.call(num) === '[object Number]') {
		return num;
	}else {
		alert(num + "은(는) 숫자가 아닙니다.");
	}
}
</script>

인자 타입이 숫자가 아닐 경우 경고 창이 정상적으로 실행되었는지 테스트하기 위해서는 어떻게 해야 할까?
alert나 confirm과 같은 시스템 창을 띄우지 않아도 제대로 코드가 실행되는지 테스트할 수 있는 방법이 필요하다.
자바스크립트는 내장 기능을 오버라이드(override)할 수 있으므로 이 경우 alert나 confirm 함수를 오버라이드하여 테스트할 수 있다.
물론 내장 기능을 오버라이드하면 브라우저가 예측과 달리 동작하게 되므로 실제 서비스에서 사용할 때는 신중을 기해야 한다.
이미 만들어진 목(mock)객체, system.mock.js를 사용해서 경고 창이 화면에 뜨지 않아도 정상적으로 실행되는지 확인할 수 있는 테스트를 진행해 보자.

system.mock.js 메서드
메서드명 			매개변수 				설명	
set 			- 					초기 시스템 목 객체을 사용할 때 경고 창 메서드들을 오버라이드하여 초기화하는 함수
reset 			- 					초기화했던 작업을 원래로 복구하는 함수
alert 			msg(String) 		실제 alert 창을 오버라이딩한 함수
getAlertMsg 	- 					Alert 창을 실행할 때 메시지를 반환하는 함수
confirm 		msg(String) 		실제 confirm 창을 오버라이딩한 함수
confirmResult 	result(Boolean) 	confirm의 결과 값을 설정하는 함수
getConfirmMsg 	- 					confirm 창에 나타나는 메시지

system.mock을 이용한 경고창 테스트
<script>
test("checkNumber는 숫자가 아닌 경우 경고 창을 띄운다.", function() {
	// Given
	Mock.set();

	// When
	checkNumber("a");

	// Then
	equal(Mock.getAlertMsg(), "a는 숫자가 아닙니다.", "경고 창을 띄워야 한다.");
	Mock.reset();
});
</script>

Mock.set() 을 호출해 해당 객체를 초기화하면 경고 창을 오버라이드하므로 alert나 confirm을 호출해도 실제로는 시스템 창이 실행되지 않는다. 
그리고 Mock.getAlertMsg() 를 호출하면 경고 창에 표시될 메시지를 볼 수 있기 때문에, 시스템을 실행시키지 않아도 정상적으로 작동하는지 확인할 수 있다.
마지막에는 Mock.reset() 을 호출하여 경고 창이 다시 실행될 수 있도록 기존 기능을 복원시킨다.

<script>
function confirmDelete() {
	if(confirm("삭제하시겠습니까?")) {
		return "yes";
	}else {
		return "no";
	}
}
</script>

confirm 함수의 테스트 코드
<script>
test("confirmDelete 에서 삭제한다.", function() {
	// Given
	Mock.set();
	Mock.confirmResult(true);

	// When, Then
	equal(confirmDelete(), "yes", "확인 버튼을 누르면 'yes'를 반환한다.");
	equal(Mock.getCinfirmMsg(), "삭제하시겠습니까?", "시스템 창의 메시지를 확인한다.");
});

test("confirmDelete에서 삭제 또는 취소를 한다.", function() {
	// Given
	Mock.set();
	Mock.confirmResult(false);

	// When, Then
	equal(confirmDelete(), "no", "취소 버튼을 누르면 'no'를 반환한다.");
	equal(Mock.getConfirmMsg(), "삭제하시겠습니까?", "시스템 창의 문구를 확인한다.");
});
</script>

confirm 함수를 오버라이드한 경우, 코드를 실행하기 전에 사용자 확인, 취소 중 어느 버튼을 누를지 지정해 놓아야 한다.
여기서는 Mock.confirmResult()를 사용해서 true/false를 반환했다.
나머지 사용법은 alert과 비슷하다. Mock.set 을 호출해 객체를 초기화하며, Mock.getConfirmMsg()로 시스템 창의 메시지를 확인할 수 있다.
*/


/*
-
이벤트 테스트 
> 가짜 이벤트를 이용한 테스트
가짜 이벤트란 사용자 액션에 의해 생성되는 이벤트 객체를 자바스크립트 코드로 만들어낸 것을 가리킨다.

<script>
function toggle(e) {
	var e = e || window.event; // 이벤트 찾기
	var ele = e.target || e.srcElement; // 이벤트가 발생한 엘리먼트 찾기
	var beforeClass = ele.className; // 엘리먼트의 클래스 명 할당
	var afterClass;

	if((" " + brforeClass + " ").indexOf(" on ") > -1) { // on 클래스가 있는지 검사
		afterClass = brforeClass.replace(/(?:\s+|^)on(?:\s+|$)/g, ""); // on 클래스가 있다면 on클래스 삭제
	}else {
		afterClass = brforeClass + " on"; // on클래스가 없다면 on클래스를 추가
	}

	ele.className = afterClass; // 변경한 클래스 할당
}
</script>

이벤트 객체를 기반으로 작성된 함수를 테스트하기 위해서는 이벤트 객체가 필요하다.
이벤트 객체는 일반적으로 사용자의 마우스 클릭 같은 행위로부터 생성된다. 하지만 사용자가 직접 클릭해야지만 이벤트 객체가 생성된다면 자동화 테스트를 만들 수 없기 때문에,
사용자의 행위 없이 이벤트를 발생시켜 주는 Mock객체의 fireEvent 함수를 사용할 것이다.

이름 			타입 				필수여부 		설명	
ele 		Element 		필수 			이벤트를 발생시킬 엘리먼트
event 		String 			필수 			이벤트명
props 		Obejct 			선택 			키보드 이벤트를 모방하는 속성을 일부 설정할 수 있다. keyCode 값을 정수로 지정하면 특정 키를 누른 것과 같고, Ctrl, Alt, Shift, meta 값에 불린 값을 지정하면 해당 특수 키를 누르거나 누르지 않은 상태를 모방할 수 있다.

fireEvent 테스트 코드
<script>
test("on 클래스가 없는 상태에서 엘리먼트를 클릭하면 on클래스가 추가된다.", function() {
	// Given
	attach($("toggle", "click", toggle));
	$("toggle").className = "";

	// When
	Mock.fireEvent($("togle"), "click");

	// Then
	ok($("toggle").className.indexOf("on") > -1, "클릭한 후에는 on클래스가 추가되어야 한다.");
});

test("on 클래스가 있는 상태에서 엘리먼트를 클릭하면 on클래스가 삭제된다.", function() {
	// Given
	attach($("toggle"), "click", toggle);
	$("toggle").className = "on";

	// When
	Mock.fireEvent($("toggle"), "click");

	// Then
	ok($("toggle").className.indexOf("on") === -1, "클릭 후에는 on 클래스가 삭제되어야 한다.");
});
</script>

이벤트 객체를 항상 자유자재로 생성해 낼 수 이쓴ㄴ 것은 아니다.
예를 들어 웹페이지를 닫을 때 발생하는 unload 이벤트를 다루는 경우나 마우스 이벤트를 사용해 커서의 움직임을 지속적으로 추적하면서 특정 작업을 하고자 하는 경우라면 가짜 이벤트 객체를 만들어 실제 상황을 대체하는 데 한계가 있다.

> 이벤트와 연관된 부분을 함수로 분리한 테스트
이벤트 객체를 가짜로 만들어서 실제 상황을 모방하는 것이 어렵다면, 가능한한 이벤트 객체를 직접 사용하지 않도록 코드를 수정하는 것도 하나의 해결책이 될 수 있다.
기존의 테스트 케이스에서 이벤트 객체에 대한 의존성을 제거해보자.

<script>
function toggle(el) {
	var beforeClass = el.className; // 엘리먼트의 클래스명 할당
	var afterClass;
	
	if((" " + brforeClass + " ").indexOf(" on ") > -1) { // on 클래스가 있는지 검사
		afterClass = brforeClass.replace(/(?:\s+|^)on(?:\s+|$)/g, ""); // on 클래스가 있다면 on클래스 삭제
	}else {
		afterClass = brforeClass + " on"; // on클래스가 없다면 on클래스를 추가
	}

	ele.className = afterClass; // 변경한 클래스 할당
}

function clickEvent(e) {
	var e = e || window.event; // 이벤트 찾기
	var ele = e.target || e.srcElement; // 이벤트가 발생한 엘리먼트 찾기

	toggle(el); // 이벤트와 상관없는 로직은 함수로 만든다.
}
</script>

클릭 이벤트를 발생시키지 않아도 toggle 함수를 실행할 수 있게 되었다.
toggle 함수의 기능은 특정 엘리먼트의 클래스명을 조건에 따라 변경하는 것으로만 한정하고, 클릭 이벤트가 발생했을 때 toggle 함수가 실행되도록 하는 작업은 별도로 분리시켰다.
이렇게 하면 테스트 목적이 명확해지고, 브라우저가 하는 일과 스크립트가 하는 일을 구분해서 테스트 작성이 쉬워진다.

<script>
test("on 클래스가 없는 상태에서 엘리먼트를 클릭하면 on 클래스가 추가된다.", function() {
	// Given
	$("toggle").className = "";

	// When
	toggle($("toggle"));

	// Then
	ok($("toggle").className.indexOf("on") > -1, "클릭한 후에는 on클래스가 추가되어야 한다.");
});

test("on 클래스가 있는 상태에서 엘리먼트를 클릭하면 on클래스가 삭제된다.", function() {
	// Given
	$("toggle").className = "on";

	// When
	toggle($("toggle"));

	// Then
	ok($("toggle").className.indexOf("on") === -1, "클릭한 후에는 on 클래스가 삭제되어야 한다.");
});
</script>

기존 코드에 비해 코드가 늘어났다고 볼 수도 있지만, 유지보수 측면에서는 훨씬 효율적이다.
*/





















