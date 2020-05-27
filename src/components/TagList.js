import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from 'react-router-dom';
import { tagRecipes, showTag } from "../requests";
import AuthContext from "../AuthContext";


//give it a route "/:tag_name/recipes"
//recipe list under this tag
//when click 'detail' button, redirect to recipe details page

// export const tagRecipes = (tag_name, token) => {
//     return axios.get(`${baseURL}/recipes/by_tag/${tag_name}/following_recipes`, config(token))
//     .catch(handleError);
// }

// export const showTag = (tag_id, token) => {
//     return axios.get(`${baseURL}/tags/${tag_id}`, config(token))
//     .catch(handleError);
// }

const TagList = () => {
    const params = useParams();
    const history = useHistory();
    const context = useContext(AuthContext);

    console.log('params:', parseInt(params.tag_id))
    console.log('context:', context.user)

    useEffect(() => {
        if (context.token) {
            tagRecipes(parseInt(params.tag_id), context.token)
                .then(res => {
                    res && setRecipe(res.data);
                });
            showTag(parseInt(params.tag_id), context.token)
                .then(res => {
                    // let tag = res.data.name;
                    res && setTag(res.data)
                })
        }
    }, [params.tag_id, context.token]);

    const [recipe, setRecipe] = useState(null);
    const [tag, setTag] = useState(null);

    console.log('Recipes state', recipe)
    console.log('Tag state:', tag)

    const renderTagList = () => {
        return (
            <div className='tag-recipes-list'>
                <p>#{tag.name}</p>
            </div>
        )
    }

    return (
        <div>
            {tag
                ? renderTagList()
                : null}
        </div>
    )
}


export default TagList;