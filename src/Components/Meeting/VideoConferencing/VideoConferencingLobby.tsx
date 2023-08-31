import { MEETING_TYPES } from "util/meetingTypes";
import { MeetingLogo } from "../MeetingLogo/MeetingLogo";
import { MeetingTimeZone } from "../MeetingTimeZone";
import OEPAnalytics from "Components/OEPAnalytics";
import React from "react";
import ScheduleToCalendar from "Components/Schedule/ScheduleToCalendar";
import getAnalyticsPage from "util/getAnalyticsPage";
import { meetingStates } from "./VideoConferencing";
import renderSpeakerName from "util/renderSpeakerName";
import { useExhibitors } from "hooks/useExhibitors";
import { useLocation } from "react-router-dom";
import webinarStyles from "./scss/video-conferencing.module.scss";

export interface VideoConferencingLobbyProps {
  meeting: any;
  meetingState: any;
  joinMeeting: any;
  hostProfile: any;
  hostHasBegun: any;
  url: any;
}

const VideoConferencingLobby: React.SFC<VideoConferencingLobbyProps> = ({
  meeting,
  meetingState,
  joinMeeting,
  hostProfile,
  hostHasBegun,
  url,
}) => {
  const { exhibitor } = useExhibitors(meeting);
  const location = useLocation();

  const logo = exhibitor?.logo;
  const meetingType =
    meeting.meetingType === MEETING_TYPES.SHOW_CASE
      ? "Live Stream Single"
      : "Video Meeting";

  const getButton = () => {
    switch (meetingState) {
      case meetingStates.PRE:
        return (
          <ScheduleToCalendar
            id={meeting?.sessionId}
            page={getAnalyticsPage(location.pathname)}
            // @ts-ignore
            isWebinar
          />
        );
      case meetingStates.ATTENDEE_JOINABLE:
        return (
          <OEPAnalytics
            componentType="Button"
            page="Live Stream Single"
            url={url}
            componentName="Join meeting"
          >
            {hostHasBegun ? (
              <button
                type="button"
                onClick={joinMeeting}
                className={webinarStyles.primary}
              >
                Join
              </button>
            ) : (
              <p>Please wait for your host to start the meeting.</p>
            )}
          </OEPAnalytics>
        );
      case meetingStates.HOST_JOINABLE:
        return (
          <OEPAnalytics
            componentType="Button"
            page="Live Stream Single"
            url={url}
            componentName="Start meeting"
          >
            <button
              type="button"
              onClick={joinMeeting}
              className={webinarStyles.primary}
            >
              {`Start ${meetingType}`}
            </button>
          </OEPAnalytics>
        );
      case meetingStates.FULL:
      case meetingStates.POST:
      default:
        return null;
    }
  };

  const getPrompt = () => {
    switch (meetingState) {
      case meetingStates.PRE:
        return meeting.sessionName;
      case meetingStates.FULL:
        return "Meeting is full, come back later for the recording";
      case meetingStates.ATTENDEE_JOINABLE:
        return hostHasBegun
          ? `To join the meeting, click "Join" below`
          : `The host has not begun the meeting`;
      case meetingStates.HOST_JOINABLE:
        return `Welcome, ${
          hostProfile.preferredName || hostProfile.firstName
        }! To start the ${meetingType}, click start ${meetingType} below. Warning: Once you start a ${meetingType}, it cannot be restarted again at a later time.`;
      case meetingStates.POST:
        return `The meeting has ended`;
      default:
        return null;
    }
  };

  return (
    <div className={webinarStyles.topSection}>
      <div className={webinarStyles.topSectionContentWrapper}>
        <div className={webinarStyles.topSectionColumn}>
          <div className={webinarStyles.companyImageWrapper}>
            <div className={webinarStyles.companyImageColumn}>
              {logo?.img && (
                <MeetingLogo
                  logo={logo}
                  className={webinarStyles.companyImage}
                />
              )}
              <div className={webinarStyles.topSectionSpeakerName}>
                {meetingState === meetingStates.FULL && (
                  <p className={webinarStyles.isFullCompanyName}>
                    <strong>
                      {renderSpeakerName({ ...hostProfile, suffix: "" })}
                    </strong>{" "}
                    from <strong>{exhibitor.exhibitor_name}</strong>
                  </p>
                )}
                <strong
                  className={`${
                    meetingState === meetingStates.FULL && webinarStyles.isFull
                  }`}
                >
                  {meetingState === meetingStates.FULL
                    ? "Sorry, the meeting is full."
                    : renderSpeakerName({ ...hostProfile, suffix: "" })}
                </strong>{" "}
                {exhibitor && !meetingStates.FULL && (
                  <span>
                    from <strong>{exhibitor.exhibitor_name}</strong>
                  </span>
                )}
              </div>
            </div>
          </div>
          {meetingState !== meetingStates.FULL && (
            <div className={webinarStyles.topSectionWebinarName}>
              <strong>{getPrompt()}</strong>
            </div>
          )}
          {meetingState !== meetingStates.POST && (
            <MeetingTimeZone meeting={meeting} />
          )}
          <div className={webinarStyles.buttonHolder}>{getButton()}</div>
        </div>
      </div>
    </div>
  );
};

export { VideoConferencingLobby };
