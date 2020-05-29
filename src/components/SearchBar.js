import React from "react";

import AuthContext from "../AuthContext";

import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

class SearchBar extends React.Component {

    state = {
        search: ""
    }

    static contextType = AuthContext;

    changeInput = (event) => {
        this.setState({ search: event.target.value });
    }

    submitSearch = () => {
        console.log("Search token", this.context.token);

        this.props.history.push(`/recipes?q=${this.state.search}`);
    }

    render() {
        return (
            <div className="search-bar field is-grouped">
                <p className='control'>
                    <input className="input is-small" type="text" id="search"
                        value={this.state.search}
                        placeholder='search a recipes here'
                        onChange={this.changeInput}
                    />
                </p>

                <p className='control'>
                    <button className='button is-info is-inverted is-small' onClick={this.submitSearch}><FontAwesomeIcon color='red' icon={faSearch} /></button>
                </p>
            </div>
        )
        }
    }

    export default withRouter(SearchBar);
