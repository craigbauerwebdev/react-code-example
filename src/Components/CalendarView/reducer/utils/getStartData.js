import moment from "moment-timezone";

export default function getStartDate(events, tz) {
  // Get a list of day that have events from today to the events last day
  const startDate = events.filter((event) =>
    moment.tz(new Date(event.start), tz).isSameOrAfter(new Date(), "day")
  );
  // What day should the calendar load first
  const defaultDate = new Date(startDate[0]?.start);
  // List of days that is used in the toolbar

  return [
    defaultDate.getFullYear(),
    defaultDate.getMonth(),
    defaultDate.getDate(),
  ];
}
