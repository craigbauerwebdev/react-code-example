import React, { Suspense, lazy } from "react";

import Loader from "Components/Loader";
import singleSpeakerStyles from "./scss/single-speaker.module.scss";

const SingleSpeaker = lazy(() => import("./SingleSpeaker"));
const SingleSpeakerPage = () => {
  return (
    <Suspense
      fallback={
        <div className={singleSpeakerStyles.mainWrapper}>
          <Loader />
        </div>
      }
    >
      <SingleSpeaker />
    </Suspense>
  );
};

export default SingleSpeakerPage;
