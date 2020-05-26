import React from "react";

import { Link } from "react-router-dom";

class Recipe extends React.Component {
    render(){
        const recipe_id = this.props.api_id ? `A${this.props.api_id}` : this.props.id
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

                <Link to={`/recipes/${recipe_id}`}>Details</Link>
            </div>
        )
    }
}

export default Recipe;