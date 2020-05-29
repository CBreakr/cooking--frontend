import React from "react";
import { getUserCookbook, getLikedRecipe } from "../requests";
import { withRouter } from "react-router-dom";
import AuthContext from "../AuthContext";
import Recipe from '../components/Recipe'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faHeart } from '@fortawesome/free-solid-svg-icons'

class CookbookContainer extends React.Component {

    state = {
        cookbook: [],
        likedRecipes: []
    }

    static contextType = AuthContext;

    componentDidMount() {
        getUserCookbook(this.context.token)
            .then(res => this.setState({
                cookbook: res.data
            }));

        getLikedRecipe(this.context.user.id, this.context.token)
            .then(res => this.setState({
                likedRecipes: res.data
            }))
    }

    renderCookbook = () => {
        return (
            <div>
                {this.state.cookbook.map(recipe => <Recipe key={recipe.id} {...recipe} />)}
            </div>
        )
    }

    goToDetails = (recipe_id, api_id) => {
        let id = api_id ? `A${api_id}` : recipe_id
        console.log('recipe_id is:', id)
        this.props.history.push(`/recipes/${id}`)
    }

    renderLiked = () => {
        return (
            <div>
                {this.state.likedRecipes.map(object => {
                    /*
                        <div className="box" key={object.likes[0].id}>
                            <h1 className="title is-4"><FontAwesomeIcon color='orange' icon={faUser} />{object.user.name}</h1>
                            <p>{object.recipe.title} <FontAwesomeIcon color='red' icon={faHeart} />{object.likes.length} {object.likes.length > 1 ? 'likes': 'like'}</p>
                            <p>
                                <button className='button is-danger is-small' onClick={() => this.goToDetails(object.recipe.id, object.recipe.api_id)}>Details</button>
                            </p>
                        </div>
                    */
                    return (
                        <div className="box recipe-list-element" key={object.likes[0].id} onClick={() => this.goToDetails(object.recipe.id, object.recipe.api_id)}>
                            <span>
                                <img className="list-element" src={object.recipe.image ? object.recipe.image : "https://spoonacular.com/recipeImages/empty.jpg"} alt="recipe image" />
                            </span>
                            <span>
                                <h1 className="title is-4"><span className="user-icon"><FontAwesomeIcon color='orange' icon={faUser} /></span>{object.user.name}</h1>
                                <p>
                                    <span className="title is-3">{object.recipe.title}</span> <span className="likes-heart"><FontAwesomeIcon color='red' icon={faHeart} /></span>{object.likes.length}
                                </p>
                            </span>
                        </div>
                    )
                })}
            </div>
        )
    }

    render() {
        console.log('User cookbook:', this.state.cookbook)
        console.log('User liked:', this.state.likedRecipes)
        return (
            <div>
                <h3 className='title is-3'>My Cookbook</h3>
                {this.state.cookbook.length > 0
                    ? this.renderCookbook()
                    : <h6 className='subtitle'>Start creating your first recipe</h6>
                }
                <h3 className='title is-3 has-margin-top-100px'><br/>Liked Recipes</h3>
                {this.state.likedRecipes.length > 0
                    ? this.renderLiked()
                    : <h6 className='subtitle'>No Liked Recipes Yet</h6>
                }
            </div>
        )
    }

}

/*
                
*/

export default withRouter(CookbookContainer);

