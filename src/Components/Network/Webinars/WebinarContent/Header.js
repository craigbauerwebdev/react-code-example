import React, { Fragment } from "react";

import MyScheduleDropdown from "./MyScheduleDropdown";
import headerStyles from "../scss/webinar-header.module.scss";

const Header = ({ mobileFilter }) => {
  return (
    <Fragment>
      <div>
        <h2 className={headerStyles.title}>Live Showcases</h2>
        <MyScheduleDropdown />
      </div>
      <div
        className={headerStyles.header}
        style={{ margin: "0px", marginBottom: "10px" }}
      >
        {mobileFilter && mobileFilter()}
      </div>
    </Fragment>
  );
};

export default Header;
