import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import PostList from './components/PostList';

import gql from 'graphql-tag';

const client = new ApolloClient({
    link: new HttpLink({ uri: 'http://localhost:8080/graphql' }),
    cache: new InMemoryCache()
});

client.query({ query: gql`{
    allBlogs{
        name
        description
        id
        posts{
            id
            postLink{
                description
                url
                postedBy{
                    name
                }
            }
            comments{
                text
                user{
                    name
                }
            }
        }
    }
}` }).then(console.log);

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