import axios from "axios";

const baseURL = "http://localhost:3000";

const handleError = err => console.error(err);

const config = (token) => {
    return {
        headers: {
            Authorization: "Bearer " + token
        }
    };
}

//
// user
// register & login
//


export const registerUser = (user) => {
    const data = {
        name: user.name,
        password: user.password
    }
    return axios.post(`${baseURL}/users/register`, {user: data})
    .catch(handleError);
}

export const loginUser = (user) => {
    const data = {
        name: user.name,
        password: user.password
    }
    return axios.post(`${baseURL}/users/login`, {user: data})
    .catch(handleError);
}

export const logoutUser = () => {
    return axios.post(`${baseURL}/users/logout`, null)
    .catch(handleError);
}



//
// recipe
// index (for user), show, create, update, delete, social, search
//

export const getUserCookbook = (token) => {
    // this would just be based on the current user
    return axios.get(`${baseURL}/recipes`, config(token))
    .catch(handleError);
}

export const getSingleRecipe = (recipe_id, token) => {
    return axios.get(`${baseURL}/recipes/${recipe_id}`, config(token))
    .catch(handleError);
}

export const createRecipe = (recipe, token) => {
    return axios.post(`${baseURL}/recipes`, {recipe}, config(token))
    .catch(handleError);
}

export const updateRecipe = (recipe, token) => {
    console.log("UPDATE RECIPE", recipe);
    return axios.patch(`${baseURL}/recipes/${recipe.id}`, {recipe}, config(token))
    .catch(handleError);
}

export const deleteRecipe = (recipe_id, token) => {
    return axios.delete(`${baseURL}/recipes/${recipe_id}`, config(token))
    .catch(handleError);
}

export const socialRecipes = (token) => {
    // based on the current user session
    return axios.get(`${baseURL}/recipes/social`, config(token))
    .catch(handleError);
}

export const searchRecipes = (options, token) => {
    const query = translateOptionsToQuerystring(options);
    return axios.get(`${baseURL}/recipes/search${query}`, config(token))
    .catch(handleError);
}

function translateOptionsToQuerystring(options){
    return `/${options}`;
}

//
// likes
// create & delete
//

export const createLike = (like, token) => {
    return axios.post(`${baseURL}/likes`, like, config(token))
    .catch(handleError);
}

export const deleteLike = (like_id, token) => {
    return axios.delete(`${baseURL}/likes/${like_id}`, config(token))
    .catch(handleError);
}

//
// comments
// create, update, delete
//

export const createComment = (comment, token) => {
    return axios.post(`${baseURL}/comments`, comment, config(token))
    .catch(handleError);
}

export const updateComment = (comment, token) => {
    return axios.patch(`${baseURL}/comments`, comment, config(token))
    .catch(handleError);
}

export const deleteComment = (comment_id, token) => {
    return axios.delete(`${baseURL}/comments/${comment_id}`, config(token))
    .catch(handleError);
}



