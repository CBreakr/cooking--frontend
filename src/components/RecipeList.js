import React from "react";

import Recipe from "../components/Recipe";

class RecipeList extends React.Component {

    render(){
        return (
            <>
            {
                this.props.recipes.map((recipe, index) => {
                    return <Recipe key={index} {...recipe} />
                })
            }
            </>
        )
    }
}

export default RecipeList;
