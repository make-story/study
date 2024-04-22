# 참고 자료

https://blog.naver.com/jukrang/221597914483  
https://blog.naver.com/jukrang/221414570067  
https://blog.naver.com/jukrang/221597910488  
http://makestory.net/media/#/view/493

# 추천

https://www.patterns.dev/posts/  
https://patterns-dev-kr.github.io/

# 요약

MVC : backbone.js (SPA 렌더링방식에서 Router 가 컨트롤러 역할)
MVVM : React, Vue, Angaulr (데이터 변경시 템플릿 방식으로 HTML을 작성)

---

# 디자인패턴

1977년 크리스토퍼 알렉산더(Christopher Alexander), 사라 이시가와(Sara Ishikawa), 머레이 실버스타인(Murray Silverstein)은 그들이 `도시 계획의 디자인 패턴이라고 말하는 독창적인 책(패턴 랭귀지: 도시, 건물, 건축)을 저술`했다.
이 책은 공통적인 디자인 언어에 대해 설명한다.

이 책에서 크리스토퍼 알렉산더는 패턴에 대해 다음과 같이 설명한다.
이 언어의 요소는 패턴으로 불리는 개체들이다.  
`각각의 패턴은 기존 환경 내에서 반복적으로 일어나는 문제를 설명한 후, 그 문제들에 대한 해법의 핵심을 설명`해준다.  
똑같은 방법으로 두 번 하지 않고 이 해법을 100만번 이상 재사용할 수 있도록 말이다.

이러한 디자인 패턴은 도시와 전원 생활을 혼합한 도시를 설계하거나, 주거 지역에 도로 안전 장비와 같은 조치를 추가하도록 도로를 설계하는 것 등을 포함하고 있다.

크리스토퍼 알렉산더와 다른 공저자들의 영감을 바탕으로,  
에릭 감마(Erich Gamma)와 리처드 헬름(Richard Helm), 랄프 존슨(Ralph Johnson), 존 블라시디스(John Vissides)는 디자인패턴: 재사용 가능한 객체지향 소프트웨어(Design Patterns: Elements of Reusable Object-Oriented Software)라는 책을 썼다.

이 패턴들은 세 개의 그룹으로 나뉜다.

> 생성(Creational): 여기에 속하는 패턴은 객체가 생성되고 라이프사이클이 관리되는 여러 가지 방법을 설명한다.
> 행동(Behavioral): 여기에 속하는 패턴은 객체가 서로 상호작용하는 방법을 설명한다.
> 구조(Structural): 여기에 속하는 패턴은 기존 객체에 기능을 추가하는 다양한 방법을 설명한다.

디자인 패턴의 목적은
소프트웨어를 구축하는 방법을 지시하려는 것이 아니라
`일반적인 문제를 해결하는 데 도움이 되는 지침을 제공`하는 데 있다.

예를 들어, 대다수 애플리케이션에서는 일종의 '실행 취소(Undo)'기능을 제공해야 할 필요가 있다. 이는 텍스트 편집기부터 드로잉 프로그램, 심지어 이메일 클라이언트에 이르기까지 다양한 애플리케이션에서 공통적인 기능이다.
이 문제를 해결하기 위한 시도는 과거부터 이미 수없이 있었기 때문에 공통적인 솔루션이 있다면 좋을 것이다.  
명령(command)패턴은 바로 이러한 공통의 솔루션을 제공해 준다.  
이것은 애플리케이션에서 수행된 모든 작업을 명령의 인스턴스로 추적하도록 제안한다.  
명령이 처리 될 때마다 큐에 저장된다. 명령 취소 요청이 들어오면, 큐에서 가장 위에 있는 명령을 꺼내 이에 대한 작업을 취소하면 된다.

디자인 패턴은 '실행 취소'문제와 같이 일반적인 문제의 해결 방법에 대한 힌트를 제공해 준다.
디자인 패턴은 동일한 문제 해결을 위해 수백 번 반복 실행된 결과에서 추출되었다.
디자인 패턴은 당신이 가지고 있는 문제에 대해 정확한 해결책이 아닐 수도 있지만 적어도 더 쉽게 해결책을 구현할 수 있도록 지침을 제공해줄 수 있다.

---

# 안티패턴

