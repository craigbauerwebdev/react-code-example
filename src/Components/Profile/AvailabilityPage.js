import React, { Fragment, lazy } from "react";

import Meta from "Components/Meta";
import availabilityStyles from "./scss/availability-page.module.scss";
import lodash from "lodash";
import { useSelector } from "react-redux";

const Availability = lazy(() => import("../Exhibitor/ExhibitorAvailability"));
const AvailabilityPage = () => {
  const accountProfile = useSelector((state) => state.profile.accountProfile);

  if (lodash.isEmpty(accountProfile)) return null;

  return (
    <Fragment>
      <Meta pageTitle="Availability" />
      <div className={availabilityStyles.main}>
        <div className={availabilityStyles.header}>
          <h1 className={availabilityStyles.title}>Availability</h1>
        </div>

        <Availability />
      </div>
    </Fragment>
  );
};

export default AvailabilityPage;
