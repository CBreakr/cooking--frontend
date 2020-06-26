import React from "react";
import { getUserFollowings, createFollow, unfollow, getAllFollows } from "../requests";
import AuthContext from "../AuthContext";

export default class Follow extends React.Component {
    static contextType = AuthContext;

    state = {
        selfRecipe: null,
        isFollowing: null,
        following: [] 
    }

    componentDidMount() {
        let isSelfRecipe = null
        isSelfRecipe = this.props.recipe.user_id === this.context.user.id ? true : false
        getUserFollowings(this.context.user.id, this.context.token)
        .then(res => {
            let isFollow = false
            res.data.forEach(follow_user => {
                if(follow_user.id === this.props.recipe.user_id) {
                    isFollow = true
                }
            })
            this.setState({
                selfRecipe: isSelfRecipe,
                isFollowing: isFollow,
                following: res.data
            })
        })
    }

    showFollowButton = () => {
        return (
            this.state.isFollowing
            ?<button className='follow button is-info is-small is-rounded' onClick={this.unfollowUser}>unfollow</button>
            :<button className='follow button is-light is-small is-rounded' onClick={this.followUser}>follow</button>
        )
    }

    followUser = () => {
        console.log('following...')
        let newFollow = {"user_id": this.context.user.id, "following_id": this.props.recipe.user_id}
        createFollow(newFollow, this.context.token)
        .then(res => {
            this.setState({
                isFollowing: true
            })
        })
    }
    
    unfollowUser = () => {
        console.log('unfollowing...')
        getAllFollows(this.context.token)
        .then(res => {
            let follow_id = null
            res.data.forEach(follow_obj => {
                if (follow_obj.user_id === this.context.user.id && follow_obj.following_id === this.props.recipe.user_id) {
                    follow_id = follow_obj.id
                }
            })
            unfollow(follow_id, this.context.token)
            .then(res => this.setState({
                isFollowing: false
            }))
        })
    }
    
    
    render() {
        return(
            <>
            {
                this.props.user
                ? <span className='subtitle is-4'>Created by {this.props.user.name}
                    {this.state.selfRecipe
                    ?null
                    :this.showFollowButton()
                    }</span>
                : ""
            }                
            </>
        )
    }
}