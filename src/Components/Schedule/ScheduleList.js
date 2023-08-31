import React, { Fragment } from "react";

import ScheduleDate from "./ScheduleDate";
import formatDate from "util/formatDate";
import lodash from "lodash";
import scheduleListStyles from "./scss/schedule-list.module.scss";
import sortResults from "util/sortResults";
import { useSelector } from "react-redux";

/**
 * Schedule List Items
 *
 * @param {object} props
 * @param {Meeting[]} props.filteredSchedule
 * @param {string} props.exhibitorAdminCompanyId
 *
 * @returns {JSX.Element}
 */
const ScheduleList = ({ filteredSchedule, exhibitorAdminCompanyId }) => {
  const timezone = useSelector((state) => state.global.timezone);
  //Get All Days in Event
  /**
   * Group Events by day
   *
   * @param {Meeting[]} data
   * @returns {[]}
   */
  const groupMySchedule = (data) => {
    /**@type {Meeting[]} */
    const sortedData = sortResults(data, "startEndTimeAndName"); // Sort filtered result
    sortedData.map((event) => {
      event.day = formatDate(
        { date: event.sessionStart, format: "dddd, MMMM D" }, // Make a display key of the date
        timezone
      );

      return event;
    });
    const schedule = lodash.groupBy(sortedData, "day"); // Group data by date to make an object with dates as the key
    const days = Object.keys(schedule);
    const groups = days.map((day) => {
      return [
        {
          day: day,
          items: schedule[day] || [],
        },
      ];
    }); // Make a sorted array of arrays each array represent a day

    return lodash.flatMap(groups); // Make one array of objects.
  };

  return (
    <Fragment>
      {filteredSchedule &&
        filteredSchedule.length > 0 &&
        groupMySchedule(filteredSchedule).map((day) => (
          <div className={scheduleListStyles.date} key={day.day}>
            <h3 className={scheduleListStyles.innerSubHeader}>{day.day}</h3>
            {day.items.length > 0 ? (
              <ScheduleDate
                events={day.items}
                key={day.day}
                exhibitorAdminCompanyId={exhibitorAdminCompanyId}
              />
            ) : (
              <p className={scheduleListStyles.noEvents}>
                You have no scheduled events yet.
              </p>
            )}
          </div>
        ))}
    </Fragment>
  );
};

export default ScheduleList;
