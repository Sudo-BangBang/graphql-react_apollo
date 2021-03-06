import React from 'react'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import {faCommentAlt} from '@fortawesome/fontawesome-free-solid'
import TimeAgo from 'react-timeago'
import {Link} from 'react-router-dom';

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

        let link = post.link.url;

        if(!link.startsWith("http://")){
            link = "http://"+link;
        }

        return (
            <div className="post" key={post.id}>
                <PostVotes postId={post.id} voteTotal={post.voteTotal}/>
                <div style={{display: "inline-block"}}>
                    <a href={link} style={{color: "#1976D2"}}>{post.link.description}</a><br/>
                    <span className="post-summary">
                        submitted <TimeAgo date={post.createdAt}/> by&nbsp;
                        <a href={"#"}>{post.link.postedBy.name}</a> to&nbsp;
                        <Link to={"/r/"+post.blog.name}>{post.blog.name}</Link>
                        <br/>
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
