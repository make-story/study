# 웹접근성용 테이블 속성

scope 속성은 테이블의 th 또는 td 등의 해당 셀에게 사용하며 컬럼(column)인지 행(row)인지의 여부를 알려주는 역활을 합니다. 그리하여 작성된 코드가 시각 장애인용 리더기를 통해 읽어지는 경우 해당하는 속성값에 따라 어떤 순서로 읽을지 결정하게 됩니다.

```html
<table>
  <caption class="screen-reader">
    테이블 내용 설명
  </caption>
  <colgroup>
    <col width="37%" />
    <col width="26%" />
    <col width="37%" />
  </colgroup>
  <thead>
    <tr>
      <th scope="col">A</th>
      <th scope="col">B</th>
      <th scope="col">C</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td spope="row">내용1</td>
      <td>1</td>
      <td>2</td>
    </tr>
    <tr>
      <td spope="rowgroup" rowspan="5">내용2</td>
      <td>1</td>
      <td>2</td>
    </tr>
    <tr>
      <td>1</td>
      <td>2</td>
    </tr>
    <tr>
      <td>1</td>
      <td>2</td>
    </tr>
    <tr>
      <td>1</td>
      <td>2</td>
    </tr>
    <tr>
      <td>1</td>
      <td>2</td>
    </tr>
  </tbody>
</table>
```
