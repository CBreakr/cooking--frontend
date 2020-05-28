import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCarrot } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";

import AuthContext from "../AuthContext"

class NavBar extends React.Component {

    static contextType = AuthContext;

    render() {
        return (
            <nav className="navbar">
            {/* <nav className="nav"> */}
                <div className="nav-left nav-menu">
                    <span className='nav-item'><FontAwesomeIcon icon={faCarrot} size="lg" /></span>
                    {this.context.user ? 
                    // <span>::<span className="username">{this.context.user.name}</span>::</span> 
                    <Link className='button is-priamry' to="/cookbook">{this.context.user.name}</Link>
                    : ""}

                </div>
                <div className='nav-center nav-menu'>
                    <Link className='button is-success is-outlined' to="/recipes/recipe_form/new">New Recipe</Link>
                    <Link className='button is-warning' to="/recipes">Social Recipes</Link>
                    <Link className='button is-danger' to="/cookbook">My Cookbook</Link>

                </div>
                <div className='nav-right'>
                    {
                        this.context.user
                            ? <button className='nav-right button is-danger is-inverted' onClick={this.props.logout}>Logout</button>
                            // ? <button className='nav-item' onClick={this.props.logout}>Logout</button>
                            : ""
                    }
                </div>
            </nav>
        )
    }
}

export default NavBar;
