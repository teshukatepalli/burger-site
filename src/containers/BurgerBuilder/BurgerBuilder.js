import React, { Component } from "react";
import Burger from "../../components/Layout/Burger/Burger";
import BuildControl from "../../components/Layout/Burger/BuildControl/BuildControl";
import Modal from "../../components/Layout/UI/Modal/Modal";
import OrderSummary from "../../components/Layout/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/Layout/UI/Spinner/Spinner";
import withErrorhandler from "../../components/withErrorHandler/withErrorHandler";
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
    ingredients: null,
    totalprice: 4,
    purchasable: false,
    purchsing: false,
    loading: false,
    error: false,
  };

  componentDidMount() {
    console.log(this.props);
    axios
      .get("/ingredients.json")
      .then((res) => {
        this.setState({ ingredients: res.data });
      })
      .catch((error) => {
        this.setState({ error: true });
      });
  }

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

  purchaseHandler = () => {
    this.setState({ purchsing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchsing: false });
  };

  purchaseContinue = () => {
    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.state.ingredients[i])
      );
    }
    queryParams.push("price=" + this.state.totalprice);
    let queryString = queryParams.join("&");

    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString,
    });
  };

  render() {
    const disableInfo = {
      ...this.state.ingredients,
    };
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }

    let orderSummary = null;

    // let burger = <Spinner />;

    let burger = this.state.error ? (
      <p>Ingredients can't be loaded </p>
    ) : (
      <Spinner />
    );

    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControl
            ingredientAdded={this.addIngredientHandler}
            ingredientRemove={this.removeIngredienthandler}
            disabled={disableInfo}
            price={this.state.totalprice}
            purchasable={this.state.purchasable}
            order={this.purchaseHandler}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          purchaseContinued={this.purchaseContinue}
          purchaseCanceled={this.purchaseCancelHandler}
          ingredients={this.state.ingredients}
          price={this.state.totalprice.toFixed(2)}
        ></OrderSummary>
      );
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchsing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default withErrorhandler(BurgerBuilder, axios);
