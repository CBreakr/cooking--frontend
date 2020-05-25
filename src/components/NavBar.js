import React from "react";

import { Link } from "react-router-dom";

import AuthContext from "../AuthContext"

class NavBar extends React.Component {

    static contextType = AuthContext;

    render(){
        return (
            <div className="navbar">
                <span>NavBar {this.context.user ? <span>::<span className="username">{this.context.user.name}</span>::</span> : ""}</span>
                <Link to="/recipes/recipe_form/new">New Recipe</Link>
                <Link to="/recipes">Food Listing</Link>
                {
                    this.context.user
                    ? <button onClick={this.props.logout}>Logout</button>
                    : ""
                }
            </div>
        )
    }
}

export default NavBar;
