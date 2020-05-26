import React from "react";

import SearchBar from "../components/SearchBar";
import RecipeList from "../components/RecipeList";

import { getUserCookbook, socialRecipes } from "../requests";

import AuthContext from "../AuthContext";

class RecipeListContainer extends React.Component {

    state = {
        recipes: [],
        following_recipes: [],
        own_recipes:[]
    }

    static contextType = AuthContext;

    componentDidMount(){
        // get user's own recipes

        console.log("CONTEXT", this.context);

        getUserCookbook(this.context.token)
        .then(res => {
            console.log("cookbook", res.data);
            this.setState({own_recipes: res.data});
        });
    
        //get social recipes
        socialRecipes(this.context.user.name, this.context.token)
        .then(res => this.setState({
            following_recipes: res.data
        }))
        
    }

    updateRecipesList = (recipes) => {
        this.setState({recipes});
    }

    showSearchResult = () => {
        return(
            <>
                <h4>Search Result:</h4>
                <RecipeList recipes={this.state.recipes} />
            </>
        )
    }


    render(){

        console.log("recipe list props", this.props);
        return (
            <>
            <div>RecipeListContainer</div>
            <SearchBar updateRecipesList={this.updateRecipesList} />
            {this.state.recipes.length > 0
            ? this.showSearchResult()
            : null
            }

            <h4>Following: </h4>
            <RecipeList recipes={this.state.following_recipes} />
            <h4>My recipes: </h4>
            <RecipeList recipes={this.state.own_recipes} />
            </>
        )
    }
}

export default RecipeListContainer;
