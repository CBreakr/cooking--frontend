import React from "react";
import { getSingleRecipe } from "../requests";
import { withRouter } from "react-router-dom";
import AuthContext from "../AuthContext";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faHeart } from '@fortawesome/free-solid-svg-icons'

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
            <div className="box recipe-list-element" onClick={this.recipeDetails}>
                <span>
                    <img className="list-element" src={this.props.image ? this.props.image : "https://spoonacular.com/recipeImages/empty.jpg"} alt="recipe image" />
                </span>
                <span>
                    <h1 className="title is-4"><span className="user-icon"><FontAwesomeIcon color='orange' icon={faUser} /></span>{this.props.user.name}</h1>
                    <p>
                        <span className="title is-3">{this.props.title}</span> <span className="likes-heart"><FontAwesomeIcon color='red' icon={faHeart} /></span>{this.state.likes}
                    </p>
                </span>
            </div>
        )
    }

}

export default withRouter(TagRecipe)