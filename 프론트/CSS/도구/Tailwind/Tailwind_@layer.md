# @layer

https://leesangwondev.vercel.app/tailwind-css-%EB%98%91%EB%98%91%ED%95%98%EA%B2%8C-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0

@layer 문을 사용하여 tailwind Base, components, utilities 레이어에 스타일을 추가할 수도 있다.

```css
/* main.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .btn {
    background-color: red;
    color: #fff;
    padding: 10px;
  }
}
```

```html
<button className="btn" type="button">button</button>
```

## 테일윈드가 스타일을 3개의 layer로 구성하는 이유

css 스타일이 중복될 때 스타일시트 안에서 마지막에 선언된 클래스의 스타일이 적용된다.

```css
.btn-black {
  color: red;
  background-color: black;
}

.btn-blue {
  background-color: blue;
}

.btn {
  background-color: yellow;
}
```

```html
<button className="btn-black btn-blue btn" type="button">button</button>
```

이런 경우를 관리하기 위해 테일윈드는 3개의 레이어로 구분한다.

- base 레이어는 리셋 규칙이나 HTML 요소 기본 스타일을 위한 레이어이다.
- components 레이어는 유틸리티로 재정의할 수 있는 클래스 기반 스타일을 위한 레이어다.
- utilities 레이어는 다른 스타일보다 우선으로 하는 소규모 단일 목적 클래스를 위한 레이어다.

@layer 문을 사용하면 선언 순서를 제어하고  
hover:btn 처럼 특정 클래스를 사용할 수 있으며  
빌드 시 크기를 줄이기 위해 선언되지 않은 유틸리티 클래스는 제거된다.

## base layer - @layer base

특정 요소에 대한 기본 스타일을 추가하려면 @layer 문을 사용하여 @tailwind base 레이어에 추가한다.

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  h1 {
    @apply text-red-950;
  }

  h2 {
    color: red;
  }
}
```

@apply를 사용하면 테일윈드의 유틸리티 클래스를 사용할 수 있다.

## components layer - @layer components

컴포넌트 레이어는 카드, 버튼과 같이 재사용성이 높은 유틸리티 클래스를 만들 때 사용한다.

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .select2-dropdown {
    @apply rounded-b-lg shadow-md;
  }
  .select2-search {
    @apply rounded border border-gray-300;
  }
  .select2-results__group {
    @apply text-lg font-bold text-gray-900;
  }
  /* ... */
}
```

단순히 코드가 깨끗해 보이기 위해 컴포넌트를 사용해 추상화를 하게 되면 테일윈드의 장점을 잃게 되니  
재사용이 가능한 경우에 사용을 권장한다.

## utilities layer - @layer utilities

유틸리티 레이어는 테일윈드가 제공하지 않은 유틸리티 클래스를 만들 때 사용한다.

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer utilities {
  .content-auto {
    content-visibility: auto;
  }
}
```
