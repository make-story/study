# NPM 버전

`package.json 의 version 은 Semantic Versioning 을 기준으로 명시`  
https://semver.org/lang/ko/

npm 문서  
https://docs.npmjs.com/cli/v8/commands/npm-version  
https://docs.npmjs.com/about-semantic-versioning

`<major>.<minor>.<patch>[-<pre-release>+<metadata>]`

https://github.com/npm/node-semver#functions  
https://kevinkreuzer.medium.com/publishing-a-beta-or-alpha-version-to-npm-46035b630dd7

https://docs.npmjs.com/cli/v10/configuring-npm/package-json#dependencies

```json
{
  "dependencies": {
    "foo": "1.0.0 - 2.9999.9999",
    "bar": ">=1.0.2 <2.1.2",
    "baz": ">1.0.2 <=2.3.4",
    "boo": "2.0.1",
    "qux": "<1.0.0 || >=2.3.1 <2.4.5 || >=2.5.2 <3.0.0",
    "asd": "http://asdf.com/asdf.tar.gz",
    "til": "~1.2",
    "elf": "~1.2.3",
    "two": "2.x",
    "thr": "3.3.x",
    "lat": "latest",
    "dyl": "file:../dyl"
  }
}
```

`모던 리액트 Deep Dive` 책 내용 중 - p567

1. 기존 버전과 호환되지 않게 API 가 바뀌면 major 버전을 올리고,
2. 기존 버전과 호환되면서 새로운 기능을 추가할 때는 minor 버전을 올리고,
3. 기존 버전과 호환되면서 버그를 수정한 것이라면 patch 버전을 올린다.

`NestJS 로 배우는 백엔드 프로그래밍` 책 내용 중

```
ver
완전히 일치하는 버전

=ver
완전히 일치하는 버전

>ver
큰 버전

>=ver
크거나 같은 버전

<ver
작은 버전

<=ver
작거나 같은 버전

~ver
버전 범위(지정한 마지막 자리 내 범위)
예를 들어 "~1.0, 1.0.x" 은 1.0.0 이상 1.1.0 미만의 버전

^ver
"^1.0.2" 1.0.2 이상 2.0 미만의 버전
"^1.0" 1.0.0 이상 2.0 미만의 버전
"^1" 1.0.0 이상 2.0 미만의 버전
```

## 버전변경

### 방법1 package.json 직접 수정

```json
{
  "version": "1.0.0-stg.0"
}
```

### 방법2 npm version 명령 활용

- `Usage`

```
$ npm version [<newversion> | major | minor | patch | premajor | preminor | prepatch | prerelease | from-git]
```

- `Version format`

```
<major>.<minor>.<patch>[-<pre-release>+<metadata>]
```

- `Release arguments`  
  각 argument 에 따라 해당 자리의 버전이 증가되고, Git Commit 과 Tag 가 자동으로 생성됩니다.

#### 사용자 정의 버전

```
$ npm version 1.0.0-stg.0
```

#### major

```
$ cat package.json | grep version
"version": "1.0.0",

$ npm version major
v2.0.0

$ git log --oneline -1
beda9bf 2.0.0

$ git tag -l
v2.0.0

$ cat package.json | grep version
"version": "2.0.0",
```

자동으로 Git Commit 과 Tag 가 생성되고, 버전은 v1.0.0에서 v2.0.0으로 업데이트

#### minor

```
$ cat package.json | grep version
"version": "1.0.0",

$ npm version minor
v1.1.0

$ git log --oneline -1
16acfc8 1.1.0

$ git tag -l
v1.1.0

$ cat package.json | grep version
"version": "1.1.0",
```

자동으로 Git Commit 과 Tag 가 생성되고, 버전은 v1.0.0에서 v1.1.0으로 업데이트

#### patch

```
$ cat package.json | grep version
"version": "1.0.0",

$ npm version patch
v1.0.1

$ git log --oneline -1
51d070c 1.0.1

$ git tag -l
v1.0.1

$ cat package.json | grep version
"version": "1.0.1",
```

자동으로 Git Commit 과 Tag 가 생성되고, 버전은 v1.0.0 에서 v1.0.1 로 업데이트

## 정식 배포를 하기 전 버전의 업데이트 명령어

정식 버전 명령어와는 다르게 - 구분자가 추가되고,  
구분자 뒤에 정식 배포 전 버전을 표기하기 위한 카운트가 추가

### premajor

```
$ cat package.json | grep version
"version": "1.0.0",

$ npm version premajor
v2.0.0-0
```

major 버전이 증가하고, - 구분자 뒤에 pre-release 를 위한 카운트가 추가

### preminor

```
$ cat package.json | grep version
"version": "1.0.0",

$ npm version preminor
v1.1.0-0
```

minor 버전이 증가하고, - 구분자 뒤에 pre-release 를 위한 카운트가 추가

### prepatch

```
$ cat package.json | grep version
"version": "1.0.0",

$ npm version prepatch
v1.0.1-0
```

patch 버전이 증가하고, - 구분자 뒤에 pre-release를 위한 카운트가 추가

### prerelease

```
$ cat package.json | grep version
"version": "1.0.0",

$ npm version prerelease
v1.0.1-0
```

pre-release 를 위한 카운트가 없을 경우 기본으로 patch 버전이 증가하고, - 구분자 뒤에 pre-release 를 위한 카운트가 추가

### `from-git`

최근 Tag 의 버전을 적용합니다.

```
$ cat package.json | grep version
"version": "1.0.0",

$ echo 'foo' >> README.md

$ git commit -am 'update README.md'
[master 4ed3042] update README.md
 1 file changed, 1 insertion(+)

$ git tag -a v1.0.1 -m 'Version 1.0.1'

$ git log --oneline --decorate=full -1
4ed3042 (HEAD -> refs/heads/master, tag: refs/tags/v1.0.1) update README.md

$ npm version from-git
v1.0.1

$ git log --oneline --decorate=full -2
5536080 (HEAD -> refs/heads/master) 1.0.1
4ed3042 (tag: refs/tags/v1.0.1) update README.md
```

### `Options`

arguments 와 함께 사용되는 옵션입니다.
