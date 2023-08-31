import "Components/CalendarView/scss/index.scss";

import { Calendar, Views } from "react-big-calendar";
import React, { Fragment } from "react";

import Event from "Components/CalendarView/Event";
import TimeGutterHeader from "Components/CalendarView/TimeGutterHeader";
import { TimeSlotContainer } from "Components/CalendarView/TimeSlotWrapper";
import { ToolbarContainer } from "Components/CalendarView/Toolbar";
import legendStyles from "Components/CalendarView/scss/legend.module.scss";

/**
 * https://github.com/Klowd/onlineeventpro-product-ui/wiki/Calendar
 *
 * @param {object} props
 * @param {Session[]} props.calendarEvent
 * @param {Date} props.startDay
 * @param {function} props.eventSelect
 * @param {Date} props.min
 * @param {Array} props.daysToolbar
 * @param {Array} props.legend
 * @param {Array} props.rooms
 * @param {string} props.tz
 * @param {object} props.localizer
 *
 * @returns {JSX.Element} calendar component
 */
const CalendarView = ({
  calendarEvent,
  startDay,
  eventSelect,
  min,
  daysToolbar,
  legend,
  rooms,
  tz,
  localizer,
}) => {
  return (
    <Fragment>
      <div className={legendStyles.legend}>
        {legend.map((legend) => (
          <div key={legend.name}>
            <hr
              style={{
                backgroundColor: legend.color,
              }}
            />
            <span>{legend.name}</span>
          </div>
        ))}
      </div>
      <Calendar
        localizer={localizer}
        events={calendarEvent}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        defaultView={Views.DAY}
        onSelectEvent={eventSelect}
        views={{ day: true }}
        showMultiDayTimes
        resources={rooms}
        resourceIdAccessor="id"
        resourceTitleAccessor="displayName"
        min={min}
        defaultDate={startDay}
        components={{
          eventWrapper: Event,
          toolbar: ToolbarContainer({
            daysList: daysToolbar,
            tz: tz,
          }),
          timeGutterHeader: TimeGutterHeader,
          timeSlotWrapper: TimeSlotContainer({ tz: tz }),
        }}
      />
    </Fragment>
  );
};

function areEqual(prevProps, nextProps) {
  /*
  return true if passing nextProps to render would return
  the same result as passing prevProps to render,
  otherwise return false
  */
  // Only re-render component if events change.
  if (prevProps.calendarEvent === nextProps.calendarEvent) {
    return true;
  }

  return false;
}

export default React.memo(CalendarView, areEqual);
