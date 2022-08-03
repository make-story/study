https://velog.io/@teo/CSS%EC%B1%85-%EC%B6%9C%ED%8C%90%EC%A0%9C%EC%9D%98%EB%A5%BC-%EB%B0%9B%EA%B3%A0-%EC%9E%91%EC%84%B1%ED%96%88%EB%8D%98-%EC%9B%90%EA%B3%A0%EB%93%A4-%EA%B3%B5%EC%9C%A0...-%EC%A7%80%EA%B8%88%EC%9D%80-%EB%B6%80%EB%9F%AC%EC%A1%8C%EC%96%B4%EC%9A%94

# MDN CSS

https://developer.mozilla.org/ko/docs/Web/CSS

# 나만의 Best Practice를 꾸준히 만들어보자!

웹 산업의 분야는 다양하기에 하나의 기술과 패러다임이 정답이 아닙니다. CSS 기술은 항상 시대를 반영해서 발전을 해왔고 내가 홈페이지를 만들고 있는지 솔루션을 만들고 있는지 백엔드 입장인지 프론트엔드 입장인지에 따라서 좋은 방법과 나쁜 방법이 다 달라지게 됩니다.

CSS 역시 어디에서든 통하는 은빛총알 같은 것은 없습니다. CSS에는 상황에 맞는 여러가지 도구들이 존재하고 있으며 어떠한 도구가 어디에 잘 어울리지는 지 역시 스스로 알아야 하겠지요.

제가 항상 CSS를 알려드릴때 하는 말이 있습니다. CSS를 잘 하기 위해서는 본인만의 Best Practice를 가져야 된다고 말입니다. CSS는 JS와는 달리 깊은 이해도 어느 정도 필요하겠지만 그것보다는 숙달이 되어 있는 것이 훨씬 더 중요합니다.

왜냐하면 디자인을 내가 원하는 대로 만들 수 있고 요구하는 디자인을 정확하고 신속하게 만들어줘야 CSS를 잘 한다는 장점을 챙길 수 있기 때문에 CSS는 깊은 이해보다는 상대적으로 연습이 더 중요합니다. 그렇기에 내가 거대한 CSS와 디자인을 잘 다루기 위해서는 반복 숙달이 필요하고 그러다 보면 자기만의 루틴이 만들어지게 됩니다.

이 루틴이라는 것은 좋고 효율적인 걸 가지고 있어야겠죠. CSS와 브라우저는 계속 성장을 하고 있기에 처음에 배웠던 그 방식이 지금은 최선이 아닐수도 있습니다. 그렇기에 내 도구들을 항상 점검하고 새로운 스펙들을 주시하고 있어야 합니다. 아쉽게도 무조건 최신을 택할 수도 없는 것이, 브라우저는 여러 종류가 있고 데스크탑과 모바일 그리고 아직 업데이트를 하지 않은 유저들도 있기 때문에 적절한 밸런스를 잡아야 합니다.

또한 그간 CSS 신문물의 척화비 역할을 하던 IE11의 퇴출이 확정이 되었고, CSS에도 JS의 영역이 가세하면서 CSS의 도구나 패러다임이 업그레이드가 될 예정입니다. 최신 스펙뿐만이 아니라 CSS를 개발하기 위한 좋은 도구들을 꾸준히 바꿔가는 것 역시 우리가 낡은 개발자가 되지 않는 길이기도 합니다.

https://github.com/ManzDev/frontend-evolution  
https://velog.io/@teo/css-history-1

# Selector가 복잡해진 이유

초창기에는 4가지의 단순한 Selector만이 존재했습니다. 하지만 점점 Selector는 복잡해졌죠. 왜 그럴까요?

웹 문서가 근본이었던 시절 문서와 디자인이 한데 섞이는게 싫어서 분리를 했다고 앞서 설명을 드렸습니다.

문서란 세부 내용이 잘 변하지 않습니다. 하지만 디자인은 계속해서 변화해 갈 수 있겠죠. 그래서 하나의 컨텐츠에 여러 가지 서식을 적용할 수 있도록 하는 방법이 중요한 아젠다였습니다.

그 당시 그러한 취지의 게시판이나 쇼핑몰 솔루션, 블로그등의 서비스가 유행했다는 사실을 떠올려보세요.

그러다 보니까 HTML을 건들지 않고 CSS만으로 디자인을 잘 하는 법이 중요했습니다.

# Selector가 단순해진 이유

이제는 더 이상 하나의 동일한 컨텐츠에서 여러가지의 스타일을 만들 필요가 적어졌습니다. 예전에는 커스텀을 할 수 있는 것들이 주요한 가치였다면 지금은 하나의 세련된 디자인이 가치를 만드는 세상이 되었습니다.

