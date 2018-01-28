import React from 'react'

class Comment extends React.Component {


    render() {

        let comment = this.props.comment;
        return (
            <div className="comment" key={comment.id} style={{paddingBottom: "10px"}}>
                <div style={{paddingBottom: "5px"}}><a href={"#"} style={{color: "#9E9E9E"}}>{comment.user.name}</a> - {comment.createdAt}</div>
                {comment.text}
            </div>
        )
    }
}

export default Comment
