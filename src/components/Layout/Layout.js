import React from "react";
import Aux from "../../hoc/aux";
import "./Layout.css";

const Layout = (props) => {
  return (
    <Aux>
      <main className="Content">{props.children}</main>
    </Aux>
  );
};

export default Layout;
