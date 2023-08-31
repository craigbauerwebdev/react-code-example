import React, { useEffect, useState } from "react";
import {
  deleteProfileData,
  getProfileData,
  patchProfileData,
} from "Components/Profile/store/actions";
import { useDispatch, useSelector } from "react-redux";

import OEPAnalytics from "Components/OEPAnalytics";
import SvgTypes from "Components/SVG/SvgTypes";
import { dataTypes } from "store/utils/dataTypes";
import { profileLookupKey } from "Components/Profile/store/utils/profileLookupKey";
import { retrievedPayloads } from "store/utils/retrievedPayloads";
import scheduleStyles from "./scss/schedule-to-calendar.module.scss";

const scheduleTypes = {
  meetings: "meetings",
  sessions: "sessions",
  added: "Added to Schedule",
  add: "Add to Schedule",
};

/**
 * Add to Schedule Button
 * https://github.com/Klowd/onlineeventpro-product-ui/wiki/Add-To-Schedule
 *
 * @param {object} props
 * @param {string} props.id
 * @param {string} props.page
 * @param {string} props.user
 */
const ScheduleToCalendar = ({ id, page, isWebinar, iconOnly }) => {
  const dispatch = useDispatch();
  /** @type {User} */
  const user = useSelector((state) => state.global.user);
  const schedule = useSelector((state) => state.profile.schedule);
  const [isActive, setIsActive] = useState(null);
  const copy = isActive ? scheduleTypes.added : scheduleTypes.add;
  const type = isWebinar ? scheduleTypes.meetings : scheduleTypes.sessions;
  const params = { [type]: [`${id}`] };
  const toggleAddToSchedule = () => {
    if (isActive) {
      // Remove item from user's schedule.
      dispatch(deleteProfileData(dataTypes.schedule, params));
      setIsActive(false);
    } else {
      // Add item to user's schedule.
      dispatch(patchProfileData(dataTypes.schedule, params));
      setIsActive(true);
    }
  };

  // Get all scheduled id's on component first load
  useEffect(() => {
    if (user && !retrievedPayloads.has(profileLookupKey.schedule)) {
      dispatch(getProfileData(dataTypes.schedule, profileLookupKey.schedule));
    }
  }, [dispatch, user]);

  // Every time the store updates this will run.
  useEffect(() => {
    // Check to see if this item has been saved as to the schedule
    if (schedule[type]) {
      setIsActive(schedule[type].includes(`${id}`));
    }
  }, [id, schedule, type]);

  // No display if user is not logged in
  if (!user) {
    return null;
  }

  return (
    <OEPAnalytics
      componentType="Button"
      page={page}
      url={isActive ? "Removed from Schedule" : "Added to Schedule"}
      componentName="Schedule to Calendar"
    >
      <button
        type="button"
        onClick={toggleAddToSchedule}
        className={`${scheduleStyles.schedule} ${
          isActive && scheduleStyles.active
        } ${iconOnly && scheduleStyles.iconOnly}`}
      >
        <SvgTypes name="clock" />
        {!iconOnly ? copy : <span className="sr-only">{copy}</span>}
      </button>
    </OEPAnalytics>
  );
};

export default ScheduleToCalendar;
