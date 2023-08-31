import React, { Fragment, useState } from "react";

import OEPAnalytics from "../OEPAnalytics";
import ScheduleCard from "./ScheduleCard";
import scheduleShowMoreStyles from "./scss/schedule-show-more.module.scss";

/**
 * @param {object} props
 * @param {Meeting[]} props.events
 * @param {String} props.exhibitorAdminCompanyId
 *
 * @returns {JSX.Element}
 */
const ScheduleDate = ({ events, exhibitorAdminCompanyId }) => {
  const [seeMore, setSeeMore] = useState(false);
  const sliceNum = seeMore ? events.length : 5;

  const handleSeeMore = (seeMore) => {
    setSeeMore(seeMore);
  };

  return (
    <Fragment>
      {events.slice(0, sliceNum).map((event, i) => (
        <ScheduleCard
          event={event}
          key={`${event.sessionId} - ${i}`}
          exhibitorAdminCompanyId={exhibitorAdminCompanyId}
        />
      ))}
      {!seeMore && events.length > 5 && (
        <div className={scheduleShowMoreStyles.holder}>
          <OEPAnalytics
            page="My Schedule"
            componentType="Button"
            url="Show More Meetings"
          >
            <button
              className={scheduleShowMoreStyles.seeBtn}
              type="button"
              onClick={handleSeeMore.bind(null, true)}
              aria-label="Show More Meetings"
            >
              See More
            </button>
          </OEPAnalytics>
        </div>
      )}
      {seeMore && events.length > 5 && (
        <div className={scheduleShowMoreStyles.holder}>
          <OEPAnalytics
            page="My Schedule"
            componentType="Button"
            url="Show Less Meetings"
          >
            <button
              className={scheduleShowMoreStyles.seeBtn}
              type="button"
              onClick={handleSeeMore.bind(null, false)}
              aria-label="Show Less Meetings"
            >
              See Less
            </button>
          </OEPAnalytics>
        </div>
      )}
    </Fragment>
  );
};

export default ScheduleDate;
