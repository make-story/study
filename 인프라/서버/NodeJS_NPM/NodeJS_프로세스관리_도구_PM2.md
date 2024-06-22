# PM2

## 참고

https://velog.io/@jsi06138/PM2%EB%A1%9C-%EB%AC%B4%EC%A4%91%EB%8B%A8-%EB%B0%B0%ED%8F%AC-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0  
https://www.samsungsds.com/kr/insights/1256264_4627.html  
https://pm2.keymetrics.io/docs/usage/quick-start/  
https://nodejs.org/dist/latest-v6.x/docs/api/cluster.html#cluster_how_it_works

https://velog.io/@ckstn0777/Clustering-in-Action

---

PM2 는 로드 밸런서가 내장된 Node.js 애플리케이션용 생산 프로세스 관리자

# 설치

```
$ npm install pm2@latest -g
```

# 실행

지역 node_modules 에서 실행 시

```bash
$ node ./node_modules/pm2/bin/pm2
```

또는

```bash
$ node ./node_modules/.bin/pm2
```

# 프로세스 관리

```
$ pm2 restart app_name
$ pm2 reload app_name
$ pm2 stop app_name
$ pm2 delete app_name
```

- restart: 프로세스를 종료하고 다시 시작한다.
- reload: 프로세스를 종료하지않고 다시 시작한다. (down time: 0)
- stop: 프로세스를 종료한다.
- delete: 작업 리스트에 올려진 모든 프로세스를 제거한다.

# 모니터링

```
$ pm2 monit
```

실시간으로 로그를 확인할 수 있다.

# 클러스터 모드

```
$ pm2 start app.js -i max
```

어플리케이션을 클러스터 모드로 실행
i 옵션은 인스턴스의 개수를 의미한다.
`-i 0은 cpu 코어 개수만큼 클러스터 하겠다는 뜻이다. 만약 -i -1로 하면 1개는 남겨놓는다. 사실 한개는 남겨놓는편이 좋다.`

또는

환경 설정파일 생성

```
$ pm2 ecosystem
```

pm2 환경 설정 파일인 ecosystem.config.js 을 생성한다.

환경 설정파일 작성

```javascript
module.exports = {
  apps: [
    {
      name: 'app',
      script: './app.js',
      instances: 'max',
      exec_mode: 'cluster',
    },
  ],
};
```

환경 설정파일 실행

```
$ pm2 start ecosystem.config.js
```

# 재실행

```
$ pm2 reload ecosystem.config.js
```

reload 는 restart 와는 반대로 down-time 이 0초이다.  
restart은 어플리케이션을 재실행하기 위해 프로세스를 종료하고 재시작하는 방식이지만, reload는 그렇지 않다.

`reload 명령어만 수행해도 PM2가 별다른 문제없이 알아서 프로세스를 재시작할 테고, 따라서 서비스에 영향을 주지 않고 무중단 서비스를 운영할 수 있습니다.`  
https://engineering.linecorp.com/ko/blog/pm2-nodejs/

# Node PM2 자동 재시작 메모리 설정

```
$ pm2 start server.js --name test -i max -o /data/logs/server.log -e /data/logs/server.error.log --log-date-format 'YYYY-MM-DDTHH:mm:ss.SSS' --merge-logs --max-memory-restart 1200M
```

```
$ pm2 logs
$ pm2 delete all
```

# PM2 무중단 서비스

https://engineering.linecorp.com/ko/blog/pm2-nodejs

프로세스 10개가 실행되고 있다고 가정해보겠습니다.  
이런 상태에서 pm2 reload를 실행하면 PM2는 기존 '0'번 프로세스를 '\_old_0' 프로세스로 옮겨두고 새로운 0번 프로세스를 만듭니다.  
새로운 0번 프로세스는 요청을 처리할 준비가 되면 마스터 프로세스에게 'ready' 이벤트를 보내고, 마스터 프로세스는 더 이상 필요없어진 \_old_0 프로세스(기존 0번 프로세스)에게 'SIGINT' 시그널을 보내고 프로세스가 종료되기를 기다립니다.  
만약 SIGINT 시그널을 보내고 난 후 일정 시간(1600ms)이 지났는데도 종료되지 않는다면, 'SIGKILL' 시그널을 보내 프로세스를 강제로 종료합니다.  
0번 프로세스의 재시작은 이런 과정을 거쳐 완료되는데요.  
이 과정을 총 프로세스 개수만큼 반복하면 모든 프로세스의 재시작이 완료됩니다.

## 재시작 과정에서 서비스 중단이 발생하는 경우

- 새로 만들어진 프로세스가 실제로는 아직 요청을 받을 준비가 되지 않았는데 ready 이벤트를 보내는 경우
- 클라이언트 요청을 처리하는 도중에 프로세스가 죽어버리는 경우
