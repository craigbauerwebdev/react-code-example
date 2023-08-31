import AddToCalendar from "Components/AddToCalendar";
import React from "react";
import sideBarStyles from "./scss/single-side-bar.module.scss";

/**
 * Sidebar Calendar
 * @param {object} sessions
 * @param {string} timezone
 */
const SideBarCalendar = ({ session, userTz, page }) => {
  return (
    <div className={sideBarStyles.calendarHolder}>
      <AddToCalendar session={session} userTz={userTz} page={page} />
    </div>
  );
};

export default SideBarCalendar;