좋은 소프트웨어 디자인에서 발견되는 공통적인 패턴이 존재한다면, 나쁜 소프트웨어 디자인에서 발견되는 공통적인 패턴도 존재하지 않을까?
물론이다. 잘못 행해진 많은 방법들이 대부분 이미 이전에도 행해졌던 것들이다.

프로젝트가 끝날 때 팀원들은 함께 모여 그들이 배운 교훈을 문서로 작성할 것이다 이 문서는 프로젝트에서 개선될 사항과 함께 향후 이러한 문제를 방지할 수 있는 몇가지 제안을 포함한다. 하지만 이 문서가 꼭 프로젝트의 마지막에 작성된다는 것은 참으로 불행한 일이다.

다양한 프로젝트에서 생성된 문서들을 잘 살펴보면 일정한 패턴이 보이기 시작한다.
4인방(Gang of Four, Gof)으로 불리는 윌리엄 브라운(William Brown)과 라파엘 말보(Raphael Malveau), 스킵 맥코믹(Skip McCormick), 톰 모브레이(Tom Mowbray)는 원조 4인방의 책을 참고해 안티패턴(antipattren)에 대한 최초의 책을 저술했다. 이 책, '안티패턴: 리팩토링 소프트웨어, 아키텍처 그리고 위기의 프로젝트(AntiPatterns: Refactoring Software, Architectures, and Projects in Crisis)'은 코드뿐 아니라 코드를 포함한 관리 프로세스의 안티패턴을 설명하고 있다.

여기에 설명된 패턴은 물방울(Blob)과 용암흐름(Lava Flow)과 같은 유머러스한 이름의 패턴도 포함하고 있다.
물방울 패턴은 갓 오브젝트(god object)로 알려져 있는데 광대한 애플리케이션 로직의 책임을 맡고 있는 객체를 말한다.
용암흐름 패턴은 프로젝트가 오래되면서 코드가 아직도 사용되는지 아무도 모르고 있는 코드를 말한다.
개발자들은 코드가 어디선가 아직도 사용되고 있거나 언젠가 유용하게 사용될지도 모를 것을 걱정하기 때문에 코드를 섣불리 삭제하지 못한다.

---

# 모델 뷰 패턴의 역사

애플리케이션에서 문제의 분리는 매우 중요한 일이다.
애플리케이션을 계층으로 나누고 모듈화를 유지하면 변화의 영향을 최소화 시킬 수 있다.
각 계층이 다른 계층에 대해 모를수록 좋다. 계층간 인터페이스를 간단하게 유지하면 하나의 계층에서 발생한 변화가 다른 계층으로 파급되는 영향을 최소화 시키는 데 도움이 된다.

모델 뷰 컨트롤러(MVC, Model View Controller)패턴은 사람들이 인식하지 못했지만 오랫동안 사용돼 왔다.
증명하기는 어렵지만, MVC는 제록스 팔로알토 연구소에서 일하던 노르웨이의 컴퓨터 과학자인 트링브 리엔스카우그(Trygve Reenskaug)가 1970년대 후반 처음 제안한 것으로 보인다. 1980년에 이 패턴은 스몰토크 애플리케이션에서 널리 사용되었다. 그러나 이 패턴은 1988년 크라스너(Krasner)와 포프(Pope)가 'MVC 사용자 인터페이스 쿡북(A cookbook for using the model-view-controller user interface paradigm)'이라는 글을 쓴 이후에야 비로소 정식으로 문서화되었다.

---

# MVC 패턴

모델은 프로그램의 상태를 포함한다.
많은 애플리케이션에서 모델은 데이터베이스의 형태로 구성되기도 한다.
모델은(데이터베이스 같은) 영구 저장소에서 가져오거나 일시적인 값에서 가져올 수 있다.
이상적으로 모델은 패턴에서 유일하게 가변적인 부분이다.
뷰나 컨트롤러는 어떠한 상태정보도 가지고 있지 않다.

모델은 일반적으로 정보에 대한 컨테이너로 모델링된다.
일반적으로 모델은 실제 기능은 가지고 있지 않고 단순히 데이터 필드나 검증부를 가진다.
MVC패턴의 일부 구현에서는 모델이 유효성 검사 규칙 같은 메타데이터 필드를 포함하기도 한다.

