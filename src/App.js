import React from 'react';
// import logo from './logo.svg';
import './App.css';

import NavBar from "./components/NavBar";

import UserActionContainer from "./containers/UserActionContainer";
import RecipeListContainer from "./containers/RecipeListContainer";
import RecipeDetailsContainer from "./containers/RecipeDetailContainer";
import RecipeForm from "./components/RecipeForm";

import { withRouter } from "react-router-dom";

import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import * as requests from "./requests";

import AuthContext from "./AuthContext";

class App extends React.Component {

  state = {
    user: null,
    token: null
  }

  componentDidMount(){
    const data = {
      id: parseInt(localStorage.getItem('__cooking_token_user_id__')),
      name: localStorage.getItem('__cooking_token_user_name__'),
      jwt: localStorage.getItem('__cooking_token_jwt__')
    };

    console.log("APP MOUNT url", this.props.location);
    const url = this.props.location.pathname;
    
    console.log("APP MOUNT LOCAL STORAGE")
    console.log(data);

    if(data.name && data.name !== "null" && data.name !== "undefined"){
      console.log("we have an existing login");
      this.setCurrentUser(data, () => {
        if (url !== "/"){
          console.log("pathname", url);
          this.props.history.push(url);
        }
      });
    }
  }

  loginUser = (user) => {
    console.log("LOGIN");
    requests.loginUser(user)
    .then(res => {
      console.log("LOGIN RES", res);
      this.setCurrentUser(res.data);
    });
  }

  registerUser = (user) => {
    console.log("REGISTER");
    requests.registerUser(user)
    .then(res => {
      console.log("REGISTER RES", res);
      this.setCurrentUser(res.data);
    });
  }

  setCurrentUser = (data, callback) => {    
    if(data){

      console.log(callback);
      if(callback && typeof callback === "function"){
        this.setState({user: {id: data.id, name: data.name}, token: data.jwt}, callback);
      }
      else{
        this.setState({user: {id: data.id, name: data.name}, token: data.jwt});
      }
      
      localStorage.setItem('__cooking_token_user_id__', data.id);
      localStorage.setItem('__cooking_token_user_name__', data.name);
      localStorage.setItem('__cooking_token_jwt__', data.jwt);

    }
    else{      
      this.setState({user: null, token: null});
    }
  }

  logout = () => {
    console.log("LOGOUT");
    requests.logoutUser()
    .then(res => {
      this.setCurrentUser(null);
      localStorage.removeItem('__cooking_token_user_id__');
      localStorage.removeItem('__cooking_token_user_name__');
      localStorage.removeItem('__cooking_token_jwt__');
    });
  }

  render(){
    return (
      <AuthContext.Provider value={this.state}>
      <div>
        {
          this.state.user
          ? <NavBar logout={this.logout} />
          : ""
        }
        <Switch>
          <Route path="/recipes/recipe_form/new">
            {
              this.state.user
              ? <>
                <RecipeForm new={true} />
                </>
              : <Redirect to="/" />
            }
          </Route>
          <Route path="/recipes/recipe_form/:id">
            {
              this.state.user
              ? <>
                <RecipeForm />
                </>
              : <Redirect to="/" />
            } 
          </Route>
          <Route path="/recipes/:id">
            {
              this.state.user
              ? <>
                <RecipeDetailsContainer />
                </>
              : <Redirect to="/" />
            }
          </Route>
          <Route path="/recipes">
            {
              this.state.user
              ? <>
                <RecipeListContainer />
                </>
              : <Redirect to="/" />
            }
          </Route>
          <Route path="/">
            {
              !this.state.user
              ? <>
                <UserActionContainer loginUser={this.loginUser} registerUser={this.registerUser} />
                </>
              : <Redirect to="/recipes" />
            }
          </Route>
        </Switch>
      </div>
      </AuthContext.Provider>
    );
  }
}

export default withRouter(App);
