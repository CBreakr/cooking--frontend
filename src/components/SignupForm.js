import React from "react";

class SignupForm extends React.Component {

    state = {
        name: "",
        password: "",
        confirmation: "",
        error: null
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    register = (event) => {
        event.preventDefault();
        // check login
        if(this.state.name && this.state.password){
            if(this.state.password === this.state.confirmation){
                // if correct:
                // call to register the user
    
                const user = {...this.state};
                this.props.registerUser(user);
            }
            else{
                this.setState({error: "passwords do not match"});
            }
        }
        else{
            this.setState({error: "username and password required"});
        }
    }

    render(){
        return (
            <>
            <h3>Register</h3>
            {
                this.state.error
                ? <div className="error">{this.state.error}</div>
                : ""
            }
            <form onSubmit={this.register}>
                <label htmlFor="register_name">Username</label>
                <input type="text" id="register_name" 
                    name="name" 
                    value={this.state.name} 
                    onChange={this.onChange}
                />
                <br/>
                <label htmlFor="register_password">Password</label>
                <input type="password" id="register_password" 
                    name="password" 
                    value={this.state.password} 
                    onChange={this.onChange}
                />
                <br/>
                <label htmlFor="confirmation">Confirm Password</label>
                <input type="password" id="confirmation" 
                    name="confirmation" 
                    value={this.state.confirmation} 
                    onChange={this.onChange}
                />
                <br/>
                <input type="submit" value="Register" />
            </form>
            </>
        )
    }
}

export default SignupForm;
