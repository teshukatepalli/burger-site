import React, { Component } from "react";
import Aux from "../../hoc/aux";
import "./Layout.css";
import Tollbar from "./Toolbar/Tollbar";
import SideDrawer from "./Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };

  sideDrawerToggleHandler = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };

  render() {
    return (
      <Aux>
        <Tollbar opened={this.sideDrawerToggleHandler} />
        <SideDrawer
          open={this.state.showSideDrawer}
          close={this.sideDrawerToggleHandler}
        />
        <main className="Content">{this.props.children}</main>
      </Aux>
    );
  }
}

export default Layout;
