import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from 'react-router-dom';
import { getSingleRecipe, deleteRecipe, createLike, deleteLike, copyRecipe } from "../requests";
import AuthContext from "../AuthContext";
import CommentContainer from '../containers/CommentContainer'
import Follow from './Follow'
import Tag from './Tag'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import 'bulma-spacing'

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
                if (res && res.data && res.data.id) {
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
                <h3 className='title is-3'>{recipe.recipe.title}  
                {
                    checkLikes() 
                    ? <button className='button is-white' onClick={removeLike}><FontAwesomeIcon color='red' icon={faHeart} /></button> 
                    : <button className='button is-white' onClick={addLike}><FontAwesomeIcon color='grey' icon={faHeart} /></button>
                }
                </h3>
                <Follow {...recipe} />
                {recipe.recipe.user_id === context.user.id
                        ? 
                        <>  
                            <span className='recipe-edit'>
                                <button className='button is-info is-small is-rounded' onClick={gotoEditForm}>Edit</button>
                            </span>
                            <span className='recipe-delete'>
                                <button className='button is-info is-small is-rounded' onClick={triggerDelete}>Delete</button>
                            </span>
                        </>
                        : <button className='button is-primary is-small is-outlined' onClick={triggerCopyRecipe}>Copy</button>
                }
                <p>{recipe.tags.map(tag => <Tag key={tag.id} {...tag} />)}</p>

                <div className="box">
                    <p className='content is-medium'>{recipe.recipe.description}</p>
                </div>
                <h4 className='title is-4'>Ingredients:</h4>
                <table className="table is-bordered ingredient-table is-striped">
                    <thead>
                        <tr>
                            <td>Quantity</td>
                            <td>Unit</td>
                            <td>Name</td>
                            <td>Instruction</td>
                        </tr>
                    </thead>
                    <tbody>
                        {recipe.ingredients.map((ing, index) => {
                            return (
                                <tr key={index}>
                                    <td>{ing.quantity_number}</td>
                                    <td>{ing.measurement}</td>
                                    <td>{ing.name}</td>
                                    <td>{ing.instruction}</td>
                                </tr>
                            )
                        })
                        }
                    </tbody>
                </table>

                <p className='title is-4'>Steps</p>
                <p>{recipe.recipe.steps}</p><br />
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