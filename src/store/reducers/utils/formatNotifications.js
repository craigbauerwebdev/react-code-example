import { TIME_CHECKS, checkTime } from "../../../util/timeCheck";

/**
 * Format Notifications data form Liferay before saving in store
 * @param {object} data data from Liferay
 */
export default function formatNotifications(data) {
  const [start, end] = [
    checkTime(TIME_CHECKS.start, data.start),
    checkTime(TIME_CHECKS.end, data.end),
  ];

  if (data.end && !end) {
    return {};
  }

  if (data.start && !start) {
    return {};
  }

  return data;
}
