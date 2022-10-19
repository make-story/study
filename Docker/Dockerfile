# 도커 이미지 생성을 위한 설정파일 
# '.dockerignore' 파일에 Docker 이미지 생성 시 이미지안에 들어가지 않을 파일을 지정

# 도커 생성할 때, Client(react), API Server(nodeJS), Server(nodeJS), DB(mongoDB) 등 각 역할단위로 대부분 생성

# base image
# <이미지 이름>:<태그>
# node 알파인 리눅스(Alpine Linux) 버전은 node.js 공식 이미지보다 가볍습니다.
# https://hub.docker.com/_/node
#FROM node:10.9.0-alpine
FROM node:10.20.1-slim
# 알파인 버전으로 yarn(또는 npm) install puppeter 설치할 경우, 크롬 브라우저가 작동하지 않을 수 있다. (https://github.com/puppeteer/puppeteer/blob/master/docs/troubleshooting.md)
# https://github.com/buildkite/docker-puppeteer
FROM buildkite/puppeteer:latest
# MongoDB
#FROM mvertes/alpine-mongo:latest

# set working directory - 작업 디렉토리 생성 및 고정
# Dockerfile의 모든 명령어는 기본적으로 /(루트) 디렉토리에서 실행
# 1. Dockerfile의 각 줄은 경로를 공유하지 않는다. 
# 즉, 명시적으로 WORKDIR 명령어를 통해 새로운 루트 경로를 설정하지 않는 이상 경로는 /에 고정됩니다.
# 2. WORKDIR을 사용하면 경로를 고정할 수 있다.
# 만약 같은 경로에서 여러 작업을 해야한다면 WORKDIR을 사용할 수 있습니다.
# 3. 왼쪽은 호스트 머신의 파일 경로, 오른쪽은 컨테이너의 파일 경로
WORKDIR /app
#COPY . /app/

# app dependencies, install 및 caching
# 여기서 왼쪽은 호스트 파일의 경로, 오른쪽은 컨테이너의 파일 경로가 됩니다.
# 즉, 현재 프로젝트 디렉토리의 package.json이 컨테이너의 app 폴더 아래에 복사됩니다.
COPY package.json /app/package.json
#COPY package*.json ./

# 환경 변수를 설정합니다. 
# ENV로 설정한 환경 변수는 RUN, CMD, ENTRYPOINT 에 적용됩니다.
# `/app/node_modules/.bin`을 $PATH 에 추가
ENV PATH /app/node_modules/.bin:$PATH
#ENV PATH="${PATH}:/node_modules/.bin"
#ENV MONGODB_HOST 127.0.0.1:27017
ENV MONGODB_HOST mongo
ENV MONGODB_DB webpagetest
ENV HEADLESS_CONTROL N

# UNABLE_TO_VERIFY_LEAF_SIGNATURE 발생할 경우 
# reason: unable to verify the first certificate
RUN npm config set strict-ssl false
RUN npm install yarn && yarn config set strict-ssl false

# package.json 의존성 모듈 install
# RUN 명령어는 배열['npm', 'install'] 형태로도 사용할 수 있습니다.
#RUN npm -g config set user root
# <npm 사용방식>
#RUN npm install
# <yarn 사용방식>
RUN yarn install

# nodemon 설치
#RUN npm install -g nodemon
#RUN yarn global add nodemon

# src 폴더 아래의 코드 복사
COPY . /app/
#COPY ./src/ /app/

# 의존성 설치 (apk, apt-get, yum 등 OS에 맞는 패키지 관리자 활용하여 설치)
# apk 알파인 리눅스(Alpine Linux) 자체 패키지 관리자 사용
#RUN apk add --no-cache --virtual native-deps g++ gcc libgcc libstdc++ linux-headers autoconf automake make nasm curl sudo perl 
# apt-get 패키지 관리자 사용
RUN apt-get update 
RUN apt-get install -y automake perl build-essential autotools-dev autoconf curl sudo vim procps 
# xvfb 가상 디스플레이 (https://github.com/nsourov/Puppeteer-with-xvfb)
#RUN apt-get install -yq gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget x11vnc x11-xkb-utils xfonts-100dpi xfonts-75dpi xfonts-scalable xfonts-cyrillic x11-apps xvfb

