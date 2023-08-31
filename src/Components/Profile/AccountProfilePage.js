import React, { lazy } from "react";

import { Fragment } from "react";
import Meta from "Components/Meta";

const AccountProfile = lazy(() => import("./AccountProfile"));
const AccountProfilePage = () => {
  return (
    <Fragment>
      <Meta pageTitle="Profile" />
      <AccountProfile />
    </Fragment>
  );
};

export default AccountProfilePage;
