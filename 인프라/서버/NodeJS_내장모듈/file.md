# path

## path.resolve([from ...], to) 

- to를 절대경로로 변환한다. to가 절대경로가 아니면 절대경로를 찾을 때까지 from 아규먼트들을 우측에서 좌측의 순서로 앞에 이어붙힌다.

## path.normalize(path) 

- '..'와 '.' 부분을 처리해서 문자열 경로를 정규화한다.
- 슬래시가 여러 개 있는 경우 슬래시 하나로 교체하고 경로의 마지막에 슬래시가 있는 경우에는 유지한다

## path.dirname(filePath);

- 디렉토리 추출후 출력
- 경로의 디렉토리이름을 반환한다. Unix의 dirname 명령어와 비슷하다.

## path.basename(filePath);

- 파일명 추출후 출력
- 경로의 마지막 부분을 반환한다. Unix의 basename 명령어와 비슷하다.

## path.extname(filePath); 

- 파일확장자 추출후 출력
- 경로의 마지막 부분의 문자열에서 마지막 '.'에서부터 경로의 확장자를 반환한다. 경로의 마지막 부분에 '.'가 없거나 첫 글자가 '.'이라면 빈 문자열을 반환한다.

## path.basename(filePath, path.extname(filePath));

- 파일명 추출시 확장자 제외후 출력

## 확장자 검사

```javascript
const imageExt = [".jpg", ".jpeg", ".png", ".webp", ".svg", ".gif"];
if (imageExt.includes(path.extname(output).toLowerCase())) {
  // ...
}
```
