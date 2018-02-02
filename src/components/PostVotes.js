import React from 'react'
import {graphql} from 'react-apollo'
import gql from 'graphql-tag'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import {faLevelUpAlt, faLevelDownAlt} from '@fortawesome/fontawesome-free-solid'

import {ALL_POSTS_QUERY} from '../Queries'

class PostVotes extends React.Component {

    render() {

        let voteTotal = 0;

        if (this.props.voteTotal !== null) {
            voteTotal = this.props.voteTotal;
        }

        return (
            <div style={{display: "inline-block", marginRight: "10px", verticalAlign: "top"}}>
                <FontAwesomeIcon
                    icon={faLevelUpAlt}
                    flip="horizontal"
                    fixedWidth
                    style={{cursor: "pointer", display: "block"}}
                    onClick={() => {
                        this.handleVote(1)
                    }}
                />
                <div style={{textAlign: "center"}}>
                    {voteTotal}
                </div>
                <FontAwesomeIcon
                    icon={faLevelDownAlt}
                    flip="horizontal"
                    fixedWidth
                    style={{cursor: "pointer", display: "block"}}
                    onClick={() => {
                        this.handleVote(-1)
                    }}
                />
            </div>
        )
    }

    handleVote = async (vote) => {
        const id = this.props.postId;
        let voteTotal = 0;
        if (this.props.voteTotal !== null) {
            voteTotal = this.props.voteTotal;
        }
        voteTotal += vote;
        await this.props.updatePostMutation({variables: {id, voteTotal}});
    }

}

const UPDATE_POST_MUTATION = gql`
    mutation updatePostMutation($id: String!, $voteTotal: Int!) {
        updatePost(id: $id, voteTotal: $voteTotal) {
            id
            voteTotal
        }
    }
`;

const PostVotesWithMutation = graphql(UPDATE_POST_MUTATION, {
    name: 'updatePostMutation'
})(PostVotes);

export default PostVotesWithMutation
