import React, { Fragment } from "react";
import {
  addModerator,
  addModeratorReplaceHost,
  addSpeaker,
  demoteToAttendee,
  removeModerator,
} from "util/modifyMeeting";
import {
  addModeratorToChat,
  removeModeratorFromChat,
  removeUserFromChat,
  updateMeeting,
} from "util/api.js";
import { useAttendeeStatus, useAudioVideo } from "../../lib/chimeComponents";
import { useDispatch, useSelector } from "react-redux";

import { ChimeAttendeeProfile } from "types/meetings";
import Logger from "js-logger";
import { MEETING_TYPES } from "util/meetingTypes";
import OEPAnalytics from "Components/OEPAnalytics";
import { TOPICS } from "./constants";
import { chimeUserTypes } from "util/getChimeUserType";
import dropdownStyles from "./scss/moderation-dropdown.module.scss";
import getAnalyticsPage from "util/getAnalyticsPage";
import { setCurrentMeeting } from "./store/actions";
import { useLocation } from "react-router-dom";

// attendeeRole: 'HOST' | 'ATTENDEE' | 'MODERATOR' | 'SPEAKER'
// attendeeStatus: any
export interface VideoModerationDropdownProps {
  attendee: ChimeAttendeeProfile;
  meeting: Meeting;
}

