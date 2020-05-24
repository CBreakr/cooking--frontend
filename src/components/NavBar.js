import React from "react";

import {Link} from "react-router-dom";

class NavBar extends React.Component {
    render(){
        return (
            <div className="navbar">
                <span>NavBar {this.props.user ? <span>::<span className="username">{this.props.user.name}</span>::</span> : ""}</span>
                <Link to="/food/create_recipe">New Recipe</Link>
                <Link to="/food">Food Listing</Link>
                {
                    this.props.user
                    ? <button onClick={this.props.logout}>Logout</button>
                    : ""
                }
            </div>
        )
    }
}

export default NavBar;
