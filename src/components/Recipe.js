import React from "react";
import { getSingleRecipe } from "../requests";
import { withRouter } from "react-router-dom";
import AuthContext from "../AuthContext";
class Recipe extends React.Component {

    state = {
        likes: 0
    }

    static contextType = AuthContext;

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

    render(){
        // const recipe_id = this.props.api_id ? `A${this.props.api_id}` : this.props.id
        return (
            <div>
                {this.props.user.name}: {this.props.title} | 
                {this.state.likes} {this.state.likes > 1 ? 'likes': 'like'} |
                {/* have a check for whether this was created by the user */}
                {/* 
                    is there a reasonable way to check if this has already been liked? 
                    I don't like the idea of doing a cross check for everything
                */}
                {/*
                    I can also indicate whether this came from the API or not
                */}
                <button onClick={this.recipeDetails}>Details</button>
            </div>
        )
    }
}

export default withRouter(Recipe);