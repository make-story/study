# img 태그에 확장자 없는 이미지를 써도 잘 작동하는 이유

https://workinprogress.kr/wiki/web/mime-type/

```html
<img src="test/thumbnail" />
```

잘 작동하는 이유는  
브라우저들이 문서를 처리할 때 파일 확장자가 아니라  
`Content-type 헤더에 명시된 MIME type(Multipurpose Internet Mail Extensions)를 보고 구분하기 때문`

https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types

즉,
브라우저는 파일 확장자가 아닌 MIME 유형을 사용하여 URL 처리 방법을 결정하므로  
`웹 서버가 응답 Content-Type 헤더에 올바른 MIME 유형을 보내는 것이 중요`
