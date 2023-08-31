import React, { Suspense, lazy } from "react";

import Loader from "Components/Loader";
import singleLiveStreamStyles from "./scss/single-live-stream.module.scss";

const SingleLiveStream = lazy(() => import("./SingleLiveStream"));
const SingleLiveStreamPage = ({ match }) => {
  return (
    <Suspense
      fallback={
        <div className={singleLiveStreamStyles.main}>
          <Loader />
        </div>
      }
    >
      <SingleLiveStream match={match} />
    </Suspense>
  );
};

export default SingleLiveStreamPage;
