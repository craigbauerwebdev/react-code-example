import OEPAnalytics from "Components/OEPAnalytics";
import React from "react";
import datePickerStyles from "./scss/date-styles.module.scss";
import formatDate from "util/formatDate";
import getAnalyticsPage from "util/getAnalyticsPage";
import moment from "moment-timezone";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const DatePicker = ({
  DateArray = [],
  page,
  increasePageNumber,
  decreasePageNumber,
}) => {
  const location = useLocation();
  const timezone = useSelector((state) => state.global.timezone);
  const todaysDate = formatDate(
    { data: new Date(), format: "MM/DD/YYYY" },
    timezone
  );
  const convertToDate = (date) => {
    return moment(date).format("MM/DD/YYYY");
  };

  return (
    <div className={datePickerStyles.datePicker}>
      <OEPAnalytics
        componentType="Button"
        page={getAnalyticsPage(location.pathname)}
        url="Go to Previous Week"
        componentName="Go to Previous Week"
      >
        <button
          className={datePickerStyles.iconButton}
          onClick={decreasePageNumber}
          type="button"
        >
          <img src="/images/icons/arrow-left.svg" alt="Go to previous week" />
        </button>
      </OEPAnalytics>
      <div className={datePickerStyles.pickedDate}>
        <span className="sr-only">Current Week Starting On: </span>
        {convertToDate(DateArray[page]) === todaysDate
          ? "Today"
          : moment(DateArray[page]).tz(timezone).format("ddd DD")}
      </div>
      <OEPAnalytics
        componentType="Button"
        page={getAnalyticsPage(location.pathname)}
        url="Go to next week"
        componentName="Go to Next Week"
      >
        <button
          className={datePickerStyles.iconButton}
          onClick={increasePageNumber}
          type="button"
        >
          <img src="/images/icons/arrow-right.svg" alt="Go to Next Week" />
        </button>
      </OEPAnalytics>
    </div>
  );
};

export default DatePicker;
