import React, { Suspense, lazy } from "react";

import Loader from "Components/Loader";
import conferencingPage from "./VideoConferencing/scss/video-conferencing.module.scss";

const VideoConferencing = lazy(() =>
  import("./VideoConferencing/VideoConferencing")
);
const MeetingPage = () => {
  return (
    <Suspense
      fallback={
        <div className={`${conferencingPage.main} ${conferencingPage.loading}`}>
          <Loader />
        </div>
      }
    >
      <VideoConferencing />
    </Suspense>
  );
};

export default MeetingPage;
