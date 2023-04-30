# will-change

값이 변경될 속성에 대한 힌트  
웹이 정적 문서를 위한 플랫폼에서 동적으로 상호작용하는 복잡한 어플리케이션을 위한 플랫폼으로 진화함에 따라, opacity, transform 등의 CSS 속성 값이 동적으로 변화는 상황이 갈수록 자주 생긴다.  
이 때, will-change 속성을 사용해 브라우저에게 엘리먼트의 어떤 속성이 높은 확률로 변할 것인지 힌트를 줄 수 있다. 브라우저는 이 힌트를 사용해 앞으로 일어날 변화에 미리 대비해 더 매끄러운 트랜지션을 구사할 수 있다.

```css
will-change: auto; /* 기본값 */
will-change: scroll-position; /* 엘리먼트의 스크롤 위치가 바뀔 것 */
will-change: contents; /* 엘리먼트의 컨텐츠 중 일부가 바뀔 것 */

/* 혹은 특정 CSS 속성을 명시할 수 있다. */
/* transform, opacity, top, left, right, bottom 정도가 자주 사용된다. */
will-change: transform;
will-change: left, top; /* 여러 속성을 동시에 명시할 수도 있다. */
```

당연하지만, 이런 준비 작업에는 비용이 든다.  
필요하지 않은 상황에서도 will-change 속성을 너무 남발한다면 오히려 성능 저하가 일어날 수 있음을 유의하라. 기본적으로 CSS 속성 값 변경이 성능 문제 없이 잘 동작할 때는 will-change 를 직접 건드리지 않는 것이 좋다.

---

# 랜더링 성능을 향상 시키는 새로운 CSS 속성 content-visibility

content-visibility는 UserAgent가 layout, painting을 포함한 요소의 렌더링 작업을 필요로할 때까지 생략할 수 있도록 합니다.  
콘텐츠의 대부분이 화면 밖에 있을 때, content-visibility을 활용해서 렌더링을 생략하게 되면 사용자의 초기 로드 시간이 훨씬 빨라집니다.  
또한, 화면 내 콘텐츠와 더 빠르게 상호작용할 수 있습니다.
