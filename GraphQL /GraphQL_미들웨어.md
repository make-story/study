# GraphQL middleware

```
$ yarn add graphql-middleware graphql-tools
```

https://www.npmjs.com/package/graphql-middleware

https://dev.to/seancwalsh/how-to-write-graphql-middleware-node-apollo-server-express-2h87

middleware.js

```javascript
const logInput = async (resolve, root, args, context, info) => {
  console.log(`1. logInput: ${JSON.stringify(args)}`);
  const result = await resolve(root, args, context, info);
  console.log(`5. logInput`);
  return result;
};

const logResult = async (resolve, root, args, context, info) => {
  console.log(`2. logResult`);
  const result = await resolve(root, args, context, info);
  console.log(`4. logResult: ${JSON.stringify(result)}`);
  return result;
};

async function getUserFromCookie(req) {
  try {
    const { clientSession } = req.cookies; // requires cookie-parser middleware

    if (!clientSession) {
      throw new Error('session cookie does not exist');
    }

    return await getUser(clientSession); // get user details from Database
  } catch (error) {
    throw new AuthenticationError(`Cannot get user from cookie: \n ${error}`);
  }
}
async function addUserToArgs(resolve, parent, args, context, info) {
  const user = await getUserFromCookie(context.req);
  const argsWithUser = { user, ...args };

  return resolve(parent, argsWithUser, context, info);
}

export default [logInput, logResult];
```

server.js

```javascript
import { applyMiddleware } from 'graphql-middleware';
import { makeExecutableSchema } from 'graphql-tools';

import resolvers from './resolvers'; // returns array of resolvers
import middleware from './middleware'; // returns array of middelware

// this combines all of the resolvers
const executableSchema = makeExecutableSchema({ typeDefs: schema, resolvers });
const schemaWithMiddleware = applyMiddleware(executableSchema, ...middleware);

const server = new ApolloServer({
  playground: true,
  typeDefs: schema,
  resolvers,
  context: async ({ req, res }) => ({ req, res }), // now we can access express objects from apollo context arg
  schema: schemaWithMiddleware, // add this property
});
```
