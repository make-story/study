# path

## path.resolve([from ...], to) 

- to를 절대경로로 변환한다. to가 절대경로가 아니면 절대경로를 찾을 때까지 from 아규먼트들을 우측에서 좌측의 순서로 앞에 이어붙힌다.

```javascript
// 현재 파일 경로기준 루트파일 접근
console.log(path.resolve(process.cwd(), '.env'));
```

## path.normalize(path) 

- '..'와 '.' 부분을 처리해서 문자열 경로를 정규화한다.
- 슬래시가 여러 개 있는 경우 슬래시 하나로 교체하고 경로의 마지막에 슬래시가 있는 경우에는 유지한다

## path.dirname(filePath);

- 디렉토리 추출후 출력
- 경로의 디렉토리이름을 반환한다. Unix의 dirname 명령어와 비슷하다.

## path.basename(filePath);

- 파일명 추출후 출력
- 경로의 마지막 부분을 반환한다. Unix의 basename 명령어와 비슷하다.

## path.extname(filePath); 

- 파일확장자 추출후 출력
- 경로의 마지막 부분의 문자열에서 마지막 '.'에서부터 경로의 확장자를 반환한다. 경로의 마지막 부분에 '.'가 없거나 첫 글자가 '.'이라면 빈 문자열을 반환한다.

## path.basename(filePath, path.extname(filePath));

- 파일명 추출시 확장자 제외후 출력

## 확장자 검사

```javascript
const imageExt = ['.jpg', '.jpeg', '.png', '.webp', '.svg', '.gif'];
if (imageExt.includes(path.extname(output).toLowerCase())) {
  // ...
}
```

## 프로젝트 루트(root)

```typescript
/**
 * 프로젝트 루트 경로
 */
export const appDirectory = process.env.PWD || fs.realpathSync(process.cwd());

/**
 * 프로젝트 루트 경로 (서버실행 기준)
 * 빌드된 경로에서 서버 실행경우 dist 내부가 APP_ROOT_PATH 가 됨
 *
 * 주의! 현재파일 위치 변경시, 파일 위치관련 기능들 base 경로('../../' 같은것) 수정(확인)필요!
 * (TODO: 파일위치가 변경되어도 영향 없도록 개선필요!)
 *
 * 'app-root-path' 라는 도구 참고!
 */
export const APP_ROOT_PATH = fs.existsSync(path.resolve(__dirname, '../../'))
  ? path.resolve(__dirname, '../../')
  : process.env.PWD || fs.realpathSync(process.cwd());
```

# fs

https://nodejs.org/api/fs.html

## fs.exists 기능은 Deprecated

https://nodejs.org/api/fs.html#fsexistssyncpath

fs.existsSync(path) 사용 가능

# 해당경로 존재여부

```typescript
/**
 * 해당경로 존재여부 (폴더 또는 파일)
 */
export const isPathExists = (
  pathname: string = 'testcase/tests',
  options: { [key: string]: any } = {},
) => {
  return pathname && fs.existsSync(path.resolve(__dirname, '../../', pathname));
};
```

# 폴더 및 파일리스트

```typescript
/**
 * 해당경로의 디렉토리 및 파일 리스트 반환
 */
export const getDirectoryFile = (
  pathname: string = 'testcase/tests',
  options: { isFileExtension?: boolean; fileExtensionFilter?: string[] } = {},
) => {
  const { isFileExtension = false, fileExtensionFilter = ['.ts', '.js'] } =
    options;
  const source = path.resolve(__dirname, '../', pathname);
  let directory: string[] = [];
  let file: string[] = [];

  if (!fs.existsSync(source)) {
    return { directory, file };
  }

  const read: fs.Dirent[] = fs.readdirSync(source, { withFileTypes: true });
  ({ directory, file } = read.reduce(
    (accumulator: { directory: string[]; file: string[] }, item, index) => {
      if (item.isDirectory()) {
        // 폴더 리스트
        accumulator.directory.push(item.name);
      } else if (
        item.isFile() &&
        (!fileExtensionFilter?.length ||
          fileExtensionFilter.includes(
            path.extname(`${source}/${item.name}`)?.toLowerCase() || '', // 확장자 확인
          ))
      ) {
        // 파일 리스트
        let filename = item.name;
        if (!isFileExtension) {
          // 확장자 제거
          const arr = filename.split('.');
          if (1 < arr.length) {
            arr.pop();
          }
          filename = arr.join('');
        }
        accumulator.file.push(filename);
      }
      return accumulator;
    },
    { directory: [], file: [] },
  ));

  return { directory, file };
};
```
