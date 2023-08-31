import React, { useEffect, useState } from "react";
import {
  acceptMeeting,
  declineMeeting,
  deleteMeeting,
  getGuestUserProfileByFuzionId,
  setOpenChat,
} from "Components/Profile/store/actions";
import { useDispatch, useSelector } from "react-redux";

import AddToCalendar from "../AddToCalendar";
import AttendeesList from "./AttendeesList";
import { Dialog } from "@progress/kendo-react-dialogs";
import Loader from "Components/Loader";
import { MEETING_TYPES } from "util/meetingTypes";
import OEPAnalytics from "Components/OEPAnalytics";
import SaveSuccessModal from "Components/SaveSuccess/SaveSuccessModal";
import SvgTypes from "Components/SVG/SvgTypes";
import axios from "axios";
import { checkIfMeetingShouldHaveEnded } from "util/checkForWatchNow";
import formatDate from "util/formatDate";
import formatTime from "util/formatTime";
import getAttendeeFullName from "util/getAttendeeFullName";
import getScheduleIcons from "util/getScheduleIcons";
import { hasBasicUserAccess } from "util/gatingHelpers";
import modalStyles from "./scss/meeting-invite-popup.module.scss";

const errorCopy = "Sorry something went wrong please try again!";

const MeetingInvitePopup = ({
  showModal,
  event,
  exhibitorAdminCompanyId,
  showEditModal,
}) => {
  const timezone = useSelector((state) => state.global.timezone);
  /** @type {User} */
  const user = useSelector((state) => state.global.user);
  const guestProfiles = useSelector((state) => state.profile.guestProfiles);
  const accountProfile = useSelector((state) => state.profile.accountProfile);
  const [showDeclineButtons, setShowDeclineButtons] = useState(false);
  const [showConfirmDeleteButton, setShowConfirmDeleteButton] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(false);
  const [attendees, setAttendees] = useState([]);
  const [attendeesLoaded, setAttendeesLoaded] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const permissions = useSelector((state) => state.global.permissions);
  const [isLoading, setIsLoading] = useState(false);
  /** @type {[Profile, Function]} */
  const [host, setHost] = useState({});
  const dispatch = useDispatch();
  const { shouldHaveEnded } = checkIfMeetingShouldHaveEnded(event);

  const closeSuccessModal = () => {
    setIsSuccess(false);
    showModal();
  };

  const showConfirmDelete = () => {
    setShowConfirmDeleteButton(true);
  };

  const submitDeleteMeeting = () => {
    dispatch(
      deleteMeeting(event.sessionId, event.meetingType, user.fuzion_attendee_id)
    );
    /* PJX-561 Fix Delete Meeting Modal: Breaks the page,
    It should close the modal after delete the record instead of edit meeting */
    showModal();
  };

  const toggleShowDeclineButtons = () => {
    setShowDeclineButtons(true);
  };

  const acceptMeetingInvite = () => {
    setIsLoading(true);
    dispatch(acceptMeeting(event, user.fuzion_attendee_id)).then(
      () => {
        setIsLoading(false);
        setSuccessMessage(
          `Meeting Accepted with ${getAttendeeFullName(host)} !`
        );
        setIsSuccess(true);
      },
      () => {
        setIsLoading(false);
        setSuccessMessage(errorCopy);
        setIsSuccess(true);
      }
    );
  };

  const declineMeetingInvite = () => {
    setIsLoading(true);
    dispatch(declineMeeting(event, user.fuzion_attendee_id)).then(
      () => {
        setIsLoading(false);
        setSuccessMessage("Meeting has been declined!");
        setIsSuccess(true);
      },
      () => {
        setIsLoading(false);
        setSuccessMessage(errorCopy);
        setIsSuccess(true);
      }
    );
  };

  const declineAndStartChat = (event) => {
    dispatch(declineMeeting(event, user.fuzion_attendee_id));
    showModal();

    dispatch(
      setOpenChat({
        selectedAttendee: { id: event.createdBy, Profile: host },
        isMinimized: false,
        show: true,
      })
    );
  };

  useEffect(() => {
    // Avoid memory leak issue
    // https://www.debuggr.io/react-update-unmounted-component/
    let mounted = true;
    if (!attendeesLoaded) {
      axios
        .get(
          `${process.env.REACT_APP_API_HOST}/meeting/attendees/${event.sessionId}`
        )
        .then((res) => {
          if (mounted) {
            setAttendees(res.data.data);
            setAttendeesLoaded(true);
          }
        });
    }

    return () => (mounted = false);
  }, [event.sessionId, attendees, event.attendees, attendeesLoaded]);

  // Update current status of meeting acceptance status for current user
  useEffect(() => {
    if (
      user.fuzion_attendee_id !== event.createdBy &&
      !exhibitorAdminCompanyId &&
      attendees &&
      attendees.length
    ) {
      const userCurrentStatus = attendees.find(
        (a) => a?.id === user.fuzion_attendee_id
      );

      if (userCurrentStatus && userCurrentStatus.status !== currentStatus) {
        // Update current status only if it is different to avoid cyclic effect
        setCurrentStatus(userCurrentStatus.status);
      }
    }
  }, [
    attendees,
    event.createdBy,
    exhibitorAdminCompanyId,
    user.fuzion_attendee_id,
    currentStatus,
  ]);

  //Get Host Profile
  useEffect(() => {
    const isCurrentUserAHost = user.fuzion_attendee_id === event.createdBy;
    if (isCurrentUserAHost) {
      setHost(accountProfile);
      return;
    }
    const hostProfile = guestProfiles.find(
      (guestUser) => guestUser.attendeeId === event.createdBy
    );
    if (!hostProfile) {
      dispatch(getGuestUserProfileByFuzionId(event.createdBy));
    }

    setHost(hostProfile);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={modalStyles.main}>
      <Dialog
        title={
          <span id="modal_title" tabIndex="0">
            Meeting Info
          </span>
        }
        onClose={showModal}
        width={700}
        autoFocus={true}
        aria-modal={true}
        aria-labelledby="modal_title"
        aria-describedby="modal_desc"
      >
        {!attendeesLoaded || isLoading ? (
          //  Show loader while attendee are getting loaded
          <Loader />
        ) : (
          <div id="modal_desc" className={modalStyles.mainWrapper}>
            <div className={modalStyles.fieldWrapper}>
              <span className={modalStyles.fieldTitle}>Type</span>
              <div className={modalStyles.buttonWrapper}>
                <div className={modalStyles.typeLabel}>
                  <SvgTypes name={getScheduleIcons(event)} />
                  <span className={modalStyles.type}>{event.meetingType}</span>
                </div>
                {!shouldHaveEnded &&
                  user.fuzion_attendee_id !== event.createdBy &&
                  !exhibitorAdminCompanyId && (
                    /* PJX-562 Organizer should not see Accept and Decline
                  Condition updated: user should not be host and exhibitor admin to handled both Meeting and Product Showcase
                  */
                    <div>
                      <OEPAnalytics
                        page="My Schedule"
                        componentType="Button"
                        url="Accept meeting"
                        componentName="Accept meeting"
                      >
                        <button
                          type="button"
                          className={modalStyles.meetingStatusBtn}
                          disabled={currentStatus === "accepted"}
                          onClick={acceptMeetingInvite}
                        >
                          Accept
                        </button>
                      </OEPAnalytics>
                      <OEPAnalytics
                        page="My Schedule"
                        componentType="Button"
                        url="Decline meeting"
                        componentName="Decline meeting"
                      >
                        <button
                          type="button"
                          className={`${modalStyles.meetingStatusBtn} ${modalStyles.declineBtn}`}
                          disabled={currentStatus === "declined"}
                          onClick={toggleShowDeclineButtons}
                        >
                          Decline
                        </button>
                      </OEPAnalytics>
                    </div>
                  )}
              </div>
            </div>

            <div className={modalStyles.fieldWrapper}>
              <span className={modalStyles.fieldTitle}>Title</span>
              <div className={modalStyles.rightSide}>{event.sessionName}</div>
            </div>
            <div className={modalStyles.fieldWrapper}>
              <span className={modalStyles.fieldTitle}>Organizer</span>
              {host && (
                <div className={modalStyles.rightSide}>{`${
                  host?.preferredName || `${host?.firstName} ${host?.lastName}`
                }`}</div>
              )}
            </div>
            <div className={modalStyles.fieldWrapper}>
              <span className={modalStyles.fieldTitle}>Date</span>
              <div className={modalStyles.rightSide}>
                {formatDate(
                  { date: event.sessionStart, format: "MM/DD/YYYY" },
                  timezone
                )}
              </div>
            </div>
            <div className={modalStyles.fieldWrapper}>
              <span className={modalStyles.fieldTitle}>Times</span>
              <div className={modalStyles.rightSide}>
                {formatTime(event, timezone)}
              </div>
            </div>
            <div className={modalStyles.fieldWrapper}>
              <span className={modalStyles.fieldTitle}>Description</span>
              <div className={modalStyles.rightSide}>{event.description}</div>
            </div>
            <div className={modalStyles.fieldWrapper}>
              <span
                className={`${modalStyles.fieldTitle} ${modalStyles.grayedOut}`}
              >
                {event.meetingType.toLowerCase() === MEETING_TYPES.SHOW_CASE
                  ? "Moderators"
                  : "Invitees"}
              </span>

              {attendees && (
                <AttendeesList
                  list={attendees.filter((a) => a.id !== event.createdBy)}
                />
              )}
            </div>
            {permissions.allowNetworking && permissions.allowUserNetworking && (
              <div>
                {user.fuzion_attendee_id === event.createdBy ||
                exhibitorAdminCompanyId ? (
                  <div className={modalStyles.confirmationBtns}>
                    {showConfirmDeleteButton ? (
                      <OEPAnalytics
                        componentType="Button"
                        page="My Schedule"
                        url="Confirm Delete Meeting"
                        componentName="Confirm Delete Meeting"
                      >
                        <button
                          type="button"
                          className={modalStyles.confirmDeclineBtn}
                          onClick={submitDeleteMeeting}
                        >
                          Confirm Delete Meeting
                        </button>
                      </OEPAnalytics>
                    ) : (
                      <OEPAnalytics
                        componentType="Button"
                        page="My Schedule"
                        url="Delete Meeting"
                        componentName="Delete Meeting"
                      >
                        <button
                          type="button"
                          className={modalStyles.confirmDeclineBtn}
                          onClick={showConfirmDelete}
                        >
                          Delete Meeting
                        </button>
                      </OEPAnalytics>
                    )}

                    {!shouldHaveEnded && (
                      <OEPAnalytics
                        componentType="Button"
                        page="My Schedule"
                        url="Edit Meeting"
                        componentName="Edit Meeting"
                      >
                        <button
                          type="button"
                          className={modalStyles.startChatBtn}
                          onClick={showEditModal}
                        >
                          Edit Meeting
                        </button>
                      </OEPAnalytics>
                    )}
                  </div>
                ) : (
                  <div className={modalStyles.buttonsWrapper}>
                    {!shouldHaveEnded && showDeclineButtons ? (
                      <React.Fragment>
                        <OEPAnalytics
                          page="My Schedule"
                          componentType="Button"
                          url="Confirm Decline"
                          componentName="Confirm Decline"
                        >
                          <button
                            type="button"
                            className={modalStyles.confirmDeclineBtn}
                            onClick={declineMeetingInvite}
                          >
                            Confirm Decline
                          </button>
                        </OEPAnalytics>
                        <OEPAnalytics
                          page="My Schedule"
                          componentType="Button"
                          url="Decline and Start Chat"
                          componentName="Decline and Start Chat"
                        >
                          <button
                            type="button"
                            className={modalStyles.startChatBtn}
                            onClick={declineAndStartChat.bind(null, event)}
                          >
                            Decline and Start Chat
                          </button>
                        </OEPAnalytics>
                      </React.Fragment>
                    ) : (
                      <div>
                        {!shouldHaveEnded && hasBasicUserAccess(user) && (
                          <AddToCalendar
                            session={event}
                            userTz={timezone}
                            sessionLabel="Meeting Modal"
                            customClassName={modalStyles.meetingInviteAtc}
                          />
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </Dialog>
      {(attendeesLoaded || !isLoading) && (
        <SaveSuccessModal
          show={isSuccess}
          close={closeSuccessModal}
          message={successMessage}
        />
      )}
    </div>
  );
};

export default MeetingInvitePopup;
