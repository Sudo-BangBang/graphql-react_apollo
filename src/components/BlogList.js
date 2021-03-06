import React from 'react'
import {graphql} from 'react-apollo'
import {Link} from 'react-router-dom';

import {ALL_BLOGS_QUERY} from '../Queries'
import PostList from './PostList'
import BlogCrate from './BlogCreate'
import PostCreate from './PostCreate'

class BlogList extends React.Component {


    constructor(props){
        super(props);
        this.state = {
            selectedSort: 0,
            sort:{
                field: "VOTE_TOTAL",
                ascending: false
            }
        };

        this.handleSort = this.handleSort.bind(this);
    }


    renderCurrentBlog(blog){

        if(!blog.name) {
            blog.name = "All"
            blog.description = "All Posts"
        }
        return(
            <span>
                <div style={{color: "#42A5F5"}}>{blog.name} </div>
                {blog.description}
            </span>
        )
    }

    handleSort(field, ascending, index){
        this.setState({
            selectedSort: index,
            sort:{
                field: field,
                ascending: ascending
            }

        });
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
                        <Link to={"/r/"} style={{color: "#42A5F5"}}>All</Link>
                    </span>
                    {this.props.allBlogsQuery.allBlogs.map(blog =>(
                        <span key={blog.id} >
                            <span style={{color: "#9E9E9E"}}>|</span>
                            <span style={{paddingLeft: "10px", paddingRight: "10px"}}>
                                <Link to={"/r/"+blog.name} style={{color: "#42A5F5"}}>{blog.name}</Link>
                            </span>
                        </span>
                    ))}
                    <BlogCrate/>
                    <div style={{display: "inlineBlock", float: "right"}}>
                        <button className={this.state.selectedSort===0?"button-primary":"button-secondary"} onClick={()=>{this.handleSort("VOTE_TOTAL", false, 0)}}>highest voted</button>
                        <button className={this.state.selectedSort===1?"button-primary":"button-secondary"} onClick={()=>{this.handleSort("VOTE_TOTAL", true, 1)}}>lowest voted</button>
                        <button className={this.state.selectedSort===2?"button-primary":"button-secondary"} onClick={()=>{this.handleSort("CREATED_AT", false, 2)}}>newest</button>
                        <button className={this.state.selectedSort===3?"button-primary":"button-secondary"} onClick={()=>{this.handleSort("CREATED_AT", true, 3)}}>oldest</button>
                    </div>
                </div>
                <div style={{padding: "10px 10px 10px 10px", borderBottom: "1px solid #616161"}} >
                    <div style={{display: "inline-block"}}>
                    {this.renderCurrentBlog(currentBlog)}
                    </div>
                    <div style={{display: "inline-block", float: "right"}}>
                        <PostCreate blogId={currentBlog.id}/>
                    </div>
                </div>

                <div>
                    <PostList blogId={currentBlog.id} sort={this.state.sort}/>
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
