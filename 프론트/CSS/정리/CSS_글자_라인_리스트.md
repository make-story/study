# overflow-wrap

오버플로우가 일어날 때 단어 내 줄바꿈 처리

```html
<div class="example-container">
  <div style="width: 200px; border: 1px solid black; word-break: keep-all; overflow-wrap: break-word;">
    굉장히길고엄청나게길면서굉장히길고엄청나게길면서굉장히길고엄청나게길면서굉장히길고엄청나게길면서의미는없는문자열
  </div>
</div>
```

```css
overflow-wrap: normal; /* 기본 */
overflow-wrap: break-word; /* 오버플로우가 일어나면 단어를 쪼개서 줄바꿈 */
```

---

# list-style-position

리스트 마커 위치 지정  
리스트 아이템 앞에 따라오는 리스트 마커는 기본적으로 li 태그 바깥에 위치한다.  
list-style-position 속성의 값으로 inside를 줘서 마커가 li 태그 안로 들어오도록 설정할 수 있다.

```html
<ul style="padding-left: 20px; list-style-position: inside;">
  <li>1</li>
  <li>2</li>
  <li>3</li>
</ul>
```

```css
list-style-position: inside; /* 마커가 `li` 태그 안에 위치 */
list-style-position: outside; /* 마커가 `li` 태그 바깥에 위치 */
```
