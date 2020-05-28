import React from "react";

import { searchRecipes } from "../requests";

import AuthContext from "../AuthContext";

class SearchBar extends React.Component {

    state = {
        search: ""
    }

    static contextType = AuthContext;

    changeInput = (event) => {
        this.setState({search: event.target.value});
    }

    submitSearch = () => {
        console.log("Search token", this.context.token);
        searchRecipes(this.state.search, this.context.token)
        .then(res => {
            console.log("SEARCH RESULTS", res.data);
            res && this.props.updateRecipesList(res.data);
        });
    }

    render(){
        // console.log('Search state:', this.state)
        return (
            <div className="search-bar">
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
