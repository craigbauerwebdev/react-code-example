import React, { Suspense, lazy } from "react";

import Loader from "Components/Loader";
import singleExhibitorStyles from "./scss/single-exhibitor.module.scss";

const SingleExhibitor = lazy(() => import("./SingleExhibitor"));
const SingleExhibitorPage = () => {
  return (
    <Suspense
      fallback={
        <div className={singleExhibitorStyles.main}>
          <Loader />
        </div>
      }
    >
      <SingleExhibitor />
    </Suspense>
  );
};

export default SingleExhibitorPage;
