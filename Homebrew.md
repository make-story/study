# 설치

https://brew.sh/index_ko

설치 명령어 복사 > 설치하려는 디바이스 커멘트창에 입력
디바이스 비밀번호 입력 후 설치 진행

아래 문구가 노출되면 설치 완료

```
==> Installation successful!
```

아래 문구가 함께 노출되면,
하단 `==> Next steps:` 안내에 따라 이슈해결을 위한 추가작업이 필요하다는 것

```
Warning: /opt/homebrew/bin is not in your PATH.
  Instructions on how to configure your shell for Homebrew
  can be found in the 'Next steps' section below.
```

실행명령 PATH 등록이 필요하다는 것  
아래 명령을 입력
(`==> Next steps:` 으로 친절하게 가이드해준 명령 그대로 입력)

```
% (echo; echo 'eval "$(/opt/homebrew/bin/brew shellenv)"') >> /Users/sung-minyu/.zprofile
    eval "$(/opt/homebrew/bin/brew shellenv)"
```
