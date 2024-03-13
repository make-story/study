# HTML 검사기

https://validator.w3.org/unicorn/?ucn_lang=ko

https://validator.w3.org/nu/#textarea

# HTML 5.1 정리 / HTML 5.2 미리보기

https://wit.nts-corp.com/2017/03/02/4338

# HTML5 비디오 플레이어 마크업 작업기

https://wit.nts-corp.com/2017/08/08/4818

---

# 마크업

태그를 사용하여 텍스트 내용과 이미지, 멀티미지어 콘텐츠를 HTML 문서로 표현하는 것을 마크업(Markup) 한다고 합니다.  
그래서 HTML 은 하이퍼텍스트(Hypertext)를 마크업(Makerup) 하는 언어(Language) 가 된는 것 입니다.

# HTML 공부

https://web.dev/learn/html

# `HTML Tag 요소`

https://developer.mozilla.org/ko/docs/Web/HTML/Reference

---

# HTML5

- HTML5 표준에서는 "<head>" 태그 안에 반드시 와야 했던 CSS 정의가 꼭 "<head>" 태그 안에 오지 않아도 되는 것으로 변경됨.
- 문서 인코딩 관련 정보 표시가 필수사항으로 변경

```html
<meta charset="utf-8" />
```

Self-Closing, 시작태그와 종료태그가 함께 있는 단독태그의 경우, 태그 끝 부분에 "/"를 표시하지 않아도 됨. (선택적)

# `Self-Closing, Void element`

MDN  
https://developer.mozilla.org/en-US/docs/Glossary/Void_element
HTML5 기준으로 XML, XHTML, SVG 외 void element 는 닫는 태그 불필요! (<input type="text">)

https://jakearchibald.com/2023/against-self-closing-tags-in-html/

https://html.spec.whatwg.org/multipage/syntax.html#void-elements  
https://www.devkuma.com/docs/html/html-self-closing-tags/

HTML 에는 Self-Closing 라는 것이 있습니다.  
(Self-closing 은 HTML5에서 주로 사용되지만, 이 아이디어는 이전의 XHTML에서 비롯된 것)

흔히 우리가 알고 있는 `<img />` 처럼 닫기 태그를 별도로 두는 것이 아닌,  
선언과 종료를 하나의 태그에서 할 수 있는 태그입니다.

HTML5 에 self-closing 태그의 목록은 다음과 같다.

```html
<area />
<base />
<br />
<col />
<command />
<embed />
<hr />
<img />
<input />
<keygen />
<link />
<menuitem />
<meta />
<param />
<source />
<track />
<wbr />
```

## `Self-Closing, Void element 엔딩 슬래시는 선택 사항인가?`

- HTML5 : 슬래시는 선택 사항이다.
- HTML4 : 슬래시는 기술적으로 유효하지 않다. 그러나 W3C의 HTML 유효성 검사기에서 허용된다.
- XHTML : 슬래시가 필요하다.

recommend to always add the slash. Because, it provides a visual clue of non-closing tags.
`항상 슬래시를 추가하는 것이 좋다. 왜냐하면 non-closing 태그는 시각적으로 가독성을 높여준다.`

---

# "HTML은 사용하기가 까다롭지 않고 유연합니다."

예를 들어, 페이지에 <ysm></ysm>를 선언하면 브라우저가 이를 완전히 수락합니다.   
비표준 태그가 작동하는 이유는 HTML 사양이 이를 허용하기 때문입니다.   
사양에 정의되지 않은 요소는 HTMLUnknownElement로 파싱됩니다.

# 사용자정의 요소 생성 관련 규칙

1. 사용자정의 요소의 이름에는 대시(-)가 포함되어야 합니다. 
<x-tags>, <my-element> 및 <my-awesome-app>은 모두 유효한 이름이지만, <tabs> 및 <foo_bar>는 그렇지 않습니다.  
이러한 요구사항은 HTML 파서가 일반 요소와 사용자설정 요소를 구별할 수 있도록 합니다.   
또한 새로운 태그가 HTML에 추가될 때 다음 버전과의 호환성도 보장되도록 합니다.

2. 동일한 태그를 두 번 이상 정의(요소확장/요소업그레이드)할 수 없습니다. 
중복 정의 시 DOMException이 발생합니다.   
새로운 태그(사용자 요소)에 대해 브라우저에 알리고 나면 그걸로 끝입니다. 취소할 수 없습니다.

3. HTML은 몇 가지 요소만 스스로 닫도록 허용하므로 사용자설정 요소는 스스로 닫을 수 없습니다. 
항상 닫는 태그를 작성해야 합니다. (예를 들어 <app-drawer></app-drawer>)

---

# 시멘틱 태그

검색 엔진은 시맨틱 태그를 기준으로 웹 페이지의 내용을 판단하고 인덱싱을 합니다.

시멘틱 태그로 분류되는 태그들은 다음과 같습니다.

```html
<article></article>
<aside></aside>
<details></details>
<figcaption></figcaption>
<figure></figure>
<footer></footer>
<header></header>
<main></main>
<mark></mark>
<nav></nav>
<section></section>
<summary></summary>
<time></time>
```

http://makestory.net/media/#/view/73

---

# 태그 종류

## 구조

- div (division 약자)  
  div 는 블록 레벨 엘리먼트를 묶는 목적으로 사용하고, 인라인 엘리먼트를 지정하거나 묶을 떄는 span 을 사용

## 제목

## 목록

- ol
  순서가 있는 목록

- ul
  순서가 없는 목록

- dl
  용어를 설명하는 목록

- li
  목룍을 나열할 때는 li (list item) 태그 사용

## 글자

- em
  강제(강조)

- strong
  강죠

## 테이블

- scope 속성
  scope 속성은 테이블의 th 또는 td 등의 해당 셀에게 사용하며 컬럼(column)인지 행(row)인지의 여부를 알려주는 역활을 합니다. 그리하여 작성된 코드가 시각 장애인용 리더기를 통해 읽어지는 경우 해당하는 속성값에 따라 어떤 순서로 읽을지 결정하게 됩니다.

---

# details

보이기/숨기기 토글(Toggle) HTML  
https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details

# dialog

커스텀 alert / confirm HTML  
https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog
