import React from "react";
import "./Toolbar.css";
import Logo from "../Logo/Logo";
import NavigationItems from "../Navigation/NavigationItems/NavigationItems";
import DrawerToggle from "../Navigation/SideDrawer/DrawerToggle/DrawerToggle";

const Tollbar = (props) => {
  return (
    <header className="Tollbar">
      <DrawerToggle clicked={props.opened} />
      {/* <div onClick={props.opened}>MENU</div> */}
      <Logo height="80%" />
      <nav className="DesktopOnly">
        <NavigationItems />
      </nav>
    </header>
  );
};

export default Tollbar;
