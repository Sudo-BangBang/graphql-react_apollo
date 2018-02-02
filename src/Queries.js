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