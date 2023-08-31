import React, { Fragment, useEffect } from "react";

import OEPAnalytics from "Components/OEPAnalytics";
import ProfileAvatar from "Components/Profile/ProfileAvatar";
import SvgTypes from "Components/SVG/SvgTypes";
import attendeeListStyles from "./scss/attendee-list.module.scss";
import { bpMap } from "util/bpMap";
import generatedName from "util/generatedName";
import renderSpeakerName from "util/renderSpeakerName";
import representativeSetupStyles from "Components/Profile/scss/representative-setup.module.scss";
import { useSelector, useDispatch } from "react-redux";
import useToggleDisplayMQ from "hooks/useToggleDisplayMQ";
import { dataTypes } from "store/utils/dataTypes";
import { getPayload } from "store/actions";

const AttendeeListBody = ({
  data,
  handleChatClick,
  handleClick,
  handleProfileClick,
}) => {
  const dispatch = useDispatch();
  const permissions = useSelector((state) => state.global.permissions);
  /** @type {User} */
  const user = useSelector((state) => state.global.user);
  const blockedByUsers = useSelector((state) => state.profile.blockedByUsers);
  const isMobile = useToggleDisplayMQ(bpMap.laptopWide);
  const networkSettings = useSelector((state) => state.global.networkSettings);
  const exhibitors = useSelector((state) => state.global.exhibitors);

  const isBlockedBy = (fuz_attendee_id) => {
    let blockedBy =
      blockedByUsers !== "" &&
      blockedByUsers?.filter((id) => {
        return id === fuz_attendee_id;
      });
    return blockedBy?.length > 0;
  };

  const getTierLevelAccessForExhibitorRep = (attendeeCompanyId) => {
    const exhibitor =
      exhibitors &&
      exhibitors.find(
        (exhibitor) => exhibitor?.exhibitor_company_id === attendeeCompanyId
      );

    const exhibitorTier = networkSettings.networkingMeetings.tiers.find(
      (tier) => tier.tierName === exhibitor?.membership_level
    );

    return exhibitorTier;
  };

  const checkExhibitorTierChatAccess = (attendeeCompanyId) => {
    if (!attendeeCompanyId) {
      return true;
    }
    const exhibitorTier = getTierLevelAccessForExhibitorRep(attendeeCompanyId);

    return exhibitorTier ? exhibitorTier?.chat : true;
  };

  const checkExhibitorTierVideoAccess = (attendeeCompanyId) => {
    if (!attendeeCompanyId) {
      return true;
    }
    const exhibitorTier = getTierLevelAccessForExhibitorRep(attendeeCompanyId);

    return exhibitorTier
      ? exhibitorTier?.chat || exhibitorTier?.videoChat
      : true;
  };

  useEffect(() => {
    if (!exhibitors) {
      dispatch(getPayload(dataTypes.exhibitors));
    }
  }, [dispatch, exhibitors]);

  return (
    <tbody className={representativeSetupStyles.tableBody}>
      {data.map((attendee) => {
        return (
          <Fragment key={attendee.fuzionAttendeeId}>
            {!isBlockedBy(attendee.fuzionAttendeeId) &&
              attendee.fuzionAttendeeId !== user.fuzion_attendee_id && (
                <tr
                  key={attendee.fuzionAttendeeId}
                  className={`${isMobile && representativeSetupStyles.tr}`}
                >
                  <th scope="row">
                    <div className={attendeeListStyles.avatarContainer}>
                      <div
                        style={{ cursor: "pointer" }}
                        onClick={handleProfileClick.bind(null, attendee)}
                      >
                        <ProfileAvatar
                          firstName={attendee.firstName}
                          preferredName={attendee.preferredName}
                          lastName={attendee.lastName}
                          url={attendee.avatar}
                          size={40}
                          handleProfileClick={handleProfileClick}
                          status={attendee.onlineStatus}
                          listStyle={true}
                        />
                      </div>
                      <div className={attendeeListStyles.flexTDText}>
                        <div
                          id={`networking-attendee-${generatedName(
                            attendee.name
                          )}`}
                          className={attendeeListStyles.attendeeName}
                          onClick={handleProfileClick.bind(null, attendee)}
                        >
                          {renderSpeakerName(attendee)}
                        </div>
                      </div>
                    </div>
                  </th>
                  <td>
                    <div className={attendeeListStyles.flexTDText}>
                      {isMobile && <label>Company Name:</label>}
                      {attendee.company}
                    </div>
                  </td>
                  <td>
                    <div className={attendeeListStyles.flexTDText}>
                      {isMobile && <label>Job Title:</label>}
                      {attendee.title}
                    </div>
                  </td>
                  <td
                    className={
                      isMobile
                        ? representativeSetupStyles.role
                        : attendeeListStyles.role
                    }
                  >
                    {attendee.companyId && attendee.networking.boothStaff.BOOL && (
                      <div
                        className={!isMobile && attendeeListStyles.centerVert}
                      >
                        <div className={attendeeListStyles.flexTDText}>
                          {isMobile && <label>Exhibitor Rep:</label>}
                          <SvgTypes name="check-mark" />
                          <span className="sr-only">Yes</span>
                        </div>
                      </div>
                    )}
                  </td>
                  <td>
                    <div className={attendeeListStyles.flexTDText}>
                      <div className={attendeeListStyles.svgContainer}>
                        {/* Hide button on own user as Getstream does not support self chat */}
                        {permissions.allowDirectChat &&
                          attendee.networking.allowChat.BOOL &&
                          checkExhibitorTierChatAccess(attendee.companyId) && (
                            <OEPAnalytics
                              componentType="Button"
                              page="Attendee List"
                              url="Start chat"
                              componentName="Start chat"
                            >
                              <button
                                type="button"
                                className={`${
                                  attendeeListStyles.attendeeButton
                                } ${
                                  attendee.fuzionAttendeeId ===
                                    user.fuzion_attendee_id &&
                                  attendeeListStyles.hidden
                                }`}
                                onClick={handleChatClick.bind(null, attendee)}
                                aria-describedby={`networking-attendee-${generatedName(
                                  attendee.name
                                )}`}
                                aria-hidden={
                                  attendee.fuzionAttendeeId ===
                                  user.fuzion_attendee_id
                                }
                                tabIndex={
                                  attendee.fuzionAttendeeId ===
                                  user.fuzion_attendee_id
                                    ? -1
                                    : 0
                                }
                              >
                                Start Chat
                              </button>
                            </OEPAnalytics>
                          )}
                        {(permissions.allowScheduleMeetingsAttendeeToAttendee ||
                          permissions.allowScheduleMeetingsExhibitorToAttendee) &&
                          (permissions.allowVideoChatAccess ||
                            permissions.allowNetworkingChatMeetings) &&
                          permissions.allowNetworking &&
                          permissions.allowUserNetworking &&
                          checkExhibitorTierVideoAccess(attendee.companyId) && (
                            <OEPAnalytics
                              page="Attendee List"
                              componentType="button"
                              url="Schedule a meeting"
                              componentName="Schedule a meeting"
                            >
                              <button
                                type="button"
                                className={attendeeListStyles.attendeeButton}
                                onClick={handleClick.bind(null, attendee)}
                                aria-describedby={`networking-attendee-${generatedName(
                                  attendee.name
                                )}`}
                              >
                                Schedule a Meeting
                              </button>
                            </OEPAnalytics>
                          )}
                      </div>
                    </div>
                  </td>
                </tr>
              )}
          </Fragment>
        );
      })}
    </tbody>
  );
};

export default AttendeeListBody;
