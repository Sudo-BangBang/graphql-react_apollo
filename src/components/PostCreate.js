import React from 'react'
import {graphql} from 'react-apollo'
import gql from 'graphql-tag'

import {FRAGMENT_POST, ALL_POSTS_QUERY} from '../Queries'

class PostCreate extends React.Component {

    state = {
        linkUrl: "",
        linkDescription: ""
    };

    render() {

        let style = {
            background: "#424242",
            border: "none",
            color: "rgb(66, 165, 245)",
            display: "inline-block",
            marginRight: "6px",
            fontWeight: "bold",
            paddingLeft: "5px",

        };

        if (this.props.blogId === null || this.props.blogId === "" || !("authToken" in localStorage)) {
            return(
                <span>Select a blog and sign in to crate a new post</span>
            )
        } else {
            return (
                <div style={{paddingTop: "5px"}}>
                    <span style={{paddingRight: "5px"}}>New Post</span>
                    <input type="text" placeholder="URL"
                           value={this.state.linkUrl}
                           style={style}
                           onChange={e => this.setState({linkUrl: e.target.value})}/>
                    <input type="text" placeholder="description"
                           value={this.state.linkDescription}
                           style={style}
                           onChange={e => this.setState({linkDescription: e.target.value})}/>
                    <button className="button-primary" onClick={this.handleCreate}>Post</button>
                </div>
            )
        }
    }

    handleCreate = async () => {
        await this.props.createPostMutation({
            variables: {
                blogId: this.props.blogId,
                url: this.state.linkUrl,
                description: this.state.linkDescription
            }
        });
        this.setState({linkUrl: "", linkDescription: ""});
    }

}

const CREATE_POST_MUTATION = gql`
    mutation CreatePostMutation($blogId: String!, $url: String!, $description: String!) {
        createPostAndLink(blogId: $blogId, url: $url, description: $description) {
            ...post
        }
    }${FRAGMENT_POST}
`;

const CreatePostWithMutation = graphql(CREATE_POST_MUTATION, {
    name: 'createPostMutation',
    options: {
        update: (proxy, {data: {createPostAndLink}}) => {
            //Get the query variables our of storage so we know which allPosts cache to update
            let queryVariables = JSON.parse(localStorage.getItem("allPostsVariables"));

            //When the mutation returns get the all posts query cache
            const posts = proxy.readQuery({
                query: ALL_POSTS_QUERY,
                variables: queryVariables
            });

            //Add our new post
            posts.allPosts.push(createPostAndLink);
            //Store the updated cache for the query, this will update the application state
            proxy.writeQuery({query: ALL_POSTS_QUERY, variables: queryVariables ,data: posts});
        }
    }
})(PostCreate);

export default CreatePostWithMutation
