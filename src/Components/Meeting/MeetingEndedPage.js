import React, { Suspense, lazy } from "react";

import { Fragment } from "react";
import Loader from "Components/Loader";
import Meta from "Components/Meta";

const Meeting404 = lazy(() => import("./Meeting404"));
const MeetingEndedPage = () => {
  return (
    <Fragment>
      <Meta pageTitle="Removed" />
      <Suspense fallback={<Loader />}>
        <Meeting404
          message={"Sorry, the meeting has ended."}
          description={
            "The host has ended the meeting and you will not be able to re-join."
          }
        />
      </Suspense>
    </Fragment>
  );
};

export default MeetingEndedPage;
