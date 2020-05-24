import React from "react";

import { Link } from "react-router-dom";

class Recipe extends React.Component {
    render(){
        return (
            <div>
                Recipe: {this.props.title}
                {/* have a check for whether this was created by the user */}
                {/* 
                    is there a reasonable way to check if this has already been liked? 
                    I don't like the idea of doing a cross check for everything
                */}
                {/*
                    I can also indicate whether this came from the API or not
                */}
                <Link to={`/recipes/${this.props.id}`}>Details</Link>
            </div>
        )
    }
}

export default Recipe;