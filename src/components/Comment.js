import React from "react";
import { updateComment } from "../requests";
import AuthContext from "../AuthContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

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
                <button className='button is-link is-small' onClick={this.editComment}><i class="far fa-edit"></i>Edit</button>
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
            comment: { ...this.state.comment, text: event.target.value }
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
                <div className="field is-grouped">
                    <p className="control">
                        <input className="input is-small" type="text" value={this.state.comment.text} onChange={this.changeEditInput}></input>
                    </p>
                    <p className="control">
                        <input className='button is-link is-small' type="submit" value="Edit" />
                    </p>
                </div>
            </form>
        )
    }


    render() {
        return (
            <div className='notification is-grey'>
                <p className='subtitle is-5'><FontAwesomeIcon color='orange' icon={faUser} />{this.state.user.name} said:</p>
                <p>{this.state.comment.text}</p>
                {this.state.user.id === this.context.user.id
                    ? this.showButtons()
                    : null
                }
                {this.state.clickEdit
                    ? this.showEditForm()
                    : null
                }
            </div>
        )
    }
}