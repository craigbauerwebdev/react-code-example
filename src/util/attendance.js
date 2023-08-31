import ConfigService from "services/ConfigService";
import axios from "axios";
import { isEmpty } from "lodash";
import moment from "moment-timezone";

const TZ = ConfigService.runValues.momentTimezone;
const NOW_ENV = process.env.REACT_APP_SHOW_CURRENT_DATE;
const NOW = NOW_ENV ? moment(NOW_ENV).tz(TZ) : moment().tz(TZ);
const SHOW_START = moment(ConfigService.runValues.eventStartDate).tz(TZ);
const SHOW_END = moment(ConfigService.runValues.eventEndDate).tz(TZ);

const canUpdateAttendee = (attendee) => {
  if (
    !ConfigService.runValues.eventStartDate ||
    !ConfigService.runValues.eventEndDate
  ) {
    // eslint-disable-next-line no-console
    console.error(
      "attendance.js: Must provide eventStartDate and eventEndDate env vars!"
    );
    return false;
  }
  const canUpdate =
    NOW.isBetween(SHOW_START, SHOW_END) &&
    attendee.attendance_verification_flag !== 1;
  return canUpdate;
};

const updateAttendee = async (attendee) => {
  try {
    if (
      attendee &&
      !isEmpty(attendee) &&
      !attendee.isError &&
      canUpdateAttendee(attendee)
    ) {
      attendee.attendance_verification_flag = 1;
      const result = await axios.post(
        `${process.env.REACT_APP_API_HOST}/updateFuzionAttendee`,
        attendee
      );
      return result;
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("attendance.js: Fuzion attendee update failed!");
  }
  return null;
};

export default {
  updateAttendee,
};
