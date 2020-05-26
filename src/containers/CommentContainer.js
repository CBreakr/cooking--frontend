import React from "react";
import { createComment, deleteComment } from "../requests";
import AuthContext from "../AuthContext";
import Comment from '../components/Comment'


export default class CommentContainer extends React.Component {

    state = {
        comments: [], //array of objects, each objects has two objects {user:{}, comment:{}}
        newComment: ''
    }

    static contextType = AuthContext;
    componentDidMount() {
        this.setState({
            comments: this.props.comments
        })
    }

    changeCommentInput = (event) => {
        this.setState({
            newComment: event.target.value
        })
    }

    submitComment = (event) => {
        event.preventDefault()
        let newComment = {
            "recipe_id": this.props.recipe.id,
            "user_id": this.context.user.id,
            "text": this.state.newComment
        }
        let comment_obj = {user: this.context.user, comment: newComment}
        createComment(newComment, this.context.token)
        .then(res => {
            comment_obj.comment = res.data
            const copy = [...this.state.comments];
            copy.push(comment_obj);
            this.setState({
                comments: copy,
                newComment: ''
            })
        })
    }

    //delete comment at backend
    //update comments here
    deleteComment = (comment_id) => {
        console.log('Inside delete function, comment id is', comment_id)
        deleteComment(comment_id, this.context.token)
        .then(res => {
            let copy = [...this.state.comments]
            let newCopy = []
            console.log('copy is: ', copy)
            copy.forEach(comment_obj => {
                if (comment_obj.comment.id !== comment_id) {
                    newCopy.push(comment_obj)
                }
            })
            console.log('New coppy is :', newCopy)
            this.setState({
                comments: newCopy
            })
        })
    }

    render() {
        return (
            <div className='comments-container'>
                <h4>Comments:</h4>
                {this.state.comments.map((comment, index) => <Comment key={index} {...comment} delete={this.deleteComment}/>)}
                <h4>Add a comment:</h4>
                <form onSubmit={this.submitComment}>
                    <input value={this.state.newComment} placeholder='add a comment here' onChange={this.changeCommentInput}></input>
                    <input type="submit"></input>
                </form>
            </div>
        )
    }
}