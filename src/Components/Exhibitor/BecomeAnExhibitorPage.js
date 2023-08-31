import React, { Fragment, Suspense, lazy } from "react";

import { Banner } from "Components/Banners/Banner";
import Loader from "Components/Loader";
import Meta from "Components/Meta";
import becomeAnExhibitorStyles from "./scss/become-an-exhibitor.module.scss";

const BecomeAnExhibitor = lazy(() => import("./BecomeAnExhibitor"));

const BecomeAnExhibitorPage = () => {
  return (
    <Fragment>
      <Meta pageTitle="Become an Exhibitor" />
      <Banner
        title="Become An Exhibitor"
        image="/images/hero-banners/exhibitor_BG.png"
      />
      <Suspense
        fallback={
          <div className={becomeAnExhibitorStyles.loaderHolder}>
            <Loader />
          </div>
        }
      >
        <BecomeAnExhibitor />
      </Suspense>
    </Fragment>
  );
};

export default BecomeAnExhibitorPage;
