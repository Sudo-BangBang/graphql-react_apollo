import React from 'react'
import {graphql} from 'react-apollo'
import gql from 'graphql-tag'

import {ALL_BLOGS_QUERY} from '../Queries'

class BlogCreate extends React.Component {

    state = {
        blogName: "",
        blogDescription: "",
        showInput: false
    };

    renderInput(){
        if(this.state.showInput){

            let style = {
                background: "#424242",
                border: "none",
                color: "rgb(66, 165, 245)",
                display: "inline-block",
                marginLeft: "6px",
                fontWeight: "bold",
                paddingLeft: "5px",

            };

            return(
                <span>
                    <input type="text" placeholder="blog name"
                           value={this.state.blogName}
                           style={style}
                           onChange={e => this.setState({blogName: e.target.value})}/>
                     <input type="text" placeholder="blog description"
                            value={this.state.blogDescription}
                            style={style}
                            onChange={e => this.setState({blogDescription: e.target.value})}/>
                    <button className="button-primary" onClick={this.handleCreate}>Create</button>
                </span>
            )
        }
    }

    render() {

        return (
            <span>
                <span style={{color: "#9E9E9E"}}>|</span>
                <a href="#" style={{color: "#42A5F5", paddingLeft: "10px", paddingRight: "10px"}} onClick={e => this.setState({showInput: !this.state.showInput})}>New Blog+</a>
                {this.renderInput()}
            </span>
        )
    }

    handleCreate = async () => {
        await this.props.createBlogMutation({variables: {name: this.state.blogName, description: this.state.blogDescription}});
        this.setState({blogName: "",
            blogDescription: "",
            showInput: false});
    }

}

const CREATE_BLOG_MUTATION = gql`
    mutation CreateBlogMutation($name: String!, $description: String!) {
        createBlog(name: $name, description: $description) {
            id
            name
            description
        }
    }
`;

const CreateBlogWithMutation = graphql(CREATE_BLOG_MUTATION, {
    name: 'createBlogMutation',
    options: {
        update: (proxy, { data: { createBlog } }) => {
            //When the mutation returns get the all blogs query cache
            const blogs = proxy.readQuery({ query: ALL_BLOGS_QUERY });
            //Add our new blog
            blogs.allBlogs.push(createBlog);
            //Store the updated cache for the query, this will update the application state
            proxy.writeQuery({query: ALL_BLOGS_QUERY, data: blogs});
        }
    }
})(BlogCreate);

export default CreateBlogWithMutation
