import React from "react";

import { loginUser } from "../requests";

class LoginForm extends React.Component {

    state = {
        name: "",
        password: "",
        error: null
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    login = (event) => {
        event.preventDefault();
        // check login
        if(this.state.name && this.state.password){
            // if correct:
            const user = {...this.state};
            this.loginUser(user);
        }
        else{
            this.setState({error: "invalid username/password combination"});
        }
    }

    loginUser = (user) => {
        console.log("LOGIN");
        loginUser(user, (err) => {
            console.log("ERROR LOGGING IN");
            this.setState({error: "invalid username/password combination"});
        })
        .then(res => {
            if(res){
                console.log("LOGIN RES", res);
                this.props.setCurrentUser(res.data);
            }
        });
    }

    render(){
        return (
            <>
            <h3>Login</h3>
            {
                this.state.error
                ? <div className="error">{this.state.error}</div>
                : ""
            }
            <form onSubmit={this.login}>
                <label htmlFor="login_name">Username</label>
                <input type="text" id="login_name" 
                    name="name" 
                    value={this.state.name} 
                    onChange={this.onChange}
                />
                <br/>
                <label htmlFor="login_password">Password</label>
                <input type="password" id="login_password" 
                    name="password" 
                    value={this.state.password} 
                    onChange={this.onChange}
                />
                <br/>
                <input type="submit" value="Login" />
            </form>
            </>
        )
    }
}

export default LoginForm;
