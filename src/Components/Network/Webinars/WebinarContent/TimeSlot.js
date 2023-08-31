import React from "react";
import formatDate from "util/formatDate";
import timeSlotStyles from "../scss/webinar-page.module.scss";
import { useSelector } from "react-redux";

/**
 *
 * @param {object} props
 * @param {Session} props.session
 *
 * @returns {JSX.Element}
 */
const TimeSlot = ({ session }) => {
  const { sessionStart, sessionEnd } = session;
  const timezone = useSelector((state) => state.global.timezone);
  const eventStartTime = formatDate(
    { date: sessionStart, format: "h:mm a" },
    timezone
  );
  const eventEndTime = formatDate(
    { date: sessionEnd, format: "h:mm a" },
    timezone
  );

  return (
    <div className={timeSlotStyles.timeSlot}>
      <strong>{eventStartTime}</strong>
      <span>{eventEndTime}</span>
    </div>
  );
};

export default TimeSlot;
