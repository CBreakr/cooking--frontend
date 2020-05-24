import React from "react";

import SearchBar from "../components/SearchBar";
import RecipeList from "../components/RecipeList";

import { getUserCookbook } from "../requests";

class RecipeListContainer extends React.Component {

    state = {
        recipes: []
    }

    componentDidMount(){
        // get user's own recipes
        getUserCookbook(this.props.token)
        .then(res => {
            this.setState({recipes: res.data});
        });
    }

    updateRecipesList = (recipes) => {
        this.setState({recipes});
    }

    render(){
        return (
            <>
            <div>RecipeListContainer</div>
            <SearchBar updateRecipesList={this.updateRecipesList} token={this.props.token} />
            <RecipeList recipes={this.state.recipes} user={this.props.user} />
            </>
        )
    }
}

export default RecipeListContainer;
