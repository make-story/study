# Node PM2 자동 재시작 메모리 설정

```
$ pm2 start server.js --name test -i max -o /data/logs/server.log -e /data/logs/server.error.log --log-date-format 'YYYY-MM-DDTHH:mm:ss.SSS' --merge-logs --max-memory-restart 1200M
```

```
$ pm2 logs
$ pm2 delete all
```