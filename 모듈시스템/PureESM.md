# Pure ESM

https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c

Pure ESM 은 모듈이 CommonJS/ESM 양쪽을 지원하도록 구성할 수도 있지만, 굳이 ESM만 제공한다는 뜻  
https://devblog.kakaostyle.com/ko/2022-04-09-1-esm-problem/

## How can I move my CommonJS project to ESM? (CommonJS 프로젝트를 ESM 으로 어떻게 변경할 수 있나?)

https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c#how-can-i-move-my-commonjs-project-to-esm

- Add "type": "module" to your package.json.
- Replace "main": "index.js" with "exports": "./index.js" in your package.json.
- Update the "engines" field in package.json to Node.js 16: "node": ">=16".
- Remove 'use strict'; from all JavaScript files.
- Replace all require()/module.export with import/export.
- Use only full relative file paths for imports: import x from '.'; → import x from './index.js';.
- If you have a TypeScript type definition (for example, index.d.ts), update it to use ESM imports/exports.
- Use the node: protocol for Node.js built-in imports.

## How can I make my TypeScript project output ESM? (TypeScript 프로젝트 컴파일 결과물을 ESM 으로 만들 수 있나?)

https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c#how-can-i-make-my-typescript-project-output-esm

https://www.typescriptlang.org/docs/handbook/modules/reference.html#node16-nodenext

- Make sure you are using TypeScript 4.7 or later.
- Add "type": "module" to your package.json.
- Replace "main": "index.js" with "exports": "./index.js" in your package.json.
- Update the "engines" field in package.json to Node.js 16: "node": ">=16".
- Add "module": "node16", "moduleResolution": "node16" to your tsconfig.json. (Example)
- Use only full relative file paths for imports: import x from '.'; → import x from './index.js';.
- Remove namespace usage and use export instead.
- Use the node: protocol for Node.js built-in imports.
- You must use a .js extension in relative imports even though you're importing .ts files.