아직도 네이버 블로그나 티스토리와 같이 테마들을 제공하는 서비스가 있지만 현대에 와서는 미디엄, 브런치, velog등과 같이 아이덴티티가 있는 하나의 디자인을 제공하는 것이 추세가 되었습니다.  
"디자인이 곧 아이덴티티"
그러다보니 더더욱 HTML의 편집이 자유로워지고 이는 곧 CSS의 셀렉터를 복잡하게 만드는 것 보다 HTML에 class를 추가하는 편이 더 관리하기가 쉽다는 것을 알게 됩니다.

```html
<section>
  <div>
    <a href="">foo</a>
    <!-- 여기에 서식을 적용하고 싶은데 -->
  </div>
  <div>
    <div>
      <a href="">bar</a>
      <!-- 여기는 원하지 않았다. section > div > a 와 같은 식으로 썼어야 했다! -->
    </div>
  </div>
</section>

<style>
  seciton div a {
    color: red;
  } /* 이렇게 할 경우 의도치 않은 a에 잘못된 서식이 적용할 잠재적 위험이 항상 가지고 있게 된다! */
</style>
```

VS

```html
<section>
  <div>
    <a href="" class="link">foo</a>
    <!-- 그냥 HTML에 class를 추가하는게, -->
  </div>
  <div>
    <div>
      <a href="">bar</a>
      <!-- 여기는 link가 없으므로 적용이 안된다. -->
    </div>
  </div>
</section>

<style>
  .link {
    color: red;
  } /* 이편이 더 간단하다.*/
</style>
```

그래서 더이상 복잡한 Selector를 쓰기보다는 class의 이름을 잘 지어서 붙이는 식으로 발전을 하게 됩니다.

# 이름짓기는 어려워! CSS 방법론

웹이 거대해지면서 이름 붙여야 할 것들이 엄청나게 많아지다보니 이 이름을 짓는 것에서 엄청난 어려움에 봉착하게 됩니다.  
가뜩이나 CSS의 경우 global scope를 가지고 있는 태생적인 한계로 인해서 모든 이름들은 겹치지 않아야 합니다. 또한 HTML의 계층과 CSS의 계층이 다르므로 이해를 할 수 있는 계층구조를 잘 표현 할 수 있어야 했고 특히 협업을 할때 서로의 이름을 짓는 방법이 달라서 여간 고생이 아니었습니다.  
ITCSS, SMACSS, OOCSS, BEM, CUBE CSS 등 한번쯤 들어봤던 이 CSS 방법론이라는 것은 결국 어떻게 하면 이 이름을 잘 지을 수 있는가에 대한 노력들이었습니다.  
"현재 살아남은 승자는 BEM와 Atomic CSS(Utiliy-First) 두 가지"

## 구조를 포함하는 단순한 명명법: BEM

http://getbem.com/introduction/

## 직관적인 비주얼한 이름: Atomic CSS(Utiliy-First)

```css
.bold {
  font-weight: bold;
}
.text-center {
  text-align: center;
}
.pull-left {
  float: left;
}
.clearfix {
  clear: both;
}
.none {
  display: none;
}
.no-text {
  text-indent: -9999px;
}
.hbox {
  display: flex;
  align-items: center;
}
.relative {
  position: relative;
}
/* ... */
```

이른바 유틸리티 CSS로 자주 쓰는 CSS등을 미리 만들어서 사용하는 방식입니다.  
CSS의 초창기부터 오래된 논쟁거리 중 하나였습니다.  
`.mt10 { margin-top: 10px }은 좋은 이름인가?`

# 왜 CSS Reset이 생겨났을까?

https://velog.io/@teo/2022-CSS-Reset-%EB%8B%A4%EC%8B%9C-%EC%8D%A8%EB%B3%B4%EA%B8%B0

## 참고 사이트

reset: https://www.joshwcomeau.com/css/custom-css-reset/  
reset: https://github.com/jgthms/minireset.css  
box-shadow: https://shadows.brumm.af/  
z-index: https://www.joshwcomeau.com/css/stacking-contexts/  
예제: https://100dayscss.com/days/1/  
소개: https://cssbattle.dev/

# Flexbox

## 콘텐츠를 가로로 배치할 것인가 세로로 배치할 것인가: flex-direction(= flex-flow)

## 좌.우.가운데, 늘리기! : align-items

## 어떻게 모아둘까? 벌려둘까? : justify-content

## 조합 연습해보기

1. flex-flow: 컨텐츠의 방향
2. align-items: 방향과 교차방향의 위치
3. justity-content: 나머지 위치
