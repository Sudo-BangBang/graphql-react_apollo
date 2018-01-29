import gql from 'graphql-tag'

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
`;
