# Grid

https://heropy.blog/2019/08/17/css-grid/

# 제너레이터

https://cssgrid-generator.netlify.app/

---

https://studiomeal.com/archives/533

# 그리드 형태 정의

grid-template-rows
grid-template-columns
컨테이너에 Grid 트랙의 크기들을 지정해주는 속성

```css
.container {
  grid-template-columns: 200px 200px 500px;
  /* grid-template-columns: 1fr 1fr 1fr */
  /* grid-template-columns: repeat(3, 1fr) */
  /* grid-template-columns: 200px 1fr */
  /* grid-template-columns: 100px 200px auto */

  grid-template-rows: 200px 200px 500px;
  /* grid-template-rows: 1fr 1fr 1fr */
  /* grid-template-rows: repeat(3, 1fr) */
  /* grid-template-rows: 200px 1fr */
  /* grid-template-rows: 100px 200px auto */
}
```

fr은 fraction, 숫자 비율대로 트랙의 크기를 나눕니다.
1fr 1fr 1fr 은 균일하게 1:1:1 비율인 3개의 column을 만들겠다는 의미

# 간격 만들기

row-gap
column-gap
gap

```css
.container {
  row-gap: 10px;
  /* row의 간격을 10px로 */
  column-gap: 20px;
  /* column의 간격을 20px로 */
}
```

```css
.container {
  gap: 10px 20px;
  /* row-gap: 10px; column-gap: 20px; */
}
```

# 그리드 형태를 자동으로 정의

grid-auto-columns
grid-auto-rows

row 개수를 미리 알 수 없는 경우

```css
.container {
  grid-auto-rows: minmax(100px, auto);
}
```

# 각 셀의 영역 지정 (grid 아이템 위치와 영역범위 설정)

grid-column-start
grid-column-end
grid-column
grid-row-start
grid-row-end
grid-row
-ms-grid-row
-ms-grid-column
-ms-grid-row-span
-ms-grid-column-span

```css
.item:nth-child(1) {
  /* 1번 라인에서 2칸 */
  grid-column: 1 / span 2;
  /* 1번 라인에서 3칸 */
  grid-row: 1 / span 3;
}
```

# 세로 방향 정렬

align-items

```css
.container {
  align-items: stretch;
  /* align-items: start; */
  /* align-items: center; */
  /* align-items: end; */
}
```

# 가로 방향 정렬

justify-items

```css
.container {
  justify-items: stretch;
  /* justify-items: start; */
  /* justify-items: center; */
  /* justify-items: end; */
}
```

## place-items

align-items와 justify-items를 같이 쓸 수 있는 단축 속성
