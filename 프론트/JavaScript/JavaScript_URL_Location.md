# window.location

https://im-developer.tistory.com/219

```
// 아래 2개는 완전히 같다.
location = 'http://www.example.com';
location.href = 'http://www.example.com';
```

## [Location.ancestorOrigins]

주어진 Location 객체와 연관된 document 의 모든 조상 browsing context 들이 역순으로 담긴 static 한 DOMStringList 이다.

## [Location.href]

전체 URL을 담고있는 USVString 을 리턴하는 stringifier 이다.  
값이 바뀌면 연관된 document 는 새로운 페이지로 이동한다.

## [Location.protocol]

URL의 프로토콜 스키마를 담고 있는 USVString 이다.  
(마지막 :를 포함한다.)

## [Location.host]

host를 담고 있는 USVString 이다.  
(:와 URL의 포트번호를 포함한다.)

## [Location.hostname]

URL의 도메인을 담고 있는 USVString 이다.

## [Location.port]

URL의 포트 번호를 담고 있는 USVString 이다.

## [Location.pathname]

최초 / 뒤에 나오는 path 들을 담고 있는 USVString 이다.  
(query string 이나 fragment 는 포함하지 않는다.)

## [Location.search]

? 를 포함하여 그 뒤에 나오는 URL 의 파라미터나 querystring 을 담은 USVString 이다.
모던 브라우저들은 querystring 으로부터 parameter 들을 쉽게 파싱할 수 있도록 URLSearchParams 나 URL.searchParams 등을 제공해준다.

## [Location.hash]

\# 를 포함하여 뒤에 나오는 fragment 식별자를 담은 USVString 이다.

## [Location.origin]

Read only - 대표 URL origin 의 유니코드 직렬화를 담고 있는 USVString 이다.

## [Location.assign()]

파라미터로 전달한 URL에서 리소스를 로드한다.

## [Location.reload()]

리프레시 버튼과 같이 현재의 URL 을 다시 로드한다.

## [Location.replace()]

(파라미터로 전달된 URL로 리다이렉트하면서) 전달된 URL의 리소스로 현재의 리소스를 교체한다.

assign() 메소드나 href 속성을 교체하는 것과 replace() 가 다른 점
replace() 를 사용하고나면 현재의 페이지는 session History 에 저장되지 않는다. 이 말은 back 버튼을 눌러도 다시 이 전 페이지로 이동할 수 없다는 뜻이다.

## [Location.toString()]

전체 URL 을 담고 있는 USVString 을 리턴한다.  
HTMLHyperlinkElementUtils.href 와 동일한 기능이지만 값을 수정하기 위해 사용할 수는 없다.

---

아래 3개는 완전히 동일한 기능(새 URL로 이동)을 한다.

```
window.location.assign(url);
window.location = url;
window.location.href = url;
```
