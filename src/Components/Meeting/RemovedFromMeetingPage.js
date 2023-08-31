import React, { Suspense, lazy } from "react";

import { Fragment } from "react";
import Loader from "Components/Loader";
import Meta from "Components/Meta";

const RemovedFromMeeting = lazy(() => import("./RemovedFromMeeting"));
const RemovedFromMeetingPage = () => {
  return (
    <Fragment>
      <Meta pageTitle="Removed" />
      <Suspense fallback={<Loader />}>
        <RemovedFromMeeting />
      </Suspense>
    </Fragment>
  );
};

export default RemovedFromMeetingPage;
