import React from 'react'
import {graphql} from 'react-apollo'
import gql from 'graphql-tag'

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

const ALL_POSTS_QUERY = gql`
    query AllPostsQuery {
        allPosts{
          id
          createdAt
          postLink{
            description
            url
            postedBy{
              name
            }
          }
          comments{
            id
            text
            createdAt
            user{
              name
            }
          }
        blog{
          name
        }
      }
    }
`

const PostListWithQuery = graphql(ALL_POSTS_QUERY, {
    name: 'allPostsQuery',
    options: {
        fetchPolicy: 'network-only',
    },
})(PostList);

export default PostListWithQuery
