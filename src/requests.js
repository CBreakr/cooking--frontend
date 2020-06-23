import axios from "axios";

// const baseURL = "http://localhost:3000";
const baseURL = "https://cookbook-social-server.herokuapp.com";

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

export const ping = (token, callback) => {
    console.log("trigger ping");
    return axios.get(`${baseURL}/users/ping`, config(token))
    .catch((err) => {
        handleError();
        if(callback && typeof callback === "function"){
            callback(err);
        }
    });
}


export const registerUser = (user, callback) => {
    const data = {
        name: user.name,
        password: user.password
    }
    return axios.post(`${baseURL}/users/register`, {user: data})
    .catch((err) => {
        handleError();
        if(callback && typeof callback === "function"){
            callback(err);
        }
    });
}

export const loginUser = (user, callback) => {
    const data = {
        name: user.name,
        password: user.password
    }
    return axios.post(`${baseURL}/users/login`, {user: data})
    .catch((err) => {
        handleError();
        if(callback && typeof callback === "function"){
            callback(err);
        }
    });
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

// get '/recipes/liked/:user_id', to: 'recipes#liked_recipes'
export const getLikedRecipe = (user_id, token) => {
    return axios.get(`${baseURL}/recipes/liked/${user_id}`, config(token))
    .catch(handleError);
}

//
//
//

export const createRecipe = (recipe, token) => {
    // hmm, will this work as is?
    return axios.post(`${baseURL}/recipes`, recipe, config(token))
    .catch(handleError);

    // return axios({
    //     method: 'post',
    //     url: `${baseURL}/recipes`,
    //     data: recipe,
    //     // config: { headers: {'Content-Type': 'multipart/form-data' }}
    // })
    // .catch(handleError);
}

export const updateRecipe = (recipe, token) => {
    console.log("UPDATE RECIPE", recipe);
    // it's formdata now, so need to use .get(key)
    return axios.patch(`${baseURL}/recipes/${recipe.get("id")}`, recipe, config(token))
    .catch(handleError);
}

//
//
//

export const deleteRecipe = (recipe_id, token) => {
    return axios.delete(`${baseURL}/recipes/${recipe_id}`, config(token))
    .catch(handleError);
}

// get "/recipes/:user_name/following_recipes", to: "recipes#following_recipes"
export const socialRecipes = (username, token) => {
    // based on the current user session
    return axios.get(`${baseURL}/recipes/${username}/following_recipes`, config(token))
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

export const copyRecipe = (recipe_id, token) => {
    return axios.post(`${baseURL}/recipes/${recipe_id}/copy`, {}, config(token))
    .catch(handleError);
}

// get '/recipes/by_tag/:tag_id'
export const tagRecipes = (tag_id, token) => {
    return axios.get(`${baseURL}/recipes/by_tag/${tag_id}`, config(token))
    .catch(handleError);
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
    return axios.patch(`${baseURL}/comments/${comment.id}`, comment, config(token))
    .catch(handleError);
}

export const deleteComment = (comment_id, token) => {
    return axios.delete(`${baseURL}/comments/${comment_id}`, config(token))
    .catch(handleError);
}

//
// ingredients
//

export const getAllIngredients = (token) => {
    return axios.get(`${baseURL}/ingredients`, config(token))
    .catch(handleError);
}

//
// tags
//

export const getAllTags = (token) => {
    return axios.get(`${baseURL}/tags`, config(token))
    .catch(handleError);
}

//
// follow
// create, update, delete
//
export const getAllFollows = (token) => {
    return axios.get(`${baseURL}/followings`, config(token))
    .catch(handleError);
}

export const getUserFollowings = (user_id, token) => {
    return axios.get(`${baseURL}/users/${user_id}/following`, config(token))
    .catch(handleError);
}

export const createFollow = (follow, token) => {
    return axios.post(`${baseURL}/followings/new`, follow, config(token))
    .catch(handleError);
}

export const unfollow = (follow_id, token) => {
    return axios.delete(`${baseURL}/followings/${follow_id}`, config(token))
    .catch(handleError);
}

//
// tag
// show
//
export const showTag = (tag_id, token) => {
    return axios.get(`${baseURL}/tags/${tag_id}`, config(token))
    .catch(handleError);
}


