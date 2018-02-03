import React from 'react'
import {graphql} from 'react-apollo'

import {ALL_BLOGS_QUERY} from '../Queries'
import PostList from './PostList'

class BlogList extends React.Component {

    renderCurrentBlog(blog){

        if(!blog.name) {
            blog.name = "All"
            blog.description = "All Posts"
        }
        return(
            <div style={{padding: "10px 10px 10px 10px", borderBottom: "1px solid #616161"}} >
                <div style={{color: "#42A5F5"}}>{blog.name} </div>
                {blog.description}
            </div>
        )
    }

    render() {

        if (this.props.allBlogsQuery.loading) {
            return (
                <div className='flex w-100 h-100 items-center justify-center pt7'>
                    <div>
                        Loading
                    </div>
                </div>
            )
        }

        let currentBlog = {id:""};
        this.props.allBlogsQuery.allBlogs.forEach(function(blog){
            if(this.props.match.params.blogName === blog.name){
                currentBlog = blog;
            }
        }.bind(this));


        return (

            <div>
                <div style={{backgroundColor: "#616161", padding: "5px"}}>
                    <span style={{paddingLeft: "10px", paddingRight: "10px"}}>
                        <a href={"/r/"} style={{color: "#42A5F5"}}>All</a>
                    </span>
                    {this.props.allBlogsQuery.allBlogs.map(blog =>(
                        <span key={blog.id} >
                            <span style={{color: "#9E9E9E"}}>|</span>
                            <span style={{paddingLeft: "10px", paddingRight: "10px"}}>
                                <a href={"/r/"+blog.name} style={{color: "#42A5F5"}}>{blog.name}</a>
                            </span>
                        </span>
                    ))}
                </div>
                {this.renderCurrentBlog(currentBlog)}
                <div>
                    <PostList blogId={currentBlog.id}/>
                </div>
            </div>
        )
    }
}

const BlogListWithQuery = graphql(ALL_BLOGS_QUERY, {
    name: 'allBlogsQuery',
    options: {
        fetchPolicy: 'cache-and-network',
    },
})(BlogList);

export default BlogListWithQuery
