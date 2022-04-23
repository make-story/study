# NPM 설치 항목 리스트 조회
-g 옵션은 글로벌 설치 리스트
```
$ npm ls -g 
$ npm list -g
$ npm list -global
$ npm ls -g --depth=0
```

# 명령어 처리 결과 파일로 저장
일반 출력 리다이렉션  
 - (명령) > (파일명) : 새로운 파일 생성, 기존 파일 내용 사라짐  
 - (명령) >> (파일명) : 기존 파일 끝에 내용 추가  
```
$ ls -al > directory.txt
$ npm list --depth=0 > npm-list.txt
```