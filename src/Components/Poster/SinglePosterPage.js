import React, { Suspense, lazy } from "react";

import Loader from "Components/Loader";
import singlePosterStyles from "./scss/single-poster.module.scss";

const SinglePoster = lazy(() => import("./SinglePoster"));

const SinglePosterPage = () => {
  return (
    <div className={singlePosterStyles.main}>
      <Suspense fallback={<Loader />}>
        <SinglePoster />
      </Suspense>
    </div>
  );
};

export default SinglePosterPage;
