import React, { Fragment, Suspense, lazy } from "react";

import BannerWrapper from "Components/Banners/BannerWrapper";
import Loader from "Components/Loader";
import Meta from "Components/Meta";
import { capitalize } from "lodash";
import exhibitorsWithLevelsStyles from "./scss/exhibitors-with-levels.module.scss";

const ExhibitorLevels = lazy(() => import("./ExhibitorsWithLevels"));
const ExhibitorLevelsPage = () => {
  return (
    <Fragment>
      <Meta
        pageTitle={capitalize(process.env.REACT_APP_EXHIBITORS_SPONSORS_TITLE)}
      />
      <BannerWrapper pageName="exhibitors" />
      <Suspense
        fallback={
          <div className={exhibitorsWithLevelsStyles.exhibitors}>
            <Loader />
          </div>
        }
      >
        <ExhibitorLevels />
      </Suspense>
    </Fragment>
  );
};

export default ExhibitorLevelsPage;