뷰는 우리가 기대하는 바와 같이 대상에 모델의 상태를 전달한다.
뷰가 종종 XML이나 JSON, 또는 다른 데이터 형식으로 다른 컴퓨터와 통신하기 때문에, 뷰가 반드시 모델의 시각적이나 그래픽적인 표현일 필요는 없다.
하지만 대부분의 경우, 특히 자바스크립트에 연관된 경우, 뷰는 그래픽 객체가 될 것이다.
웹 콘텐츠에서 뷰는 일반적으로 브라우저에서 렌더링되는 HTML이 된다.

마지막으로, 모델의 상태는 컨트롤러에 의해 업데이트된다.
컨트롤러는 일반적으로 모델의 필드 업데이트에 필요한 모든 로직과 비즈니스 규칙을 포함한다.

컨트롤러는 모델의 존재뿐 아니라 일반적으로 뷰의 존재 역시 알고 있다.
컨트롤러는 이 둘을 조정한다. 컨트롤러는 하나 이상의 뷰를 초기화할 책임이 있다. 예를 들어, 하나의 컨트롤러는 단순히 세부 사항을 제공하는 뷰 뿐만 아니라 모델의 모든 인스턴스의 뷰의 목록을 제공할 것이다.
많은 시스템에서 컨트롤러는 모델 상에서 생성과 읽기, 업데이트, 삭제(CRUD) 동작을 가진다.
컨트롤러는 뷰를 정확하게 선택하고 모델과 뷰 사이의 통신을 연결하는 책임을 가진다.

애플리케이션에 대한 변경 요구가 있을 때, 코드의 위치를 즉각 알 수 있을 것이다.

> 요소의 간격이 화면에 잘 표시되지 않음. 간격변경 -> 뷰
> 비밀번호 유효성 검사의 논리적 오류로 인한 로그인 실패 -> 컨트롤러
> 새로운 필드를 추가 -> 모든 계층(모델, 뷰, 컨트롤러)

# MVC 코드

```javascript
// https://jake-seo-dev.tistory.com/742

// Model
const model = {
  data: [],
  getData() {
    // API 호출 또는 로컬 스토리지에서 데이터 로드
  },
  saveData() {
    // API 호출 또는 로컬 스토리지에 데이터 저장
  },
};

// View
const view = {
  render() {
    // 모델의 데이터를 기반으로 HTML 템플릿 렌더링
  },
  update() {
    // 모델 변경 시 화면 동적 업데이트
  },
};

// Controller
const controller = {
  init() {
    // 모델 데이터 로드
    model.getData();
    // 뷰와 모델 연결
    view.render(model.data);
  },
  onUserAction(action) {
    // 사용자 입력 처리
    switch (action) {
      case "ADD_TODO":
        // 모델에 데이터 추가 요청
        model.addData(data);
        // 뷰 업데이트
        view.update();
        break;
      // ...
    }
  },
};

// 앱 시작
controller.init();
출처: https://jake-seo-dev.tistory.com/742 [제이크서 위키 블로그:티스토리]
```

