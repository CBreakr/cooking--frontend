import React from "react";

import SearchBar from "../components/SearchBar";
import RecipeList from "../components/RecipeList";

import { socialRecipes, searchRecipes } from "../requests";

import { withRouter } from "react-router-dom";

import AuthContext from "../AuthContext";

class RecipeListContainer extends React.Component {

    state = {
        recipes: [],
        following_recipes: [],
        own_recipes:[],
        search: ""
    }

    static contextType = AuthContext;

    componentDidMount(){
        // get user's own recipes

        console.log("CONTEXT RECIPE LIST CONTAINER", this.context);

        const location = this.props.location.search;

        // getUserCookbook(this.context.token)
        // .then(res => {
        //     console.log("cookbook", res.data);
        //     this.setState({own_recipes: res.data});
        // });

        console.log("RECIPE LIST PARAMS", location);

        const search = location.replace("?q=", "");

        if(search){
            this.setSearch(search);
        }
        else{
            //get social recipes
            socialRecipes(this.context.user.name, this.context.token)
            .then(res => this.setState({
                recipes: res.data
            }))
        }
    }

    componentDidUpdate(){
        const location = this.props.location.search;

        // getUserCookbook(this.context.token)
        // .then(res => {
        //     console.log("cookbook", res.data);
        //     this.setState({own_recipes: res.data});
        // });

        console.log("RECIPE LIST PARAMS", location);

        const search = location.replace("?q=", "");

        if(search && search !== this.state.search){
            this.setSearch(search);
        }
    }

    setSearch = (search) => {
        this.setState({search, recipes: []}, () => {
            searchRecipes(this.state.search, this.context.token)
            .then(res => {
                console.log("SEARCH RESULTS", res.data);
                res && this.updateRecipesList(res.data);
            });
        }); 
    }

    updateRecipesList = (recipes) => {
        this.setState({recipes});
    }

    showSearchResult = () => {
        return(
            <>
            <br/>
        <h3 className="title is-3">Recipes{this.state.search ? `: "${this.state.search}"` : ""}</h3>
                <RecipeList recipes={this.state.recipes} />
            </>
        )
    }

    render(){
        console.log('🔫Recipe container, state:', this.state)
        console.log("recipe list props", this.props);
        console.log("test message");
        return (
            <>
                {this.state.recipes.length > 0
                ? this.showSearchResult()
                : null
                }

                {
                    /*
                    <h4>Following: </h4>
                    <RecipeList recipes={this.state.following_recipes} />
                    <h4>My recipes: </h4>
                    <RecipeList recipes={this.state.own_recipes} />
                    */
                }
            </>
        )
    }
}

export default withRouter(RecipeListContainer);
