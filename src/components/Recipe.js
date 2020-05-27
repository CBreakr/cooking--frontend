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
        if(this.props.id){
            getSingleRecipe(this.props.id, this.context.token)
            .then(res => {
                // console.log("INDIVIDUAL RECIPE", res);
                if(res && res.data){
                    this.setState({
                        likes: res.data.likes ? res.data.likes.length : 0
                    });
                }
            });
        }
    }

    recipeDetails = () => {
        this.props.history.push(`/recipes/${this.translateID()}`)
    }

    translateID = () => {
        return this.props.api_id ? `A${this.props.api_id}` : this.props.id
    }

    render(){
        // console.log("RECIPE PROPS", this.props);
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