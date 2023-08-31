import React, { lazy } from "react";

import { Fragment } from "react";
import Meta from "Components/Meta";

const Schedule = lazy(() => import("./Schedule"));
const SchedulePage = ({ mobileFilter }) => {
  return (
    <Fragment>
      <Meta pageTitle="Profile" />
      <Schedule mobileFilter={mobileFilter} />
    </Fragment>
  );
};

export default SchedulePage;
