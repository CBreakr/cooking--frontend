import React from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCarrot } from '@fortawesome/free-solid-svg-icons'

import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";

class UserActionContainer extends React.Component {
    render(){
        return (
            <>
            <div>
                <div className="main-title">Cook <FontAwesomeIcon icon={faCarrot} size='lg' /> Book</div>
                <div className="user-action-container">
                    <LoginForm setCurrentUser={this.props.setCurrentUser} />
                    <SignupForm setCurrentUser={this.props.setCurrentUser} />
                </div>
            </div>
            </>
        )
    }
}

export default UserActionContainer;
