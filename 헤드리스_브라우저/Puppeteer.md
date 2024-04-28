# Puppeteer

https://pptr.dev/#?product=Puppeteer&show=api-overview

https://devdocs.io/puppeteer/

PuppeteerDevTools 프로토콜을 사용하여 브라우저와 통신.

Browser 인스턴스는 여러 브라우저 컨텍스트를 소유 할 수 있습니다.
BrowserContext 인스턴스는 브라우징 세션을 정의하며 여러 페이지를 소유 할 수 있습니다.  
Page메인 프레임 : 적어도 하나의 프레임이 있습니다. iframe으로 생성 된 다른 프레임이있을 수 있습니다.또는 프레임 태그.  
Frame프레임의 JavaScript가 실행되는 하나 이상의 실행 컨텍스트 (기본 실행 컨텍스트)가 있습니다. 프레임에는 확장 과 관련된 추가 실행 컨텍스트가있을 수 있습니다.  
Worker단일 실행 컨텍스트를 가지며 WebWorkers 와의 상호 작용을 용이하게합니다.

## API

https://pptr.dev/#?product=Puppeteer&version=v2.1.1&show=api-class-page

## Page

https://pptr.dev/#?product=Puppeteer&version=v2.1.1&show=api-class-page

## Request

https://pptr.dev/#?product=Puppeteer&version=v2.1.1&show=api-class-request

## Response

https://pptr.dev/#?product=Puppeteer&version=v2.1.1&show=api-class-response

## ElementHandle

https://pptr.dev/#?product=Puppeteer&version=v2.1.1&show=api-class-elementhandle

## ConsoleMessage

https://pptr.dev/#?product=Puppeteer&version=v2.1.1&show=api-class-consolemessage

# Chrome DevTools Protocol

https://chromedevtools.github.io/devtools-protocol/

# puppeteer 라이센스

https://github.com/puppeteer/puppeteer/blob/master/LICENSE

# Lighthouse Node.js 모듈

https://github.com/GoogleChrome/lighthouse

# 코드 자동 생성, 크롬 확장 프로그램 (puppeteer recorder chrome extension)

puppeteer recorder chrome extension

https://chrome.google.com/webstore/detail/deploysentinel-recorder/geggbdbnidkhbnbjoganapfhkpgkndfo

https://chrome.google.com/webstore/detail/headless-recorder/djeegiggegleadkkbgopoonhjimgehda?hl=ko

# 도커 이미지 실행시 참고!

https://github.com/puppeteer/puppeteer/blob/main/docs/troubleshooting.md#running-puppeteer-in-docker

```Dockerfile
FROM node:10.20.1-slim@sha256:79809f748c1de29269f1fffc212486a758412e4f0f0c79eaf99408245156a042

RUN  apt-get update \
     && apt-get install -y wget gnupg ca-certificates \
     && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
     && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
     && apt-get update \
     # We install Chrome to get all the OS level dependencies, but Chrome itself
     # is not actually used as it's packaged in the node puppeteer library.
     # Alternatively, we could could include the entire dep list ourselves
     # (https://github.com/puppeteer/puppeteer/blob/master/docs/troubleshooting.md#chrome-headless-doesnt-launch-on-unix)
     # but that seems too easy to get out of date.
     && apt-get install -y google-chrome-stable \
     && rm -rf /var/lib/apt/lists/* \
     && wget --quiet https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh -O /usr/sbin/wait-for-it.sh \
     && chmod +x /usr/sbin/wait-for-it.sh

# Install Puppeteer under /node_modules so it's available system-wide
ADD package.json package-lock.json /
RUN npm install
```

또는

```Dockerfile
# 알파인 버전으로 yarn(또는 npm) install puppeter 설치할 경우, 크롬 브라우저가 작동하지 않을 수 있다. (https://github.com/puppeteer/puppeteer/blob/master/docs/troubleshooting.md)
# https://github.com/buildkite/docker-puppeteer
FROM buildkite/puppeteer:latest
```

---

# 다양한 예제 참고

https://addyosmani.com/blog/puppeteer-recipes/

https://media-codings.com/articles/automatically-detect-memory-leaks-with-puppeteer
