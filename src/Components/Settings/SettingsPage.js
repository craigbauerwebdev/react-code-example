import React, { lazy } from "react";

import { Fragment } from "react";
import Meta from "Components/Meta";

const Settings = lazy(() => import("./Settings"));
const SettingsPage = () => {
  return (
    <Fragment>
      <Meta pageTitle="Settings" />
      <Settings />
    </Fragment>
  );
};

export default SettingsPage;
