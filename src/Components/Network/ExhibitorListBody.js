import LinkWrapper from "Components/LinkWrapper/LinkWrapper";
import OEPAnalytics from "Components/OEPAnalytics";
import React from "react";
import { bpMap } from "util/bpMap";
import exhibitorListStyles from "./scss/exhibitor-list.module.scss";
import generatedName from "util/generatedName";
import representativeSetupStyles from "../Profile/scss/representative-setup.module.scss";
import { useSelector } from "react-redux";
import useToggleDisplayMQ from "hooks/useToggleDisplayMQ";

const ExhibitorListBody = ({
  exhibitors,
  paginationState,
  toggleMeetingScheduler,
}) => {
  const permissions = useSelector((state) => state.global.permissions);
  const isMobile = useToggleDisplayMQ(bpMap.tabletSmall);
  const networkSettings = useSelector((state) => state.global.networkSettings);

  const getExhibitorUrl = (exData) => {
    return `/${process.env.REACT_APP_EXHIBITORS_SPONSORS_TITLE}/${
      exData.fuzion_exhibitor_id
    }/${generatedName(exData.exhibitor_name)}`;
  };

  const checkTierLevelAccessForExhibitor = (exhibitor) => {
    const exhibitorTier = networkSettings.networkingMeetings.tiers.find(
      (tier) => tier.tierName === exhibitor.membership_level
    );

    const isAllowedChatOrVideo = exhibitorTier
      ? exhibitorTier?.chat || exhibitorTier?.videoChat
      : true;

    return isAllowedChatOrVideo;
  };

  return (
    <tbody>
      {exhibitors
        .slice(paginationState.startIndex, paginationState.endIndex)
        .map((exhibitor) => {
          return (
            <tr
              className={isMobile ? representativeSetupStyles.tr : {}}
              key={exhibitor.exhibitor_name}
            >
              <td>
                <div>
                  {exhibitor.logo_image_path && (
                    <LinkWrapper
                      to={getExhibitorUrl(exhibitor)}
                      external={false}
                      className={exhibitorListStyles.avatarContainer}
                      page="networking exhibitor list"
                      componentType="Logo"
                      trackingUrl={getExhibitorUrl(exhibitor)}
                      componentName="Single Exhibitor Logo"
                      exhibitorId={exhibitor.fuzion_exhibitor_id}
                    >
                      <img
                        className={exhibitorListStyles.logo}
                        src={exhibitor.logo_image_path}
                        alt={`${exhibitor.exhibitor_name} logo`}
                      />
                    </LinkWrapper>
                  )}
                </div>
              </td>
              <td>
                <div className={exhibitorListStyles.flexTDText}>
                  <div
                    id={`networking-exhibitor-${generatedName(
                      exhibitor.exhibitor_name
                    )}`}
                    className={exhibitorListStyles.exhibitorName}
                  >
                    {exhibitor.exhibitor_name}
                  </div>
                </div>
              </td>
              <td>
                <div className={exhibitorListStyles.svgContainer}>
                  {(permissions.allowScheduleMeetingsAttendeeToAttendee ||
                    permissions.allowScheduleMeetingsExhibitorToAttendee) &&
                    (permissions.allowVideoChatAccess ||
                      permissions.allowNetworkingChatMeetings) &&
                    permissions.allowNetworking &&
                    permissions.allowUserNetworking &&
                    checkTierLevelAccessForExhibitor(exhibitor) && (
                      <OEPAnalytics
                        page="networking exhibitor list"
                        url={`Schedule a meeting with ${exhibitor.exhibitor_name} modal open`}
                        componentType="Button"
                        componentName="Schedule a meeting"
                        exhibitorId={exhibitor.fuzion_exhibitor_id}
                      >
                        <button
                          type="button"
                          className={exhibitorListStyles.exhibitorButton}
                          onClick={toggleMeetingScheduler.bind(null, exhibitor)}
                          aria-describedby={`networking-exhibitor-${generatedName(
                            exhibitor.exhibitor_name
                          )}`}
                        >
                          Schedule a Meeting
                        </button>
                      </OEPAnalytics>
                    )}
                </div>
              </td>
            </tr>
          );
        })}
    </tbody>
  );
};

export default ExhibitorListBody;
