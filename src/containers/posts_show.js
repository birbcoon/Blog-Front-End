import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchPost, deletePost, updatePost } from "../actions";

class PostsShow extends Component {
    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.fetchPost(id);
    }
    onDeleteClick(){
        const { id } = this.props.match.params;
        this.props.deletePost(id, ()=>{
            this.props.history.push('/');
        });
    }
    onEditClick(){
        const { id } = this.props.match.params;
        console.log(id)
        // this.props.updatePost(id, ()=>{
        //     this.props.history.push(`/api/posts/${id}/edit`);
        // });
    }
    render(){
        const { post } = this.props;

        if (!post) {
            return (
                <div className="container">
                    <div>Loading...</div>
                </div>
            )
        }

        return (
            <div className="container">
                <Link to="/" className="btn btn-primary">Back to Index</Link>

                <button
                className="btn btn-danger float-right"
                onClick={this.onDeleteClick.bind(this)}
                >
                    Delete Post
                </button>
                <Link
                className="btn btn-warning float-right"
                to={`/api/posts/${this.props.match.params}/edit`}
                >
                    Edit Post
                </Link>
                <div className="container">
                    <div className="row">
                        <div className="col-2"><h5>Title</h5></div>
                        <div className="col-10"><h4>{post.title}</h4></div>
                    </div>
                    <div className="row">
                        <div className="col-2"><h5>Category</h5></div>
                        <div className="col-10"><h5>{post.category}</h5></div>
                    </div>
                    <div className="row">
                        <div className="col-2"><h5>Content</h5></div>
                        <div className="col-10"><p>{post.content}</p></div>
                    </div>
                    {post.references && (
                        <div className="row">
                            <div className="col-2"><h5>References</h5></div>
                            <div className="col-10"><p>{post.references}</p></div>
                        </div>
                    )}
                </div>              
            </div>
        );
    }

}

function mapStateToProps({ posts }, ownProps) {
    return { post: posts[ownProps.match.params.id] };
}

export default connect(
    mapStateToProps,
    { fetchPost, deletePost, updatePost }
)(PostsShow);