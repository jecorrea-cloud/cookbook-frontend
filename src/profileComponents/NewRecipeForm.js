import React, { Component } from "react";

export default class NewRecipeForm extends Component {
  state = {
    name: "",
    cooktime: "", 
    servings:"",
    steps: "", 
    ingredients:"", 
    // private: true,
  };


  handleInput = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    fetch("http://localhost:3000/recipes", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "authorization": this.props.token
            },
            body: JSON.stringify({
              name: this.state.name,
              cooktime: this.state.cooktime, 
              servings: this.state.servings,
              steps: this.state.steps, 
              ingredients: this.state.ingredients,
            })
        })
        .then(res => res.json())
        .then((recipe) => {
            if(recipe.id){
            this.props.addRecipe(recipe)
      }
    })
  }
    
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={this.state.name}
          onChange={this.handleInput}
        />
        <label htmlFor="cooktime">Cook Time</label>
        <input
          type="text"
          id="cooktime"
          name="cooktime"
          value={this.state.cooktime}
          onChange={this.handleInput}
        />
        <label htmlFor="servings">Servings</label>
        <input
          type="text"
          id="servings"
          name="servings"
          value={this.state.servings}
          onChange={this.handleInput}
        />
        <label htmlFor="steps">Instructions</label>
        <input
          type="text"
          id="steps"
          name="steps"
          value={this.state.steps}
          onChange={this.handleInput}
        />
        <label htmlFor="ingredients">Ingredients</label>
        <input
          type="text"
          id="ingredients"
          name="ingredients"
          value={this.state.ingredients}
          onChange={this.handleInput}
        />
        <input className='blue-button' type="submit" value="Add new recipe" />
      </form>
      );
  }
}