# 접근 포트 설정
#EXPOSE 3000 3000

# 앱 실행
# CMD 명령은 Dockerfile 에서 한번만 사용 가능
#CMD ["node", "servers/proxy.js"]
# <npm 사용방식>
#CMD npm start
#CMD ["npm", "start"]
# <yarn 사용방식>
CMD ["yarn", "start"]
# <xvfb 실행>
#CMD xvfb-run --server-args="-screen 0 1024x768x24" yarn start

# ---------- ---------- ---------- ---------- ---------- ---------- ---------- 

# 도커 이미지 생성 (Dockerfile - 현재 설정값 참조)
# $ docker build -t docker.cjoshopping.com/webpagetest:latest .

# 몽고DB 도커 이미지 설치 (docker-compose 를 활용할 경우 종속된 이미지 한번에 설치/관리 가능)
# $ docker pull mvertes/alpine-mongo
# 몽고DB 도커 볼륨 생성
# $ docker volume create mongo
# 몽고DB 도커 컨테이너 실행
# $ docker run --name mongo -p 27017:27017 -v mongo:/data/db --network bridge -d mvertes/alpine-mongo
# 참고: mongo 쉘 클라이언트를 사용해야할 경우 
# $ docker exec -it mongo mongo 

# 도커 이미지로 컨테이너 생성/실행 (docker-compose 사용하지 않고, 각각 컨테이너생성/실행 방법)
# $ docker run --name webpage -p 4001:4001 -p 9090:9090 -e MONGODB_HOST=127.0.0.1:27017 -e MONGODB_DB=webpagetest --network bridge -d docker.cjoshopping.com/webpagetest:latest
# $ docker run --name webpage -p 4001:4001 -p 9090:9090 -e MONGODB_HOST=mongo -e MONGODB_DB=webpagetest --link mongo:mongo -d docker.cjoshopping.com/webpagetest:latest
# $ docker run --name webpage -p 4001:4001 -p 9090:9090 -e HEADLESS_CONTROL=N --link mongo:mongo -d docker.cjoshopping.com/webpagetest:latest

# 도커 프로그램 'Preferences...' -> 'File Sharing' -> '/Applications' 경로 추가
# docker run --name webpage -v /Applications:/Applications -p 4001:4001 -p 9090:9090 -e MONGODB_HOST=mongo -e MONGODB_DB=webpagetest --link mongo:mongo -d docker.cjoshopping.com/webpagetest:latest

# 참고: 컨테이너 생성/실행 명령 설명
# docker run 명령은 우리가 docker build 라는 명령으로 생성한 이미지를 바탕으로 도커 컨테이너 인스턴스(Docker Container Instance)를 생성하고 실행하는 명령
# --name 컨테이너 이름설정 옵션
# -p 포트설정 옵션 <외부 접근할 수 있는 포트번호>:<같은 도커 컨테이너 내부 접근할 수 있는 포트번호>
# --restart 컨테이너 자동 재시작관련 설정 옵션
# -d 백그라운드 모드 실행 옵션
# --rm 컨테이너가 종료되면 자동으로 삭제하라는 옵션
# -e 컨테이너 내에서 사용할 환경변수 설정 옵션 <환경변수>=<값>
# -v 로컬 디렉터리의 특정 경로를 컨테이너 내부로 마운트할 수 있습니다.  <호스트 디렉토리 또는 볼륨 컨테이너>:<컨테이너 내부 디렉토리>
# --link 컨테이너간 IP가 아닌 특정 컨테이너명을 통해 연결 <컨테이너 이름>:<별칭>     [해당 옵션은 도커에서 삭제될 예정(레거시)]

# 참고: docker –link option is deprecated
# 기존에는 –link 옵션을 사용해서 컨테이너를 서로 연결해 주었다. 이제는 docker network가 그 기능을 대신하고 있고, –link 옵션은 deprecated 상태이다. 
# 도커 네트워크를 생성
# docker network create <NETWORK NAME>
# ls 명령어를 사용하여 도커 네트워크가 추가된 것을 확인
# docker network ls
# 도커 컨테이너 실행할 때 --network <NETWORK NAME> 옵션 설정

# 이미지/컨테이너 실행 후 정상 접속 확인
# http://localhost:4001/

