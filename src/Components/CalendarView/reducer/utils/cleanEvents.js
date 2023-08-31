import ConfigService from "services/ConfigService";
import moment from "moment-timezone";

export default function cleanEvents(tz) {
  const today = moment.tz(new Date(), tz);

  return function (event) {
    const evtStartTime = moment.tz(
      event.sessionStart,
      ConfigService.runValues.momentTimezone
    );
    const convertStart = evtStartTime.clone().tz(tz).format();

    return moment.tz(today, tz).isSameOrBefore(convertStart, "day");
  };
}
