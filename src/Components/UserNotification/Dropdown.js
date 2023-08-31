import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import OEPAnalytics from "Components/OEPAnalytics";
import { Popup } from "@progress/kendo-react-popup";
import SaveSuccessModal from "Components/SaveSuccess/SaveSuccessModal";
import SvgTypes from "Components/SVG/SvgTypes";
import { actionTypesNotification } from "./reducer";
import dropdownButtonStyles from "./scss/dropdown-buttons.module.scss";
import { notificationOptions } from "Components/Profile/store/utils/notificationTypes";

const dropdownButtonTypes = {
  markAsRead: "MARK_AS_READ",
  accept: "ACCEPT",
  decline: "DECLINE",
  cancel: "CANCEL",
};

const Dropdown = ({
  notificationState,
  dispatchNotificationState,
  markAsRead,
  markAccepted,
  markDeclined,
  markCancelled,
  notification,
}) => {
  const anchor = useRef(null);
  const markAsReadRef = useRef(null);
  const acceptRef = useRef(null);
  const declineRef = useRef(null);
  const cancelRef = useRef(null);
  const btnContainerRef = useRef(null);
  const [isSuccess, setIsSuccess] = useState(false);
  // we are temporarily removing accept/decline from dropdown menu
  // until we can include attendee status in meeting object
  // right now, attendee needs to look at meeting details to see date/time anyway
  // and they can accept or decline from there -- kp 4/1/21
  const notificationActionOptions = notification.notificationActionOptions
    ? JSON.parse(notification.notificationActionOptions).filter(
        (n) => n !== "ACCEPT" && n !== "DECLINE"
      )
    : ["MARK_AS_READ"];

  const handleClick = () => {
    dispatchNotificationState({
      type: actionTypesNotification.SET_DROPDOWN_OPEN,
      payload: !notificationState.dropdownOpen,
    });
  };

  const closeSuccessModal = () => {
    setIsSuccess(false);
  };

  const handleAccept = () => {
    markAccepted();
    setIsSuccess(true);
  };
  const handleOnMenuBlur = (e) => {
    // don't dismiss on blur due to overflow button click, that will happen in the handleClick method
    if (e.relatedTarget !== anchor.current) {
      dispatchNotificationState({
        type: actionTypesNotification.SET_DROPDOWN_OPEN,
        payload: false,
      });
    }
  };
  const getButtonContent = (buttonType) => {
    switch (buttonType) {
      case dropdownButtonTypes.markAsRead:
        return (
          <OEPAnalytics
            key={buttonType}
            page="My Notifications"
            componentType="Button"
            url="Mark as read"
            componentName={notificationOptions.MARK_AS_READ}
          >
            <button
              className={dropdownButtonStyles.button}
              type="button"
              onClick={markAsRead}
              ref={markAsReadRef}
            >
              {notificationOptions.MARK_AS_READ}
            </button>
          </OEPAnalytics>
        );
      case dropdownButtonTypes.accept:
        return (
          <OEPAnalytics
            key={buttonType}
            page="My Notifications"
            componentType="Button"
            url="Accept meeting"
            componentName={notificationOptions.ACCEPT}
          >
            <button
              className={dropdownButtonStyles.button}
              type="button"
              onClick={handleAccept}
              ref={acceptRef}
            >
              {notificationOptions.ACCEPT}
            </button>
          </OEPAnalytics>
        );
      case dropdownButtonTypes.decline:
        return (
          <OEPAnalytics
            key={buttonType}
            page="My Notifications"
            componentType="Button"
            url="Decline meeting"
            componentName={notificationOptions.DECLINE}
          >
            <button
              className={dropdownButtonStyles.button}
              type="button"
              onClick={markDeclined}
              ref={declineRef}
            >
              {notificationOptions.DECLINE}
            </button>
          </OEPAnalytics>
        );
      case dropdownButtonTypes.cancel:
        return (
          <OEPAnalytics
            key={buttonType}
            page="My Notifications"
            componentType="Button"
            url="Cancel"
            componentName="Cancel"
          >
            <button
              className={dropdownButtonStyles.button}
              type="button"
              onClick={markCancelled}
              ref={cancelRef}
            >
              {notificationOptions.CANCEL}
            </button>
          </OEPAnalytics>
        );
      default:
        return null;
    }
  };
  const getButtonsToShow = useCallback(() => {
    if (
      !notificationState.matchedMeeting &&
      notification.type !== "NewMention" &&
      notification.type !== "NewMentionLiveStream" &&
      notification.type !== "NewChat"
    ) {
      return [];
    }

    let buttons = notificationActionOptions.map((a) => {
      let btn;
      switch (a) {
        case "MARK_AS_READ":
          if (!notificationState.markAsRead && !notification.notificationRead) {
            btn = a;
          }
          break;
        case "CANCEL":
          if (
            notification.type === "MeetingUpdate" &&
            notification.notificationText.includes("declined") &&
            notificationState.matchedMeeting.attendees.length === 2
          ) {
            btn = a;
          }
          break;
        default:
          btn = a;
      }
      return btn;
    });

    const ret = buttons.filter((i) => {
      return i !== undefined;
    });

    return ret;
  }, [
    notificationState.matchedMeeting,
    notificationState.markAsRead,
    notification.notificationRead,
    notificationActionOptions,
    notification.type,
    notification.notificationText,
  ]);
  const buttonsToShow = getButtonsToShow();
  //move focus to overflow buttons when the popup is opened
  useEffect(() => {
    if (notificationState.dropdownOpen && markAsReadRef.current) {
      markAsReadRef.current.focus();
    }
  }, [notificationState.dropdownOpen]);
  //make sure dropdown is closed no matter what when the component unloads
  useEffect(() => {
    return () => {
      if (notificationState.dropdownOpen) {
        dispatchNotificationState({
          type: actionTypesNotification.SET_DROPDOWN_OPEN,
          payload: false,
        });
      }
    };
  }, [dispatchNotificationState, notificationState.dropdownOpen]);
  return (
    <Fragment>
      <div
        className={`
          ${dropdownButtonStyles.btnContainer}
        `}
        ref={btnContainerRef}
      >
        <OEPAnalytics
          page="my notifications"
          componentType="Button"
          componentName="Notification options button"
          url="Toggle notification"
        >
          <button
            className={`
              ${dropdownButtonStyles.overflowButton}
              ${buttonsToShow.length === 0 && dropdownButtonStyles.hide}
            `}
            aria-hidden={buttonsToShow.length === 0}
            tabIndex={buttonsToShow.length === 0 ? -1 : 0}
            type="button"
            aria-label={`Notification options`}
            onClick={handleClick}
            ref={anchor}
          >
            <SvgTypes name="overflow-menu" />
          </button>
        </OEPAnalytics>
      </div>
      <Popup
        anchor={anchor.current}
        anchorAlign={{
          horizontal: "left",
          vertical: "bottom",
        }}
        popupAlign={{
          horizontal: "right",
          vertical: "top",
        }}
        show={notificationState.dropdownOpen}
        popupClass={"popup-content"}
        className={dropdownButtonStyles.popUp}
        animate={false}
        appendTo={btnContainerRef.current}
      >
        <div id="menuPopUp" onBlur={handleOnMenuBlur}>
          {buttonsToShow.map((z) => getButtonContent(z))}
          <br />
        </div>
      </Popup>
      <SaveSuccessModal
        message={"Meeting has been accepted!"}
        show={isSuccess}
        close={closeSuccessModal}
      />
    </Fragment>
  );
};

export default Dropdown;
