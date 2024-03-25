# NPM 설치 항목 리스트 조회

-g 옵션은 글로벌 설치 리스트

```
$ npm ls -g
$ npm list -g
$ npm list -global
$ npm ls -g --depth=0
```

글로벌(global) 설치 경로(path) 확인

```
$ npm root -g
```

## 패키지가 어디에 설치돼 있는지 확인

```
$ npm ls react
```

npm ls 는 'list installed packages' 라는 뜻으로 설치된 패키지가 왜 어떤 의존성 때문에 설치됐는지 확인할 수 있는 명령어

## 명령어 처리 결과 파일로 저장

일반 출력 리다이렉션

- (명령) > (파일명) : 새로운 파일 생성, 기존 파일 내용 사라짐
- (명령) >> (파일명) : 기존 파일 끝에 내용 추가

```
$ ls -al > directory.txt
$ npm list --depth=0 > npm-list.txt
```

## 용량 확인, 크기 확인

```bash
$ du -sh */

# 단일 파일의 크기 표시
$ du -h path_to_a_file

# 디렉터리, 각 하위 디렉터리 및 각 개별 파일의 내용 크기를 표시합니다.
$ du -h path_to_a_directory

# 디렉토리 내용의 크기를 표시합니다.
$ du -sh path_to_a_directory
```
