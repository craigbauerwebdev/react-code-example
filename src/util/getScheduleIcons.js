import checkForLiveStream from "util/checkForLiveStream";

export default function getScheduleIcons(event) {
  if (checkForLiveStream(event)) {
    return "TV";
  }

  switch (event.meetingType?.toLowerCase()) {
    case "showcase":
      return "1:many";
    case "inperson":
      return "in-person";
    default:
      return event.meetingType?.toLowerCase();
  }
}
