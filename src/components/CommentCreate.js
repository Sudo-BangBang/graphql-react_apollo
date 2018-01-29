import React from 'react'
import {graphql} from 'react-apollo'
import gql from 'graphql-tag'

import {ALL_POSTS_QUERY} from '../Queries'

class CommentCreate extends React.Component {

    state = {
        comment: ''
    };

    render() {

        return (
            <div>
                <textarea
                    value={this.state.comment}
                    onChange={e => this.setState({comment: e.target.value})}/><br/>
                <button className="button-primary" onClick={this.handlePost}>Post</button>
            </div>
        )
    }

    handlePost = async () => {
        const comment= this.state.comment;
        const subjectId = this.props.subjectId;
        await this.props.createCommentMutation({variables: {postId: subjectId, text: comment}});
        this.setState({comment: ""});
    }

}

const CREATE_COMMENT_MUTATION = gql`
    mutation CreateCommentMutation($postId: String!, $text: String!) {
        createComment(postId: $postId, text: $text) {
            id
            text
            createdAt
            postId
            user{
              name
            }
        }
    }
`;

const CreatePageWithMutation = graphql(CREATE_COMMENT_MUTATION, {
    name: 'createCommentMutation',
    options: {
        update: (proxy, { data: { createComment } }) => {
            //When the mutation returns get the all posts query cache
            const data = proxy.readQuery({ query: ALL_POSTS_QUERY });
            //Find the post we are commenting on and add our new comment to the array
            data.allPosts.filter(function (post) {
                return post.id === createComment.postId;
            })[0].comments.push(createComment);
            //Store the updated cache for the query, this will update the application state
            proxy.writeQuery({query: ALL_POSTS_QUERY, data});
        }
    }
})(CommentCreate);

export default CreatePageWithMutation
