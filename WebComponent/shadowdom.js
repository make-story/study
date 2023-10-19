/*
-
기존 방식 - 전역 영향
document.body.appendChild(document.createElement('div')).innerHTML = '<style>p { background-color: #82b74b; }</style><p id="non-shadow">Yey!</p>';

Shadow DOM은 웹 개발의 공통 문제에 대한 솔루션을 제공
격리된 DOM: 구성 요소의 DOM은 자체 포함됩니다 (예: document.querySelector()는 구성 요소의 Shadow DOM에 노드를 반환하지 않음).
범위가 지정된 CSS: Shadow DOM 내부에 정의한 CSS는 범위가 Shadow DOM으로 지정되어 있습니다. 스타일 규칙은 누출되지 않으며 페이지 스타일은 스며들지 않습니다.
CSS 단순화: 범위가 지정된 DOM이란 간단한 CSS 선택기와 훨씬 일반적인 ID/클래스 이름을 사용할 수 있으며 이름 충돌에 대해 걱정할 필요가 없음을 의미합니다.
생산성: 큰(전역) 단일 페이지보다 DOM 청크에서 앱을 고려합니다.


-
쉐도우돔 방식 - 돔 자체의 분리 역할! 
쉐도우 루트를 기준으로 id를 중복해서 써도 되고, 루트 안팎의 동일한 이름의 class역시 전혀 다른 클래스의 역할을 수행한다. 
HTML 문서 하나에 수천 개 되는 엘리먼트의 스타일을 한 번에 모두 관리하기 위해 class 이름을 고민할 필요도, id의 중복이 무서워 쓰지 못하는 일도 필요 없다. 쉐도우 돔 하나당 하나의 문서를 관리하듯, 적절한 id를 배분하면, 혹은 그마저도 필요 없이 짧은 셀렉터로 충분히 그 역할을 수행할 수 있다.
document.body.appendChild(document.createElement('div')).attachShadow({mode: 'open'}).innerHTML = '<p id="shadow">Yey!</p>';


-
iframe
쉐도우 돔을 사용하지 않더라도 iframe을 사용하면 비슷한 기능을 수행할 수 있다. 
그러나 iframe을 사용한 DOM의 분리는 다음과 같은 단점이 있다.
1. http 요청이 한차례 더 일어난다
2. 별도의 페이지이기 때문에, 소비되는 리소스도 높고 느리다
3. iframe의 주소가 같은 도메인이 아닌 경우 접근 불가능하다
트위터는 iframe형식으로 지원하던 기능을 브라우저가 지원하는 경우 쉐도우 돔 방식으로 전환


-
css

:host 
shadow root로 지정된 웹 구성 요소에 스타일을 적용합니다.

:host-context(<selector>) 
웹 구성 요소 혹은 상위 요소의 선택자가 <selector>와 일치하면, 웹 구성 요소의 자식 요소에 스타일을 적용합니다.

::slotted(<compound-selector>) 
지정한 복합 선택자와 일치하는 슬롯 콘텐츠에 스타일을 적용합니다.

외부에서 Shadow DOM 내부를 스타일링하기
https://www.html5rocks.com/ko/tutorials/webcomponents/shadowdom-201/

<style>
  #host::shadow span {
    color: red;
  }
</style>

<div id="host">
  <span>Light DOM</span>
</div>

< script >
var host = document.querySelector('div');
var root = host.createShadowRoot();
root.innerHTML = "<span>Shadow DOM</span>" +"<content></content>";
< /script >

*/

// 템플릿 리터럴
let templateLiterals = ` 
<!-- css //-->
<link rel="stylesheet" href="/css/test.css">
<style>
* {
	padding: 3px;
	color: #FFF;
	background-color: #000;
}
</style>
<span>안녕하세요. 유성민 입니다.</span>
<!-- script 실행되는지 여부 테스트 //-->
<!-- innerHTML 의 경우 스크립트는 실행되지 않는다! -->
<script src="/js/test.js"></script>
<script>
alert('test!');
</script>
`;

// 일반적인 기존 코드 적용
document.querySelector("#shadowDomButton1").onclick = (event) => {
  let none = document.querySelector("#none-shadow");
  none.innerHTML = templateLiterals;
};

// 쉐도우돔을 통한 코드 적용
document.querySelector("#shadowDomButton2").onclick = (event) => {
  /*
	Shadow DOM은 웹 개발의 공통 문제에 대한 솔루션을 제공
	격리된 DOM: 구성 요소의 DOM은 자체 포함됩니다 (예: document.querySelector()는 구성 요소의 Shadow DOM에 노드를 반환하지 않음).
	범위가 지정된 CSS: Shadow DOM 내부에 정의한 CSS는 범위가 Shadow DOM으로 지정되어 있습니다. 스타일 규칙은 누출되지 않으며 페이지 스타일은 스며들지 않습니다.
	CSS 단순화: 범위가 지정된 DOM이란 간단한 CSS 선택기와 훨씬 일반적인 ID/클래스 이름을 사용할 수 있으며 이름 충돌에 대해 걱정할 필요가 없음을 의미합니다.
	*/

  // shadow host
  let shadowHost = document.querySelector("#shadow-host");

  // shadow root - mode: open or closed
  let shadowRoot = shadowHost.attachShadow({ mode: "open" });

  // shadow tree
  shadowRoot.innerHTML = templateLiterals;

  // shadow root 접근
  // attachShadow({mode: 'closed'}) 경우 접근 불가, null 반환
  console.log(document.querySelector("#shadow-host").shadowRoot);

  // shdow dom 내부 스크립트 삽입! (innerHTML 로 쉐도우돔 내부 html을 그렸을 경우, script 실행되지 않는다!)
};
