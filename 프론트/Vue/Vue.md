# Vue 셋업

```bash
$ npm install -g @vue/cli
```

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