# ---------- ---------- ---------- ---------- ---------- ---------- ---------- 

# 참고: 도커 이미지명(REPOSITORY) 변경
# $ docker image tag <기존 REPOSITORY> <변경 REPOSITORY>

# 참고: 도커저장소 로그인 및 이미지 Push
# 참고: 'no basic auth credentials' 메시지 발생시 docker 저장소 로그인을 해야함
# $ docker login <저장소> 
# $ docker push <이미지명>

# ---------- ---------- ---------- ---------- ---------- ---------- ---------- 

# 참고: Docker Compose 사용(docker-compose.yml 파일 - “YAML”파일)하면 더 간단한 방식(docker run 명령 단순화)으로 도커 애플리케이션 정의/실행 가능
# $ docker-compose up -d --build

# ---------- ---------- ---------- ---------- ---------- ---------- ---------- 

# 참고: 호스트(로컬)와 컨테이너간 데이터 연결 (볼륨)
# '/var/lib/docker/volumes/<volume_name>/_data' 호스트 PC 도커 기본 마운트 경로
# Dockerfile 내 선언방식
# VOLUME /var/lib/mysql
# Docker 컨테이너 생성시 명령어 옵션방식 <호스트 연결 경로>:<컨테이너 연결 경로> 또는 <컨테이너 연결 경로>
# docker run -v /usr/local/var/log/mongodb:/data/db -d mvertes/alpine-mongo

# 참고: 볼륨 컨테이너 생성 (Docker 가 관리하는 방식, Named data volume container)
# $ docker volume create hello
# $ docker volume ls
# $ docker volume inspect <VOLUME NAME or VOLUME ID>

# 참고: 볼륨 컨테이너 생성 (Dockerfile 코드)
# 데이터를 저장하는 것이 목적인 컨테이너, 다른 컨테이너들간 데이터 중앙 저장/공유 목적
# 알파인 리눅스(Alpine Linux) busybox 는 최소한의 운영체제 기능만 제공 (볼륨 컨테이너로 사용)
#FROM busybox
# 호스트 PC의 '/var/lib/docker/volumes/<volume_name>/_data' 에 마운트 (도커 기본 폴더)
#VOLUME /var/lib/mysql  # 컨테이너 내의 /var/lib/mysql 디렉터리가 호스트 PC와 마운트
#VOLUME /var/log
# 이미지 빌드, 컨테이너 실행 
# $ docker image build -t volume_container:latest .
# $ docker container run -d volume_container:latest
# 이후 --volumes-from 옵션으로 다른 컨테이너에서 볼륨 컨테이너로 연결해서 사용
# $ docker container run --volumes-from <볼륨 컨테이너> <연결할 컨테이너>
# $ docker container run --volumes-from volume_container mysql:5.7

# 참고로 mac이나 windows의 경우 /var/lib/docker/volumes 디렉토리가 없는데,
# 이는 mac이나 windows의 경우 docker를 바로 실행할 수 없으므로 VM을 하나 띄운 뒤, docker를 실행하기 때문이다
# 즉, /var/lib/docker/volumes 디렉토리는 mac과 docker 사이에 띄워진 VM 내에 감춰져있다
# https://forums.docker.com/t/var-lib-docker-does-not-exist-on-host/18314

# ---------- ---------- ---------- ---------- ---------- ---------- ---------- 

# 컨테이너 로그 확인 (-f tail 명령처럼 로그 실시간 확인 옵션)
# $ docker logs -f webpage

# 컨테이너 내부 명령어 실행 모드
# $ docker exec -it <CONTAINER NAME> /bin/bash
# $ docker exec -it <CONTAINER NAME> bash
# $ docker exec -it <CONTAINER NAME> sh

# 참고: 컨테이너 삭제
# $ docker ps -a
# $ docker rm -f <CONTAINER ID 또는 NAMES>
# $ docker stop webpage
# $ docker rm webpage

# 참고: 도커 이미지 삭제
# $ docker images
# $ docker rmi -f <IMAGE ID 또는 REPOSITORY>
# $ docker rmi docker.cjoshopping.com/webpagetest:latest

# 참고: 도커 <none> 이미지 삭제
# $ docker rmi $(docker images -f "dangling=true" -q)