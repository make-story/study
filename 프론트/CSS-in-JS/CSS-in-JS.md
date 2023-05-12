# Styles and CSS

https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration

## inline styles

```javascript
const h1Styles = {
  backgroundColor: 'rgba(255, 255, 255, 0.85)',
  position: 'absolute',
  right: 0,
  bottom: '2rem',
  padding: '0.5rem',
  fontFamily: 'sans-serif',
  fontSize: '1.5rem',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
};
```

> csstype 활용

```bash
$ npm install csstype
```

```javascript
import CSS from 'csstype';

const h1Styles: CSS.Properties = {
  backgroundColor: 'rgba(255, 255, 255, 0.85)',
  position: 'absolute',
  right: 0,
  bottom: '2rem',
  padding: '0.5rem',
  fontFamily: 'sans-serif',
  fontSize: '1.5rem',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
};
```

## Emotion

https://emotion.sh/docs/typescript

```bash
$ npm install --save @emotion/core
$ npm install --save @emotion/styled
```

```javascript
/** @jsx jsx */
// the line above activates the jsx factory by emotion
import { css, jsx } from '@emotion/core';

const h1Style = css({
  backgroundColor: 'rgba(255, 255, 255, 0.85)',
  position: 'absolute',
  right: 0,
  bottom: '2rem',
  padding: '0.5rem',
  fontFamily: 'sans-serif',
  fontSize: '1.5rem',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
});

export function Heading({ title }: { title: string }) {
  return <h1 css={h1Style}>{title}</h1>;
}
```

확장

```javascript
const h1Style = css({
  ...originalStyles,
  ...maybeMixedWithOtherStyles,
});
```

styled

```javascript
/** @jsx jsx */
import styled from '@emotion/styled';
import { jsx } from '@emotion/core';

const LayoutWrapper = styled('div')`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 1rem;
`;

type LayoutProps = {
  children: React.ReactNode,
};

export function Layout({ children }: LayoutProps) {
  return <LayoutWrapper>{children}</LayoutWrapper>;
}
```

## Styled Components

https://styled-components.com/

```bash
$ npm install @types/styled-components
```

```javascript
import styled from 'styled-components';

export const Heading = styled.h1`
  font-weight: normal;
  font-style: italic;
`;
```

> CSS 속성을 특정 값으로 제한하거나 사용자 지정 속성을 일반 CSS 속성에 전달  
> https://styled-components.com/docs/api#typescript

```javascript
type FlexProps = {
  direction?: 'row' | 'column',
};

export const Flex =
  styled.div <
  FlexProps >
  `
	display: flex;
	flex-direction: ${props => props.direction};
`;

// use it like that:
const el = <Flex direction='row'></Flex>;
```

---

# styled-components 와 emotion 차이

https://velog.io/@bepyan/styled-components-%EA%B3%BC-emotion-%EB%8F%84%EB%8C%80%EC%B2%B4-%EC%B0%A8%EC%9D%B4%EA%B0%80-%EB%AD%94%EA%B0%80
