import React, { useEffect, useState, useContext } from "react";
import { useParams } from 'react-router-dom';
import { tagRecipes, showTag  } from "../requests";
import AuthContext from "../AuthContext";
import TagRecipe from './TagRecipe';


//give it a route "/:tag_name/recipes"
const TagList = () => {
    const params = useParams();
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
            <div>
                <span className='button is-danger is-inverted is-large'>#{tag.name}</span>
                {recipe
                ? recipe.map((recipe, index) => <TagRecipe key={index} {...recipe}/>)
                : null
                }
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