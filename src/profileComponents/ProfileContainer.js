import React, { Component } from "react";
import Recipe from "./Recipe";
import NewRecipeForm from "./NewRecipeForm";

export default class ProfileContainer extends Component {

  handleClick = () => {this.props.handleLogout()}

  render() {
    return (
      <div>
        <div className="status">
        <h3>{this.props.username}</h3>
        <h4>{this.props.status}</h4>
        </div>

        {this.props.recipes.map((recipe) => (
          <Recipe key={recipe.id} recipe={recipe} updateRecipe={this.props.updateRecipe} deleteRecipeFromState={this.props.deleteRecipeFromState} token={this.props.token}/>
        ))} 

        <div>
        <NewRecipeForm addRecipe={this.props.addRecipe} token={this.props.token} />
        </div>



        <button className='blue-button' onClick={this.handleClick}>Sign Out</button>
      </div>
    );
  }
}