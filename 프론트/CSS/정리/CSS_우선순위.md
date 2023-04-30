# 우선순위

https://developer.mozilla.org/ko/docs/Learn/CSS/Building_blocks/Cascade_and_inheritance#%EC%9A%B0%EC%84%A0_%EC%88%9C%EC%9C%84_specificity_2

1. !important
2. inline style attribute
3. id
4. class, 다른 attribute, 수도클래스(:first-child같은 것)
5. tag element, 수도엘레먼트(::before같은 것)

우선순위가 같다면 개수가 많은 css가 우선순위가 높습니다.

# 캐스케이드 (cascade)

캐스케이드는 각 규칙마다 우선순위를 부여하는 방식으로 동작

style 속성을 사용한 규칙은 어떤 규칙보다도 우선 순위가 높습니다.  
그리고 ID를 사용한 규칙은 ID를 사용하지 않은 규치보다 우선순위가 높습니다.  
또한 클래스 선택자를 사용한 규칙은 타입 선택자만 사용한 규칙보다 우선순위가 높습니다.  
마지막으로 동일한 지정순위를 갖는 규칙일 경우 나중에 나온 규칙이 적용됩니다.

## Cascade Layers

https://wit.nts-corp.com/2022/05/24/6528
CSS Cascade는 CSS의 가장 강력한 강점으로, CSS가 요소에 적용하려는 스타일의 우선순위를 정하는 데 사용하는 알고리즘입니다.
