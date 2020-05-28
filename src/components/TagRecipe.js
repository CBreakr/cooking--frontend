import React from "react";
import { getSingleRecipe } from "../requests";
import { withRouter } from "react-router-dom";
import AuthContext from "../AuthContext";

//recipe list under this tag
//when click 'detail' button, redirect to recipe details page
class TagRecipe extends React.Component {

    static contextType = AuthContext;

    state = {
        likes: 0
    }

    componentDidMount() {
        getSingleRecipe(this.props.id, this.context.token)
            .then(res => this.setState({
                likes: res.data.likes.length
            }))
    }

    recipeDetails = () => {
        this.props.history.push(`/recipes/${this.translateID()}`)
    }

    translateID = () => {
        return this.props.api_id ? `A${this.props.api_id}` : this.props.id
    }

    render() {
        return (
            <div className="box">
                <h1 className="title is-4"><i class="fas fa-user" color='orange'></i>{this.props.user.name}</h1>
                <p>{this.props.title} <i class="fas fa-heart" color='red'></i> {this.state.likes}   {this.state.likes > 1 ? 'likes' : 'like'}</p>
                <p>
                    <button className='button is-danger is-small' onClick={this.recipeDetails}>Details</button>
                </p>
            </div>
        )
    }

}

export default withRouter(TagRecipe)