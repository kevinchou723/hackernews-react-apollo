import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client' //bundled by apollo-boost
import { createHttpLink } from 'apollo-link-http' //bundled by apollo-boost
import { InMemoryCache } from 'apollo-cache-inmemory' //bundled by apollo-boost
import { setContext } from 'apollo-link-context'

import './styles/index.css';
import App from './components/App';
import { AUTH_TOKEN } from './constants'

// httpLink is to connect to where ever your GraphQL server is running on
// in this case it'll be running on localhost:4000
const httpLink = createHttpLink({
  uri: 'http://localhost:4000' // default to /graphql if not specified
})

// Our auth is http header inplementation. You can also use cookies for session based auth,
// see below link for diff auth inplementation
// https://github.com/apollographql/apollo-client/blob/master/docs/source/recipes/authentication.md
// more info on apollo-link-context
// https://github.com/apollographql/apollo-link/tree/master/packages/apollo-link-context
const authLink = setContext((request, previousContext) => {
  const token = localStorage.getItem(AUTH_TOKEN)
  const { headers } = previousContext
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

// to see more ApolloClient config options
// https://www.apollographql.com/docs/react/essentials/get-started.html#configuration
const link = authLink.concat(httpLink) // .concat is a apollo-link-context instance method
const client = new ApolloClient({
  cache: new InMemoryCache(), // InMemoryCache is actually default, including this for demo purpose
  link,
})

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
registerServiceWorker();
