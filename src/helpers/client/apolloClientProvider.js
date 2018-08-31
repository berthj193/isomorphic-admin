import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';

export default uri => {
  const httpLink = new HttpLink({
    uri,
  });

  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('id_token');

    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        id_token: token,
      },
    };
  });

  const client = new ApolloClient({
    // By default, this client will send queries to the
    //  `/graphql` endpoint on the same host
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
  return client;
};
