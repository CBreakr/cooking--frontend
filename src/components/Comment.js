import React from "react";
import { updateComment } from "../requests";
import AuthContext from "../AuthContext";

export default class Comment extends React.Component {
    
    state = {
        comment: {}, 
        user: {},
        clickEdit: false,
    }
    componentDidMount() {
        this.setState({
            comment: this.props.comment,
            user: this.props.user
        })
    }

    static contextType = AuthContext;

    showButtons = () => {
        return (
            <>
                <button onClick={this.editComment}>edit</button>
                <button className='delete' onClick={() => this.props.delete(this.state.comment.id)}>delete</button>
            </>
        )
    }

    //show form, populate form with comment text
    editComment = () => {
        this.setState({
            clickEdit: true
        })
    }

    changeEditInput = (event) => {
        this.setState({
            comment: {...this.state.comment, text: event.target.value}
        })
    }

    //1. update backend
    //2. change state
    //3. clickForm to false
    submitEditComment = (event) => {
        event.preventDefault();
        updateComment(this.state.comment, this.context.token)
        this.setState({
            clickEdit: false
        })
    }

    showEditForm = () => {
        return (
            <form onSubmit={this.submitEditComment}> 
                <input value={this.state.comment.text} placeholder='edit your comment here' onChange={this.changeEditInput}></input>
                <input type="submit" value='edit'></input>
            </form>
        )
    }


    render(){
        return(
            <>
                <p>{this.state.user.name}: {this.state.comment.text}</p>
                {this.state.user.id === this.context.user.id 
                ? this.showButtons()
                : null
                }
                {this.state.clickEdit
                ? this.showEditForm()
                : null
                }
            </>
        )
    }
}