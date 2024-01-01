# Next.js CSS-in-JS

Next.js 공식 페이지에서 'Using Pages Router' 와 'Using App Router' 방식 선택해서 가이드 페이지 확인필요!!

apps (리액트 서버 컴포넌트) 방식 이전 Next.js 버전은 'Using Pages Router' 참고!!

https://nextjs.org/docs/pages/building-your-application/styling/css-in-js

https://github.com/vercel/next.js/tree/canary/examples/with-styled-components

\_document.tsx

'monorepo.git/apps/vertical/src/pages/\_document.tsx' 참고!!

```jsx
import type { DocumentContext, DocumentInitialProps } from 'next/document';
import Document from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext,
  ): Promise<DocumentInitialProps> {
    // '모던 리액트 Deep Dive' 책 내용 중
    // ServerStyleSheet 는 styled-components 의 스타일을 서버에서 초기화해 사용되는 클래스다.
    // 이 클래스를 인스턴스로 초기화하면 서버에서 styled-components 가 작동하기 위한 다양한 기능을 가지고 있다.
    const sheet = new ServerStyleSheet();
    // '모던 리액트 Deep Dive' 책 내용 중
    // originalRenderPage 는 ctx.renderPage 를 담아두고 있다.
    // 즉, 기존의 ctx.renderPage 가 하는 작업에 추가적으로 styled-components 관련 작업을 하기 위해 별도 변수로 분리했다.
    const originalRenderPage = ctx.renderPage;

    try {
      // '모던 리액트 Deep Dive' 책 내용 중
      // ctx.renderPage 에는 기존에 해야 하는 작업과 함께 enhanceApp,
      // 즉 App 을 렌더링할 때 추가로 수행하고 싶은 작업을 정의했따.
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        });

      // '모던 리액트 Deep Dive' 책 내용 중
      // 기존의 _document.tsx 가 렌더링을 수행할 때 필요한 getInitialProps 를 생성하는 작업을 한다.
      const initialProps = await Document.getInitialProps(ctx);
      // '모던 리액트 Deep Dive' 책 내용 중
      // 기존에 기본적으로 내려주는 props 에 추가적으로 styled-components 가 모아둔 자바스크립트 파일 내 스타일을 반환한다.
      // 이렇게 되면 서버 사이드 렌더링 시에 최초로 _document 렌더링될 때, styled-components 에서 수집한 스타일도 함께 내려줄 수 있다.
      return {
        ...initialProps,
        styles: [initialProps.styles, sheet.getStyleElement()],
      };
    } finally {
      sheet.seal();
    }
  }
}
```

\_app.tsx

```jsx
import type { AppProps } from 'next/app';
import { ThemeProvider, type DefaultTheme } from 'styled-components';
import GlobalStyle from '@/components/globalstyles';

const theme: DefaultTheme = {
  colors: {
    primary: '#111',
    secondary: '#0070f3',
  },
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
```

'모던 리액트 Deep Dive' 책 내용 중  
바벨 대신 swc 를 사용한다면 next.config.js 에 다음과 같이 compiler.styledComponents 를 추가하면 된다.

별도의 바벨 설정 없이 swc 와 함께 사용 가능한 CSS-in-JS 라이브러리는  
현재 Next.js 만든 styled-jsx, styled-components, Emotion 이 있다.

```javascript
/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
```
