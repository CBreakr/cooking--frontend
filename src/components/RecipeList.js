import React from "react";

import Recipe from "../components/Recipe";

class RecipeList extends React.Component {

    render(){
        return (
            <>
            <div>RecipeList</div>
            {
                this.props.recipes.map((recipe, index) => {
                    return <Recipe key={index} {...recipe} user={this.props.user} />
                })
            }
            </>
        )
    }
}

export default RecipeList;
