import React from 'react'
import {graphql} from 'react-apollo'
import gql from 'graphql-tag'

import {ALL_POSTS_QUERY} from '../Queries'

class CommentCreate extends React.Component {

    state = {
        comment: ''
    };

    render() {

        if ("authToken" in localStorage) {
           return (
                <div>
                <textarea
                    value={this.state.comment}
                    onChange={e => this.setState({comment: e.target.value})}/><br/>
                    <button className="button-primary" onClick={this.handlePost}>Post</button>
                </div>
            )
        }else{
            return(
                <span>Login to leave a comment</span>
            )
        }
    }

    handlePost = async () => {
        const comment = this.state.comment;
        const subjectId = this.props.subjectId;
        await this.props.createCommentMutation({variables: {subjectId: subjectId, text: comment}});
        this.setState({comment: ""});
    }

}

const CREATE_COMMENT_MUTATION = gql`
    mutation CreateCommentMutation($subjectId: String!, $text: String!) {
        createComment(subjectId: $subjectId, text: $text) {
            id
            subjectId
            text
            createdAt
            user{
                name
            }
            voteTotal
            voteList{
                count
            }
            commentList{
                count
                comments{
                  id
                }
            }
        }
    }
`;

const CreatePageWithMutation = graphql(CREATE_COMMENT_MUTATION, {
    name: 'createCommentMutation',
    options: {
        // Kept because this is some really handy code to reference
        update: (proxy, {data: {createComment}}) => {

            //Bellow are 3 ways to update the local cache (and hence to application state and UI) after a mutation

            //#1
            //This updates the cache for a whole query, it works if you can locate the data you need to update
            // but since we could be commenting on a post or any comment on several different levels it doesn't really work for us
            // bellow shows how it would be done if we knew we were commenting on a post
            var updateByFindingObjectInCache = function () {
                //When the mutation returns get the all posts query cache
                const data = proxy.readQuery({query: ALL_POSTS_QUERY});
                //Find the post we are commenting on
                let post = data.allPosts.filter(function (post) {
                    return post.id === createComment.subjectId;
                })[0];
                //Add our new comment to the array
                post.commentList.comments.push(createComment);
                //Update the comment count
                post.commentList.count++;
                //Store the updated cache for the query, this will update the application state
                proxy.writeQuery({query: ALL_POSTS_QUERY, data});
            };


            //#2
            //This works by fetching an object from the local cache by its ID using a fragment
            // this works great here because we can just fetch the parent by ID and update its list of comments
            // apollo seems to be getting upset at me (probably rightly so) for not using GraphQl schema interfaces properly
            // but I don't have time to keep going down this particular rabbit hole right now and this is working pretty well
            // obviously take the time to use interfaces properly before using this in a real scenario
            var updateByFetchingObjectById = function () {
                var commentListFragment = gql`
                fragment comment on Object{
                    commentList{
                        count
                        comments{
                          id
                        }
                    }
                }
                `;

                //Fetch the parent fragment by ID
                var post = proxy.readFragment({
                    id: createComment.subjectId,
                    fragment: commentListFragment
                });

                //Add our new comment to the array
                post.commentList.comments.push(createComment);
                //Update the comment count
                post.commentList.count++;

                //Update the local cache
                proxy.writeFragment({
                    id: createComment.subjectId,
                    fragment: commentListFragment,
                    data: post
                });
            };

            updateByFetchingObjectById();
            // updateByFindingObjectInCache();
        },
        //#3
        //This one is real simple, go back to the server and fetch the allPosts query again, not very efficient, but effective
        // note, this is an extra property, separate to the update one above
        // refetchQueries: [
        //     //Refetch the whole data structure
        //     {query: ALL_POSTS_QUERY}
        // ]


    }
})(CommentCreate);

export default CreatePageWithMutation
