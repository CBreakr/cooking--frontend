import React from "react";
import { getUserCookbook, getLikedRecipe } from "../requests";
import { withRouter } from "react-router-dom";
import AuthContext from "../AuthContext";
import Recipe from '../components/Recipe'

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
        return(
            <div>
                {this.state.cookbook.map(recipe => <Recipe key={recipe.id} {...recipe}/>)}
            </div>
        )
    }

    // recipeDetails = () => {
    //     this.props.history.push(`/recipes/${this.translateID()}`)
    // }

    // translateID = () => {
    //     return this.props.api_id ? `A${this.props.api_id}` : this.props.id
    // }


    goToDetails = (recipe_id, api_id) => {
        let id = api_id ? `A${api_id}` : recipe_id
        console.log('recipe_id is:', id)
        this.props.history.push(`/recipes/${id}`)
    }

    renderLiked = () => {
        return(
            <div>
                {this.state.likedRecipes.map(object => {
                    return(
                    <div key={object.likes[0].id}>
                        {object.user.name}: {object.recipe.title} | 
                        {object.likes.length} {object.likes.length > 1 ? 'likes': 'like'} |
                        <button onClick={() => this.goToDetails(object.recipe.id, object.recipe.api_id)}>Details</button>
                    </div>)
                })}
            </div>
        )
    }
    render(){
        console.log('User cookbook:', this.state.cookbook)
        console.log('User liked:', this.state.likedRecipes)
        return(
            <div>
                <h4 className='title is-4'>My cookbook</h4>
                {this.state.cookbook
                ? this.renderCookbook()
                : null
                }
                <h4 className='title is-4'>Liked recipe</h4>
                {this.state.likedRecipes
                ? this.renderLiked()
                : null
                }
            </div>
        )
    }

}

export default withRouter(CookbookContainer);

