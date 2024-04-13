# 시멘틱(Semantic)

https://developer.mozilla.org/ko/docs/Glossary/Semantics

프로그래밍에서, 시맨틱은 코드 조각의 '의미'를 나타냅니다.

예를 들어, ("이게 어떻게 시각적으로 보여질까?" 보다는),  
이 JavaScript 라인을 실행하는 것은 어떤 효과가 있나요?",  
혹은 "이 HTML 엘리먼트가 가진 목적이나 역할은 무엇일까요?"를 들 수 있습니다.

- JavaScript 시맨틱
- CSS 시맨틱
- HTML 시맨틱

## 의미론적 요소들

https://developer.mozilla.org/ko/docs/Glossary/Semantics#%EC%9D%98%EB%AF%B8%EB%A1%A0%EC%A0%81_%EC%9A%94%EC%86%8C%EB%93%A4

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

### details

보이기/숨기기 토글(Toggle) HTML  
https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details

### dialog

커스텀 alert / confirm HTML  
https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog

# `견고한 UI 설계를 위한 마크업 가이드`

https://sangkwon-lee.github.io/posts/markUp3/

div, span 요소의 의미
이 둘은 아무런 의미가 없다.

article, aside, nav, section 이 섹셔닝 요소이며
섹셔닝 안에는 h1~6 태그를 함께 사용하곤 한다.  
section, article 은 중첩(section 내부 section 선언 등) 가능

main  
페이지에서 한번 선언
body, div 요소를 제외한 다른 태그들의 자식이 될 수 없다.

aside  
페이지의 주된 내용과 관련이 약해서 구분할 필요가 있는 섹션

nav
현재 사이트 또는 현재 페이지 일부를 링크하고 있는 주요 탐색 섹션  
사이트 또는 페이지의 주요 탐색 경로에 해당하지 않는 빵부스러기 링크, 풋터의 약관, 저작권 고지 같은 링크는 nav로 적절하지 않음
