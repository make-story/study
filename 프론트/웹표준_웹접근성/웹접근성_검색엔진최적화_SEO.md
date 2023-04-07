# 접근성 가이드

https://accessibility.naver.com/accessibility

## 대체 텍스트

```html
<img src="160314.png" alt="모두를 위한 정보 접근성" /> <img src="160314.png" alt="" />
```

## 자막 제공

멀티미디어 콘텐츠에는 자막, 대본 또는 수화를 제공

## 콘텐츠 구분

특정한 색을 구별할 수 없는 사용자나 흑백 디스플레이 사용자와 같이 색상만으로 콘텐츠를 구분하지 못할 경우,  
다양한 감각을 통해서 인식하므로 화면에 표시되는 모든 정보는 두가지 이상의 구분자가 필요합니다.

## 명도 대비

저시력자, 고령자 등도 인식할 수 있도록 콘텐츠와 배경 간의 명도 대비는 4.5:1 이상

## 초점 이동

초점의 이동 순서는 순차적으로 일관성있게 이동해야 합니다.  
일반적으로 페이지의 좌측 상단 영역에서 우측 하단 영역으로 이동하는 것이 원칙입니다.

- 키보드의 Tab키(다음으로 이동)와 Shift + Tab(이전으로 이동)키로 확인해보세요.

1. 초점 이동 순서가 순환적이며, 반복적이어야 합니다.
2. 페이지에 포함된 모든 링크, 버튼, 입력창에 초점이 가야합니다.
3. 사용자가 사용할 수 없는 비활성 요소(버튼, 입력창 등)에는 초점이 가지 않아야 합니다.

## 조작 가능

손떨림이 심하여 미세한 조작이 어려운 경우와 같이 운동 장애가 있는 경우에도 사용자 입력 및 컨트롤은 조작이 가능하도록 제공

- 웹 페이지의 모든 컨트롤은 대각선 방향의 길이를 6mm 이상으로 제공해야 합니다.
- 모바일 화면에서의 터치 오류의 최소화를 위해 컨트롤 크기는 가로와 세로가 9mm x 9mm 이상 되게 하는 것이 좋습니다.
- 링크, 사용자 입력, 기타 컨트롤 등이 안쪽 여백은 1px 이상의 여백을 두는 것이 좋습니다.
- 모바일에서 컨트롤의 중심 간의 간격은 13mm x 13mm 이상이어야 사용자가 터치 오류를 범할 가능성이 낮아집니다. (최소 9mm 권장)

## 재생 조절 가능

손떨림이 심하여 미세한 조작이 어려운 경우와 같이 운동 장애가 있는 경우에도 사용자 입력 및 컨트롤은 조작이 가능하도록 제공

- 영상이나 배경음과 같은 소리는 자동으로 재생되지 말아야 합니다. (단, 자동으로 재생되는 배경음의 지속시간이 3초 미만일 경우 허용)
- 시간 제한이 있는 콘텐츠는 응답시간을 조절하거나 콘텐츠를 제어할 수 있는 수단을 제공해야 합니다.
- 자동으로 변경되는 배너, 텍스트 스크롤 등과 같은 콘텐츠는 정지 기능을 제공하여 움직임을 제어할 수 있어야 합니다. (이미지 슬라이드)

## 사용자 요구에 따른 실행

시각이나 청각 장애가 있는 사용자가 직접 마우스로 클릭하거나 키보드로 입력하지 않고도 자동으로 팝업 창이 오픈되거나 새로운 기능이 실행되면 그것을 인지 하기 어렵습니다. 그러므로 사용자가 의도하지 않은 기능(새 창, 초점에 의한 맥락 변화 등)은 실행되지 않아야 합니다.

마우스 활용에 능숙하지 못한 시각 장애 사용자나 운동 장애 사용자의 경우, 목록 선택시 바로 해당 페이지로 이동하게 되면 이전 페이지로 되돌아오기 어렵습니다.
예를 들어, select box 선택과 동시에 특정 기능 실행 또는 input 입력 후 포커스 아웃이 되면 자동 특정 기능 실행 등

## 오류 정정

화면 낭독 프로그램을 이용하는 (시각 장애)사용자의 경우, 입력 오류가 발생 했을때 무엇이 잘못 되었는지 알 수가 없어서 입력 전체를 포기할 가능성이 있습니다.  
그러므로 입력 오류가 발생할 경우 이를 쉽게 찾아서 정정할 수 있는 방법을 제공해야 합니다.

예를 들어, e-mail 입력의 경우 예시 제공 또는 특정 입력이 잘못되었을 경우 예시 메시지 제공 등

---

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

https://www.w3.org/WAI/fundamentals/components/ko

https://nuli.navercorp.com/community/article/1133108

명도대비 검사 도구  
https://accessibility.naver.com/acc/guide_04

---

# 검색엔진 최적화 SEO (Search Engine Optimization)

## 카카오 SEO 개선 사례

https://fe-developers.kakaoent.com/2022/221208-basic-seo-guide/

## 네이버 제공 검색엔진 최적화 진단

https://searchadvisor.naver.com/

## 페이스북 도구 (공유 디버거)

https://developers.facebook.com/tools/debug  
https://developers.facebook.com/webmaster/

## 구글 웹마스터 도구

https://search.google.com/search-console

### 구글 인증 메타 태그

```html
<!-- 구글 검색엔진 노출을 위해 메타태그에 구글 소유자 인증 코드를 삽입 //-->
<meta name="google-site-verification" content="n-Z2dE2FJr4Zf9LYV2NsVVNbk-Nf9aqWaVEggT9AUrs" />
```

## MS 웹마스터

https://www.bing.com/webmasters/about

---

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
