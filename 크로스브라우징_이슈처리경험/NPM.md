# sharp 설치 오류

## 1

```
Output:
info sharp Downloading https://github.com/lovell/sharp-libvips/releases/download/v8.10.0/libvips-8.10.0-darwin-arm64v8.tar.br
ERR! sharp Prebuilt libvips 8.10.0 binaries are not yet available for darwin-arm64v8
```

회사 보안 등 이슈로 설치 불가

https://velog.io/@juyoung810/npm-install-sharp-error

https://github.com/lovell/sharp/issues/3115

```
npm view sharp dist-tags.latest 명령어로 가장 최신의 sharp 버전 확인
npm install sharp@0.30.7 이렇게 최신 버전 설치
```

## 2

```
ERR! sharp Prebuilt libvips 8.10.0 binaries are not yet available for darwin-arm64v8
```

https://github.com/nuxt/image/issues/204

```
$ brew install --build-from-source gcc
$ xcode-select install
$ brew install vips
```

## 3

```
$ rm -r node_modules/sharp
$ yarn install --check-files
```
