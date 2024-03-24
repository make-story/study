# husky, lint-staged

ESLint를 프로젝트에 적용시킬 때는 협업하는 모든 사람들이 같은 규칙 내에서 코딩을 하는 것을 예상한다.  
하지만 가끔은 규칙을 지키지 않고 깃헙에 코드를 푸시할 때가 생긴다.

git commit 또는 git push 와 같은 git 이벤트가 일어나기 전에  
우리가 원하는 스크립트를 실행하기 위해서 git 이벤트 사이에 갈고리(hook)를 걸어주는 것이다.  
이것을 git hook 제어라고 한다.

- git hook 제어를 위해서 husky 라이브러리를 사용
- lint-staged 는 git add 로 커밋 대상이 된 상태를 stage 상태라고 한다. stage 상태의 git 파일에 대해 lint 와 우리가 설정해둔 명령어를 실행해주는 라이브러리
