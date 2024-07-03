# Node.js 스케줄러 (Schedulers)

https://betterstack.com/community/guides/scaling-nodejs/best-nodejs-schedulers

https://npmtrends.com/agenda-vs-bree-vs-bullmq-vs-cron-vs-croner-vs-cronosjs-vs-node-cron-vs-node-schedule

https://greenydev.com/blog/pm2-cron-job-multiple-instances/

- Bull
- Agenda
- Bree
- Node Schedule
- Cron
- Cronosjs
- Node Cron
- Croner
- Bottleneck
- Toad-scheduler

`BullMQ, Agenda, or Bree` are solid options for advanced scheduling needs, and they have the advantage of persisting jobs.  
Alternatively, schedulers like `Node Scheduler or Cron` can be suitable choices if you have more straightforward requirements.

## 멀티 코어 환경, 클러스터 모드 - PM2

https://stackoverflow.com/questions/30843605/how-to-run-cron-job-in-node-js-application-that-uses-cluster-module

## PM2 활용 스케줄링

https://pm2.keymetrics.io/docs/usage/restart-strategies/

```bash
$ pm2 start app.js --cron-restart="0 0 * * *"
# Or when restarting an app
$ pm2 restart app --cron-restart="0 0 * * *"
```
