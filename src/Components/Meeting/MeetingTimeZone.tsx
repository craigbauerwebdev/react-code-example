import React from "react";
import formatDate from "util/formatDate";
import formatTime from "util/formatTime";
import { useSelector } from "react-redux";
import webinarStyles from "./VideoConferencing/scss/video-conferencing.module.scss";

export interface MeetingTimeZoneProps {
  meeting: any;
}

export const MeetingTimeZone: React.SFC<MeetingTimeZoneProps> = ({
  meeting,
}) => {
  const timezone = useSelector((state: any) => state.global.timezone);
  return (
    <div className={webinarStyles.topSectionDateTime}>
      {/* @ts-ignore */}
      {formatDate({ date: meeting.sessionStart }, timezone)}
      <br />
      {formatTime(meeting, timezone)}
    </div>
  );
};
