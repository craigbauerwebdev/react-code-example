import lodash from "lodash";
import moment from "moment-timezone";

export default function getMaxHour(events, tz) {
  const [timeMaxEnd] = lodash
    .orderBy(
      lodash.unionBy(
        events.map((time) => {
          return {
            timeSetting: moment.tz(time.end, tz).format(),
            hour: Number(moment.tz(time.end, tz).format("H")),
          };
        })
      ),
      ["hour"]
    )
    .reverse()
    .map((time) => time.timeSetting);

  return new Date(timeMaxEnd);
}
