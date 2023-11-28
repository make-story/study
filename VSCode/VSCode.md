# 유용한 자료

https://blog.naver.com/techref/222360517100

## Prettier

설정  
`Format on Save` 검색 > 체크  
`defaultFormatter` 검색 > prettier 선택 (주의! 프로젝트에 prettier 설정이 없더라도, 기본 포맷으로 적용됨!)

"study.git/프론트/코드분석*포맷팅*코드수정/ESLint_Prettier.md" 자료 참고!!

## ESLint

### Restart ESLint Server

command + shift + p  
"Restart ESLint Server" 입력

## 파일 찾기

command + p

## 전체 파일에서 검색

command + shift + f

## 코드 참조 찾기 - 어디서 import 해서 사용중인지 확인하는 방법

how to know the place using my import module where coming from!

Find All Reference 메뉴

변수, 함수, 매크로에서 마우스 우클릭, Find All Reference 클릭

## 함수 찾기

command + t

파일내 함수 찾기

## vscode alias path

프로젝트에서 alias 설정을 사용중인데,  
VSCode 에서 연동이 안될 때,

tsconfig.json 또는 jsconfig.json 에 설정

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src/**/*"]
}
```
