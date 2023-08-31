import ConfigService from "services/ConfigService";
import moment from "moment-timezone";

export function allowVideo(session = {}, accountProfile) {
  const exhibitorInfo = session?.sessionCustom5
    ?.replace(/ /g, "-")
    ?.toLowerCase();
  const accountInfo = accountProfile?.companyId
    ?.replace(/ /g, "-")
    ?.toLowerCase();
  const isHost = accountInfo === exhibitorInfo;

  const currentTime = moment(new Date().toISOString())
    .clone()
    .tz(ConfigService.runValues.momentTimezone);

  const eventStartTime = moment.tz(
    session.sessionStart,
    ConfigService.runValues.momentTimezone
  );

  const beforeAllowMinutes = isHost ? 30 : 5;

  const adjustedStartTime = eventStartTime
    .clone()
    .subtract(beforeAllowMinutes, "minutes");

  const eventEndTime = moment.tz(
    session.sessionEnd,
    ConfigService.runValues.momentTimezone
  );

  const adjustedEndTime = eventEndTime.clone().add(30, "minutes");

  const isAdjustedInProgress = currentTime.isBetween(
    adjustedStartTime,
    adjustedEndTime
  );

  const afterAdjustedEndTime = currentTime.isAfter(adjustedEndTime);

  //return 0 for before adjustedStartTime (show time/add to schedule/etc, but not the Join button)
  //return 1 for meeting isAdjustedInProgress
  //return 2 for adjustedEndTime (Showcase is over - remove date/time/Join info)
  return isAdjustedInProgress ? 1 : afterAdjustedEndTime ? 2 : 0;
}
