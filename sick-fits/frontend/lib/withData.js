import withApollo from 'next-with-apollo'; // high order component that exposes our apollo client as a prop
import ApolloClient from 'apollo-boost';  // a bunch of apollo packages all together
import { endpoint } from '../config';

function createClient({ headers }) {
  
  return new ApolloClient({
    uri: process.env.NODE_ENV === 'development' ? endpoint : endpoint,
    request: operation => {
      operation.setContext({
        fetchOptions: {
          credentials: 'include',
        },
        headers,
      });
    },
  });
}

export default withApollo(createClient);
