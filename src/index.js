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

import BlogList from './components/BlogList';

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

ReactDOM.render(
    <Router>
        <ApolloProvider client={client}>
            <div>
                <App/>
                <Route exact path='/r/:blogName' component={BlogList}/>
                <Route exact path='/r/' component={BlogList} />
                <Route exact path='/' component={BlogList} />
            </div>
        </ApolloProvider>
    </Router>
    ,
    document.getElementById('root')
);
registerServiceWorker();