import {
  AudioInputControl,
  AudioOutputControl,
  VideoInputControl,
} from "lib/chimeComponents";
import React, { useContext } from "react";
import { MeetingControlsContext } from "..";
import EndMeetingControl from "../../EndMeetingControl";
import MuteAllControl from "../../MuteAllControl";
import { ContentShareButton } from "../ContentShareButton/ContentShareButton";

export interface BaseMeetingControlsProps {}

export const BaseMeetingControls: React.FC<BaseMeetingControlsProps> = () => {
  const { isHost, isChat } = useContext(MeetingControlsContext);

  return (
    <>
      <AudioOutputControl />
      {!isChat && <EndMeetingControl host={isHost} />}
    </>
  );
};

export interface SpeakerControlsProps extends BaseMeetingControlsProps {}

export const SpeakerControls: React.FC<SpeakerControlsProps> = () => {
  const { onByDefault, defaultMuted, meeting, isSpeaker } = useContext(
    MeetingControlsContext
  );
  return (
    <>
      {isSpeaker && meeting.meetingType === "video" ? (
        <ContentShareButton />
      ) : null}
      <AudioInputControl defaultMuted={defaultMuted} />
      <VideoInputControl onByDefault={onByDefault} />
    </>
  );
};

export interface HostOrModeratorControlsProps {}

const HostOrModeratorControls: React.SFC<HostOrModeratorControlsProps> = () => {
  return (
    <>
      <ContentShareButton />
      <MuteAllControl />
    </>
  );
};

export const SmartMeetingControls: React.FC = () => {
  const { isModerator, isAttendee, isHost } = useContext(
    MeetingControlsContext
  );
  return (
    <>
      <BaseMeetingControls />
      {!isAttendee && <SpeakerControls />}
      {(isHost || isModerator) && <HostOrModeratorControls />}
    </>
  );
};
