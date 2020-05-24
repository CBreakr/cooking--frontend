import React from 'react';
// import logo from './logo.svg';
import './App.css';

import NavBar from "./components/NavBar";

import UserActionContainer from "./containers/UserActionContainer";
import RecipeListContainer from "./containers/RecipeListContainer";
import RecipeDetailsContainer from "./containers/RecipeDetailContainer";
import RecipeForm from "./components/RecipeForm";

import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import * as requests from "./requests";

class App extends React.Component {

  state = {
    user: null,
    token: null
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

  setCurrentUser = (data) => {    
    if(data){
      this.setState({user: {id: data.id, name: data.name}, token: data.jwt});
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
    });
  }

  render(){
    return (
      <div>
        {
          this.state.user
          ? <NavBar user={this.state.user} logout={this.logout} />
          : ""
        }
        <Switch>
        <Route path="/recipes/recipe_form/:id">
            {
              this.state.user
              ? <>
                <RecipeForm token={this.state.token} user={this.state.user} />
                </>
              : <Redirect to="/" />
            } 
          </Route>
          <Route path="/recipes/recipe_form">
            {
              this.state.user
              ? <>
                <RecipeForm token={this.state.token} user={this.state.user} />
                </>
              : <Redirect to="/" />
            }
          </Route>
          <Route path="/recipes/:id">
            {
              this.state.user
              ? <>
                <RecipeDetailsContainer token={this.state.token} user={this.state.user} />
                </>
              : <Redirect to="/" />
            }
          </Route>
          <Route path="/recipes">
            {
              this.state.user
              ? <>
                <RecipeListContainer token={this.state.token} user={this.state.user} />
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
    );
  }
}

export default App;
