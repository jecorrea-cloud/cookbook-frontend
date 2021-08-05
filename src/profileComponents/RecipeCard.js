import { Popup } from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import React, { Component } from 'react'


export default class RecipeCard extends Component {

  state ={
    name: this.props.recipe.name,
    picture: this.props.recipe.picture,
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
        picture: this.state.picture, 
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
      <div className="recipeCard">
            <ul>
            <li>{this.props.recipe.name}</li>
             <img src={this.props.recipe.picture} alt={this.props.recipe.name} className="recipe-picture" />             
            <li>Cook time: {this.props.recipe.cooktime}</li>
            <br/>
            <li>Num. of servings: {this.props.recipe.servings}</li>
            <br/>
            <li>Instructions: {this.props.recipe.steps}</li>
            <br/>
            <li>Ingredients: {this.props.recipe.ingredients}</li>
            </ul>
            <br/>
            {/* <Switch>
            <Route path='/profile'>
            <Link to={`/profile/${this.props.recipe.id}`}>
              View Recipe
            </Link>
            </Route>
            </Switch> */}

            <Popup
          trigger={
            <button className='blue-button' style={{ padding: 5, margin: 5 }} >
              <span className="cardEditButton">✏️Edit</span>
            </button>
          }
          modal
        >
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="recipe">️Edit the name:</label>
            <input
              type="text"
              autoComplete="off"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            /><br/>
            <label htmlFor="recipe">️Edit cooking time:</label>
            <input
              type="text"
              autoComplete="off"
              name="cooktime"
              value={this.state.cooktime}
              onChange={this.handleChange}
            /><br/>
            <label htmlFor="recipe">️Edit your recipe pic:</label>
            <input
              type="text"
              autoComplete="off"
              name="picture"
              value={this.state.picture}
              onChange={this.handleChange}
            /><br/>
            <label htmlFor="recipe">️Edit number of servings:</label>
            <input
              type="text"
              autoComplete="off"
              name="servings"
              value={this.state.servings}
              onChange={this.handleChange}
            /><br/>
            <label htmlFor="recipe">️Edit the steps:</label>
            <input
              type="text"
              autoComplete="off"
              name="steps"
              value={this.state.steps}
              onChange={this.handleChange}
            /><br/>
            <label htmlFor="recipe">️Edit the ingredients:</label>
            <input
              type="text"
              autoComplete="off"
              name="ingredients"
              value={this.state.ingredients}
              onChange={this.handleChange}
            /><br/>
            <input className='blue-button' type="submit" value="Submit" />
          </form>
        </Popup>


        <button className='red-button' onClick={this.handleDelete}>🗑️Delete</button>
      </div>
    )
  }
}