import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

import PostList from './components/PostList';

import gql from 'graphql-tag';

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('authToken');
    // return the headers to the context so httpLink can read them

    if(token == null){
        return {
            headers: {
                ...headers
            }
        }
    }else{
        return {
            headers: {
                ...headers,
                authorization: `Bearer ${token}`
            }
        }
    }

});

const client = new ApolloClient({
    link: authLink.concat(createHttpLink({
        uri: 'http://localhost:8080/graphql',
    })),
    cache: new InMemoryCache({
        //This allows us to retrieve an object from the cache by its ID
        dataIdFromObject: object => object.id,
    }),
});

console.log(client);

ReactDOM.render(
    <Router>
        <ApolloProvider client={client}>
            <div>
                <Route exact path='/' component={App} />
                <Route exact path='/test' component={App} />
                <PostList></PostList>
            </div>
        </ApolloProvider>
    </Router>
    ,
    document.getElementById('root')
);
registerServiceWorker();