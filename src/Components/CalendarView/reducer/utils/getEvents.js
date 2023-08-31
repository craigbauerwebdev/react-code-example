import ConfigService from "services/ConfigService";
import { legendMap } from "./legend";
import lodash from "lodash";
import moment from "moment-timezone";

export default function getEvents(events, tz) {
  const time = (time) => {
    const eventTime = moment.tz(time, ConfigService.runValues.momentTimezone);

    return eventTime.clone().tz(tz).format();
  };
  return lodash.sortBy(
    events.map((s) => {
      return {
        id: s.sessionId,
        title: s.sessionName,
        start: new Date(time(s.sessionStart)),
        end: new Date(time(s.sessionEnd)),
        resourceId: s.eventRoom.roomId,
        sessionData: {
          id: s.sessionId,
          start: s.sessionStart,
          end: s.sessionEnd,
          type: s.sessionType.sessionTypeName,
          name: s.sessionName,
          liveStream: s.sessionVideoSource,
          track: s.sessionTrack,
          color: legendMap.get(s.sessionType.sessionTypeName),
        },
      };
    }),
    (dateObj) => {
      return new Date(dateObj.sessionData.start);
    }
  );
}
