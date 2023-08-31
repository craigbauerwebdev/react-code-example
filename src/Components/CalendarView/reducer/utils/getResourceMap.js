import lodash from "lodash";

export default function getResourceMap(eventsCleaned) {
  // Make calendar column out of the even room name
  return lodash
    .unionBy(
      eventsCleaned.map((s) => ({
        id: s.eventRoom.roomId,
        displayName: s.eventRoom.displayName,
      })),
      "id"
    )
    .filter(Boolean);
}