export const VideoModerationDropdown: React.SFC<VideoModerationDropdownProps> = ({
  attendee,
  meeting,
}) => {
  const { role, ...restOfAttendee } = attendee || {};
  const attendeeStatus = useAttendeeStatus(restOfAttendee.chimeAttendeeId);

  const audioVideo = useAudioVideo();
  const dispatch = useDispatch();
  const location = useLocation();
  /** @type {User} */
  const user = useSelector((state: any) => state.global.user);

  const sendDataMessage = (topic: any, additionalData?: any) => {
    if (audioVideo) {
      const data = {
        meetingId: meeting.meetingId,
        fuzionAttendeeId: restOfAttendee.fuzionAttendeeId,
        ...additionalData,
      };

      audioVideo.realtimeSendDataMessage(topic, JSON.stringify(data));
    }
  };

  const onMuteClick = () => {
    sendDataMessage(TOPICS.muteUser);
  };

  const onDisableVideoClick = () => {
    sendDataMessage(TOPICS.broadcastUser);
  };

  const onRemoveUserClick = async () => {
    sendDataMessage(TOPICS.kickUser);

    await removeUserFromChat(
      meeting,
      restOfAttendee.fuzionAttendeeId,
      user.fuzion_attendee_id
    );
  };

  const onPromoteToSpeakerClick = async () => {
    const updatedMeeting = addSpeaker(meeting, restOfAttendee.fuzionAttendeeId);

    sendDataMessage(TOPICS.promoteUser, { role: chimeUserTypes.speaker });
    dispatch(setCurrentMeeting(updatedMeeting));
    await updateMeeting(updatedMeeting, {
      speakers: updatedMeeting.speakers,
    });
  };

  const onPromoteToHostClick = async () => {
    const updatedMeeting = addModeratorReplaceHost(
      meeting,
      restOfAttendee.fuzionAttendeeId
    );

    Logger.log("updatedMeeting: ", updatedMeeting);

    sendDataMessage(TOPICS.promoteUser, {
      role: chimeUserTypes.host,
      ...restOfAttendee,
    });
    dispatch(setCurrentMeeting(updatedMeeting));
    await updateMeeting(updatedMeeting, {
      moderators: updatedMeeting.moderators,
    });
    await addModeratorToChat(meeting, restOfAttendee.fuzionAttendeeId);
  };

  const onPromoteToModeratorClick = async () => {
    const updatedMeeting = addModerator(
      meeting,
      restOfAttendee.fuzionAttendeeId
    );

    sendDataMessage(TOPICS.promoteUser, {
      role: chimeUserTypes.moderator,
      ...restOfAttendee,
    });
    dispatch(setCurrentMeeting(updatedMeeting));
    await updateMeeting(updatedMeeting, {
      moderators: updatedMeeting.moderators,
    });
    await addModeratorToChat(meeting, restOfAttendee.fuzionAttendeeId);
  };

  const onDemoteToSpeakerClick = async () => {
    const updatedMeeting = addSpeaker(
      removeModerator(meeting, restOfAttendee.fuzionAttendeeId),
      restOfAttendee.fuzionAttendeeId
    );

    sendDataMessage(TOPICS.demoteUser, {
      role: chimeUserTypes.speaker,
      ...restOfAttendee,
    });
    dispatch(setCurrentMeeting(updatedMeeting));
    await updateMeeting(updatedMeeting, {
      moderators: updatedMeeting.moderators,
      speakers: updatedMeeting.speakers,
    });
    await removeModeratorFromChat(meeting, restOfAttendee.fuzionAttendeeId);
  };

  const onDemoteToAttendeeClick = async () => {
    const updatedMeeting = demoteToAttendee(
      meeting,
      restOfAttendee.fuzionAttendeeId
    );
    sendDataMessage(TOPICS.demoteUser, {
      role: chimeUserTypes.attendee,
      ...restOfAttendee,
    });
    dispatch(setCurrentMeeting(updatedMeeting));
    await updateMeeting(updatedMeeting, {
      speakers: updatedMeeting.speakers,
      moderators: updatedMeeting.moderators,
    });
    await removeModeratorFromChat(meeting, restOfAttendee.fuzionAttendeeId);
  };

  return (
    <Fragment>
      {role !== chimeUserTypes.host && (
        <Fragment>
          {!attendeeStatus.muted && (
            <div className={dropdownStyles.row}>
              <OEPAnalytics
                componentType="Button"
                page={getAnalyticsPage(location.pathname)}
                url="Mute User"
                componentName="Mute User"
              >
                <button onClick={onMuteClick}>Mute User</button>
              </OEPAnalytics>
            </div>
          )}
          {attendeeStatus.videoEnabled && (
            <div className={dropdownStyles.row}>
              <OEPAnalytics
                componentType="Button"
                page={getAnalyticsPage(location.pathname)}
                url="Disable User's Video"
                componentName="Disable User's Video"
              >
                <button onClick={onDisableVideoClick}>
                  Disable User's Video
                </button>
              </OEPAnalytics>
            </div>
          )}
          <div className={dropdownStyles.row}>
            <OEPAnalytics
              componentType="Button"
              page={getAnalyticsPage(location.pathname)}
              url="Remove User"
              componentName="Remove User"
            >
              <button onClick={onRemoveUserClick}>Remove User</button>
            </OEPAnalytics>
          </div>
        </Fragment>
      )}
      <hr />
      {[chimeUserTypes.attendee].includes(role) && (
        <div className={dropdownStyles.row}>
          <OEPAnalytics
            componentType="Button"
            page={getAnalyticsPage(location.pathname)}
            url="Promote to Speaker"
            componentName="Promote to Speaker"
          >
            <button onClick={onPromoteToSpeakerClick}>
              Promote to Speaker
            </button>
          </OEPAnalytics>
        </div>
      )}
      {[chimeUserTypes.attendee, chimeUserTypes.speaker].includes(role) && (
        <div className={dropdownStyles.row}>
          <OEPAnalytics
            componentType="Button"
            page={getAnalyticsPage(location.pathname)}
            url="Promote to Moderator"
            componentName="Promote to Moderator"
          >
            <button onClick={onPromoteToModeratorClick}>
              Promote to Moderator
            </button>
          </OEPAnalytics>
        </div>
      )}
      {[
        chimeUserTypes.attendee,
        chimeUserTypes.speaker,
        chimeUserTypes.moderator,
      ].includes(role) && (
        <div className={dropdownStyles.row}>
          <OEPAnalytics
            componentType="Button"
            page={getAnalyticsPage(location.pathname)}
            url="Promote to Host"
            componentName="Promote to Host"
          >
            <button onClick={onPromoteToHostClick}>Promote to Host</button>
          </OEPAnalytics>
        </div>
      )}
      {[chimeUserTypes.moderator].includes(role) && (
        <div className={dropdownStyles.row}>
          <OEPAnalytics
            componentType="Button"
            page={getAnalyticsPage(location.pathname)}
            url="Demote to Speaker"
            componentName="Demote to Speaker"
          >
            <button onClick={onDemoteToSpeakerClick}>Demote to Speaker</button>
          </OEPAnalytics>
        </div>
      )}
      {[chimeUserTypes.moderator, chimeUserTypes.speaker].includes(role) &&
        meeting?.meetingType === MEETING_TYPES.SHOW_CASE && (
          <div className={dropdownStyles.row}>
            <OEPAnalytics
              componentType="Button"
              page={getAnalyticsPage(location.pathname)}
              url="Demote to Attendee"
              componentName="Demote to Attendee"
            >
              <button onClick={onDemoteToAttendeeClick}>
                Demote to Attendee
              </button>
            </OEPAnalytics>
          </div>
        )}
    </Fragment>
  );
};

export default VideoModerationDropdown;
