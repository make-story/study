# Git commit 시 ESlint 자동으로 검사

https://kyoung-jnn.com/posts/commit-lint

## simple-git-hooks 설치 (git hooks 설정)

```bash
$ yarn add -D simple-git-hooks
```

package.json

```json
{
  "scripts": {
    "simple-git-hooks": "simple-git-hooks",
    "prepare": "yarn simple-git-hooks"
  },
  "simple-git-hooks": {
    "pre-commit": "yarn lint-staged"
  }
}
```

```bash
$ yarn simple-git-hooks
```

.git/hooks/pre-commit
(.git/hooks 폴더에는 다양한 hooks들이 존재 가능)

```sh
#!/bin/sh
yarn lint-staged
```

커밋이 올라가기전(pre-commit) 해당 스크립트(yarn lint-staged)를 실행

## 참고: husky

husky 는 git hook 을 손쉽게 제어하도록 도와주는 도구

## lint-staged 설치

staging 파일들에게만 lint 검사를 실행

```bash
$ yarn add -D lint-staged
```

package.json

```json
{
  "scripts": {
    "lint-staged": "lint-staged"
  },
  "lint-staged": {
    "**/*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"]
  }
}
```
