# JSON-LD
JSON-LD 는 JavaScript Object Notation for Linked Data 의 줄임말로서  
`json 으로 Linked Data 를 인코딩하는 방식`입니다.  

- google webmasters 에서는 기본적인 선택만으로 이를 자동으로 생성 
https://www.google.com/webmasters/markup-helper/?hl=ko

`해당 코드를 복사해서 head 태그 밑에 붙여넣으면 검색 봇이 이를 감지`   


```javascript
//JSON-LD 형식
<script type="application/ld+json">
{
 "@context": "http://schema.org",
 "@type": "Person",
 "name": "My Site Name",
 "url": "http://www.mysite.com",
 "sameAs": [
   "https://www.facebook.com/myfacebook",
   "http://blog.naver.com/myblog",
   "http://storefarm.naver.com/mystore"
 ]
}
</script>
```