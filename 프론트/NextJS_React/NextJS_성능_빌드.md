# 빌드 (build)

## 코드 스플리팅

코드 스플리팅 기능을 적용하면 클라이언트 측 성능 확보를 위해 꼭 필요한 javascript만 보낼 수 있다.

next.js는 두 가지의 코드 스플리팅 기능을 지원한다.

1. 라우팅 경로 기반
   `next.js에 기본으로 적용되어 있으며. 사용자가 라우팅할 때 최초로 필요로 하는 코드들만 전송`한다.  
   나머지 코드들은 앱 내에서 페이지 이동을 할 때 추가적으로 전송한다.  
   이는 파싱하고 컴파일 해야 하는 코드량을 줄여 페이지 로드 타임을 감소시킬 수 있다.

2. 컴포넌트별
   이 코드 스플리팅은 큰 컴포넌트를 여러 코드들로 나누어 필요할 때 다운로드받을 수 있도록 해 준다.  
   `next.js는 dynamic import() 를 통해 컴포넌트 코드 스플리팅을 지원`한다.  
   따라서 react컴포넌트 포함 필요한 javascript코드들을 분리하여 동적으로 로드할 수 있게 된다.

## standalone 옵션

https://tech.inflab.com/20230918-rallit-standalone/

Next.js 에서 지원하는 standalone 옵션을 적용시킨 후, Docker image 사이즈를 최소화하고 배포 시간을 줄이는데 성공

Standalone 은 ‘독립형’ 또는 ‘독립적인 것’ 이라는 뜻을 가지고 있습니다. Next.js 에서는 웹 어플리케이션을 실행하는데 필요한 최소한의 코드만 추출하겠다는 의미로 사용됩니다.

https://nextjs.org/docs/pages/api-reference/next-config-js/output#automatically-copying-traced-files

```javascript
module.exports = {
  output: 'standalone',
};
```

컨테이너를 위한 이미지를 생성할 때에는 standalone 폴더와, public, 환경 변수(e.g. .env.production, .env.local)등 구동에 필요한 파일만을 포함하여 이미지를 생성

https://oliveyoung.tech/blog/2024-06-16/next-cdn-standalone/

```Dockerfile
FROM node:18.17.0-alpine3.18

ENV PORT 80

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy build output files
COPY ./public ./public
COPY ./.next/standalone ./
COPY ./.env.production ./

EXPOSE $PORT

# Running the app
ENTRYPOINT [ "node", "server.js" ]
```

## 실행

standalone 으로 걸러낸 서버의 실행은 다음과 같이 할 수 있습니다. next start와 유사한 기능입니다.

```bash
$ node standalone/server.js
```
