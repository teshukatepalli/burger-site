import React from "react";
import { NavLink } from "react-router-dom";
import "./Item.css";

const Item = (props) => {
  return (
    <li className="Item">
      <NavLink to={props.link} exact={props.exact}>
        {props.children}
      </NavLink>
    </li>
  );
};

export default Item;
