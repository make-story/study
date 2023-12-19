# Vue 셋업

https://joshua1988.github.io/vue-camp/vue/cli.html#%E1%84%87%E1%85%B2-cli-%E1%84%89%E1%85%A5%E1%86%AF%E1%84%8E%E1%85%B5

```bash
# npm install -g vue-cli # 버전 2.9 (과거버전)
$ npm install -g @vue/cli
```

vue-cli 는 기본 vue 개발 환경을 설정해주는 도구입니다.  
명령 줄 인터페이스(CLI, Command line interface) 또는 명령어 인터페이스는 텍스트 터미널을 통해 사용자와 컴퓨터가 상호 작용하는 방식

1. Vue CLI 2.x
   vue init '프로젝트 템플릿 유형' '프로젝트 폴더 위치'

2. Vue CLI 3.x
   vue create '프로젝트 폴더 위치'

```bash
$ npm install -g @vue/cli
$ vue create vuejs-test
$ cd vuejs-test
$ yarn serve
```

serve 명령은 webpack-dev-server 에 기반을 두며 Hot-Module-Replacement(HMR) 기능을 추가적인 설치 없이 바로 활용할 수 있게 해준다.

# CLI 로 설정된(숨겨진) 내용 보기

```
$ vue inspect > output.js
```

또는 (vue-cli 글로벌 설치안되어 있는 환경)

```
$ node node_modules/.bin/vue-cli-service inspect > output.js
```

# ES module 사용

package.json 에 "type": "module", 선언

.eslintrc.js 에 관련 설정 추가

import 로 .js 파일 할 때, 필히 확장자까지 입력 (예: import './test.js')
