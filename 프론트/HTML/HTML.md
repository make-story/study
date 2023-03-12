# HTML 검사기

https://validator.w3.org/unicorn/?ucn_lang=ko

# HTML 5.1 정리 / HTML 5.2 미리보기

https://wit.nts-corp.com/2017/03/02/4338

# HTML5 비디오 플레이어 마크업 작업기

https://wit.nts-corp.com/2017/08/08/4818

---

# Self-Closing, void-element

https://html.spec.whatwg.org/multipage/syntax.html#void-elements  
https://www.devkuma.com/docs/html/html-self-closing-tags/

HTML 에는 Self-Closing 라는 것이 있습니다.
흔히 우리가 알고 있는 `<img />` 처럼 닫기 태그를 별도로 두는 것이 아닌,  
선언과 종료를 하나의 태그에서 할 수 있는 태그입니다.

HTML5에 self-closing 태그의 전체 목록은 다음과 같다.

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

## 엔딩 슬래시는 선택 사항인가?

- HTML5 : 슬래시는 선택 사항이다.
- HTML4 : 슬래시는 기술적으로 유효하지 않다. 그러나 W3C의 HTML 유효성 검사기에서 허용된다.
- XHTML : 슬래시가 필요하다.

recommend to always add the slash. Because, it provides a visual clue of non-closing tags.
`항상 슬래시를 추가하는 것이 좋다. 왜냐하면 non-closing 태그는 시각적으로 가독성을 높여준다.`

---

# 태그 종류

- 구조
  div (division 약자)  
  div 는 블록 레벨 엘리먼트를 묶는 목적으로 사용하고, 인라인 엘리먼트를 지정하거나 묶을 떄는 span 을 사용

- 제목
- 목록
- 글자
- 테이블

---

# details

보이기/숨기기 토글(Toggle) HTML  
https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details

# dialog

커스텀 alert / confirm HTML  
https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog
