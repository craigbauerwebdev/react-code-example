import React from "react";
import ScheduleToCalendar from "Components/Schedule/ScheduleToCalendar";
import sideBarStyle from "./scss/single-side-bar.module.scss";

const SideBarSchedule = ({ id, page, url }) => {
  return (
    <div className={sideBarStyle.sideBarSchedule}>
      <ScheduleToCalendar id={id} page={page} />
    </div>
  );
};

export default SideBarSchedule;
