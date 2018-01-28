import React from 'react'

import CommentCreate from './CommentCreate'
import Comment from './Comment'

class CommentsList extends React.Component {

    render() {

        return (
            <div style={{padding: "10px", backgroundColor: "#424242", marginTop: "10px"}}>

                {this.props.comments.map(comment => (
                    <Comment comment={comment}/>
                ))}

                <CommentCreate subjectId={this.props.subjectId}/>

            </div>
        )
    }
}

export default CommentsList
