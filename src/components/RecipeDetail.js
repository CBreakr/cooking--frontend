import React, { useEffect, useState, useContext } from "react";

import { useParams, useHistory } from 'react-router-dom';

import { getSingleRecipe, deleteRecipe, createLike, deleteLike, copyRecipe } from "../requests";

import AuthContext from "../AuthContext";
import CommentContainer from '../containers/CommentContainer'
import Follow from './Follow'
import Tag from './Tag'

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

    const checkLikes = () => {
        let result = false
        recipe.likes.forEach(likeObj => {
            if (likeObj.user_id === context.user.id) {
                result = true
            }
        })
        return result
    }

    if (recipe) {
        console.log("we have a recipe", recipe);
    }

    const addLike = () => {
        let newLike = { "recipe_id": recipe.recipe.id, "user_id": context.user.id }
        createLike(newLike, context.token)
            .then(res => {
                const copy = { ...recipe };
                copy.likes.push(res.data);
                setRecipe(copy);
            });
    }

    const removeLike = () => {
        console.log('cancelling like')
        let result = recipe.likes.find(likeObj => likeObj.user_id === context.user.id)

        deleteLike(result.id, context.token)
            .then(res => {
                const copy = { ...recipe };
                const copyLikes = [];
                copy.likes.forEach(like => {
                    if (like.id !== result.id) {
                        copyLikes.push(like);
                    }
                });
                copy.likes = copyLikes;
                setRecipe(copy);
            });
    }

    const triggerCopyRecipe = () => {
        console.log("COPY", recipe);
        copyRecipe(recipe.recipe.id, context.token)
        .then(res => {
            console.log("COPY COMPLETE", res);
            if(res && res.data && res.data.id){
                history.push(`/recipes/${res.data.id}`);
            }
        });
    }
    
    const renderRecipe = () => {
        return (
            <div className='recipe-details'>
                <img src={recipe.recipe.image} alt={recipe.recipe.title}></img>
                {/* <div className="card-image">
                    <figure className="image is-5by4">
                        <img src={recipe.recipe.image} alt="Recipe image" />
                    </figure>
                </div> */}
                <h3 className='title is -3'>{recipe.recipe.title} | {checkLikes() ? <button onClick={removeLike}>♥</button> : <button onClick={addLike}>♡</button>} {recipe.likes.length} {recipe.likes.length > 1 ? 'likes' : 'like'} </h3>
                <Follow {...recipe} />
                {recipe.recipe.user_id === context.user.id
                        ? 
                        <>
                            <button className='button is-link is-small' onClick={gotoEditForm}>Edit</button>
                            <button className='button is-link is-small' onClick={triggerDelete}>Delete</button>
                        </>
                        : <button onClick={triggerCopyRecipe}>Copy</button>
                }
                <p>{recipe.tags.map(tag => <Tag key={tag.id} {...tag} />)}</p>
                <p className='content is-medium'>{recipe.recipe.description}</p>
                <h4>Ingredients:</h4>
                <ul>
                    {recipe.ingredients.map((ingredient, index) => <li key={index}>{ingredient.name} {ingredient.quantity_number}{ingredient.measurement}</li>)}
                </ul>
                <p>
                    <strong>Steps:</strong><br /><br />
                    {recipe.recipe.steps}
                </p>
            </div>
        )
    }

    return (
        <>
            {
                recipe
                    ? <>

                        {renderRecipe()}
                        <CommentContainer {...recipe} />
                    </>
                    : <span>loading...</span>
            }
        </>
    );
}

export default RecipeDetail;