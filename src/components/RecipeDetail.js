import React, {useEffect, useState} from "react";

import { useParams, useHistory } from 'react-router-dom';

import { getSingleRecipe } from "../requests";

const RecipeDetail = (props) => {
    /*
        hmm, so this is a little bit weird
        - for details based on recipes from the API
            - need to differentiate between id for API vs id within DB
    */

    const params = useParams();
    const history = useHistory();

    // only run on mount
    useEffect(() => {
        console.log("load detail", props.user);
        if(props.token){
            getSingleRecipe(params.id, props.token)
            .then(res => {
                console.log("found recipe", res);
                res && setRecipe(res.data);
            });
        }
    }, [params.id, props.token]);

    const [recipe, setRecipe] = useState(null);

    console.log("PARAMS", params);

    const gotoEditForm = () => {
        history.push(`/recipes/recipe_form/${params.id}`);
    }

    if(recipe){
        console.log("we have a recipe", recipe.recipe);
    }

    return (
        <>
        <div>Recipe Detail</div>
        {
            params.id.startsWith("A")
            ? `from API: ${params.id}`
            : `in our DB: ${params.id}`
        }
        {
            recipe 
            ? <> 
                <span>{recipe.recipe.title} - {recipe.recipe.user_id}</span>
                <span>We have a recipe</span>
                {
                    recipe.recipe.user_id === props.user.id
                    ? <button onClick={gotoEditForm}>Edit</button>
                    : ""
                }
            </>
            : <span>No Recipe</span>
        }
        </>
    );
}

export default RecipeDetail;