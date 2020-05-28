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
        // console.log("RECIPE PROPS", this.props);
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
            <div className="box">
                <h1 className="title is-4"><FontAwesomeIcon color='orange' icon={faUser} />{this.props.user.name}</h1>
                <p>{this.props.title} <FontAwesomeIcon color='red' icon={faHeart} />{this.state.likes}   {this.state.likes > 1 ? 'likes' : 'like'}</p>
                <p>
                <button className='button is-danger is-small' onClick={this.recipeDetails}>Details</button>
                </p>
            </div>
        )
    }
}

export default withRouter(Recipe);