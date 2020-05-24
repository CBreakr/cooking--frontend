import React from "react";

import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";

class UserActionContainer extends React.Component {
    render(){
        return (
            <>
            <LoginForm loginUser={this.props.loginUser} />
            <SignupForm registerUser={this.props.registerUser} />
            </>
        )
    }
}

export default UserActionContainer;
