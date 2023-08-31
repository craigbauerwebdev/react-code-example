import React, { Suspense, lazy } from "react";

import { Fragment } from "react";
import Loader from "Components/Loader";
import Meta from "Components/Meta";

const Meeting404 = lazy(() => import("./Meeting404"));
const MeetingFullPage = () => {
  return (
    <Fragment>
      <Meta pageTitle="Removed" />
      <Suspense fallback={<Loader />}>
        <Meeting404
          message={"Sorry, the meeting is full."}
          description={
            "The meeting is full and can not take in any more guess at this time."
          }
        />
      </Suspense>
    </Fragment>
  );
};

export default MeetingFullPage;
