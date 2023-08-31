import {
  ControlBar,
  ControlBarButton,
  Dots,
  useAudioVideo,
  useContentShareControls,
  useContentShareState,
  useLocalVideo,
  useMeetingManager,
  useUserActivityState,
} from "lib/chimeComponents";
import React, { createContext, useCallback, useEffect } from "react";

import { SmartMeetingControls } from "./SmartMeetingControls/SmartMeetingControls";
import { StyledControls } from "./SmartMeetingControls/SmartMeetingControls.style";
import { TOPICS } from "../../constants";
import controlsStyles from "./scss/meeting-controls.module.scss";
import { removeJoinToken } from "util/modifyMeeting";
import { setCurrentMeeting } from "Components/Meeting/store/actions";
import { useCurrentUser } from "hooks/useCurrentUser";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useNavigation } from "providers/NavigationProvider";

export interface SmartMeetingControlsProps {
  meeting: any;
  children: any;
}

export const MeetingControlsContext: any = createContext({
  isHost: false,
  isChat: false,
  isAttendee: true,
  isModerator: false,
  isSpeaker: false,
  defaultMuted: false,
  onByDefault: true,
  meeting: null,
});

export const MeetingControlsMenuProvider: React.FC<SmartMeetingControlsProps> = ({
  meeting,
  children,
}) => {
  const { isHost, isModerator, isAttendee, isSpeaker } = useCurrentUser(
    meeting
  );
  return (
    <MeetingControlsContext.Provider
      value={{
        isHost,
        isChat: false,
        isAttendee,
        isModerator,
        isSpeaker,
        defaultMuted: !isHost,
        onByDefault: isHost || isModerator,
        meeting,
      }}
    >
      {children}
    </MeetingControlsContext.Provider>
  );
};

export interface MeetingControlsProps {
  meeting: Meeting;
}

const MeetingControls: React.SFC<MeetingControlsProps> = ({ meeting }) => {
  const { isHost, user, isAttendee } = useCurrentUser(meeting);
  const { fuzion_attendee_id: fuzionAttendeeId } = user;
  const { sessionId: meetingId } = meeting;
  const {
    toggleNavbar,
    closeRoster,
    showRoster,
    showChat,
    closeChat,
  } = useNavigation();
  const { isUserActive } = useUserActivityState();
  const audioVideo = useAudioVideo();
  const dispatch = useDispatch();
  const history = useHistory();
  const meetingManager = useMeetingManager();
  const { isVideoEnabled, toggleVideo } = useLocalVideo();
  const { isLocalUserSharing } = useContentShareState();
  const { toggleContentShare } = useContentShareControls();

  const handleToggle = () => {
    if (showRoster) {
      closeRoster();
    }

    if (showChat) {
      closeChat();
    }

    toggleNavbar();
  };

  const onMuteEvent = useCallback(
    (eventData) => {
      const data = JSON.parse(eventData.text());

      const muted =
        (audioVideo === null || audioVideo === void 0
          ? void 0
          : audioVideo.realtimeIsLocalAudioMuted()) || false;

      if (
        meetingId &&
        data.meetingId === meetingId &&
        (!data.fuzionAttendeeId || data.fuzionAttendeeId === fuzionAttendeeId)
      ) {
        if (!muted) {
          audioVideo === null || audioVideo === void 0
            ? void 0
            : audioVideo.realtimeMuteLocalAudio();
        }
      }
    },
    [audioVideo, meetingId, fuzionAttendeeId]
  );

  const shutOffMedia = useCallback(
    (eventData) => {
      const data = JSON.parse(eventData.text());

      if (
        meetingId &&
        data.meetingId === meetingId &&
        (!data.fuzionAttendeeId || data.fuzionAttendeeId === fuzionAttendeeId)
      ) {
        if (isVideoEnabled) {
          toggleVideo();
        }
        if (isLocalUserSharing) {
          toggleContentShare();
        }
      }
    },
    [
      isVideoEnabled,
      meetingId,
      toggleVideo,
      fuzionAttendeeId,
      isLocalUserSharing,
      toggleContentShare,
    ]
  );

  const kickUser = useCallback(
    (eventData) => {
      const data = JSON.parse(eventData.text());
      shutOffMedia(eventData);

      if (
        meeting?.sessionId &&
        data.meetingId === meeting?.sessionId &&
        (!data.fuzionAttendeeId || data.fuzionAttendeeId === fuzionAttendeeId)
      ) {
        meetingManager.leave();
        dispatch(setCurrentMeeting(removeJoinToken(meeting)));

        history.push("/removed");
      }
    },
    [shutOffMedia, meeting, fuzionAttendeeId, meetingManager, dispatch, history]
  );

  useEffect(() => {
    if (!isHost) {
      if (audioVideo) {
        audioVideo.realtimeSubscribeToReceiveDataMessage(
          TOPICS.muteAll,
          onMuteEvent
        );
      }
    }

    return () => {
      if (audioVideo) {
        audioVideo.realtimeUnsubscribeFromReceiveDataMessage(TOPICS.muteAll);
      }
    };
  }, [audioVideo, onMuteEvent, isHost]);

  useEffect(() => {
    if (!isHost) {
      if (audioVideo) {
        audioVideo.realtimeSubscribeToReceiveDataMessage(
          TOPICS.muteUser,
          onMuteEvent
        );
      }
    }

    return () => {
      if (audioVideo) {
        audioVideo.realtimeUnsubscribeFromReceiveDataMessage(TOPICS.muteUser);
      }
    };
  }, [audioVideo, onMuteEvent, isHost]);

  useEffect(() => {
    if (!isHost && audioVideo) {
      audioVideo.realtimeSubscribeToReceiveDataMessage(
        TOPICS.broadcastUser,
        shutOffMedia
      );
      audioVideo.realtimeSubscribeToReceiveDataMessage(
        TOPICS.demoteUser,
        shutOffMedia
      );
      audioVideo.realtimeSubscribeToReceiveDataMessage(
        TOPICS.kickUser,
        kickUser
      );
    }

    return () => {
      if (audioVideo) {
        audioVideo.realtimeUnsubscribeFromReceiveDataMessage(
          TOPICS.broadcastUser
        );
        audioVideo.realtimeUnsubscribeFromReceiveDataMessage(
          TOPICS.demoteUser,
          shutOffMedia
        );
        audioVideo.realtimeUnsubscribeFromReceiveDataMessage(
          TOPICS.kickUser,
          kickUser
        );
      }
    };
  }, [audioVideo, shutOffMedia, isHost, kickUser]);

  //keep attendees muted (for product showcase)
  useEffect(() => {
    if (isAttendee && audioVideo) {
      if (!audioVideo.realtimeIsLocalAudioMuted()) {
        audioVideo.realtimeMuteLocalAudio();
      }
    }
  }, [audioVideo, user, isAttendee]);

  return (
    <MeetingControlsMenuProvider meeting={meeting}>
      <StyledControls active={!!isUserActive}>
        <ControlBar
          layout="undocked-horizontal"
          showLabels
          className={controlsStyles.controlsMenu}
        >
          <ControlBarButton
            label="Hide All"
            onClick={handleToggle}
            icon={<Dots />}
          />
          <SmartMeetingControls />
        </ControlBar>
      </StyledControls>
    </MeetingControlsMenuProvider>
  );
};

export default MeetingControls;
