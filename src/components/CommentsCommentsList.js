import React from 'react'

import Comment from './Comment'

class CommentsCommentsList extends React.Component {

    render() {

        return (
            <div style={{padding: "10px", paddingLeft: "20px", marginTop: "10px", borderLeft: "1px solid rgb(66, 165, 245)"}}>

                {this.props.commentList.comments.map(comment => (
                    <Comment comment={comment} key={comment.id}/>
                ))}

            </div>
        )
    }
}

export default CommentsCommentsList
