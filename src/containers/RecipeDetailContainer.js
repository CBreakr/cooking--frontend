import React from "react";

import SearchBar from "../components/SearchBar";
import RecipeDetail from "../components/RecipeDetail";

class RecipeDetailContainer extends React.Component {
    render(){
        return (
            <>
            <SearchBar />
            <div>RecipeDetailContainer</div>
            <RecipeDetail />
            </>
        )
    }
}

export default RecipeDetailContainer;
