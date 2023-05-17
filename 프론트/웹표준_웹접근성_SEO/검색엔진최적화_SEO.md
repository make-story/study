# 검색 엔진 최적화 (Search Engine Optimization, SEO)

## SEO 대응 관련 태그(tag) - title, meta, Open Graph

https://www.w3schools.com/tags/tag_meta.asp

```html
<title>메타 태그를 통한 검색엔진 최적화</title>

<meta name="theme-color" content="#FFFFFF" />
<meta name="title" content="{metaTitle}" />
<meta name="description" content="{metaDesc}" />
<meta name="writer" content="{companyName}" />
<meta name="keywords" content="{metaKeywords}" />

<!-- Open Graph //-->
<meta property="og:type" content="website" />
<meta property="og:url" content="{metaUrl}" />
<meta property="og:title" content="{metaTitle}" />
<meta property="og:description" content="{metaDesc}" />
<meta property="og:image" content="{metaImage}" />
<meta property="og:site_name" content="{companyName}" />
<meta property="og:locale" content="ko_KR" />
<meta property="twitter:title" content="{metaTitle}" />
<meta property="twitter:description" content="{metaDesc}" />
<meta property="twitter:url" content="{metaUrl}" />
<meta property="twitter:image" content="{metaImage}" />
<meta property="twitter:card" content="summary_large_image" />
```

## 리다이렉트 정책 (검색엔진)

기존에 존재했으나 없어진 페이지 또는 경로가 변경된 페이지는  
302리다이렉트가 아닌, 301리다이렉트로 해야함  
그래야 검색엔진에서 해당 페이지는 없어지고, 다른 페이지로 변경되었다고 인식함 (302는 검색엔진에서 임시로 이동하는 페이지로 인식)

https://developer.mozilla.org/ko/docs/Web/HTTP/Status/301

## H1 태그

H1, H2, H3 등의 html 태그는 글의 구조를 나타내기 위한 heading 태그

H1 태그는 페이지내 하나만 있어야 하는가, 구글엔지니어 답변  
https://www.youtube.com/watch?v=zyqJJXWk0gk

영상 30초 부근에, 다음과 같이 설명하고 있다.  
"Our system don't have a problem when it comes to multiple h1 headings(tags) on a page.". 번역하면 다음과 같다.  
"우리의 시스템은 한 페이지에 여러 h1 헤딩(태그)이 있는 것에 관하여 문제가 없다." 뒤이어, 이는 웹에서 매우 일반적이며, heading 태그를 맥락을 이해하는 데 활용한다고 설명한다.  
더욱 중요한 것은, heading 태그를 '구조화된 형식으로' 사용하는 것이 사용자가 이해하기 용이한 페이지 구조이며, 이 문제에 관해서는 SEO 가 아닌 사용자의 관점에서 생각해야 한다고 지적한다.

## robots.txt 작성

robots.txt 파일은 크롤러가 사이트에서 액세스할 수 있는 URL을 검색엔진 크롤러에 알려 줍니다.

https://www.google.com/robots.txt

```
User-agent: *
Disallow: /search
Allow: /search/about
Allow: /search/howsearchworks
Disallow: /auth
Disallow: /account
...
```

## 페이스북의 Applinks와 구글의 link 태그를 통해 앱 내 콘텐츠를 검색에 노출하기를 권장

Applinks 태그는 2014년 페이스북 개발자 컨퍼런스인 F8에서 처음 발표된 딥링크 표기법입니다.  
딥링크는 앱 내 특정 페이지로 바로 향하는 URL로 HTTP형식이거나 커스텀 URL Scheme으로 설정될 수 있으며,  
예를 들어 고양이 관련 앱의 12번 고양이 정보 상세 페이지로 향하는 URL은 goyangzoa://cat/12와 같이 될 것입니다.

```html
<head>
  <meta property="al:ios:url" content="applinks://docs" />
  <meta property="al:ios:app_store_id" content="12345" />
  <meta property="al:ios:app_name" content="App Links" />
  <meta property="al:android:url" content="applinks://docs" />
  <meta property="al:android:app_name" content="App Links" />
  <meta property="al:android:package" content="org.applinks" />
  <meta property="al:web:url" content="http://applinks.org/documentation" />
</head>
```

`link[rel=alternate] 태그`는 구글이 현재 안드로이드 딥링크 표기를 위해 권장하고 있는 방식입니다. 아래와 같이 적용할 수 있습니다.

```html
<head>
  <link rel="alternate" href="android-app://com.example.android/example/gizmos" />
</head>
```

---

## JSON-LD, 구조화된 데이터 (구조화된 스키마 등록)

유저가 검색을 했을 때 검색 페이지 상에 사이트의 정보를 더 풍성하게 제공하는 방법이 바로 스키마 마크업 데이터를 검색 로봇에 제공하는 것입니다.

구조화된 정보를 표현하려면 schema.org 의 표준을 참고

https://ssungkang.tistory.com/entry/SEO-JSON-LD-%EA%B5%AC%EC%A1%B0%ED%99%94%EB%90%9C-%EB%8D%B0%EC%9D%B4%ED%84%B0-%EC%B6%94%EA%B0%80

```html
<script key="seoJson-XXX" type="application/ld+json" dangerouslySetInnerHTML=""></script>
```

### 스키마 마크업

스키마 마크업은 html 이 각 데이터에 대한 설명을 나타내주기에는 부족하기 때문에 이에 설명을 추가해주는 것을 말합니다.  
http://schema.org/

### JSON-LD

JSON-LD 는 JavaScript Object Notation for Linked Data 의 줄임말로서 json 으로 Linked Data 를 인코딩하는 방식입니다.

```json
{
  "@context": {
    "name": "http://xmlns.com/foaf/0.1/name",
    "homepage": {
      "@id": "http://xmlns.com/foaf/0.1/workplaceHomepage",
      "@type": "@id"
    },
    "Person": "http://xmlns.com/foaf/0.1/Person"
  },
  "@id": "https://me.example.com",
  "@type": "Person",
  "name": "John Smith",
  "homepage": "https://www.example.com/"
}
```

google webmasters 에서는 기본적인 선택만으로 이를 자동으로 생성해줍니다.

https://www.google.com/webmasters/markup-helper/u/0/?hl=ko
