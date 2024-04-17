# Glob Patterns, 흔히 줄여서 Globs라고 불리는 패턴 매칭

Globs은 오래전부터 리눅스 운영체제에서 한 번에 여러 개의 파일을 찾을 때 사용해온 패턴 매칭 기법

Globs에서 가장 많이 사용되는 와일드카드는 \* 기호

`**/*.js`

https://www.digitalocean.com/community/tools/glob?comments=true&glob=%2F%2A%2A%2F%2A.js&matches=false&tests=%2F%2F%20This%20will%20match%20as%20it%20ends%20with%20%27.js%27&tests=%2Fhello%2Fworld.js&tests=%2F%2F%20This%20won%27t%20match%21&tests=%2Ftest%2Fsome%2Fglobs

## glob 정규식으로 폴더 및 파일 제외

```python
# glob exclude folder

import glob

f = glob.glob(pathImageRoot/[!_]*)
print(f)

# ['pathImageRoot/image.jpg', 'pathImageRoot/text.txt', 'pathImageRoot/file.exe', ...]


'''
# example simple regular expression

1) /**/* : 현재 디렉토리 및 하위 디렉토리에 존재하는 모든 파일 리스트화
2) /*[txt$|jpg$]: 현재 디렉토리 내에 존재하는 모든 .txt, .jpg 파일 리스트화
3) /text[1-3].txt: 현재 디렉토리 내에 있는 text1.txt, text2.txt 파일 리스트화
'''
```

예를 들어 'webview' 라는 폴더명만 제외할 경우

```
./src/pages/product/[!webview]*/**/main.js
```
