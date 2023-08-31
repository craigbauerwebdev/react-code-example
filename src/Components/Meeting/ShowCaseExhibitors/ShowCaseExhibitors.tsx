import CreateMeetingModal from "Components/Profile/CreateMeetingModal";
import OEPAnalytics from "Components/OEPAnalytics";
import ProfileAvatar from "Components/Profile/ProfileAvatar";
import React from "react";
import SideBar from "Components/Sidebar/SingleSideBar";
import SideBarCategories from "Components/Sidebar/SideBarCategories";
import SideBarItem from "Components/Sidebar/SideBarItem";
import SideBarLogo from "Components/Sidebar/SideBarLogo";
import VimeoWrapper from "Components/VimeoPlayer/VimeoWrapper";
import formatDate from "util/formatDate";
import formatTime from "util/formatTime";
import getAnalyticsPage from "util/getAnalyticsPage";
import { getExhibitorsCategories } from "Components/Exhibitor/utils/getSideBar";
import renderSpeakerName from "util/renderSpeakerName";
import { useExhibitors } from "hooks/useExhibitors";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useToggle } from "hooks/useToggle";
import webinarStyles from "../VideoConferencing/scss/video-conferencing.module.scss";
export interface ShowCaseExhibitorsProps {
  showcase: any;
  hostProfile: any;
}

const ShowCaseExhibitors: React.FC<ShowCaseExhibitorsProps> = ({
  showcase,
  hostProfile,
}) => {
  const timezone = useSelector((state: any) => state.global.timezone);
  const [open, toggle]: any = useToggle();
  const shouldHaveEnded = showcase?.meetingStatus === "ended";
  const { exhibitor } = useExhibitors(showcase);
  const permissions = useSelector((state: any) => state.global.permissions);
  const location = useLocation();
  if (exhibitor) {
    const { logo, exhibitorLocation, exhibitorUrl } = exhibitor;
    const categories = getExhibitorsCategories(exhibitor);

    return (
      <>
        <div className={webinarStyles.bottomContent}>
          <div className={webinarStyles.sideBarWrapper}>
            <SideBar>
              {exhibitor && <SideBarLogo data={logo} boothUrl={exhibitorUrl} />}
              {exhibitorLocation && <SideBarItem data={exhibitorLocation} />}
              {categories?.data && <SideBarCategories data={categories} />}
            </SideBar>
          </div>
          <div className={webinarStyles.detailsSection}>
            {shouldHaveEnded && showcase.vimeoStreamId && (
              <div className={webinarStyles.vimeoWrapper}>
                <VimeoWrapper
                  id={showcase.vimeoStreamId}
                  page={"Webinar Post Recording"}
                  componentType="On-Demand"
                />
              </div>
            )}
            <h1>{showcase.sessionName}</h1>
            <p>
              <strong>
                {/* @ts-ignore */}
                {formatDate({ date: showcase.sessionStart }, timezone)}
                &nbsp;&nbsp;&nbsp;
                {formatTime(showcase, timezone)}
                <br />
                Hosted By: {renderSpeakerName({ ...hostProfile, suffix: "" })}
              </strong>
            </p>
            <p className={webinarStyles.description}>{showcase.description}</p>
            <div className={webinarStyles.speakerSection}>
              <div className={webinarStyles.avatarWrapper}>
                <ProfileAvatar
                  url={hostProfile.avatar}
                  firstName={hostProfile.firstName}
                  preferredName={hostProfile.preferredName}
                  lastName={hostProfile.lastName}
                  size={118}
                />
              </div>
              <div className={webinarStyles.speakerDetails}>
                <div>
                  <strong>
                    {renderSpeakerName({ ...hostProfile, suffix: "" })}
                  </strong>
                </div>
                {permissions.allowNetworking &&
                  permissions.allowUserNetworking && (
                    <div>
                      <OEPAnalytics
                        componentType="Button"
                        page={getAnalyticsPage(location.pathname)}
                        url="Schedule a meeting modal open"
                        componentName="Schedule a meeting"
                      >
                        <button
                          type="button"
                          className={webinarStyles.scheduleMeeting}
                          onClick={toggle}
                        >
                          Schedule a Meeting
                        </button>
                      </OEPAnalytics>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
        {open && (
          // @ts-ignore
          <CreateMeetingModal
            toggleDialog={toggle}
            preLoadedAttendeeProp={hostProfile}
          />
        )}
      </>
    );
  }
  return null;
};

export default ShowCaseExhibitors;
