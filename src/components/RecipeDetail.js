import React, {useEffect, useState} from "react";

import { useParams } from 'react-router-dom';

import { getSingleRecipe } from "../requests";

const RecipeDetail = (props) => {
    /*
        hmm, so this is a little bit weird
        - for details based on recipes from the API
            - need to differentiate between id for API vs id within DB
    */

    const params = useParams();

    // only run on mount
    useEffect(() => {
        console.log("load detail");
        getSingleRecipe(params.id, props.token)
        .then(res => {
            console.log(res);
            res && setRecipe(res.data);
        });
    }, [params.id]);

    const [recipe, setRecipe] = useState({});

    console.log("PARAMS", params);

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
                <span>We have a recipe</span>
                
            </>
            : <span>No Recipe</span>
        }
        </>
    );
}

export default RecipeDetail;