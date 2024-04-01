# 서버 사이드 렌더링을 위한 리액트 API 살펴보기

`모던 리액트 Deep Dive` 책 내용 중 - p270

리액트에서 서버 사이드 렌더링을 실행할 때 사용되는 API 를 확인해 보려면  
리액트 저장소의 react-dom/server.js 를 확인하면 된다.

https://github.com/facebook/react/blob/main/packages/react-dom/server.js  
https://github.com/facebook/react/blob/main/packages/react-dom/server.node.js

리액트 18 이 릴리즈 되면서 react-dom/server 에 renderToPipeableStream 이 추가됐고,  
나머지는 대부분 지원 중단되는 등 큰 변화를 거쳤다.

## renderToString

renderToString 은 함수 이름에서도 알 수 있듯이 인수로 넘겨받은 리액트 컴포넌트를 렌더링해 HTML 문자열로 반환하는 함수다.

## renderToStaticMarkup

renderToStaticMarkup 은 renderToString 과 매우 유사한 함수다.  
두 함수 모두 리액트 컴포넌트를 기준으로 HTML 문자열을 만든다는 점에서 동일하다.  
(한 가지 유의미한 차이점은 리액트에서만 사요하는 속성을 제거)

## renderToNodeStream

renderToNodeStream 은 renderToString 과 결과문이 완전히 동일하지만 두 가지 차이점이 있다.

- renderToNodeStream 은 브라우저에서 사용하는 것이 완전히 불가능
- 결과물의 타입

`24년 4월 현재 제거됨`  
https://github.com/facebook/react/pull/28607

renderToNodeStream 은 사용자가 renderToPipeableStream 으로 업그레이드해야 한다는 경고와 함께  
React 18부터 더 이상 사용되지 않습니다.

## renderToStaticNodeStream

renderToNodeStream 과 제공하는 결과문은 동일하나, renderToStaticMarkup 과 마찬가지로 리액트 자바스크립트에 필요한 리액트 속성이 제공되지 않는다.

## hydrate - p276

hydrate 함수는 두 개의 함수 renderToString 과 renderToNodeStream 으로 생성된 HTML 콘텐츠에 자바스크립트 핸들러나 이벤트를 붙이는 역할을 한다.

hydrate 는 정적으로 생성된 HTML 에 이벤트와 핸들러를 붙여 완전한 웹페이지 결과물을 만든다.

## 서버 사이드 렌더링 예제 프로젝트

https://github.com/wikibook/react-deep-dive-example/tree/main/chapter4/ssr-example

src/index.tsx

```tsx
import React from 'react';
import { hydrate } from 'react-dom';

import App from './components/App';
import { fetchTodo } from './fetch';

async function main() {
  const result = await fetchTodo();

  const app = <App todos={result} />;
  const el = document.getElementById('root');

  hydrate(app, el);
}

main();
```

src/fetch/index.ts

```tsx
import fetch from 'isomorphic-fetch';

export interface TodoResponse {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export async function fetchTodo() {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos');
  const result: TodoResponse[] = await response.json();
  return result;
  // 스트림의 극단적인 예제를 보고 싶다면 주석 해제
  // return Array(10).fill(result).flat()
}
```

src/components/App.tsx

```tsx
import React, { useEffect } from 'react';

import { TodoResponse } from '../fetch';

import { Todo } from './Todo';

export default function App({ todos }: { todos: Array<TodoResponse> }) {
  useEffect(() => {
    console.log('하이!'); // eslint-disable-line no-console
  }, []);

  return (
    <>
      <h1>나의 할일!</h1>
      <ul>
        {todos.map((todo, index) => (
          <Todo key={index} todo={todo} />
        ))}
      </ul>
    </>
  );
}
```

src/components/Todo.tsx

```tsx
import React, { useState } from 'react';

import { TodoResponse } from '../fetch';

export function Todo({ todo }: { todo: TodoResponse }) {
  const { title, completed, userId, id } = todo;
  const [finished, setFinished] = useState(completed);

  function handleClick() {
    setFinished(prev => !prev);
  }

  return (
    <li>
      <span>
        {userId}-{id}) {title} {finished ? '완료' : '미완료'}
        <button onClick={handleClick}>토글</button>
      </span>
    </li>
  );
}
```

index.html

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>SSR Example</title>
  </head>
  <body>
    __placeholder__
    <script src="https://unpkg.com/react@17.0.2/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@17.0.2/umd/react-dom.development.js"></script>
    <script src="/browser.js"></script>
  </body>
