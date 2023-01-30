# 리다이렉트 (redirect)

https://nextjs.org/docs/api-reference/data-fetching/get-server-side-props#redirect

https://stackoverflow.com/questions/65784602/next-js-getserversideprops-redirection-err-http-headers-sent-error

https://github.com/vercel/next.js/discussions/14890

아래와 같이 할 경우 `에러!`
`Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client` 
```javascript
import React from 'react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';

const Private = (props: any) => {
  console.log(props);
  return <>TEST</>;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // redirect test: always redirect to '/login'
  ctx.res.setHeader('Location', '/login');
  ctx.res.statusCode = 302;
  ctx.res.end();
  return {
    props: {},
  };
};

export default Private;
```

# 아래와 같이 작업
```javascript
return {
  redirect: {
    permanent: false,
    destination: "/login",
  },
  props:{},
};
```