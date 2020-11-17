import React from "react";
import NavigationItems from "../NavigationItems/NavigationItems";
import Logo from "../../Logo/Logo";
import "./SideDrawer.css";
import BackDrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../../hoc/aux";

const SideDrawer = (props) => {
  let attachedClasses = ["SideDrawer", props.open ? "Open" : "Close"];
  return (
    <Aux>
      <BackDrop show={props.open} clicked={props.close} />
      <div className={attachedClasses.join(" ")}>
        <Logo height="11%" />
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Aux>
  );
};

export default SideDrawer;
