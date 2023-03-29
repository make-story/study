# 웹접근성 진단

https://accessibility.kr/

# 마크업 검사

http://validator.kldp.org/

# CSS 검사

http://css-validator.kldp.org/

# 링크 검사

http://validator.kldp.org/checklink

# 네이버 운영 웹접근성

https://nuli.navercorp.com/

# 한국 웹접근성 그룹

http://kwag.net

# 접근성 (Accessibility)

W3C에 정의된 웹접근성이란 ‘장애를 가진 사람들이 웹을 사용할 수 있도록 돕는 것’을 의미한다. 넓은 의미에서의 접근성이란 웹을 통한 차별 없는 정보 전달을 의미한다.  
‘접근성’이란 말은 모든 사용자들이 모든 정보를 똑같은 방식으로 제공받는 것을 의미하는 것이 아니라, 모든 사용자들이 정보를 어떤 방법으로든 접근할 수 있어야 한다는 의미이다.

# 한국형 웹 콘텐츠 접근성 지침

우리나라의 경우에는 WAI에서 정한 웹 콘텐츠 접근성 지침을 바탕으로 한국적 특수성을 고려하여 웹 접근성을 준수하기 위한 KWCAG 1.0(2005. 12. 21. 제정)을 발표했습니다. 이후 2009년 12월 23일 KWCAG 2.0이 확정되었으며, 2010년 12월 31일부로 국가 표준으로 제정되었습니다. (2015년 3월 31일 지침 2.1 개정)

https://www.wah.or.kr:444/Participation/guide.asp

---

# 검색엔진 최적화 SEO (Search Engine Optimization)

## 관련 태그(tag) - title, meta, Open Graph

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

---

## 네이버 제공 검색엔진 최적화 진단

https://searchadvisor.naver.com/

## 페이스북 도구 (공유 디버거)

https://developers.facebook.com/tools/debug  
https://developers.facebook.com/webmaster/

## 구글 인증 메타 태그

```html
<!-- 구글 검색엔진 노출을 위해 메타태그에 구글 소유자 인증 코드를 삽입 //-->
<meta name="google-site-verification" content="n-Z2dE2FJr4Zf9LYV2NsVVNbk-Nf9aqWaVEggT9AUrs" />
```

## 구글 웹마스터 도구

https://search.google.com/search-console

---

## JSON-LD, 구조화된 데이터

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