```javascript
// 뷰
var CreateCastleView = (function () {
  function CreateCastleView(document, controller, model, validationResult) {
    this.document = document;
    this.controller = controller;
    this.model = model;
    this.validationResult = validationResult;

    var _this = this;
    this.document
      .getElementById('saveButton')
      .addEventListener('click', function () {
        return _this.saveCastle();
      });
    this.document.getElementById('castleName').value = model.name;
    this.document.getElementById('description').value = model.description;
    this.document.getElementById('outerWallThickness').value =
      model.outerWallThickness;
    this.document.getElementById('numberOfTowers').value = model.numberOfTowers;
    this.document.getElementById('moat').value = model.moat;
  }
  CreateCastleView.prototype.saveCastle = function () {
    var data = {
      name: this.document.getElementById('castleName').value,
      description: this.document.getElementById('description').value,
      outerWallThickness:
        this.document.getElementById('outerWallThickness').value,
      numberOfTowers: this.document.getElementById('numberOfTowers').value,
      moat: this.document.getElementById('moat').value,
    };
    this.controller.saveCastle(date);
  };
  return CreateCastleView;
})();

// 컨트롤러
var Controller = (function () {
  function Controller(document) {
    this.document = document;
  }
  Controller.prototype.createCastle = function () {
    this.setView(new CreateCastleView(this.document, this));
  };
  Controller.prototype.saveCastle = function (data) {
    var validationResult = this.validate(data);
    if (validationResult.isValid) {
      // castle을 저장장치에 저장
      this.saveCastleSuccess(data);
    } else {
      this.setView(
        new CreateCastleView(this.document, this, data, validationResult),
      );
    }
  };
  Controller.prototype.saveCastleSuccess = function (data) {
    this.setView(new CreateCastleSuccess(this.document, this, data));
  };
  Controller.prototype.setView = function (view) {
    // 뷰를 브라우저에 전송
  };
  Controller.prototype.validate = function (model) {
    var validationResult = new validationResult();
    if (!model.name || model.name === '') {
      validationResult.isValid = false;
      validationResult.error.push('Name is Required');
    }
  };
  return Controller;
})();

// 모델
var CreateCastleModel = (function () {
  function CreateCastleModel(
    name,
    description,
    outerWallThickness,
    numberOfTowers,
    moat,
  ) {
    this.name = name;
    this.description = description;
    this.outerWallThickness = outerWallThickness;
    this.numberOfTowers = numberOfTowers;
    this.moat = moat;
  }
  return CreateCastleModel;
})();
```

---

# MVP 패턴

MVP(Model View Presenter)패턴은 MVC 패턴과 상당히 유사하다.
MVP는 마이크로소프트 워드에서 꽤 잘 알려진 패턴이며 일반적으로 WPF(Windows Presentation Foundation)와 실버라이트(Silverlight) 애플리케이션을 구성하는데 사용된다. 또한 순수한 자바스크립트에서 사용될 수 있다.

시스템의 다른 부분과 어떻게 상호작용하며, 책임이 어디에 존재하는지가 중요한 차이점이다.
첫 번째 차이점은 프레젠터(Presenter)에 있으며, 프레젠터와 뷰는 일대일로 매핑된다.
이는 MVC패턴의 컨트롤러에서 렌더링할 올바른 뷰를 선택하던 로직이 여기서는 존재하지 않음을 의미한다.
또는 패턴 외부의 좀 더 높은 수준에 존재한다.
올바른 프레젠터의 선택은 라우팅 도구에 의해 처리된다. 이러한 라우터는 매개변수를 검토하여 프레젠터에 최선의 선택을 제공한다.

프레젠터는 뷰와 모델을 모두 알고 있지만, 그러나 뷰는 모델을 인식하지 못하고 모델은 뷰를 인식하지 못한다.
모든 통신은 프레젠터를 통해 이루어진다.

프레젠터 패턴은 양방향 디스패치(two-way dispatch)의 주요 특징들을 가지고 있다.
프레젠터에서 클릭이 발생하면 프레젠터가 변화에 맞게 모델을 업데이트하고 다음으로 뷰를 업데이트 한다.

MVP 패턴의 수동(passive)버전에서, 뷰는 프레젠터로 전달되는 메시지의 상호작용이 거의 없다.
그러나 뷰가 추가적인 로직을 포함할 수 있는 능동적인 MVP로 불리는 변형도 있다.
MVP 의 능동(active)버전은 웹 애블리케이션에서 유용하게 사용된다.
이것은 뷰에 검증이나 간단한 로직의 추가를 허용하여 클라이언트에서 웹 서버로 전달해야 하는 요청의 수를 감소시켜준다.

# MVP 코드

