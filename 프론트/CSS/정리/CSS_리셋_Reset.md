`CSS 설계 실전 가이드` 책 내용 중

# 리셋 CSS (Reset CSS)

모든 브라우저의 기본 스타일은 조금씩 다릅니다.  
이를 통일하지 않은 채 CSS를 만들면 '어떤 브라우저에서는 의도한 대로 깔끔하게 보이지만, 다른 브라우저에서는 의도한 대로 표시되지 않는' 상황이 발생합니다.

이 문제를 해결하기 위해서는 베이스 스타일을 정의해야 합니다.  
현재 일반적으로 하드 리셋(Hard Reset)이라는 방법과 노멀라이즈(Normalize)라는 방법을 사용합니다.

## 하드 리셋 계열 CSS

하드 리셋 계열 CSS 는 긴 역사를 가지고 있으며 최초의 리셋 CSS 라고 불리는 것은 2004년까지 거슬러 올라갑니다.  
지금이야 리셋 CSS 는 하드 리셋 계열과 노멀라이즈 계열 두 가지를 포함하는 통합적인 방법을 가리키는 경우가 많지만, 원래 리셋 CSS의 원점은 이 하드 리셋 계열 CSS 입니다.

하드 리셋 계열 CSS 에도 몇 가지 종류가 있으나 공통적인 특징으로서는 각 요소의 여백을 없애거나, 폰트 사이즈를 통일하는 방법 등이 있습니다.

## 노멀라이즈 계열 CSS

2011년경 등장한 노멀라이즈 계열 CSS 는 하드 리셋 계열 CSS 를 대체한다는 목적을 띠고 있습니다.  
브라우저 간 차이 혹은 버그를 없애면서 유용한 기본 스타일은 그대로 활용하는 노멀라이즈 계열 CSS 는 기본 스타일에 가까운 형태로 스타일을 정의할 수 있는 점이 특징입니다.  
그뿐만 아니라 세세한 사용성(Usability) 향상을 위한 스타일도 정의되어 있습니다.

---

# 대표적인 종류 하드 리셋 CSS

- HTML5 Doctor Reset CSS
  http://html5doctor.com/html-5-reset-stylesheet/
- css-wipe
  https://github.com/stackcss/css-wipe
- Reset CSS(Eric Meyer's CSS reset)
  http://meyerweb.com/eric/tools/css/reset/
- Tinyreset-tiny CSS reset for the modern web
  https://github.com/shankariyerr/tinyreset

# 대표적인 Normalize 계열 CSS

- Normalize.css
  http://necolas.github.io/normalize.css/
- sanitize.css
  https://csstools.github.io/sanitize.css/
- ress - Mordern CSS reset
  https://github.com/filipelinhares/ress
