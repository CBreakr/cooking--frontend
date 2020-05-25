import React, { useEffect, useState, useContext } from "react";

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
        console.log("load detail", context.user);

        if (context.token) {
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

    const checkLikes = () => {
        let result = false
        recipe.likes.forEach(likeObj => {
            if (likeObj.user_id === context.user.id){
                result = true
            }
        })
        return result
    }

    if (recipe) {
        console.log("we have a recipe", recipe);
    }


    const renderRecipe = () => {
        return (
            <div className='recipe-details'>
                <img src={recipe.recipe.image} alt={recipe.recipe.title}></img>
                <h2>{recipe.recipe.title}</h2>
                <p>Created by {recipe.user.name} | {checkLikes() ? '♥︎' : '♡'} {recipe.likes.length} {recipe.likes.length > 1 ? 'likes' : 'like'} </p>
                <p>{recipe.tags.map(tag => `#${tag.name}  `)}</p>
                <p>{recipe.recipe.description}</p>
                <h4>Ingredients:</h4>
                <ul>
                    {recipe.ingredients.map((ingredient, index) => <li key={index}>{ingredient.ingredient.name} {ingredient.quantity_number}{ingredient.measurement}</li>)}
                </ul>
                <p>
                    <strong>Steps:</strong><br /><br />
                    {recipe.recipe.steps}
                </p>
                <h4>Comments:</h4>
                <ul>
                    {recipe.comments.map(comment => {
                        return (
                            <>
                                <p>{comment.user.name} said:</p>
                                <li key={comment.comment.id}>{comment.comment.text}</li>
                            </>
                        )
                    })}
                </ul>
                
            </div>
        )
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
                        {/* <span>{recipe.recipe.title} - {recipe.recipe.user_id}</span> */}
                        {renderRecipe()}
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
                    </>
                    : <span>No Recipe</span>
            }
        </>
    );
}

export default RecipeDetail;