```javascript
// 뷰
var CreateCastleView = (function() {
	function CreateCastleView(document, presenter) {
		this.document = document;
		this.presenter = presenter;

		this.document.getElementById("saveButton").addEventListener("click", this.saveCastle);
	}
	CreateCastleView.prototype.setCastleName = function(name) {
		this.document.getElementById("castleName").value = name;
	};
	CreateCastleView.prototype.getCastleName = function() {
		return this.document.getElementById("castleName").value;
	};
	CreateCastleView.prototype.setDescription = function(description) {
		this.document.getElementById("description").value = description;
	};
	CreateCastleView.prototype.getDescription = function() {
		return this.document.getElementById("description").value;
	};
	CreateCastleView.prototype.setOuterWallThickness = function(outerWallThickness) {
		this.document.getElementById("outerWallThickness").value = outerWallThickness;
	};
	CreateCastleView.prototype.getOuterWallThickness = function() {
		return this.document.getElementById("outerWallThickness").value;
	};
	CreateCastleView.prototype.setNumberOfTowers = function(numberOfTowers) {
		this.document.getElementById("numberOfTowers").value = numberOfTowers;
	};
	CreateCastleView.prototype.getNumberOfTowers = function() {
		return this.document.getElementById("numberOfTowers").value;
	};
	CreateCastleView.prototype.setMoat = function(moat) {
		this.document.getElementById("moat") = moat;
	};
	CreateCastleView.prototype.getMoat = function() {
		return this.document.getElementById("moat").value;
	};
	CreateCastleView.prototype.setValid = function(validationResult) {

	};
	CreateCastleView.prototype.saveCastle = function() {
		this.presenter.saveCastle();
	};
	return CreateCastleView;
})();
CastleDesign.CreateCastleView = CreateCastleView;

/*
뷰의 생성자는 더 이상 모델에 대한 참조를 가지지 않는다.
이는 MVP의 모델은 어떤 모델이 사용되는지 알지 못하기 때문이다.
이 정보는 프레젠터에 의해 추상화돼 있다. 프레젠터에 대한 참조는 다시 프레젠터로 메시지를 보낼 수 있도록 생성자에 남아 있다.

모델이 없기 때문에 공용 세터(setter)와 게터(getter) 메소드의 수가 증가한다. 이런 세터들은 프레젠터가 뷰의 상태를 업데이트할 수 있도록 해준다.
게터는 뷰가 상태를 저장하고 프레젠터가 정보를 얻을 수 있는 방법을 제공하는 방식의 추상화를 제공한다.
*/

// 프레젠터
var CreateCastlePresenter = (function() {
	function CreateCastlePresenter(document) {
		this.document = document;

		this.model = new CreateCastleModel();
		this.view = new CreateCastleView(document, this);
	}
	CreateCastlePresenter.prototype.saveCastle = function() {
		var data = {
			name: this.view.getCastleName(),
			description: this.view.getDescription(),
			outerWallThickness: this.view.getOuterWallThickness(),
			numberOfTowers: this.view.getNumberOfTowers(),
			moat: this.view.getMoat()
		};

		var validationResult = this.validate(data);
		if(validationResult.isValid) {
			// 모델에 쓰기
			this.saveCastleSuccess(data);
		}else {
			this.view.setValid(validationResult);
		}
	};
	CreateCastlePresenter.prototype.saveCastleSuccess = function(data) {
		// 다른 프레젠터로 리디렉션

	};
	CreateCastlePresenter.prototype.validate = function(model) {
		var validationResult = new validationResult();
		if(!model.name || model.name === '') {
			validationResult.isValid = false;
			validationResult.error.push("Name is Required");
		}
	};
	return CreateCastlePresenter;
})();
CastleDesign.CreateCastlePresenter = CreateCastlePresenter;

/*
MVP 패턴은 사용자 인터페이스 구축에 매우 유용한 패턴이다.
뷰와 모델이 분리돼 변경에 대한 더 좋은 적응을 제공하면서 더욱 엄격한 API를 생성할 수 있다.
그러나 이로 인해 더 많은 코드가 필요하다. 더 많은 코드는 더 많은 버그가 발생할 가능성이 커지게 만든다.
*/
```

---

# MVVM 패턴

모델-뷰-뷰모델(Model View ViewModel)패턴
컨트롤러와 프레젠터의 역할은 이제 뷰모델이 한다. MVC나 MVP와 마찬가지로 로직의 대부분은 중앙 구성요소(이 경우 뷰 모델)에 유지된다.
모델 자체는 실제로 MVVM에서 매우 간단한다. 일반적으로 모델은 단지 데이터를 보유하는 봉투처럼 동작한다.
검증은 뷰모델에서 수행된다.

MVP와 마찬가지로, 뷰는 모델의 존재를 전혀 인식하지 못한다. MVP와의 차이는 뷰가 중간에 있는 클래스와의 통신을 인지하고 있다는 점이다. 단순히 값을 설정하지 않고 메소드를 호출한다.

