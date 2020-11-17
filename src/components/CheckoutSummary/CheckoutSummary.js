import React from "react";
import Burger from "../Layout/Burger/Burger";
import Button from "../Layout/UI/Button/Button";
import "./CheckoutSummary.css";

const CheckoutSummary = (props) => {
  return (
    <div className="CheckoutSummary">
      <h1>We hope it tastes well</h1>
      <div style={{ width: "100%", height: "100%", margin: "auto" }}>
        <Burger ingredients={props.ingredients} />
        <Button btnType="Danger" clicked={props.onCheckoutCancelled}>
          CANCEL
        </Button>
        <Button btnType="Success" clicked={props.onCheckoutCountinued}>
          CONTINUE
        </Button>
      </div>
    </div>
  );
};

export default CheckoutSummary;
