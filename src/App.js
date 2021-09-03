import ProfileContainer from "./profileComponents/ProfileContainer";
import Home from "./components/Home"
import Form from "./components/Form";
import NavBar from "./components/Navbar";
import './App.css';

import { Switch, Route, withRouter, Redirect } from "react-router-dom";

import React, { Component } from "react";

class App extends Component {
  state = {
    id: 0,
    username: "",
    status: "",
    profilePic: "",
    recipes: [],
    token: "",
  };

  componentDidMount = () => {
    console.log("Hello!");
    if (localStorage.token) {
      console.log("Hello again!");
      fetch("https://git.heroku.com/book-cook-backend.git/profile", {
        headers: {
          authorization: localStorage.token,
        },
      })
        .then((res) => res.json())
        .then(this.handleResponse);
    }
  };

  handleLoginSubmit = (userInfo) => {
    console.log("Login form has been submitted");

    fetch("https://git.heroku.com/book-cook-backend.git/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        username: userInfo.username,
        password: userInfo.password,
      }),
    })
      .then((res) => res.json())
      .then(this.handleResponse);
  };

  handleRegisterSubmit = (userInfo) => {
    console.log("Register form has been submitted");

    fetch("https://git.heroku.com/book-cook-backend.git/users", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        username: userInfo.username,
        password: userInfo.password,
      }),
    })
      .then((res) => res.json())
      .then(this.handleResponse);
  };

  handleResponse = (res) => {
    console.log(res);
    if (res.token) {
      this.setState({
        id: res.user.id,
        username: res.user.username,
        status: res.user.status,
        recipes: res.user.recipes,
        token: res.token,
      });
      localStorage.token = res.token;
      this.props.history.push("/profile");
    } else {
      alert("Messed up");
    }
  };

  handleLogout = () => {
    localStorage.clear()
    this.setState({
        id: 0,
        username: "",
        recipes: [],
        status: "",
        profilePic: "",
        token: "",

    })
  }

  renderForm = (routerProps) => {
    if (routerProps.location.pathname === "/login") {
      return (
        <Form formName="Login" handleSubmit={this.handleLoginSubmit} />
      );
    } else if (routerProps.location.pathname === "/register") {
      return (
        <Form
          formName="Sign Up"
          handleSubmit={this.handleRegisterSubmit}
        />
      );
    }
  };

  deleteRecipeFromState = (recipe) => {
    let newArrayOfRecipes = this.state.recipes.filter((recipeObj) => {
      return recipeObj.id !== recipe.id;
    });
    this.setState({
      recipes: newArrayOfRecipes,
    });
  };

  addRecipe = (recipe) => {
    this.setState({ recipes: [...this.state.recipes, recipe] });
  };

  updateRecipe = (updatedRecipe) => {
    let updatingRecipes = this.state.recipes.map((recipe) => {
      if (recipe.id === updatedRecipe.id) {
        return updatedRecipe;
      } else {
        return recipe;
      }
    });
    this.setState({recipes: updatingRecipes})
  };

  renderProfile = () => {
    if (this.state.token) {
      return (
        <ProfileContainer
          username={this.state.username}
          status={this.state.status}
          recipes={this.state.recipes}
          addRecipe={this.addRecipe}
          deleteRecipeFromState={this.deleteRecipeFromState}
          updateRecipe={this.updateRecipe}
          token={this.state.token}
          handleLogout={this.handleLogout}
        />
      );
    } else { 
      return <Redirect to="/login" />
    }
  };

  render() {
    console.log(this.state);
    return (
      <div className="App">
        <div className="page-container">
        <NavBar token={this.state.token}/>
        <Switch>
          <Route path="/login" render={this.renderForm}></Route>
          <Route path="/register" render={this.renderForm}></Route>
          <Route path="/profile" render={this.renderProfile}></Route>
          <Route path="/" exact component={Home} />
        </Switch>
      </div>
      </div>
    );
  }
}

export default withRouter(App);
