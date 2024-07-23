# SIGABRT 에러

```
  status: null,
  signal: 'SIGABRT',
  output: [ null, null, null ],
  pid: 51530,
  stdout: null,
  stderr: null
```

```bash
$ ps -ef | grep turbo
```

turbo 관련 프로세스 확인 후

```bash
$ kill -9 <프로세스ID>
```
