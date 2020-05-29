import React from "react";

import AuthContext from "../AuthContext";

import { withRouter } from "react-router-dom";

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

        this.props.history.push(`/recipes?q=${this.state.search}`);
        this.setState({search: ""});
    }

    render(){
        // console.log('Search state:', this.state)
        return (
            <div className="search-bar">
                <input type="text" id="search" 
                    className="search-input"
                    value={this.state.search}
                    onChange={this.changeInput}
                />
                <button className="search-button" onClick={this.submitSearch}><i className="fas fa-search"></i></button>
            </div>
        )
    }
}

export default withRouter(SearchBar);
