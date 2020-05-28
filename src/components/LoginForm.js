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
        if (this.state.name && this.state.password) {
            // if correct:
            const user = { ...this.state };
            this.loginUser(user);
        }
        else {
            this.setState({ error: "invalid username/password combination" });
        }
    }

    loginUser = (user) => {
        console.log("LOGIN");
        loginUser(user, (err) => {
            console.log("ERROR LOGGING IN");
            this.setState({ error: "invalid username/password combination" });
        })
            .then(res => {
                if (res) {
                    console.log("LOGIN RES", res);
                    this.props.setCurrentUser(res.data);
                }
            });
    }

    render() {
        return (            
            <div id='box1'>
                <h3 className='title is-3'>Login</h3>
                {
                    this.state.error
                        ? <div className="error">{this.state.error}</div>
                        : ""
                }
                <form onSubmit={this.login}>
                    <div className='field'>
                        <label className='label' htmlFor="login_name">Username</label>
                        <input className='input is-success' type="text" id="login_name"
                            name="name"
                            value={this.state.name}
                            onChange={this.onChange} />
                    </div>

                    <div className='field'>
                        <label className='label' htmlFor="login_password">Password</label>

                        <input className='input is-success' type="password" id="login_password"
                            name="password"
                            value={this.state.password}
                            onChange={this.onChange} />
                    </div>

                    <div className="control" >
                        <input className='button is-link' type="submit" value="Login" />
                    </div>
                </form>
            </div>
        )
    }
}

export default LoginForm;
