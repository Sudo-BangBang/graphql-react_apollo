import React from 'react'
import {graphql} from 'react-apollo'
import gql from 'graphql-tag'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import {faLevelUpAlt, faLevelDownAlt} from '@fortawesome/fontawesome-free-solid'

class CommentVotes extends React.Component {

    render() {

        let voteTotal = 0;

        if (this.props.voteTotal !== null) {
            voteTotal = this.props.voteTotal;
        }

        return (
            <div style={{marginTop: "10px"}}>
                <FontAwesomeIcon
                    icon={faLevelUpAlt}
                    flip="horizontal"
                    fixedWidth
                    style={{cursor: "pointer"}}
                    onClick={() => {
                        this.handleVote(1)
                    }}
                />
                <span>
                    {voteTotal}
                </span>
                <FontAwesomeIcon
                    icon={faLevelDownAlt}
                    fixedWidth
                    style={{cursor: "pointer"}}
                    onClick={() => {
                        this.handleVote(-1)
                    }}
                />
            </div>
        )
    }

    handleVote = async (vote) => {
        const id = this.props.commentId;
        let voteTotal = 0;
        if (this.props.voteTotal !== null) {
            voteTotal = this.props.voteTotal;
        }
        voteTotal += vote;
        await this.props.updateCommentMutation({variables: {id, voteTotal}});
    }

}

const UPDATE_COMMENT_MUTATION = gql`
    mutation updateCommentMutation($id: String!, $voteTotal: Int!) {
        updateComment(id: $id, voteTotal: $voteTotal) {
            id
            voteTotal
        }
    }
`;

const CommentVotesWithMutation = graphql(UPDATE_COMMENT_MUTATION, {
    name: 'updateCommentMutation'
})(CommentVotes);

export default CommentVotesWithMutation
