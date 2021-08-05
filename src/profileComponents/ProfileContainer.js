import React, { Component } from "react";
import RecipeCard from "./RecipeCard";
import NewRecipeForm from "./NewRecipeForm";
import { Card } from "semantic-ui-react";
import { Route, Switch } from "react-router-dom";

export default class ProfileContainer extends Component {
  handleClick = () => {
    this.props.handleLogout();
  };

  render() {
    let arrOfRecipes = this.props.recipes.map((recipe) => (
      <RecipeCard
        key={recipe.id}
        recipe={recipe}
        updateRecipe={this.props.updateRecipe}
        deleteRecipeFromState={this.props.deleteRecipeFromState}
        token={this.props.token}
      />
    ));
    return (
      <div>
        <Switch>
          <Route path="/profile">
            <div className="status">
              <h3>Hey, {this.props.username}! here are your recipes:</h3>
              <h4>{this.props.status}</h4>
            </div>

            <Card.Group itemsPerRow={4}>{arrOfRecipes}</Card.Group>

            <div>
              <NewRecipeForm
                addRecipe={this.props.addRecipe}
                token={this.props.token}
              />
            </div>
          </Route>
        </Switch>

        <button className="blue-button" onClick={this.handleClick}>
          Sign Out
        </button>
      </div>
    );
  }
}
