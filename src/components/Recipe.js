import React from "react";

import {Link} from "react-router-dom";

class Recipe extends React.Component {
    render(){
        return (
            <div>
                Recipe: {this.props.title}
                <Link to={`/food/recipe/${this.props.id}`}>Details</Link>
            </div>
        )
    }
}

export default Recipe;