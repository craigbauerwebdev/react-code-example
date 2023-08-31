import React, { useRef, useState } from "react";

import AttendeeSchedule from "../AttendeeSchedule/AttendeeSchedule";
import OEPAnalytics from "Components/OEPAnalytics";
import SvgTypes from "Components/SVG/SvgTypes";
import getAnalyticsPage from "util/getAnalyticsPage";
import headerStyles from "../scss/webinar-header.module.scss";
import { useLocation } from "react-router-dom";
import useOutsideClick from "hooks/useOutsideClick";

const MyScheduleDropdown = () => {
  const location = useLocation();
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const wrapperRef = useRef(null);
  const toggleModal = () => {
    setIsScheduleOpen(!isScheduleOpen);
  };
  const closeSchedule = () => {
    setIsScheduleOpen(false);
  };

  useOutsideClick(wrapperRef, closeSchedule);

  return (
    <div className={headerStyles.myScheduleWrapper} ref={wrapperRef}>
      <OEPAnalytics
        componentType="Button"
        page={getAnalyticsPage(location.pathname)}
        url={`${isScheduleOpen ? "Close schedule" : "Open schedule"}`}
        componentName={`${isScheduleOpen ? "Close schedule" : "Open schedule"}`}
      >
        <button
          className={headerStyles.mySchedule}
          onClick={toggleModal}
          type="button"
        >
          <span className={headerStyles.clipboard}>
            <SvgTypes name="clipboard" />
          </span>
          My Schedule
        </button>
      </OEPAnalytics>
      {isScheduleOpen && <AttendeeSchedule />}
    </div>
  );
};

export default MyScheduleDropdown;
