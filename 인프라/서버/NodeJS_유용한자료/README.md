# fetch

## 브라우저단 지원 범위

https://caniuse.com/fetch

## Node.js v18 지원 (실험적 지원)

https://nodejs.org/en/blog/announcements/v18-release-announce  
https://nodejs.org/dist/latest-v18.x/docs/api/globals.html#fetch  
https://dev.to/andrewbaisden/the-nodejs-18-fetch-api-72m

Node.js v21 안정화된 버전 내장  
https://blog.logrocket.com/fetch-api-node-js/

# dotenv

Node.js v20 내장됨  
https://dev.to/cjreads665/nodejs-2060-say-goodbye-to-dotenv-2ijl

```
$ node --env-file .env
```

# import 에서 확장자까지 명확하게 쓰는 것 중요?

Relative import paths need explicit file extensions in EcmaScript imports when '--moduleResolution' is 'node16' or 'nodenext'

번들러 입장에서도 확장자까지 기입하는 것이 중요하다고 함  
https://main.vitejs.dev/guide/performance.html#reduce-resolve-operations
