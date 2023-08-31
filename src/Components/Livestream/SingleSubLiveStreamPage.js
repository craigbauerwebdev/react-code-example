import React, { Suspense, lazy } from "react";

import Loader from "Components/Loader";
import subLiveStreamStyles from "./scss/single-sub-live-stream.module.scss";

const SingleSubLiveStream = lazy(() => import("./SingleSubLiveStream"));
const SingleSubLiveStreamPage = () => {
  return (
    <Suspense
      fallback={
        <div className={subLiveStreamStyles.main}>
          <Loader />
        </div>
      }
    >
      <SingleSubLiveStream />
    </Suspense>
  );
};

export default SingleSubLiveStreamPage;
