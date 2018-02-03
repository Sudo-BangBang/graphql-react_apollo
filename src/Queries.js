import gql from 'graphql-tag'

export const FRAGMENT_COMMENT = gql`
fragment comment on Comment{
    id
    text
    createdAt
    user{
        name
    }
    voteTotal
    voteList{
        count
    }
}
`;

export const ALL_POSTS_QUERY = gql`
query AllPostsQuery($blogId: String) {
    allPosts(filter: {blog_id: $blogId}){
        id
        createdAt
        postLink{
            description
            url
            postedBy{
                name
            }
        }
        commentList{
            count
            comments{
                ...comment
                commentList{
                    count
                    comments{
                        ...comment
                        commentList{
                            count
                            comments{
                                ...comment
                            }
                        }
                    }
                }
            }
        }
        voteTotal
        voteList{
            count
        }
        blog{
            name
        }
    }
}${FRAGMENT_COMMENT}
`;

export const ALL_BLOGS_QUERY = gql`
query AllBlogsQuery {
    allBlogs{
    id
    name
    description
  }
}
`;