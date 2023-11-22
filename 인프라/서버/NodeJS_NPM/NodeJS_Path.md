# path 모듈

https://p-iknow.netlify.app/node-js/path-moudle/

path 모듈은 운영체제별로 경로 구분자가 달라 생기는 문제를 쉽게 해결하기 위해 등장했다.  
문제는 운영체제 별로 달라지는 구분자에 대한 이슈는 다음과 같다.  
크게 Windows, POSIX 로 갈리는데,  
POSIX는 유닉스 기반의 운영체제를 말하고,  
macOS 와 Linux 가 이에 속해있다.

- Windows: `'C:\Users\ano' 처럼 \ 를 사용해 폴더를 구분`한다.
- POSIX: `'/Users/ano' 처럼 / 를 사용해 폴더를 구분`한다.

path 모듈을 사용하면 폴더와 파일의 경로를 쉽게 조작할 수 있어 위와 같은 경로 구분자 이슈를 쉽게 해결하고, 이외에 파일명에서 파일명, 확장자를 별도로 때어서 활용할 수 있 수 있다.

## ESM 모듈시스템에서 **dirname, **filename

```javascript
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename); // 또는 const __dirname = path.resolve();
```

## path.resolve([...paths])

전달된 인자를 오른쪽에서 왼쪽으로 읽으며 상대로와 절대 경로를 구분하고 절대경로를 만들어 반환한다.

```javascript
// /b가 절대경로 이므로 /b/c가 반환되고 '/a'는 무시된다.
path.resolve("/a", "/b", "c");
// Returns: /b/c

// /c 가 절대경로 이므로 '/a', '/b' 는 무시된다
path.resolve("/a", "/b", "/c");
// Returns: /c
```

```javascript
path.resolve("a, b, c");
// Returns:
// WINDOW: 'C:a\b\c'
// POSIX(mac, linux): '/a/b/c'

// /a 를 WINDOW에서 사용하면 경로구분자를 바꿔서 반환해준다.
path.resolve("/a");
// Returns: C:\a

// \a를 POSIX(mac, linux) 에서 사용하면 경로 구분자를 바꿔서 반환해준다.
path.resolve("a");
// Returns: /a
```

## path.join([...paths])

여러 인자를 넣으면 하나의 경로를 합쳐 반환하다. 상대경로를 표시하는 .. 와 현 위치를 표시하는 . 도 반영한 결과를 리턴한다.

```javascript
path.join("/foo", "bar", "baz/asdf", "quux");
// Returns: '/foo/bar/baz/asdf/quux'

// 마지막 인자의 .. 가 현재 위치보다 한단계 위 상위 폴더를 의미하므로
// '/foo/bar/baz/asdf/quux' 보다 한 단계가 위 폴더의 경로가 반환됨
path.join("/foo", "bar", "baz/asdf", "quux", "..");
// Returns: '/foo/bar/baz/asdf'

// __dirname : User/ano/temp/direcotory
// 상대경로와 절대경로를 인자로 전달한 경우 이를 반영한 결과를 리턴함
// 두 단계 올라간 User/ano 에서 /workspace 폴더로 내려가 다시 /ano 폴더를 찾음
path.join(__dirname, "..", "..", "workspace", ".", "/ano");
// Returns: User/ano/workspace/ano
```

## path.sep

경로의 구분자(seperator) 이다. Windows는 \ , POSIX 는 / 값을 담고 있다.

```javascript
"foo/bar/baz".split(path.sep);
// Returns: ['foo', 'bar', 'baz']

"foo\\bar\\baz".split(path.sep);
// Returns: ['foo', 'bar', 'baz']
```
