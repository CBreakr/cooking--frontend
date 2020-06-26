import React from "react";

import Recipe from "../components/Recipe";

class RecipeList extends React.Component {

    render(){

        console.log("recipe list render");
        console.log("RECIPE LIST", this.props);

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
