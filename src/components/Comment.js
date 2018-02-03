import React from 'react'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import {faReply, faArrowCircleDown, faArrowCircleRight} from '@fortawesome/fontawesome-free-solid'
import TimeAgo from 'react-timeago'

import CommentsCommentsList from './CommentsCommentsList'
import CommentCreate from './CommentCreate'
import CommentVotes from './CommentVotes'

class Comment extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            showCommentCreate: false,
            collapsed: false
        };

        this.replyClicked = this.replyClicked.bind(this);
        this.collapseClicked = this.collapseClicked.bind(this);
        this.renderText = this.renderText.bind(this);
        this.renderChildComments = this.renderChildComments.bind(this);
        this.renderCommentCreate = this.renderCommentCreate.bind(this);
        this.renderCollapseArrow = this.renderCollapseArrow.bind(this);
    }

    replyClicked(){
        this.setState({showCommentCreate: !this.state.showCommentCreate});
    }

    collapseClicked(){
        this.setState({collapsed: !this.state.collapsed});
    }

    renderCollapseArrow(){
        if(!this.props.comment.commentList || this.props.comment.commentList.count === 0){
            return;
        }
        if(this.state.collapsed){
            return (
                <FontAwesomeIcon
                    icon={faArrowCircleRight}
                    pull="left"
                    fixedWidth
                    style={{cursor:"pointer"}}
                    onClick={this.collapseClicked}
                />
            )
        }else{
            return (
                <FontAwesomeIcon
                    icon={faArrowCircleDown}
                    pull="left"
                    fixedWidth
                    style={{cursor:"pointer"}}
                    onClick={this.collapseClicked}
                />
            )
        }
    }

    renderText(){
        if(!this.state.collapsed){
            return(
                <span>
                    <div style={{paddingLeft: "10px"}}>
                        {this.props.comment.text}
                    </div>
                    <CommentVotes commentId={this.props.comment.id} voteTotal={this.props.comment.voteTotal}/>
                </span>

            )
        }
    }

    renderChildComments(){
        if((this.props.comment.commentList && this.props.comment.commentList.count > 0) && !this.state.collapsed){
            return(
                <CommentsCommentsList commentList={this.props.comment.commentList}/>
            )
        }
    }

    renderCommentCreate(){
        if(this.state.showCommentCreate){
            return(
                <CommentCreate subjectId={this.props.comment.id}/>
            )
        }
    }

    render() {

        let comment = this.props.comment;
        return (
            <div className="comment" key={comment.id} style={{paddingBottom: "10px"}}>
                {this.renderCollapseArrow()}
                <div style={{paddingBottom: "5px"}}>
                    <div style={{display: "inline-block"}}>
                        <a href={"#"} style={{color: "#9E9E9E"}}>{comment.user.name}</a> - <TimeAgo date={comment.createdAt} live={false}/>
                        &nbsp;
                        <a href={"#"} onClick={this.replyClicked}>
                            <FontAwesomeIcon
                                icon={faReply}
                                fixedWidth/>
                            reply
                        </a>
                    </div>

                </div>
                {this.renderText()}
                {this.renderChildComments()}
                {this.renderCommentCreate()}
            </div>
        )
    }
}

export default Comment
