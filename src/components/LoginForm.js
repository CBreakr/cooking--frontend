import React from "react";

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
            this.props.loginUser(user);
        }
        else{
            this.setState({error: "invalid username/password combination"});
        }
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
