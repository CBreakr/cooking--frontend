
import React from "react";

import { withRouter } from "react-router-dom";

import SignupForm from "../components/SignupForm";

class PasswordResetContainer extends React.Component {
    render(){

        console.log("password reset props", this.props);

        return <div>
            <h1>Password Reset</h1>
            <SignupForm reset_key={this.props.match.params.key} setCurrentUser={this.props.setCurrentUser} />
        </div>
    }
}

export default withRouter(PasswordResetContainer);