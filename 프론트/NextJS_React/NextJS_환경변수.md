# `NEXT_PUBLIC_`

https://nextjs.org/docs/basic-features/environment-variables#exposing-environment-variables-to-the-browser

# next.config.js

https://nextjs.org/docs/api-reference/next.config.js/runtime-configuration

```javascript
module.exports = {
  serverRuntimeConfig: {
    // Will only be available on the server side
    mySecret: 'secret',
    secondSecret: process.env.SECOND_SECRET, // Pass through env variables
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    staticFolder: '/static',
  },
};
```
