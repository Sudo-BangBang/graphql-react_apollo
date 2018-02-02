import React from 'react'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import {faCommentAlt} from '@fortawesome/fontawesome-free-solid'

import CommentsList from './CommentsList'
import PostVotes from './PostVotes'

class PostSummary extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            showComments: false
        };

        this.commentsClicked = this.commentsClicked.bind(this);
        this.renderComments = this.renderComments.bind(this);
    }

    commentsClicked(){
        this.setState({showComments: !this.state.showComments});
    }

    renderComments(){
        if(this.state.showComments){
            return(
                <CommentsList commentList={this.props.post.commentList} subjectId={this.props.post.id}/>
            )
        }
    }

    render() {
        let post = this.props.post;

        return (
            <div className="post" key={post.id}>
                <PostVotes postId={post.id} voteTotal={post.voteTotal}/>
                <div style={{display: "inline-block"}}>
                    <a href={post.postLink.url} style={{color: "#1976D2"}}>{post.postLink.description}</a><br/>
                    <span className="post-summary">
                        submitted {post.createdAt} by <a href={"#"}>{post.postLink.postedBy.name}</a> to <a href={"#"}>{post.blog.name}</a><br/>
                        <FontAwesomeIcon
                            icon={faCommentAlt}
                            pull="left"
                            fixedWidth/>
                            <a href={"#"} onClick={this.commentsClicked}>
                                {post.commentList.count} comments
                            </a>
                        {this.renderComments()}
                    </span>
                </div>
            </div>
        )
    }
}

export default PostSummary
