import React from "react";

import { searchRecipes } from "../requests";

class SearchBar extends React.Component {

    state = {
        search: ""
    }

    changeInput = (event) => {
        this.setState({search: event.target.value});
    }

    submitSearch = () => {
        console.log("Search token", this.props.token);
        searchRecipes(this.state.search, this.props.token)
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
