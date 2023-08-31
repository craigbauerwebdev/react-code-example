import React, { Suspense, lazy } from "react";

import Loader from "Components/Loader";
import Meta from "Components/Meta";
import attendeeStyles from "./scss/attendees.module.scss";
import useGetPageByPathname from "hooks/useGetPageByPathname";

const AttendeeList = lazy(() => import("./AttendeeList"));

const Attendees = ({ searchState, dispatchSearchState, mobileFilter }) => {
  const { pageTitle } = useGetPageByPathname();

  return (
    <div className={attendeeStyles.attendee}>
      <Meta pageTitle={pageTitle} />
      <Suspense fallback={<Loader />}>
        <AttendeeList
          searchState={searchState}
          dispatchSearchState={dispatchSearchState}
          mobileFilter={mobileFilter}
        />
      </Suspense>
    </div>
  );
};

export default Attendees;
