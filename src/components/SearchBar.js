import React from "react";

import {searchRecipes} from "../requests";

class SearchBar extends React.Component {

    state = {
        search: ""
    }

    changeInput = (event) => {
        this.setState({search: event.target.value});
    }

    submitSearch = () => {

        const recipeList = [{id: 10, title: "Noodles", description:"long, made of starch and water"}, {id: "A15", title: "Chicken", description:"a tasty bird"}];
        this.props.updateRecipesList(recipeList);

        return;

        searchRecipes(this.state.search)
        .then(res => {
            res && this.props.updateRecipesList(res.data);
        });
    }

    render(){
        return (
            <div>
                <label htmlFor="search">Search</label>
                <input type="text" id="search" 
                    value={this.state.search}
                    onChange={this.changeInput}
                />
                <button onClick={this.submitSearch}>Submit</button>
            </div>
        )
    }
}

export default SearchBar;
