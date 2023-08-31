import LinkWrapper from "../LinkWrapper/LinkWrapper";
import OEPAnalytics from "Components/OEPAnalytics";
import React from "react";
import accountProfileStyles from "./scss/account-profile.module.scss";
import profilePageStyles from "./scss/profile-page.module.scss";

const AttendeeProfileButtons = ({
  attendeeProfile,
  handleChatClick,
  handleScheduleClick,
  toggleMeetingScheduler,
  permissions,
  exhibitor,
  user,
  exhibitorTierChatAccess,
  exhibitorTierVideoAccess,
}) => {
  const isLoggedInUserProfile = () => {
    return user.fuzion_attendee_id === attendeeProfile.attendeeId;
  };
  if (attendeeProfile) {
    return (
      <>
        <div className={profilePageStyles.formButtons}>
          <div className="k-form-buttons">
            {!isLoggedInUserProfile() &&
              attendeeProfile.networking.allowChat &&
              attendeeProfile.networking.allowUserNetworking &&
              attendeeProfile.networking.allowNetworking &&
              permissions.allowDirectChat &&
              permissions.allowNetworking &&
              permissions.allowUserNetworking &&
              exhibitorTierChatAccess && (
                <OEPAnalytics
                  componentType="Button"
                  page="Attendee Info"
                  url="Create chat"
                  componentName="Create chat"
                >
                  <button
                    type="button"
                    className={accountProfileStyles.chatButton}
                    onClick={handleChatClick}
                    aria-label={"Chat"}
                  >
                    Chat
                  </button>
                </OEPAnalytics>
              )}
            {(!isLoggedInUserProfile() &&
              attendeeProfile.networking.allowUserNetworking &&
              attendeeProfile.networking.allowNetworking &&
              permissions.allowNetworking &&
              permissions.allowUserNetworking &&
              (permissions.allowNetworkingChatMeetings ||
                permissions.allowVideoChatAccess) &&
              !attendeeProfile.networking.boothStaff) ||
            (attendeeProfile.networking.boothStaff && !exhibitor) ? (
              <OEPAnalytics
                componentType="Button"
                page="Attendee Info"
                url="schedule a meeting modal open"
                componentName="Schedule a meeting"
              >
                <button
                  onClick={handleScheduleClick}
                  className={accountProfileStyles.scheduleButton}
                  aria-label={"Schedule a Meeting"}
                >
                  Schedule a Meeting
                </button>
              </OEPAnalytics>
            ) : (
              !isLoggedInUserProfile() &&
              attendeeProfile.networking.allowUserNetworking &&
              attendeeProfile.networking.allowNetworking &&
              permissions.allowNetworking &&
              permissions.allowUserNetworking &&
              attendeeProfile.networking.boothStaff &&
              exhibitor &&
              (permissions.allowNetworkingChatMeetings ||
                permissions.allowVideoChatAccess) &&
              exhibitorTierVideoAccess && (
                <OEPAnalytics
                  componentType="Button"
                  page="Attendee Info"
                  url="Schedule a meeting modal open"
                  componentName="Schedule a meeting"
                >
                  <button
                    onClick={toggleMeetingScheduler.bind(null, exhibitor)}
                    className={accountProfileStyles.scheduleButton}
                    aria-label={"Schedule a Meeting"}
                  >
                    Schedule a Meeting
                  </button>
                </OEPAnalytics>
              )
            )}
          </div>
        </div>
        {exhibitor && (
          <div
            style={{
              padding: "0px 0px 20px",
              display: "flex",
            }}
          >
            <OEPAnalytics
              componentType="Logo"
              page="Attendee Info"
              url={`/${process.env.REACT_APP_EXHIBITORS_SPONSORS_TITLE}/${exhibitor.fuzion_exhibitor_id}/${exhibitor.exhibitor_name}`}
              componentName="Exhibitor Page Link"
            >
              <LinkWrapper
                to={`/${process.env.REACT_APP_EXHIBITORS_SPONSORS_TITLE}/${exhibitor.fuzion_exhibitor_id}/${exhibitor.exhibitor_name}`}
              >
                <img
                  style={{ height: "50px" }}
                  src={exhibitor.logo_image_path}
                  alt={`${exhibitor.exhibitor_name}`}
                  aria-label={`${exhibitor.exhibitor_name}`}
                />
              </LinkWrapper>
            </OEPAnalytics>
            <OEPAnalytics
              componentType="Link"
              page="Attendee Info"
              url={`/${process.env.REACT_APP_EXHIBITORS_SPONSORS_TITLE}/${exhibitor.fuzion_exhibitor_id}/${exhibitor.exhibitor_name}`}
              componentName="Exhibitor Page Link"
            >
              <div style={{ padding: "14px" }} aria-label={"Visit Exhibitor"}>
                <LinkWrapper
                  to={`/${process.env.REACT_APP_EXHIBITORS_SPONSORS_TITLE}/${exhibitor.fuzion_exhibitor_id}/${exhibitor.exhibitor_name}`}
                >
                  Visit Exhibitor Page
                </LinkWrapper>
              </div>
            </OEPAnalytics>
          </div>
        )}
      </>
    );
  } else {
    return null;
  }
};
export default AttendeeProfileButtons;
