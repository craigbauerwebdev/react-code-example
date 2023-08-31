import lodash from "lodash";
import moment from "moment-timezone";

export default function getMinHour(events, tz) {
  const [timeMinStart] = lodash
    .orderBy(
      lodash.unionBy(
        events.map((time) => {
          return {
            timeSetting: moment.tz(time.start, tz).format(),
            hour: Number(moment.tz(time.start, tz).format("H")),
          };
        })
      ),
      ["hour"]
    )
    .map((time) => time.timeSetting);
  const getHourTime = moment.tz(timeMinStart, tz).format("MM/DD/YYYY HH");

  return new Date(moment.tz(getHourTime, "MM/DD/YYYY HH", tz).format());
}
