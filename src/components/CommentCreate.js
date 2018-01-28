import React from 'react'
import {graphql} from 'react-apollo'
import gql from 'graphql-tag'

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
                <button onClick={this.handlePost}>Post</button>
            </div>
        )
    }


    handlePost = async () => {
        const comment= this.state.comment;
        const subjectId = this.props.subjectId;
        await this.props.createCommentMutation({variables: {postId: subjectId, text: comment}});
    }

}

const CREATE_COMMENT_MUTATION = gql`
    mutation CreateCommentMutation($postId: String!, $text: String!) {
        createComment(postId: $postId, text: $text) {
            id
        }
    }
`;

const CreatePageWithMutation = graphql(CREATE_COMMENT_MUTATION, {name: 'createCommentMutation'})(CommentCreate);

export default CreatePageWithMutation
