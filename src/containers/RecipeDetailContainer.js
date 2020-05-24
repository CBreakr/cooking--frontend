import React from "react";

import SearchBar from "../components/SearchBar";
import RecipeDetail from "../components/RecipeDetail";

class RecipeDetailContainer extends React.Component {
    render(){
        return (
            <>
            <SearchBar updateRecipesList={this.updateRecipesList} token={this.props.token} />
            <RecipeDetail token={this.props.token} user={this.props.user} />
            </>
        )
    }
}

export default RecipeDetailContainer;
