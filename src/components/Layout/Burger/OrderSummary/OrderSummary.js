import React from "react";

import Aux from "../../../../hoc/aux";

const OrderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients).map((igKey) => {
    return (
      <li>
        <span style={{ textTransform: "capitalize" }}>{igKey}</span>:
        {props.ingredients[igKey]}
      </li>
    );
  });
  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delecious burger with the following ingredients</p>
      <ul>{ingredientSummary}</ul>
      <p>Continue to checkout</p>
    </Aux>
  );
};

export default OrderSummary;