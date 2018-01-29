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
    options: {
        fetchPolicy: 'cache-and-network',
    },
})(PostList);

export default PostListWithQuery
