import React, { Fragment, Suspense, lazy } from "react";

import BannerWrapper from "Components/Banners/BannerWrapper";
import Loader from "Components/Loader";
import Meta from "../Meta";
import postersStyles from "./scss/posters.module.scss";

const PostersList = lazy(() => import("./PostersList"));

const Posters = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Fragment>
      <BannerWrapper pageName="posters" />
      <div className={postersStyles.posters}>
        <Meta pageTitle="Posters" />
        <Suspense fallback={<Loader />}>
          <PostersList />
        </Suspense>
      </div>
    </Fragment>
  );
};

export default Posters;