MVVM에서 뷰는 뷰모델이 뷰라고 믿는다.
뷰는 변화에 따라 뷰 모델의 필드를 업데이트한다. 사실상 뷰의 필드는 뷰모델에 바인딩된다. 뷰모델은 이러한 값을 모델에 전달하거나, 저장 같은 동작이 호출돼 데이터가 전달될 때까지 기다린다.

마찬가지로 뷰모델의 변경은 한 번에 뷰에 반영돼야 한다.
하나의 뷰는 여러 개의 뷰모델을 가질 수 있다. 이러한 뷰모델 각각은 뷰에 업데이트를 전달하거나 뷰를 통해 변화가 전달된다.

# MVVM 코드

```javascript
// 뷰
var CreateCastleView = (function() {
	function CreateCastleView(document, viewModel) {
		this.document = document;
		this.viewModel = viewModel;

		var _this = this;
		this.document.getElementById("saveButton").addEventListener("click", function() {
			return _this.saveCastle();
		});
		this.document.getElementById("name").addEventListener("change", this.nameChangedInView);
		this.document.getElementById("description").addEventListener("change", this.descriptionChangedInView);
		this.document.getElementById("outerWallThickness").addEventListener("change", this.outerWallThicknessChangedInView);
		this.document.getElementById("numberOfTowers").addEventListener("change", this.numberOfTowersChangedInView);
		this.document.getElementById("moat").addEventListener("change", this.moatChangedInView);
	}
	CreateCastleView.prototype.nameChangedInView = function(name) {
		this.viewModel.nameChangedInView(name);
	};
	CreateCastleView.prototype.nameChangedInViewModel = function(name) {
		this.document.getElementById("name").value = name;
	};
	CreateCastleView.prototype.descriptionChangedInView = function(description) {
		this.viewModel.descriptionChangedInView(description);
	};
	CreateCastleView.prototype.descriptionChangedInViewModel = function(description) {
		this.document.getElementById("description").value = description;
	};
	CreateCastleView.prototype.outerWallThicknessChangedInView = function(outerWallThickness) {
		this.viewModel.outerWallThicknessChangedInView(outerWallThickness);
	};
	CreateCastleView.prototype.outerWallThicknessChangedInViewModel = function(outerWallThickness) {
		this.document.getElementById("outerWallThickness").value = outerWallThickness;
	};
	CreateCastleView.prototype.numberOfTowersChangedInView = function(numberOfTowers) {
		this.viewModel.numberOfTowersChangedInView(numberOfTowers);
	};
	CreateCastleView.prototype.numberOfTowersChangedInViewModel = function(numberOfTowers) {
		this.document.getElementById("numberOfTowers").value = value;
	};
	CreateCastleView.prototype..moatChangedInView = function(moat) {
		this.viewModel.moatChangedInView(moat);
	};
	CreateCastleView.prototype.moatChangedInViewModel = function(moat) {
		this.document.getElementById("moat").value = moat;
	};
	CreateCastleView.prototype.isValidChangedInViewModel = function(validationResult) {
		this.document.getElementById("validationWarning").innerHtml = validationResult.errors;
		this.document.getElementById("validationWarning").className = "visible";
	};
	CreateCastleView.prototype.saveCastle = function() {
		this.viewModel.saveCastle();
	};
	return CreateCastleView;
})();
CastleDesign.CreateCastleView = CreateCastleView;

// 뷰모델
var CreateCastleViewModel = (function() {
	function CreateCastleViewModel(document) {
		this.document = document;
		this.model = new CreateCastleModel();
		this.view = new CreateCastleView(document, this);
	}
	CreateCastleViewModel.prototype.nameChangedInView = function(name) {
		this.name = name;
	};
	CreateCastleViewModel.prototype.nameChangedInViewModel = function(name) {
		this.view.nameChangedInViewModel(name);
	};
	CreateCastleViewModel.prototype.descriptionChangedInView = function(description) {
		this.description = description;
	};
	CreateCastleViewModel.prototype.descriptionChangedInViewModel = function(description) {
		this.view.descriptionChangedInViewModel(description);
	};
	CreateCastleViewModel.prototype.outerWallThicknessChangedInView = function(outerWallThickness) {
		this.outerWallThickness = outerWallThickness;
	};
	CreateCastleViewModel.prototype.outerWallThicknessChangedInViewModel = function(outerWallThickness) {
		this.view.outerWallThicknessChangedInViewModel(outerWallThickness);
	};
	CreateCastleViewModel.prototype.numberOfTowersChangedInView = function(numberOfTowers) {
		this.numberOfTowers = numberOfTowers;
	};
	CreateCastleViewModel.prototype.numberOfTowersChangedInViewModel = function(numberOfTowers) {
		this.view.numberOfTowersChangedInViewModel(numberOfTowers);
	};
	CreateCastleViewModel.prototype.moatChangedInView = function(moat) {
		this.moat = moat;
	};
	CreateCastleViewModel.prototype.moatChangedInViewModel = function(moat) {
		this.view.moatChangedInViewModel(moat);
	};
	CreateCastleViewModel.prototype.saveCastle = function() {
		var validationResult = this.validate();
		if(validationResult.isValid) {
			// 모델에 쓰기
			this.saveCastleSuccess();
		}else {
			this.view.isValidChangedInViewModel(validationResult);
		}
	};
	CreateCastleViewModel.prototype.saveCastleSuccess = function() {
		// 저장이 성공하면 필요한 작업을 수행
		// 뷰모델을 업데이트
	};
	CreateCastleViewModel.prototype.validate = function() {
		var validationResult = new validationResult();
		if(!this.name || this.name === '') {
			validationResult.isValid = false;
			validationResult.errors.push("Name is Required");
		}
	};
	return CreateCastleViewModel;
})();
```

