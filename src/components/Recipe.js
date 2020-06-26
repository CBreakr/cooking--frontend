import React from "react";
import { getSingleRecipe } from "../requests";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faHeart } from '@fortawesome/free-solid-svg-icons'
import AuthContext from "../AuthContext";

class Recipe extends React.Component {

    state = {
        likes: 0
    }

    static contextType = AuthContext;

    componentDidMount() {
        if (this.props.id) {
            getSingleRecipe(this.props.id, this.context.token)
                .then(res => {
                    // console.log("INDIVIDUAL RECIPE", res);
                    if (res && res.data) {
                        this.setState({
                            likes: res.data.likes ? res.data.likes.length : 0
                        });
                    }
                });
        }
    }

    recipeDetails = () => {
        this.props.history.push(`/recipes/${this.translateID()}`)
    }

    translateID = () => {
        return this.props.api_id ? `A${this.props.api_id}` : this.props.id
    }

    render() {
        console.log("RECIPE PROPS", this.props);
        return (
            // <div>
            //     <h4 className='subtitle is-4'>
            //         <FontAwesomeIcon icon={faUser} />
            //         {this.props.user.name}: {this.props.title} |
            //     <FontAwesomeIcon icon={faHeart} /> {this.state.likes > 1 ? 'likes' : 'like'} |
            //     <button onClick={this.recipeDetails}>Details</button>
            //     </h4>
            //     {/* have a check for whether this was created by the user */}
            //     {/* 
            //         is there a reasonable way to check if this has already been liked? 
            //         I don't like the idea of doing a cross check for everything
            //     */}
            //     {/*
            //         I can also indicate whether this came from the API or not
            //     */}
            // </div>
            <div className="box recipe-list-element" onClick={this.recipeDetails}>
                <span>
                    <img className="list-element" src={this.props.image ? this.props.image : "https://spoonacular.com/recipeImages/empty.jpg"} alt="recipe image" />
                </span>
                <span>
                    <h1 className="title is-4"><span className="user-icon"><FontAwesomeIcon color='orange' icon={faUser} /></span>{this.props.user.name}</h1>
                    <p>
                        <span className="title is-3">{this.props.title}</span> <span className="likes-heart"><FontAwesomeIcon color='red' icon={faHeart} /></span>{this.state.likes}
                    </p>
                    {/* {this.state.likes > 1 ? 'likes' : 'like'} */}
                    {/*
                    <p>
                    <button className='details-button button is-danger is-small' onClick={this.recipeDetails}>Details</button>
                    </p>
                    */}
                </span>
            </div>
        )
    }
}

export default withRouter(Recipe);