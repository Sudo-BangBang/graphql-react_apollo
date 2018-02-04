import React from 'react'
import {graphql} from 'react-apollo'

import {ALL_POSTS_QUERY} from '../Queries'
import PostSummary from './PostSummary'

class PostList extends React.Component {


    render() {
        if (this.props.allPostsQuery.loading) {
            return (
                <div className='flex w-100 h-100 items-center justify-center pt7'>
                    <div>
                        Loading
                        (from {process.env.REACT_APP_GRAPHQL_ENDPOINT})
                    </div>
                </div>
            )
        }
        return (

            <div>
                {this.props.allPostsQuery.allPosts.map(post => (
                    <PostSummary post={post} key={post.id}/>
                ))}
            </div>
        )
    }
}

const PostListWithQuery = graphql(ALL_POSTS_QUERY, {
    name: 'allPostsQuery',
    options: ({blogId, sort}) =>{

        let variables = {
            blogId: blogId,
            field: sort.field,
            ascending: sort.ascending
        };

        //We need these over in PostCreate to know which allPosts query to update, if this app had state management I
        // would put it there, but for now its going in localStorage
        localStorage.setItem("allPostsVariables", JSON.stringify(variables));

        return ({
        fetchPolicy: 'cache-and-network',
        variables: variables
    })},

})(PostList);

export default PostListWithQuery
