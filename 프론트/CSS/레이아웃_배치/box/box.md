# display: box;

https://developer.mozilla.org/en-US/docs/Web/CSS/box-align

`더 이상 사용하지 않는 비표준 방식`

```css
div {
  width: 350px;
  height: 100px;
  border: 1px solid black;

  /* Internet Explorer 10 */
  display: -ms-flexbox;
  -ms-flex-pack: center;
  -ms-flex-align: center;

  /* Firefox */
  display: -moz-box;
  -moz-box-pack: center;
  -moz-box-align: center;

  /* Safari, Opera, and Chrome */
  display: -webkit-box;
  -webkit-box-pack: center;
  -webkit-box-align: center;

  /* W3C */
  display: box;
  box-pack: center;
  box-align: center;
}
```
