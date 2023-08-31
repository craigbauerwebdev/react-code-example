import React, { Suspense, lazy } from "react";

import { Fragment } from "react";
import Loader from "Components/Loader";
import Meta from "Components/Meta";

const Meeting404 = lazy(() => import("./Meeting404"));
const MeetingNotInvitedPage = () => {
  return (
    <Fragment>
      <Meta pageTitle="Removed" />
      <Suspense fallback={<Loader />}>
        <Meeting404 message={"Sorry, you were not invited to this meeting."} />
      </Suspense>
    </Fragment>
  );
};

export default MeetingNotInvitedPage;
