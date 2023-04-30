`새로운 CSS 레이아웃` 책 내용 중

justify-content 속성은 주축,
즉 flex-direction 이 row 라면 가로 줄,  
flex-direction 이 column 이라면 칼럼상에서 동작합니다.

justify-content 의 초기값은 flex-start 입니다.  
반대로 flex-end 로 설정한다면 아이템이 컨테이너의 끝에 늘어섭니다.

```css
.cards {
  display: flex;
  justify-content: flex-end;
}
```