</html>
```

- `__placeholder__` 는 서버에서 리액트 컴포넌트를 기반으로 만든 HTML 코드를 삽입하는 자리다.
- unpkg 는 npm 라이브러리를 CDN 으로 제공하는 웹 서비스다.
- browser.js 는 클라이언트 리액트 애플리케이션 코드를 번들링했을 때 제공되는 리액트 자바스크립트 코드다.

src/server.ts

```typescript
import { createServer, IncomingMessage, ServerResponse } from 'http';
import { createReadStream } from 'fs';

import { renderToNodeStream, renderToString } from 'react-dom/server';
import { createElement } from 'react';

import html from '../public/index.html';
import indexFront from '../public/index-front.html';
import indexEnd from '../public/index-end.html';

import App from './components/App';
import { fetchTodo } from './fetch';

const PORT = process.env.PORT || 3000;

async function serverHandler(req: IncomingMessage, res: ServerResponse) {
  const { url } = req;

  switch (url) {
    case '/': {
      const result = await fetchTodo();

      const rootElement = createElement(
        'div',
        { id: 'root' },
        createElement(App, { todos: result }),
      );
      const renderResult = renderToString(rootElement);

      const htmlResult = html.replace('__placeholder__', renderResult);

      res.setHeader('Content-Type', 'text/html');
      res.write(htmlResult);
      res.end();
      return;
    }

    case '/stream': {
      res.setHeader('Content-Type', 'text/html');
      res.write(indexFront);

      const result = await fetchTodo();
      const rootElement = createElement(
        'div',
        { id: 'root' },
        createElement(App, { todos: result }),
      );

      const stream = renderToNodeStream(rootElement);
      stream.pipe(res, { end: false });
      stream.on('end', () => {
        res.write(indexEnd);
        res.end();
      });
      return;
    }

    case '/browser.js': {
      res.setHeader('Content-Type', 'application/javascript');
      createReadStream(`./dist/browser.js`).pipe(res);
      return;
    }

    case '/browser.js.map': {
      res.setHeader('Content-Type', 'application/javascript');
      createReadStream(`./dist/browser.js.map`).pipe(res);
      return;
    }

    default: {
      res.statusCode = 404;
      res.end('404 Not Found');
    }
  }
}

function main() {
  createServer(serverHandler).listen(PORT, () => {
    console.log(`Server has been started ${PORT}...`); // eslint-disable-line no-console
  });
}

main();
```

webpack.config.js

```javascript
// @ts-check
/** @typedef {import('webpack').Configuration} WebpackConfig **/
const path = require('path');

const nodeExternals = require('webpack-node-externals');

/** @type WebpackConfig[] */
const configs = [
  {
    entry: {
      browser: './src/index.tsx',
    },
    output: {
      path: path.join(__dirname, '/dist'),
      filename: '[name].js',
    },
    resolve: {
      extensions: ['.ts', '.tsx'],
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
        },
      ],
    },
    externals: {
      react: 'React',
      'react-dom': 'ReactDOM',
    },
  },
  {
    entry: {
      server: './src/server.ts',
    },
    output: {
      path: path.join(__dirname, '/dist'),
      filename: '[name].js',
    },
    resolve: {
      extensions: ['.ts', '.tsx'],
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
        },
        {
          test: /\.html$/,
          use: 'raw-loader',
        },
      ],
    },
    target: 'node',
    externals: [nodeExternals()],
  },
];

module.exports = configs;
```

package.json

```json
{
  "name": "ssr-example",
  "version": "0.0.1",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "node dist/server.js",
    "build": "webpack --mode production",
    "build:dev": "webpack --mode development --watch",
    "lint": "eslint '**/*.{js,ts,tsx}'",
    "lint:fix": "npm run lint -- --fix",
    "prettier": "prettier '**/*' --check",
    "prettier:fix": "prettier '**/*' --write"
  },
  "author": "yceffort <yceffort@gmail.com>",
  "dependencies": {
    "@types/isomorphic-fetch": "^0.0.36",
    "@types/node": "^16",
    "@types/react": "^17.0.8",
    "@types/react-dom": "^17.0.5",
    "@types/webpack": "^5.28.0",
    "concurrently": "^7.3.0",
    "isomorphic-fetch": "^3.0.0",
    "raw-loader": "^4.0.2",
    "react": "^17.0.0",
    "react-dom": "^17.0.0",
    "source-map-loader": "^4.0.0",
    "ts-loader": "^9.3.1",
    "typescript": "^4.5.5",
    "webpack": "^5.74.0",
    "webpack-cli": "^4.10.0",
    "webpack-node-externals": "^3.0.0"
  },
  "devDependencies": {
    "@titicaca/eslint-config-triple": "^5.0.0",
    "@titicaca/prettier-config-triple": "^1.0.2",
    "eslint": "^8.38.0",
    "prettier": "^2.8.7"
  },
  "license": "MIT"
}
```
