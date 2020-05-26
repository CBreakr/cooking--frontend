import React, {useEffect, useState, useContext} from "react";

import { useParams, useHistory } from 'react-router-dom';

import { getSingleRecipe, deleteRecipe } from "../requests";

import AuthContext from "../AuthContext";

const RecipeDetail = (props) => {
    /*
        hmm, so this is a little bit weird
        - for details based on recipes from the API
            - need to differentiate between id for API vs id within DB
    */

    const params = useParams();
    const history = useHistory();

    const context = useContext(AuthContext);
    console.log("DETAIL CONTEXT", context);

    // only run on mount
    useEffect(() => {
        // console.log("load detail", context.user);
        
        if(context.token){
            getSingleRecipe(params.id, context.token)
            .then(res => {
                console.log("found recipe", res);
                res && setRecipe(res.data);
            });
        }
    }, [params.id, context.token]);

    const [recipe, setRecipe] = useState(null);

    console.log("PARAMS", params);

    const gotoEditForm = () => {
        history.push(`/recipes/recipe_form/${params.id}`);
    }

    const triggerDelete = () => {
        deleteRecipe(params.id, context.token)
        .then(res => {
            history.push("/recipes");
        })
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
                {
                    recipe.recipe.user_id === context.user.id
                    ? <>
                        <br />
                        <button onClick={gotoEditForm}>Edit</button>
                        <br />
                        <button onClick={triggerDelete}>Delete</button>
                    </>
                    : ""
                }
                <img src={recipe.recipe.image} alt="recipe-picture" />
            </>
            : <span>No Recipe</span>
        }
        </>
    );
}

export default RecipeDetail;