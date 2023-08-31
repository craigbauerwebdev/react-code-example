import React, { Fragment, lazy } from "react";

import Meta from "Components/Meta";
import lodash from "lodash";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";

const RepresentativeSetup = lazy(() => import("./RepresentativeSetup"));
const RepresentativeSetupPage = ({
  searchState,
  dispatchSearchState,
  mobileFilter,
}) => {
  const accountProfile = useSelector((state) => state.profile.accountProfile);

  if (lodash.isEmpty(accountProfile)) return null;

  return (
    <Fragment>
      <Meta pageTitle="Representative Setup" />
      <RepresentativeSetup
        searchState={searchState}
        dispatchSearchState={dispatchSearchState}
        mobileFilter={mobileFilter}
      />
    </Fragment>
  );
};

export default withRouter(RepresentativeSetupPage);
