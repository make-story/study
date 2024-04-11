# React HTML 출력

`study.git/보안/리액트_웹페이지보안.md` 참고!

## dangerouslySetInnerHTML

```tsx
import sanitizeHtml from 'sanitize-html';

const getTranslated = (text: string) => {
  const sanitizedText = sanitizeHtml(text, {
    allowedTags: ['br', 'em', 'span'], //허용할 태그 지정
  });
  return { __html: sanitizedText };
};

const html = '<p>test</p>';
export default function () {
  return <p dangerouslySetInnerHTML={getTranslated(html)}></p>;
}
```

## children 부분 초기화된 CSS 노출

```tsx
/**
 * children 부분 초기화된 CSS 노출
 */
import React, { ReactElement } from 'react';
import ReactMarkdown, { Options } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styled from '@emotion/styled';

type MarkdownProps = Options;

const Styled = {
  MarkdownWrap: styled.div`
    & > * {
      all: revert;
    }
  `,
  SanitizeWrap: styled.div`
    white-space: initial;
    & * {
      all: revert !important;
    }
  `,
};

function Markdown({ children, ...props }: MarkdownProps): ReactElement {
  return (
    <Styled.MarkdownWrap>
      <ReactMarkdown {...props} remarkPlugins={[remarkGfm]}>
        {children}
      </ReactMarkdown>
    </Styled.MarkdownWrap>
  );
}

export default Markdown;
```
