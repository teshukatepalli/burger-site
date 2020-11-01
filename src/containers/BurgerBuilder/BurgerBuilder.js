import React, { Component } from "react";
import Burger from "../../components/Layout/Burger/Burger";
import BuildControl from "../../components/Layout/Burger/BuildControl/BuildControl";
import Modal from "../../components/Layout/UI/Modal/Modal";

import Aux from "../../hoc/aux";

const INGREDIENT_PRICES = {
  salad: 5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends Component {
  //   constructor(props) {
  //     super(props);
  //     this.state
  //   }
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalprice: 4,
    purchasable: false,
  };

  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purchasable: sum ? true : false });
  };

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const price = this.state.totalprice + priceAddition;
    this.setState({ totalprice: price, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredienthandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const price = this.state.totalprice - priceDeduction;
    this.setState({ totalprice: price, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };

  render() {
    const disableInfo = {
      ...this.state.ingredients,
    };
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }
    return (
      <Aux>
        <Modal />
        <div>
          <Burger ingredients={this.state.ingredients} />
          <BuildControl
            ingredientAdded={this.addIngredientHandler}
            ingredientRemove={this.removeIngredienthandler}
            disabled={disableInfo}
            price={this.state.totalprice}
            purchasable={this.state.purchasable}
          />
        </div>
      </Aux>
    );
  }
}

export default BurgerBuilder;
