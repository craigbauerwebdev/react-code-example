import React from "react";
import sideBarStyles from "./scss/single-side-bar.module.scss";

/**
 * Sidebar Parent holder
 * @param {ReactNodes} children list of sidebar items
 */
const SideBar = ({ children, outSide }) => {
  return (
    <section className={sideBarStyles.sideBar}>
      {outSide}
      <div className={sideBarStyles.holder}>{children}</div>
    </section>
  );
};

export default SideBar;
