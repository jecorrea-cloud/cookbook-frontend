import { Popup } from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import React, { Component } from 'react'

export default class Recipe extends Component {

  state ={
    name: this.props.recipe.name,
    cooktime: this.props.recipe.cooktime, 
    servings: this.props.recipe.servings,
    steps: this.props.recipe.steps, 
    ingredients: this.props.recipe.ingredients, 
    formView : false,
  }


      toggleForm = () => {
        this.setState({
            formView : !this.state.formView
        })
    }

  handleDelete = () => {

    fetch(`http://localhost:3000/recipes/${this.props.recipe.id}`, {
        method: "DELETE",
        headers: {
            "authorization": this.props.token
        }
      })
      .then(res => res.json())
      .then((deletedRecipe) => {
        this.props.deleteRecipeFromState(deletedRecipe)}) 
   }



  handleSubmit = (e) => {
    e.preventDefault()

    fetch(`http://localhost:3000/recipes/${this.props.recipe.id}`, {
      method: "PATCH",
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
    .then((upToDateRecipe) => {
      if(upToDateRecipe.id){
        this.props.updateRecipe(upToDateRecipe)
  }
    })
  }

  handleChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    })
  }


  render() {
    return (
      <div className="recipe">
            <ul>
            <li>{this.props.recipe.name}</li>
            <li>{this.props.recipe.cooktime}</li>
            <li>{this.props.recipe.servings}</li>
            <li>{this.props.recipe.steps}</li>
            <li>{this.props.recipe.ingredients}</li>
            </ul>

            <Popup
          trigger={
            <button className='blue-button' style={{ padding: 5, margin: 5 }} >
              <span className="cardEditButton">✏️Edit</span>
            </button>
          }
          modal
        >
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="recipe">️Edit:</label>
            <input
              type="text"
              autoComplete="off"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
            <input
              type="text"
              autoComplete="off"
              name="cooktime"
              value={this.state.cooktime}
              onChange={this.handleChange}
            />
            
            <input
              type="text"
              autoComplete="off"
              name="servings"
              value={this.state.servings}
              onChange={this.handleChange}
            />
            <input
              type="text"
              autoComplete="off"
              name="steps"
              value={this.state.steps}
              onChange={this.handleChange}
            />
            <input
              type="text"
              autoComplete="off"
              name="ingredients"
              value={this.state.ingredients}
              onChange={this.handleChange}
            />
            <input className='blue-button' type="submit" value="Submit" />
          </form>
        </Popup>


        <button className='red-button' onClick={this.handleDelete}>🗑️Delete</button>
      </div>
    )
  }
}