https://hartaniyassir.medium.com/how-to-quickly-setup-multiple-graphql-endpoints-in-apollo-client-and-codegen-react-24bba2e2f941

https://stackoverflow.com/questions/69629051/using-multiple-endpoints-in-apollo-client

https://medium.com/open-graphql/apollo-multiple-clients-with-react-b34b571210a5

https://stackoverflow.com/questions/59981062/how-to-integrate-multiple-clients-using-graphql-hooks-in-react-hooks

```javascript
//Declare your endpoints
const endpoint1 = new HttpLink({
    uri: 'https://api.hashnode.com/graphql',
    ...
})
const endpoint2 = new HttpLink({
    uri: 'endpoint2/graphql',
    ...
})

//pass them to apollo-client config
const client = new ApolloClient({
    link: ApolloLink.split(
        operation => operation.getContext().clientName === 'endpoint2',
        endpoint2, //if above
        endpoint1
    )
    ...
})

//pass client name in query/mutation
useQuery(QUERY, {variables, context: {clientName: 'endpoint2'}})
```
