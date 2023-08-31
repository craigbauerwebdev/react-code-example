import lodash from "lodash";
import moment from "moment-timezone";

export default function getDaysList(eventsCleaned, tz) {
  // List of days that show up in drop down
  const date = (dateObj) => dateObj.dayVal;
  const days = lodash.unionBy(
    eventsCleaned.map((d) => {
      const dateFormatted = moment(d.sessionStart)
        .tz(tz)
        .format("dddd, MMM DD");

      return {
        dayVal: d.sessionStart,
        name: dateFormatted,
        active: false,
      };
    }),
    "name"
  );

  return lodash.sortBy(days, date);
}
