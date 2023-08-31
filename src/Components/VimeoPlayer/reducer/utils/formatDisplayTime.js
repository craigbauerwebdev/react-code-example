import moment from "moment";
require("moment-duration-format");

export default function formatDisplayTime(time) {
  return moment.duration(time, "seconds").format("mm:ss", { trim: false });
}
