import React, { Suspense, lazy } from "react";

import Loader from "Components/Loader";
import singleSessionStyles from "./scss/single-session.module.scss";

const SingleSession = lazy(() => import("./SingleSession"));

const SingleSessionPage = () => {
  return (
    <Suspense
      fallback={
        <div className={singleSessionStyles.main}>
          <Loader />
        </div>
      }
    >
      <SingleSession />
    </Suspense>
  );
};

export default SingleSessionPage;