---

# 모델과 뷰 사이의 변화를 전송하는 더 좋은 방법

> 더티 체킹(dirty checking)
> 이 방법에서는 뷰모델과의 모든 상호작용 후에 모든 속성에 변경이 있는지 검사한다.
> 변경이 발견되면 뷰에서 관련된 값이 새로운 값으로 업데이트된다. 뷰 값의 변경을 위해 모든 컨트롤에 변경 작업이 포함된다. 이들은 그 다음 뷰모델을 업데이트 한다.

이 방법은 모든 속성을 반복하기 때문에 큰 모델에서는 속도가 느려질 수 있다.
모델을 변화시킬 수 있는 상황은 매우 많으며, 또한 모델의 필드가 멀리 떨어져 있는 다른 필드의 변경에 의해 변경됐는지 검증 없이 말할 수 있는 방법이 없다.
긍정적으로 보면, 더티 체킹은 평범하고 오래된 자바스크립트 객체를 사용할 수 있게 해준다. 이전과 다르게 코드를 작성할 필요가 없다.

> 컨테이너 객체
> 기존의 객체를 래핑하는 특별한 인터페이스가 제공된다. 따라서 객체의 변화를 직접 관할할 수 있다.
> 기본적으로 이것은 감시자 패턴의 애플리케이션이지만, 동적으로 적용되기 때문에 아래에 있는 객체가 감시되고 있는 사실을 모른다. 스파이 패턴이라고 할 수 있겠다.

---

# 컴포넌트의 개념 ('리액트 프로그래밍 정석' 책 내용 중)

기존의 웹 프레임워크는 MVC 방식으로 정보, 화면, 구동 코드를 분리하여 관리했습니다.  
정보 담당을 모델(Model), 화면 담당을 뷰(View), 구동 담당을 컨트롤러(Controller)라고 부르는 것에서 MVC라는 용어가 나왔지요.  
이 방식은 코드 관리를 효율적으로 할 수 있다는 장점이 있으나 MVC 각 요소의 의존성이 높아(하나만 바꾸기가 쉽지 않음) 재활용은 어려웠습니다.

하지만 웹 사이트의 화면은 각 요소가 비슷하고 반복적으로 사용한 경우가 많습니다. 이점을 착안하여 컴포넌트가 등장하게 된 것이지요.  
컴포넌트는 MVC의 뷰를 독립적으로 구성하여 재사용도 할 수 있고 컴포넌트를 통해 새로운 컴포넌트를 쉽게 만들 수도 있습니다.  
다양한 모양의 블록을 조립한다고 상상하면 됩니다.

---
