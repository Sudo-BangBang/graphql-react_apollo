import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faCommentAlt } from '@fortawesome/fontawesome-free-solid'

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
                    <div style={{padding: "20px", marginTop: "0px", backgroundColor: "#212121", borderBottom: "1px solid #616161", color: "#BDBDBD"}} key={post.id}>
                        <a href={post.postLink.url} style={{color: "#1976D2"}}>{post.postLink.description}</a><br/>
                        <span style={{color:"#9E9E9E"}}>
                            submitted {post.createdAt} by <a>{post.postLink.postedBy.name}</a> to <a>{post.blog.name}</a><br/>
                            <FontAwesomeIcon icon={faCommentAlt} pull="left" fixedWidth/> <a>{post.comments.length} comments</a>
                        </span>
                    </div>

                ))}


            </div>
        )
    }
}

const ALL_POSTS_QUERY = gql`
    query AllPostsQuery {
        allPosts{
          id
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
