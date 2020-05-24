import React from "react";

import SearchBar from "../components/SearchBar";
import RecipeList from "../components/RecipeList";

import { getUserCookbook } from "../requests";

import AuthContext from "../AuthContext";

class RecipeListContainer extends React.Component {

    state = {
        recipes: []
    }

    static contextType = AuthContext;

    componentDidMount(){
        // get user's own recipes

        console.log("CONTEXT", this.context);

        getUserCookbook(this.context.token)
        .then(res => {
            console.log("cookbook", res.data);
            this.setState({recipes: res.data});
        });
    }

    updateRecipesList = (recipes) => {
        this.setState({recipes});
    }

    render(){

        console.log("recipe list props", this.props);

        return (
            <>
            <div>RecipeListContainer</div>
            <SearchBar updateRecipesList={this.updateRecipesList} />
            <RecipeList recipes={this.state.recipes} />
            </>
        )
    }
}

export default RecipeListContainer;
