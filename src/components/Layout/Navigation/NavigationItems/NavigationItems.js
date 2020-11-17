import React from "react";
import "./NavigationItem.css";
import Item from "./Item/Item";

const NavigationItems = () => {
  return (
    <ul className="NavigationItems">
      <Item link="/" exact>
        Burger Builder
      </Item>
      <Item link="/orders">Orders</Item>
    </ul>
  );
};

export default NavigationItems;
