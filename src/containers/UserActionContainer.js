import React from "react";

import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";

class UserActionContainer extends React.Component {
    render(){
        return (
            <>
            <LoginForm setCurrentUser={this.props.setCurrentUser} />
            <SignupForm setCurrentUser={this.props.setCurrentUser} />
            </>
        )
    }
}

export default UserActionContainer;
