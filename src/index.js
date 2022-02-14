
import React from 'react';
import { render } from 'react-dom';
import Routes from './routes';



import { ApolloClient, ApolloLink, InMemoryCache, HttpLink, gql, useQuery } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
const httpLink = new HttpLink({ uri: 'http://localhost:4000/' });

const authLink = new ApolloLink((operation, forward) => {
  // Retrieve the authorization token from local storage.
  const token = localStorage.getItem("token") || "";

  // Use the setContext method to set the HTTP headers.
  operation.setContext({
    headers: {
      authorization: token
    }
  });

  // Call the next link in the middleware chain.
  return forward(operation);
});
const GET_NAME = gql`
    query {
      me {
        firstName
      }
    }
  
`
// function getName() {
//   const {loading, error, data} = client.query({
//     query: GET_NAME
//   })
//   .then(result =>(
//     console.log(result.data.me.firstName) 
//    ));

 
// }
const client = new ApolloClient({
  link: authLink.concat(httpLink), // Chain it with the HttpLink
  cache: new InMemoryCache(),
});
// getName();
render(<ApolloProvider client={client}><Routes /></ApolloProvider>, document.getElementById('app'));

if(module.hot) {
  module.hot.accept();
}

export default client;
