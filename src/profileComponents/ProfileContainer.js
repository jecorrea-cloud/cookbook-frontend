import React, { Component } from "react";
import Recipe from "./Recipe";
import NewRecipeForm from "./NewRecipeForm";
import { Card } from 'semantic-ui-react'

export default class ProfileContainer extends Component {

  handleClick = () => {this.props.handleLogout()}

  render() {

    let arrOfRecipes = this.props.recipes.map((recipe) => (
      <Recipe key={recipe.id} recipe={recipe} updateRecipe={this.props.updateRecipe} deleteRecipeFromState={this.props.deleteRecipeFromState} token={this.props.token}/>
    )) 
    return (
      <div>
        <div className="status">
        <h3>{this.props.username}</h3>
        <h4>{this.props.status}</h4>
        </div>



          <Card.Group itemsPerRow={4}>
                {arrOfRecipes}
            </Card.Group>

        <div>
        <NewRecipeForm addRecipe={this.props.addRecipe} token={this.props.token} />
        </div>



        <button className='blue-button' onClick={this.handleClick}>Sign Out</button>
      </div>
    );
  }
}