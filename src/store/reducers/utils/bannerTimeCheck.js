import { TIME_CHECKS, checkTime } from "util/timeCheck";

/**
 * Check time run a check on the starts and end time.
 * To see if item should be returned to the data array.
 * @param {object} banner
 */
export default function bannerTimeCheck(banner) {
  if (banner.starts && !checkTime(TIME_CHECKS.start, banner.starts)) {
    return null;
  }

  if (banner.ends && !checkTime(TIME_CHECKS.end, banner.ends)) {
    return null;
  }

  return banner;
}
