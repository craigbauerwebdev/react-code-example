import React, { Fragment, lazy } from "react";

import Meta from "Components/Meta";
import lodash from "lodash";
import { useSelector } from "react-redux";

const WebinarSetup = lazy(() => import("./WebinarSetup"));
const SchedulePage = () => {
  const accountProfile = useSelector((state) => state.profile.accountProfile);

  if (lodash.isEmpty(accountProfile)) return null;

  return (
    <Fragment>
      <Meta pageTitle="Product Demo Setup" />
      <WebinarSetup exhibitorAdminCompanyId={accountProfile.companyId} />
    </Fragment>
  );
};

export default SchedulePage;
