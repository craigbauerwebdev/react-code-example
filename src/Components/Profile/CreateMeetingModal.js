import "../../css/kendo/subset.scss";

import { DatePicker, TimePicker } from "@progress/kendo-react-dateinputs";
import { DropDownList, MultiSelect } from "@progress/kendo-react-dropdowns";
import React, {
  Fragment,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import {
  actionTypesCreateMeeting,
  createMeetingInitState,
  createMeetingReducer,
} from "Components/Exhibitor/reducer/exhibitorCreateMeetingReducer";
import {
  createMeeting,
  deleteMeeting,
  updateEditing,
  updateMeeting,
} from "Components/Profile/store/actions";
import { useDispatch, useSelector } from "react-redux";

import ConfigService from "services/ConfigService";
import CustomTag from "./CustomTag";
import { Dialog } from "@progress/kendo-react-dialogs";
import LinkWrapper from "Components/LinkWrapper/LinkWrapper";
import Loader from "Components/Loader";
import { MEETING_TYPES } from "util/meetingTypes";
import MeetingModalButtons from "./MeetingModalButtons";
import MultiSelectItem from "./MultiSelectItem";
import OEPAnalytics from "Components/OEPAnalytics";
import { Popup } from "@progress/kendo-react-popup";
import SaveSuccessModal from "Components/SaveSuccess/SaveSuccessModal";
import SvgTypes from "Components/SVG/SvgTypes";
import axios from "axios";
import buttonList from "util/staticData/Components/Profile/ButtonList";
import { checkIfMeetingShouldHaveEnded } from "util/checkForWatchNow";
import { dataTypes } from "store/utils/dataTypes";
import dateToTime from "util/dateToTime";
import { enableParentPageScroll } from "Components/Modal/utils/toggleParentPageScrolling";
import formatDate from "util/formatDate";
import getAnalyticsPage from "util/getAnalyticsPage";
import getMeetingAttendees from "util/getMeetingAttendees";
import { getPayload } from "store/actions";
import isValidUrl from "Components/Exhibitor/utils/isValidURL";
import modalStyles from "./scss/meeting-modals.module.scss";
import moment from "moment-timezone";
import newDate from "util/newDate";
import { searchActionTypes } from "Components/AttendeeSearch/AttendeeSearchReducer";
import toDate from "util/toDate";
import useAlgoliaSetting from "hooks/useAlgoliaSetting";
import useGuestProfiles from "hooks/useGuestProfiles";
import { useLocation } from "react-router-dom";
import useSearch from "hooks/useSearch";
import useWindowDimensions from "hooks/useWindowDimensions";
import { zoneName } from "util/getZoneName";

export const MODAL_TYPES = {
  meeting: "MEETING",
  webinar: "WEBINAR",
};

const TOTAL_ALLOWED_GUESTS = {
  video: 50,
  chat: 1,
};

const meetingActionStatusMap = (meetingActionType, meetingType) => {
  // Accepted: (name) => `Meeting Accepted with ${name}.`,
  // Scheduled: `Your meeting has been requested.`,

  switch (meetingActionType) {
    case "Created":
      return `Your ${
        meetingType === MEETING_TYPES.SHOW_CASE ? "Live Showcase" : "meeting"
      } has been successfully created.`;
    case "Edited":
      return `Your ${
        meetingType === MEETING_TYPES.SHOW_CASE ? "Live Showcase" : "meeting"
      } has been successfully changed.`;
    case "Deleted":
      return `Your ${
        meetingType === MEETING_TYPES.SHOW_CASE ? "Live Showcase" : "meeting"
      } has been successfully deleted.`;
    default:
      return null;
  }
};

const defaultMeetingTypes = ["Chat", "Video"];
const modalSettings = {
  [MODAL_TYPES.meeting]: {
    cancelButtonText: "Cancel Meeting",
    saveButtonText: "Send Invitations",
  },
  [MODAL_TYPES.webinar]: {
    cancelButtonText: "Cancel",
    saveButtonText: "Submit",
  },
};
const MAX_WIDTH = 700;
const MAX_HEIGHT = 700;
const PADDING = 40;

// allows time picker popup to be aligned to top so buttons are always visible
export class CustomPopup extends React.Component {
  render() {
    return (
      <Popup
        {...this.props}
        collision={{
          horizontal: "fit",
          vertical: "fit",
        }}
        popupClass={modalStyles.timePickerPopup}
      />
    );
  }
}

/**
 *
 * @param {object} props
 * @param {Function} props.toggleDialog
 * @param {Meeting} props.editEvent
 * @param {AttendeeSearchState} props.preLoadedAttendeeProp
 * @param {AttendeeSearchState} props.exhibitor
 *
 * @returns {JSX.Element}
 */
const CreateMeetingModal = ({
  toggleDialog,
  modalType = MODAL_TYPES.meeting,
  meetingTypes = defaultMeetingTypes,
  editEvent,
  preLoadedAttendeeProp,
  exhibitor,
  attendee,
}) => {
  const tierLevelInfoRef = useRef();
  const location = useLocation();
  const dispatch = useDispatch();
  const permissions = useSelector((state) => state.global.permissions);
  const timezone = useSelector((state) => state.global.timezone);
  /** @type {User} */
  const user = useSelector((state) => state.global.user);
  const exhibitors = useSelector((state) => state.global.exhibitors);
  const networkSettings = useSelector((state) => state.global.networkSettings);
  const accountProfile = useSelector((state) => state.profile.accountProfile);
  const blockedByUsers = useSelector((state) => state.profile.blockedByUsers);
  const guestProfiles = useSelector((state) => state.profile.guestProfiles);
  const [disableEdit, setDisableEdit] = useState(null);
  const [meetingActionType, setMeetingActionType] = useState(
    editEvent ? "Edited" : "Created"
  );
  const attendeeIndex = useSelector(
    (state) => state.profile.algoliaSearchIndex.attendeeData
  );
  const [createMeetingState, dispatchCreateMeeting] = useReducer(
    createMeetingReducer,
    createMeetingInitState
  );
  const {
    searchState: searchInviteeState,
    dispatchSearchState: dispatchSearchInviteeState,
  } = useSearch(attendeeIndex);
  const {
    searchState: searchHostState,
    dispatchSearchState: dispatchSearchHostState,
  } = useSearch(attendeeIndex);
  const { width, height } = useWindowDimensions();
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [inviteeError, setInviteeError] = useState(false);
  const [inviteeErrorMsg, setInviteeErrorMsg] = useState("");
  const [limitErrorMessage, setLimitErrorMessage] = useState(false);
  const [
    editMeetingOriginalAttendees,
    setEditMeetingOriginalAttendees,
  ] = useState([]);
  const [deletedAttendees, setDeletedAttendees] = useState([]);
  const [hostHasChanged, setHostHasChanged] = useState(false);
  const [tierLevelData, setTierLevelData] = useState(null);

  useEffect(() => {
    if (!tierLevelData) {
      computeTierLevelInfo();
    }
    const buttons = filteredMeetingTypeBasedOnPermission();
    if (
      buttons.length === 1 &&
      createMeetingState?.meetingType !== buttons[0]?.value &&
      tierLevelData
    ) {
      handleMeetingTypeChange(buttons[0]?.value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createMeetingState, tierLevelData]);

  const preloadedAttendee = useCallback((propAttendee) => {
    if (propAttendee) {
      return {
        ...propAttendee,
        fuzionAttendeeId:
          propAttendee.fuzionAttendeeId || propAttendee.attendeeId,
        name: `${propAttendee.firstName} ${propAttendee.lastName}`,
      };
    }

    return null;
  }, []);

  const { loadProfiles } = useGuestProfiles();
  const closeSuccessModal = () => {
    /**
     * This will let the Schedule page know that the modal is closed
     * and we can update the schedule list with the updated data.
     */
    dispatch(updateEditing(false));
    setIsSuccess(false);
    toggleDialog();
    enableParentPageScroll();
  };

  const submitCreateMeeting = (e) => {
    e.preventDefault();
    if (isValidUrl(createMeetingState.description)) {
      setError(true);
    } else {
      setError(false);
    }
    if (error || titleError || inviteeError) return;
    setIsLoading(true);

    if (editEvent) {
      dispatch(
        updateMeeting(
          createMeetingState,
          editEvent.sessionId,
          deletedAttendees,
          editMeetingOriginalAttendees.map((z) => z.id),
          true, // This flag will hold up the data reflow in the Schedule page.
          hostHasChanged
        )
      ).then(
        (data) => {
          if (data) {
            setIsLoading(false);
            setIsSuccess(true);
          }
        },
        () => {
          const messageType = error.message.split(" ");
          /**
           * This is because the actual error from serverless does not fail as expected
           * the message defined in lambda.ts should be the message that flows all the
           * way through and hits the front end. the error handling is really strange.
           * This will help us know when serverless crash vs just reaching our limits
           */
          if (messageType.includes("403")) {
            // 403 should be use for max limit.
            setLimitErrorMessage(true);
          }
          setIsLoading(false);
          setErrorModal(true);
        }
      );
    } else {
      dispatch(
        createMeeting({
          ...createMeetingState,
          createdBy: user.fuzion_attendee_id,
        })
      ).then(
        (data) => {
          if (data) {
            setIsLoading(false);
            setIsSuccess(true);
          }
        },
        (error) => {
          const messageType = error.message.split(" ");
          /**
           * This is because the actual error from serverless does not fail as expected
           * the message defined in lambda.ts should be the message that flows all the
           * way through and hits the front end. the error handling is really strange.
           * This will help us know when serverless crash vs just reaching our limits
           */
          if (messageType.includes("403")) {
            // 403 should be use for max limit.
            setLimitErrorMessage(true);
          }

          setIsLoading(false);
          setErrorModal(true);
        }
      );
    }
  };

  const handleDeletedInvitee = (invitees) => {
    const deletedArr = [];

    for (let i = 0; i < editMeetingOriginalAttendees.length; i++) {
      if (
        !invitees.includes(
          invitees.find((el) => el.id === editMeetingOriginalAttendees[i].id)
        )
      ) {
        deletedArr.push(editMeetingOriginalAttendees[i].id);
      }
    }
    setDeletedAttendees(deletedArr);
  };

  const handleInviteFilterChange = (event) => {
    dispatchSearchInviteeState({
      type: searchActionTypes.SET_SEARCH_QUERY,
      payload: event.filter.value,
    });
  };

  const handleModeratorsChange = (event) => {
    // Save updated moderators to a moderator key.
    dispatchCreateMeeting({
      type: actionTypesCreateMeeting.SET_MODERATORS,
      payload: event.target.value,
    });
  };

  const handleHostFilterChange = (event) => {
    dispatchSearchHostState({
      type: searchActionTypes.SET_SEARCH_QUERY,
      payload: event.filter.value,
    });
  };

  const handleHostChange = (event) => {
    const newHost = event.target.value[0] || null;

    if (newHost && editEvent && editEvent?.host !== newHost.fuzionAttendeeId) {
      handleDeletedInvitee([newHost]);
      setHostHasChanged(true);
    }
    dispatchCreateMeeting({
      type: actionTypesCreateMeeting.SET_HOST,
      payload: newHost
        ? {
            fuzionAttendeeId: newHost.fuzionAttendeeId,
            name: `${`${newHost.preferredName || newHost.firstName} ${
              newHost.lastName
            }`}`,
            company: newHost?.company,
          }
        : null,
    });
  };

  const handleInviteChange = (event) => {
    if (editEvent) {
      handleDeletedInvitee(event.target.value);
    }

    dispatchCreateMeeting({
      type: actionTypesCreateMeeting.SET_INVITED,
      payload: event.target.value,
    });
  };

  const handleTitleChange = (event) => {
    if (event.target.value?.includes("/")) {
      setTitleError(true);
    } else {
      setTitleError(false);
    }
    dispatchCreateMeeting({
      type: actionTypesCreateMeeting.SET_TITLE,
      payload: event.target.value,
    });
  };

  const handleDescriptionChange = (event) => {
    dispatchCreateMeeting({
      type: actionTypesCreateMeeting.SET_DESCRIPTION,
      payload: event.target.value,
    });
  };

  const handleMeetingTypeChange = (meetingType) => {
    setInviteeError(false);
    setInviteeErrorMsg("");
    const preloadedOriginalAttendees = editEvent
      ? editMeetingOriginalAttendees
      : createMeetingState.attendees;
    if (meetingType === "video") {
      const videoOffAttendees = preloadedOriginalAttendees.filter(
        (origAttendee) =>
          tierLevelData.videoOffAttendees.find(
            (attendee) => origAttendee.id === attendee.fuzionAttendeeId
          )
      );
      if (videoOffAttendees?.length > 0) {
        setInviteeError(true);
        const videoOffAttendeesNames = videoOffAttendees.map(
          (attendee) => attendee.name
        );
        setInviteeErrorMsg(
          videoOffAttendeesNames + " is unable to access video"
        );
      }
    }
    if (meetingType === "chat") {
      const chatOffAttendees = preloadedOriginalAttendees.filter(
        (origAttendee) =>
          tierLevelData.chatOffAttendees.find(
            (attendee) => origAttendee.id === attendee.fuzionAttendeeId
          )
      );
      if (chatOffAttendees?.length > 0) {
        setInviteeError(true);
        const chatOffAttendeesNames = chatOffAttendees.map(
          (attendee) => attendee.name
        );
        setInviteeErrorMsg(chatOffAttendeesNames + " is unable to access chat");
      }
    }
    dispatchCreateMeeting({
      type: actionTypesCreateMeeting.SET_TYPE_OF_MEETING,
      payload: meetingType,
    });
  };

  const handleDayChange = (e) => {
    //takes start time that was previously selected
    const time = moment
      .tz(createMeetingState.startTime, timezone)
      .format("HH:mm");

    //splits time to be able to add it to date later
    const splitTime = time.split(":");
    //Get selected date
    const getDateVal = moment(e.target.value).format("YYYY-MM-DD");
    //creates a date time string and sets the time to the selected timezone for conversion to be correct
    let startTime = moment.tz(`${getDateVal} ${time}`, timezone);
    startTime.toDate().setHours(splitTime[0]);
    startTime.toDate().setMinutes(splitTime[1]);
    //Converts to event timezone for saving
    startTime = moment.tz(
      `${getDateVal} ${time}`,
      ConfigService.runValues.momentTimezone
    );

    const isAfter = moment(startTime.toDate()).isAfter(
      toDate(networkSettings.networkingDates.to)
    );

    // dont allow form submission if date is after max date
    // set error to true prevents submitCreateMeeting for executing
    if (isAfter) {
      setError(true);
      return;
    }

    if (!editEvent) {
      dispatchCreateMeeting({
        type: actionTypesCreateMeeting.SET_START_DATE,
        payload: { date: getDateVal, start: startTime.toDate() },
      });
    } else {
      //If it is an edit meeting this updates the duration
      const endTime = moment(startTime)
        .add(createMeetingState.duration, "m")
        .tz(timezone);

      dispatchCreateMeeting({
        type: actionTypesCreateMeeting.SET_EDITED_START_DATE,
        payload: {
          date: getDateVal,
          start: startTime.toDate(),
          end: endTime,
        },
      });
    }
  };

  const handleTimeChange = (e) => {
    //takes time from event change and splits it to create date time string
    const time = moment(e.target.value).format("HH:mm");
    const splitTime = time.split(":");
    let startTime = moment.tz(
      `${createMeetingState.selectedDate} ${time}`,
      timezone
    );
    moment(startTime).set("hour", splitTime[0]);
    moment(startTime).set("minute", splitTime[1]);

    //creates new date time string using selected timezone since that is the timezone the user selected in
    startTime = moment(startTime).tz(timezone);
    if (!editEvent) {
      if (createMeetingState.durationChanged) {
        const endTime = moment(startTime).add(
          createMeetingState.duration ? createMeetingState.duration : 15,
          "m"
        );
        dispatchCreateMeeting({
          type: actionTypesCreateMeeting.SET_DEFAULTED_START,
          payload: { start: startTime, end: endTime },
        });
      } else {
        //if duration is not selected defaults duration to 15 minutes
        const endTime = moment(e.target.value).add(15, "m");

        dispatchCreateMeeting({
          type: actionTypesCreateMeeting.SET_DEFAULTED_START,
          payload: { start: startTime, end: endTime },
        });
      }
    }

    if (editEvent) {
      //if editing a meeting sets end time to the start time plus selected duration
      const endTime = moment(startTime).add(createMeetingState.duration, "m");

      dispatchCreateMeeting({
        type: actionTypesCreateMeeting.SET_DEFAULTED_START,
        payload: { start: startTime, end: endTime },
      });
    }
  };

  const handleOption = (e) => {
    //uses startTime to create a moment object and adds the selected duration
    const getNewTime = () => {
      const start = moment.tz(
        createMeetingState.startTime,
        ConfigService.runValues.momentTimezone
      );

      return moment(start).add(e.target.value, "m");
    };

    dispatchCreateMeeting({
      type: actionTypesCreateMeeting.SET_END_WITH_DURATION,
      payload: {
        time: getNewTime(),
        duration: e.target.value,
      },
    });
  };

  const isBlockedBy = (fuz_attendee_id) => {
    let blockedBy =
      blockedByUsers !== "" &&
      blockedByUsers?.filter((id) => {
        return id === fuz_attendee_id;
      });
    return blockedBy?.length > 0;
  };

  const itemRender = (li, itemProps) => {
    const item = itemProps.dataItem;

    const hasNetworking =
      item?.networking?.allowNetworking?.BOOL &&
      item?.networking?.allowUserNetworking?.BOOL;
    if (isBlockedBy(item.fuzionAttendeeId) || !hasNetworking) {
      return null;
    }

    // remove already selected attendee from multi select list
    if (
      createMeetingState?.attendees.find(
        (a) => a.fuzionAttendeeId === item.fuzionAttendeeId
      )
    ) {
      return null;
    }

    return React.cloneElement(
      li,
      li.props,
      <MultiSelectItem item={item} key={itemProps.id} />
    );
  };

  const tagRender = (tagData, li) => {
    const tag = tagData.data[0];

    return React.cloneElement(li, li.props, [
      <CustomTag tag={tag} key={tag} />,
      li.props.children,
    ]);
  };

  const listLimitReached = (showMessage, max) => (element) => {
    if (showMessage) {
      return React.cloneElement(
        element,
        { ...element.props },
        <div>
          {createMeetingState?.activeBtn === "chat"
            ? "Meeting limit reached, chat meetings are one-to-one."
            : `Already reached max (${max})`}
        </div>
      );
    }

    return null;
  };

  const showConfirmDelete = () => {
    dispatchCreateMeeting({
      type: actionTypesCreateMeeting.SET_SHOW_CONFIRM_DELETE_BUTTON,
      payload: true,
    });
  };

  const submitDeleteMeeting = () => {
    dispatch(
      deleteMeeting(
        editEvent.sessionId,
        editEvent.meetingType,
        user.fuzion_attendee_id
      )
    );
    toggleDialog();
    setMeetingActionType("Deleted");
  };

  const setFuzionAttendeeIdAsId = (list) => {
    return list
      ? list.map((a) => {
          return { ...a, id: a.fuzionAttendeeId };
        })
      : list;
  };

  const addPreloadedAttendee = (list) => {
    if (preLoadedAttendeeProp) {
      const propAttendee = preloadedAttendee(preLoadedAttendeeProp);
      const preloadedInvited = createMeetingState.attendees.find(
        (z) => z.fuzionAttendeeId === propAttendee.fuzionAttendeeId
      );
      const preloadedOnSearch = list.find(
        (z) => z.fuzionAttendeeId === propAttendee.fuzionAttendeeId
      );

      if (preloadedInvited && preloadedOnSearch) {
        //if it's on createMeetingState.attendees and on searchInviteeState.hits, remove so they can't duplicate
        return list.filter(
          (z) => z.fuzionAttendeeId !== propAttendee.fuzionAttendeeId
        );
      }

      if (!preloadedInvited && !preloadedOnSearch) {
        //if it's not on createMeetingState.attendees and not on searchInviteeState.hits, add so they can add it back if they want
        const mod = [...list];

        mod.push(propAttendee);

        return mod;
      }
    }

    return list;
  };

  const setButton = useCallback((meeting) => {
    dispatchCreateMeeting({
      type: actionTypesCreateMeeting.SET_ACTIVE_BTN,
      payload: meeting.meetingType,
    });
  }, []);

  const setInviteeFilter = useCallback(() => {
    dispatchSearchInviteeState({
      type: searchActionTypes.SET_FILTER,
      payload: `NOT fuzionAttendeeId:${createMeetingState.host?.fuzionAttendeeId}`,
    });
  }, [dispatchSearchInviteeState, createMeetingState.host]);

  const filteredMeetingTypeBasedOnPermission = () => {
    if (tierLevelData) {
      const isHostVideoChatToggleOn = tierLevelData.isHostVideoChatToggleOn;
      const isBoothStaffOrExhibitorAdmin =
        permissions.boothStaff || permissions.exhibitorAdmin;

      const isVideoAllowed =
        (isBoothStaffOrExhibitorAdmin && isHostVideoChatToggleOn) ||
        !isBoothStaffOrExhibitorAdmin;
      const isHostChatToggleOn = tierLevelData.isHostChatToggleOn;

      const isChatAllowed = (() => {
        let allowed = true;
        if (isBoothStaffOrExhibitorAdmin && !isHostChatToggleOn) {
          allowed = false;
        }
        if (
          preLoadedAttendeeProp &&
          !preLoadedAttendeeProp?.networking?.allowChat?.BOOL
        ) {
          allowed = false;
        }
        return allowed;
      })();

      return (
        buttonList
          .filter((z) => meetingTypes.includes(z.name))
          // PJX-705 allowVideoChatAccess flag for enable the chat meeting option
          .filter((z) => {
            return (
              (z.value === MEETING_TYPES.VIDEO &&
                permissions.allowVideoChatAccess &&
                isVideoAllowed) ||
              z.value !== MEETING_TYPES.VIDEO
            );
          })
          .filter((z) => {
            return (
              (z.value === MEETING_TYPES.CHAT &&
                permissions.allowNetworkingChatMeetings &&
                networkSettings.networkingMeetings.meetingFormats.chat &&
                isChatAllowed) ||
              z.value !== MEETING_TYPES.CHAT
            );
          })
      );
    } else {
      return (
        buttonList
          .filter((z) => meetingTypes.includes(z.name))
          // PJX-706 allowVideoChatAccess flag for enable the video meeting option
          .filter(
            (z) =>
              (z.value === MEETING_TYPES.VIDEO &&
                permissions.allowVideoChatAccess) ||
              z.value !== MEETING_TYPES.VIDEO
          )
          .filter(
            (z) =>
              (z.value === MEETING_TYPES.CHAT &&
                permissions.allowNetworkingChatMeetings &&
                networkSettings.networkingMeetings.meetingFormats.chat) ||
              z.value !== MEETING_TYPES.CHAT
          )
      );
    }
  };

  const isValid = () => {
    const filtered = createMeetingState.attendee?.filter(
      (x) => x.id === createMeetingState.host.fuzionAttendeeId
    );

    if (createMeetingState.meetingType === MEETING_TYPES.CHAT) {
      return createMeetingState.attendees.length === 1 && !inviteeError;
    }

    return (
      (filtered?.length > 0 && createMeetingState.attendees.length >= 1) ||
      createMeetingState.attendees.length >= 1
    );
  };

  /**
   * if networking start date is in the past, the calendar
   * should default to current date so users cannot send a
   * meeting invite in the past.
   */
  const getDateNotInThePast = (date) => {
    const current = toDate(new Date());
    const networkingDate = moment.tz(
      date,
      ConfigService.runValues.momentTimezone
    );
    return networkingDate.isBefore(current) ? current : toDate(networkingDate);
  };

  /**
   * if networking start date is in the past, check that
   * the current date is between the networking start and
   * end time. If its not, the user should not be able to
   * set a date as none would be valid, so disable picker.
   * @param {string} start
   * @param {string} end
   * @returns {boolean}
   */
  const checkForDisabledPicker = (start, end) => {
    const current = moment.tz(
      new Date(),
      ConfigService.runValues.momentTimezone
    );
    const networkingStartDate = moment.tz(
      start,
      ConfigService.runValues.momentTimezone
    );
    const networkingEndDate = moment.tz(
      end,
      ConfigService.runValues.momentTimezone
    );

    if (current.isSame(networkingEndDate, "day")) {
      return false;
    }

    if (networkingStartDate.isBefore(current)) {
      return !current.isBetween(networkingStartDate, networkingEndDate);
    }

    return false;
  };

  const checkForPreviousTime = () => {
    const currentDate = moment
      .tz(new Date(), ConfigService.runValues.momentTimezone)
      .format("YYYY-MM-DD");
    // if current day is today, do not use startTimeLimit since it can be earlier than current time
    // format current time and return new timestamp
    if (createMeetingState.selectedDate === currentDate) {
      // moment .format() includes milisecond formatting for zulutime which is not supported format for the
      // date/time picker so customize format
      const placeholderTimestamp = moment
        .tz(new Date(), ConfigService.runValues.momentTimezone)
        .format()
        .split("T");
      const time = placeholderTimestamp[1].split("-")[0];
      const date = placeholderTimestamp[0];

      return newDate(`${date}T${time}`, timezone);
    }
    // if today is not current, return startTimeLimit
    return newDate(createMeetingState.startTimeLimit, timezone);
  };

  const maxInviteVideo = () => {
    const list = setFuzionAttendeeIdAsId(
      addPreloadedAttendee(searchInviteeState.hits)
    );
    if (
      createMeetingState?.attendees?.length < TOTAL_ALLOWED_GUESTS.video &&
      list
    ) {
      return list
        .filter(
          (attendee) => attendee.fuzionAttendeeId !== accountProfile.attendeeId
        )
        .filter((invitee) => {
          // remove videoOffAttendees
          return !tierLevelData.videoOffAttendees.find((videoOffAttendee) => {
            return (
              invitee.fuzionAttendeeId === videoOffAttendee.fuzionAttendeeId
            );
          });
        });
    }

    return [];
  };

  const maxInviteChat = () => {
    const list = setFuzionAttendeeIdAsId(
      addPreloadedAttendee(searchInviteeState.hits)
    );
    return list.filter((invitee) => {
      // remove chatOffAttendees and attendees with allowChat set to false
      return (
        invitee.networking.allowChat.BOOL &&
        !tierLevelData.chatOffAttendees.find((chatOffAttendee) => {
          return invitee.fuzionAttendeeId === chatOffAttendee.fuzionAttendeeId;
        })
      );
    });
  };

  const isTimeValValid = () => {
    const now = moment().unix();
    const start = moment(createMeetingState.startTime).unix();
    const end = moment(
      newDate(createMeetingState.endTimeLimit, timezone, checkForPreviousTime())
    ).unix();

    return start > now && start <= end;
  };

  /**
   * Check to see if the current time is passed the Networking end time.
   * If the current time is passed the Networking end time return the Networking start time.
   * This will display the allowed networking time for the event i.e 9am to 5pm.
   * @param  {Date} time current time
   * @param  {Date} end networking end time
   */
  const isCurrentTimePassedEndTime = (time, end) => {
    const currentTimeUnix = moment(time).unix();
    const endUnix = moment(end).unix();

    if (currentTimeUnix > endUnix) {
      return newDate(createMeetingState.startTimeLimit, timezone);
    }

    return time;
  };

  useAlgoliaSetting();

  const computeTierLevelInfo = () => {
    if (exhibitors && !tierLevelData) {
      const hostExhibitor = exhibitors.find(
        (ex) => ex.exhibitor_company_id === user.exhibitor_company_id
      );
      const hostTier = networkSettings.networkingMeetings.tiers.find(
        (tier) => tier.tierName === hostExhibitor?.membership_level
      );
      const isHostVideoChatToggleOn = !hostTier ? true : hostTier?.videoChat;
      const isHostChatToggleOn = !hostTier ? true : hostTier?.chat;
      let videoOffAttendeesArr = [];
      let chatOffAttendeesArr = [];
      searchInviteeState.hits.map((invitee) => {
        const exhibitor = exhibitors.find((ex) => {
          return ex.exhibitor_company_id === invitee.companyId;
        });
        if (exhibitor) {
          const tier = networkSettings.networkingMeetings.tiers.find(
            (tier) => tier.tierName === exhibitor?.membership_level
          );
          if (
            tier?.videoChat === false &&
            (invitee.networking.exhibitorAdmin.BOOL ||
              invitee.networking.boothStaff.BOOL)
          ) {
            videoOffAttendeesArr.push(invitee);
          }
          if (
            tier?.chat === false &&
            (invitee.networking.exhibitorAdmin.BOOL ||
              invitee.networking.boothStaff.BOOL)
          ) {
            chatOffAttendeesArr.push(invitee);
          }
        }
        return null;
      });
      setTierLevelData({
        isHostChatToggleOn: isHostChatToggleOn,
        isHostVideoChatToggleOn: isHostVideoChatToggleOn,
        videoOffAttendees: videoOffAttendeesArr,
        chatOffAttendees: chatOffAttendeesArr,
      });
    } else if (tierLevelData && exhibitors) {
      let videoOffAttendeesArr = tierLevelData.videoOffAttendees;
      let chatOffAttendeesArr = tierLevelData.chatOffAttendees;
      let chatOffAttendeeIds = chatOffAttendeesArr.map(
        (attendee) => attendee.fuzionAttendeeId
      );
      let videoOffAttendeeIds = videoOffAttendeesArr.map(
        (attendee) => attendee.fuzionAttendeeId
      );
      searchInviteeState.hits.map((invitee) => {
        const exhibitor = exhibitors.find((ex) => {
          return ex.exhibitor_company_id === invitee.companyId;
        });
        if (exhibitor) {
          const tier = networkSettings.networkingMeetings.tiers.find(
            (tier) => tier.tierName === exhibitor?.membership_level
          );
          // check invitee if videoOff
          if (
            tier?.videoChat === false &&
            !videoOffAttendeeIds.includes(invitee.fuzionAttendeeId) &&
            (invitee.networking.exhibitorAdmin.BOOL ||
              invitee.networking.boothStaff.BOOL)
          ) {
            videoOffAttendeesArr.push(invitee);
            videoOffAttendeeIds.push(invitee.fuzionAttendeeId);
          }
          // check invitee if chatOff
          if (
            tier?.chat === false &&
            !chatOffAttendeeIds.includes(invitee.fuzionAttendeeId) &&
            (invitee.networking.exhibitorAdmin.BOOL ||
              invitee.networking.boothStaff.BOOL)
          ) {
            chatOffAttendeesArr.push(invitee);
            chatOffAttendeeIds.push(invitee.fuzionAttendeeId);
          }
        }
        return null;
      });
      setTierLevelData({
        ...tierLevelData,
        chatOffAttendees: chatOffAttendeesArr,
        videoOffAttendees: videoOffAttendeesArr,
      });
    }
  };

  tierLevelInfoRef.current = computeTierLevelInfo;
  useEffect(() => {
    if (exhibitors && searchInviteeState) {
      tierLevelInfoRef.current();
    }
  }, [exhibitors, searchInviteeState]);

  useEffect(() => {
    setInviteeFilter();
  }, [setInviteeFilter]);

  useEffect(() => {
    dispatchCreateMeeting({
      type: actionTypesCreateMeeting.SET_TIME_LIMIT_DEFAULT,
      payload: moment().tz(timezone).toDate(),
    });
  }, [timezone]);

  useEffect(() => {
    if (!editEvent) {
      //If not editing meeting creates default start time(current time) and end time (15 minutes)
      const startTime = new Date(createMeetingState.startTime);
      const endTime = moment(startTime).add(
        createMeetingState.duration ? createMeetingState.duration : 15,
        "m"
      );

      dispatchCreateMeeting({
        type: actionTypesCreateMeeting.SET_END,
        payload: moment
          .tz(endTime, ConfigService.runValues.momentTimezone)
          .format(),
      });
    }
  }, [
    createMeetingState.startTime,
    createMeetingState.duration,
    dispatchCreateMeeting,
    timezone,
    editEvent,
  ]);

  useEffect(() => {
    //set exhibitor rep to host when exhibitor admin schedules meeting
    if (exhibitor) {
      dispatchCreateMeeting({
        type: actionTypesCreateMeeting.SET_HOST,
        payload: {
          fuzionAttendeeId: exhibitor.fuzionAttendeeId,
          name: `${`${exhibitor.preferredName || exhibitor.firstName} ${
            exhibitor.lastName
          }`}`,
          company: exhibitor?.company,
        },
      });
    }
  }, [exhibitor]);

  //automatically add specified attendee when modal first renders
  useEffect(() => {
    if (preLoadedAttendeeProp) {
      dispatchCreateMeeting({
        type: actionTypesCreateMeeting.SET_INVITED,
        payload: [preloadedAttendee(preLoadedAttendeeProp)],
      });
    }
  }, [preLoadedAttendeeProp, preloadedAttendee]);

  // Set starting date using selected display timezone
  useEffect(() => {
    if (timezone && !editEvent) {
      dispatchCreateMeeting({
        type: actionTypesCreateMeeting.SET_SELECTED_DATE,
        payload: formatDate(
          {
            date: new Date(),
            format: "YYYY-MM-DD",
          },
          timezone
        ),
      });
    }
  }, [timezone, editEvent]);

  useEffect(() => {
    if (modalType === MODAL_TYPES.meeting && !exhibitor) {
      dispatchCreateMeeting({
        type: actionTypesCreateMeeting.SET_HOST,
        payload: {
          fuzionAttendeeId: user.fuzion_attendee_id,
          name: `${accountProfile.preferredName || accountProfile.firstName} ${
            accountProfile.lastName
          }`,
          company: accountProfile?.company,
        },
      });
    }
  }, [user.fuzion_attendee_id, modalType, exhibitor, accountProfile]);

  //sets default meetingType to chat to avoid being sent blank
  useEffect(() => {
    if (modalType === MODAL_TYPES.meeting && !editEvent) {
      dispatchCreateMeeting({
        type: actionTypesCreateMeeting.SET_TYPE_OF_MEETING,
        payload: "chat",
      });
    }
  }, [editEvent, modalType]);

  //default showcase meeting type
  useEffect(() => {
    if (modalType !== MODAL_TYPES.meeting) {
      dispatchCreateMeeting({
        type: actionTypesCreateMeeting.SET_TYPE_OF_MEETING,
        payload: "showcase",
      });
    }
  }, [modalType]);

  useEffect(() => {
    if (modalType === MODAL_TYPES.webinar) {
      dispatchCreateMeeting({
        type: actionTypesCreateMeeting.SET_EXHIBITOR_ID,
        payload: accountProfile.companyId,
      });
    }
  }, [modalType, accountProfile.companyId]);

  // Set Start and End time for time picker
  useEffect(() => {
    if (
      exhibitors &&
      networkSettings &&
      createMeetingState.selectedDate !== ""
    ) {
      let [filteredDay] = networkSettings.meetingTimes.filter(
        (date) =>
          formatDate(
            {
              date: date.date,
              format: "YYYY-MM-DD",
            },
            ConfigService.runValues.momentTimezone
          ) === createMeetingState.selectedDate
      );

      // in case days change and the selectedDate no longer exists
      if (!filteredDay) {
        filteredDay = networkSettings.meetingTimes[0];
      }

      /**
       * date matters because backend is saving startTime as the date of the meeting
       * creates min and max times by creating date time using selectedDate and available times from Overlord
       * Times are created in event timezone since that is the timezone that that everything is saved in
       */
      const startTime = moment.tz(
        `${createMeetingState.selectedDate} ${filteredDay.from.replace(
          /[AP]/,
          " $&"
        )}`,
        "YYYY-MM-DD hh:mm A",
        ConfigService.runValues.momentTimezone
      );
      const endTime = moment.tz(
        `${createMeetingState.selectedDate} ${filteredDay.to.replace(
          /[AP]/,
          " $&"
        )}`,
        "YYYY-MM-DD hh:mm A",
        ConfigService.runValues.momentTimezone
      );

      dispatchCreateMeeting({
        type: actionTypesCreateMeeting.UPDATE_TIME_LIMIT,
        payload: {
          startTime: formatDate(
            {
              date: new Date(startTime),
              format: "YYYY-MM-DDTHH:mm:ss",
            },
            ConfigService.runValues.momentTimezone
          ),
          endTime: formatDate(
            {
              date: new Date(endTime),
              format: "YYYY-MM-DDTHH:mm:ss",
            },
            ConfigService.runValues.momentTimezone
          ),
        },
      });

      setIsLoading(false);
    }
  }, [createMeetingState.selectedDate, networkSettings, timezone, exhibitors]);

  // Get Networking Settings
  useEffect(() => {
    if (!networkSettings) {
      dispatch(getPayload(dataTypes.networkSettings));
    }
  });

  // Get Exhibitors
  useEffect(() => {
    if (!exhibitors) {
      dispatch(getPayload(dataTypes.exhibitors));
    }
  });

  useEffect(() => {
    if (editEvent) {
      const hostProfile = guestProfiles.find(
        (z) => z.attendeeId === editEvent.host
      );

      loadProfiles([editEvent.host]);

      if (hostProfile && !createMeetingState.editHostLoaded) {
        const originalEvent = {
          meetingType: editEvent.meetingType,
          meetingTitle: editEvent.sessionName,
          description: editEvent.description,
          host: {
            fuzionAttendeeId: editEvent.host,
            name: `${`${hostProfile.preferredName || hostProfile.firstName} ${
              hostProfile.lastName
            }`}`,
          },
          startTime: editEvent.sessionStart,
          endTime: editEvent.sessionEnd,
          selectedDate: formatDate(
            { date: editEvent.sessionStart, format: "YYYY-MM-DD" },
            ConfigService.runValues.momentTimezone
          ),
        };
        //Get Event Duration to set Default for editEvents
        const end = moment
          .tz(editEvent.sessionEnd, ConfigService.runValues.momentTimezone)
          .format();
        const start = moment
          .tz(editEvent.sessionStart, ConfigService.runValues.momentTimezone)
          .format();
        //Gets difference in minutes
        const diff = moment
          .tz(end, ConfigService.runValues.momentTimezone)
          .diff(
            moment.tz(start, ConfigService.runValues.momentTimezone),
            "minutes"
          );

        setButton(originalEvent);

        dispatchCreateMeeting({
          type: actionTypesCreateMeeting.SET_MEETING,
          payload: { ...originalEvent, duration: diff, editHostLoaded: true },
        });
      }
    }
  }, [
    setButton,
    editEvent,
    guestProfiles,
    loadProfiles,
    createMeetingState.editHostLoaded,
  ]);

  useEffect(() => {
    // Avoid memory leak issue
    // https://www.debuggr.io/react-update-unmounted-component/
    let mounted = true;

    if (editEvent) {
      getMeetingAttendees(editEvent.sessionId).then((res) => {
        const data = res.data.data;
        let removeHost = data
          .filter(Boolean)
          .filter((attendee) => attendee.id !== editEvent.host);

        if (attendee) {
          removeHost = removeHost.filter((a) => a.id === attendee.attendeeId);
        }

        if (mounted) {
          dispatchCreateMeeting({
            type: actionTypesCreateMeeting.SET_INVITED,
            payload: removeHost,
          });
          removeHost.map((rh) =>
            dispatchSearchInviteeState({
              type: searchActionTypes.SET_SEARCH_QUERY,
              payload: rh.name,
            })
          );
          setEditMeetingOriginalAttendees(removeHost);
        }
      });

      // This is getting a moderator profile data
      if (editEvent.moderators) {
        axios
          .post(`${process.env.REACT_APP_API_HOST}/account/batchProfiles`, {
            userIds: editEvent.moderators,
          })
          .then((res) => {
            if (res.data.data) {
              const moderators = res.data.data.map((attendee) => ({
                id: attendee.attendeeId || attendee.id,
                name: `${attendee.firstName} ${attendee.lastName}`,
                preferredName: `${attendee.preferredName}`,
              }));
              if (mounted) {
                dispatchCreateMeeting({
                  type: actionTypesCreateMeeting.SET_MODERATORS,
                  payload: moderators.filter((m) => m.id !== editEvent.host),
                });
              }
            }
          });
      }
    }

    return () => {
      mounted = false;
    };
  }, [
    editEvent,
    accountProfile.attendeeId,
    attendee,
    modalType,
    dispatchSearchInviteeState,
  ]);

  //only allow same company to be host and moderator
  useEffect(() => {
    if (accountProfile && accountProfile.companyId) {
      let filter = `companyId:${accountProfile.companyId}`;
      let moderatorFilterString = "";

      if (createMeetingState.host) {
        filter = `${filter} AND NOT fuzionAttendeeId:${createMeetingState.host?.fuzionAttendeeId}`;
      }
      // Loops through moderators to add to filter
      createMeetingState.moderators.forEach((moderator, index) => {
        moderatorFilterString = `${moderatorFilterString} AND NOT fuzionAttendeeId:${
          moderator.id || moderator.fuzionAttendeeId
        }`;
      });
      // adds moderators to filter string
      filter = filter + "" + moderatorFilterString;

      dispatchSearchHostState({
        type: searchActionTypes.SET_FILTER,
        payload: filter,
      });
    }
  }, [
    accountProfile,
    dispatchSearchHostState,
    createMeetingState.host,
    createMeetingState.moderators,
  ]);

  useEffect(() => {
    if (!editEvent) {
      dispatchCreateMeeting({
        type: actionTypesCreateMeeting.SET_DEFAULTED_START,
        payload: {
          start: new Date(),
          end: new Date(),
        },
      });
    }
  }, [editEvent]);

  useEffect(() => {
    if (disableEdit === null && createMeetingState) {
      const { shouldHaveEnded } = checkIfMeetingShouldHaveEnded(
        createMeetingState
      );
      setDisableEdit(shouldHaveEnded);
    }
  }, [createMeetingState, disableEdit]);

  return (
    <div className={modalStyles.main}>
      <Dialog
        title={
          <span id="modal_title" tabIndex="0">
            {modalType === MODAL_TYPES.meeting
              ? editEvent
                ? "Edit Meeting"
                : "Create meeting"
              : "Live Showcase"}
          </span>
        }
        onClose={toggleDialog}
        width={Math.min(MAX_WIDTH, width - PADDING)}
        height={Math.min(MAX_HEIGHT, height - PADDING)}
        autoFocus={true}
        aria-modal={true}
        aria-labelledby="modal_title"
        aria-describedby="modal_desc"
        className="dialogHolder"
      >
        {(!networkSettings || isLoading) && <Loader />}

        {networkSettings && !isLoading && (
          <form
            className={modalStyles.mainContainer}
            onSubmit={submitCreateMeeting}
            id="modal_desc"
          >
            <div className={modalStyles.fieldWrapper}>
              <span className={modalStyles.labels}>Type</span>
              <div className={modalStyles.buttons}>
                {filteredMeetingTypeBasedOnPermission().length > 0 ? (
                  filteredMeetingTypeBasedOnPermission().map((button) => (
                    <OEPAnalytics
                      componentType="Button"
                      page={getAnalyticsPage(location.pathname)}
                      url={`View ${button.name}`}
                      componentName={button.name}
                    >
                      <button
                        className={`${modalStyles.typeButton} ${
                          createMeetingState.activeBtn === button.value
                            ? modalStyles.active
                            : ""
                        }`}
                        type="button"
                        onClick={handleMeetingTypeChange.bind(
                          null,
                          button.value
                        )}
                        key={button.name}
                      >
                        <SvgTypes name={button.icon} />
                        <span> {button.name}</span>
                      </button>
                    </OEPAnalytics>
                  ))
                ) : (
                  <p className={modalStyles.error}>
                    User is unable to have a chat or video meeting.
                  </p>
                )}
              </div>
            </div>
            <div className={modalStyles.fieldWrapper}>
              <label className={`${modalStyles.labels}`} htmlFor="title">
                Title
              </label>
              <div className={modalStyles.textFields}>
                <input
                  type="text"
                  className={modalStyles.inputStyle}
                  onChange={handleTitleChange}
                  id="title"
                  maxLength={modalType === MODAL_TYPES.meeting ? 50 : 100}
                  value={createMeetingState.meetingTitle}
                  required
                  disabled={editEvent && disableEdit}
                />
                {`${createMeetingState.meetingTitle.length}/${
                  modalType === MODAL_TYPES.meeting ? 50 : 100
                }`}
                {titleError && (
                  <span className={modalStyles.error}>
                    Title cannot contain "/"
                  </span>
                )}
              </div>
            </div>
            {modalType === MODAL_TYPES.meeting && (
              <div className={modalStyles.fieldWrapper}>
                <label className={modalStyles.labels} htmlFor="invite">
                  Invite
                </label>
                {createMeetingState.meetingType === MEETING_TYPES.VIDEO && (
                  <div className={modalStyles.multiSelect}>
                    <MultiSelect
                      disabled={editEvent && disableEdit}
                      data={maxInviteVideo()}
                      listNoDataRender={listLimitReached(
                        createMeetingState.attendees.length >
                          TOTAL_ALLOWED_GUESTS.video - 1,
                        TOTAL_ALLOWED_GUESTS.video
                      )}
                      filterable={true}
                      onFilterChange={handleInviteFilterChange}
                      onChange={handleInviteChange}
                      id="invite"
                      textField="name"
                      dataItemKey="id"
                      itemRender={itemRender}
                      tagRender={tagRender}
                      autoClose={
                        createMeetingState.attendees.length >=
                        TOTAL_ALLOWED_GUESTS.video - 1
                      }
                      value={createMeetingState.attendees}
                      required={true}
                      validityStyles={false}
                      valid={!inviteeError && isValid()}
                      validationMessage={
                        createMeetingState.attendees.length === 0
                          ? "Select an Invitee"
                          : inviteeErrorMsg
                      }
                    />
                    {`${createMeetingState.attendees.length}/${TOTAL_ALLOWED_GUESTS.video}`}
                  </div>
                )}
                {createMeetingState.meetingType === MEETING_TYPES.CHAT && (
                  <div className={modalStyles.multiSelect}>
                    <MultiSelect
                      disabled={editEvent && disableEdit}
                      data={maxInviteChat()}
                      listNoDataRender={listLimitReached(
                        createMeetingState.attendees.length >=
                          TOTAL_ALLOWED_GUESTS.chat,
                        TOTAL_ALLOWED_GUESTS.chat
                      )}
                      filterable={true}
                      onFilterChange={handleInviteFilterChange}
                      onChange={handleInviteChange}
                      id="invite"
                      textField="name"
                      dataItemKey="id"
                      itemRender={itemRender}
                      tagRender={tagRender}
                      autoClose={
                        createMeetingState.attendees.length >=
                        TOTAL_ALLOWED_GUESTS.chat - 1
                      }
                      value={createMeetingState.attendees}
                      required={true}
                      validityStyles={false}
                      valid={
                        editEvent
                          ? isValid()
                          : !inviteeError &&
                            createMeetingState.attendees.length ===
                              TOTAL_ALLOWED_GUESTS.chat
                      }
                      validationMessage={
                        createMeetingState.attendees.length === 0
                          ? "Select an Invitee"
                          : inviteeError
                          ? inviteeErrorMsg &&
                            createMeetingState.meetingType ===
                              MEETING_TYPES.CHAT
                          : "Only one Invitee for chat allowed"
                      }
                    />
                    {`${createMeetingState.attendees.length}/${TOTAL_ALLOWED_GUESTS.chat}`}
                  </div>
                )}
              </div>
            )}
            {modalType === MODAL_TYPES.webinar && (
              <div className={modalStyles.fieldWrapper}>
                <label className={modalStyles.labels} htmlFor="host">
                  Host
                </label>
                <div className={modalStyles.multiSelect}>
                  <MultiSelect
                    disabled={editEvent && disableEdit}
                    data={
                      (!createMeetingState.host &&
                        setFuzionAttendeeIdAsId(searchHostState.hits)) ||
                      []
                    }
                    listNoDataRender={listLimitReached(
                      createMeetingState.host !== null,
                      1
                    )}
                    filterable={true}
                    onFilterChange={handleHostFilterChange}
                    onChange={handleHostChange}
                    id="host"
                    textField="name"
                    dataItemKey="id"
                    itemRender={itemRender}
                    tagRender={tagRender}
                    autoClose={true}
                    required={true}
                    validityStyles={false}
                    value={
                      createMeetingState.host ? [createMeetingState.host] : []
                    }
                  />
                  {`${createMeetingState.host ? 1 : 0}/1`}
                </div>
              </div>
            )}
            {modalType === MODAL_TYPES.webinar && (
              <div className={modalStyles.fieldWrapper}>
                <label className={modalStyles.labels} htmlFor="moderators">
                  Moderators
                </label>
                <div className={modalStyles.multiSelect}>
                  <MultiSelect
                    disabled={editEvent && disableEdit}
                    data={setFuzionAttendeeIdAsId(searchHostState.hits) || []}
                    filterable={true}
                    onFilterChange={handleHostFilterChange}
                    onChange={handleModeratorsChange}
                    id="moderators"
                    textField="name"
                    dataItemKey="id"
                    itemRender={itemRender}
                    tagRender={tagRender}
                    autoClose={false}
                    value={createMeetingState.moderators}
                  />
                </div>
              </div>
            )}
            <div className={modalStyles.fieldWrapper}>
              <label className={modalStyles.labels} htmlFor="start">
                Date
              </label>
              <div className={modalStyles.datePicker}>
                <DatePicker
                  disabled={
                    (editEvent && disableEdit) ||
                    checkForDisabledPicker(
                      networkSettings.networkingDates.from,
                      networkSettings.networkingDates.to
                    )
                  }
                  id="start"
                  min={getDateNotInThePast(
                    networkSettings.networkingDates.from
                  )}
                  max={toDate(networkSettings.networkingDates.to)}
                  defaultValue={dateToTime(createMeetingState.selectedDate)}
                  onChange={handleDayChange}
                />
              </div>
            </div>
            <div className={modalStyles.fieldWrapper}>
              <div className={modalStyles.column}>
                <label className={`${modalStyles.labels} `}>Time</label>
                <span className={modalStyles.miniLabel}>
                  Timezone in {zoneName(timezone)}
                </span>
              </div>
              <div className={modalStyles.timePicker}>
                <div className={modalStyles.timePickerFields}>
                  <label className={modalStyles.miniLabel} htmlFor="start-time">
                    Start Time
                  </label>
                  {!editEvent && createMeetingState.startTime && (
                    <TimePicker
                      disabled={editEvent && disableEdit}
                      steps={{
                        hour: 1,
                        minute: 15,
                      }}
                      popup={CustomPopup}
                      id="start-time"
                      min={isCurrentTimePassedEndTime(
                        checkForPreviousTime(),
                        newDate(
                          createMeetingState.endTimeLimit,
                          timezone,
                          checkForPreviousTime()
                        )
                      )}
                      max={newDate(
                        createMeetingState.endTimeLimit,
                        timezone,
                        checkForPreviousTime()
                      )}
                      valid={isTimeValValid()}
                      format="hh:mm a"
                      onChange={handleTimeChange}
                      defaultValue={newDate(
                        createMeetingState.startTime,
                        timezone
                      )}
                    />
                  )}
                  {editEvent && createMeetingState.startTime && (
                    <TimePicker
                      disabled={editEvent && disableEdit}
                      popup={CustomPopup}
                      steps={{
                        hour: 1,
                        minute: 15,
                      }}
                      id="start-time"
                      min={checkForPreviousTime()}
                      max={newDate(
                        createMeetingState.endTimeLimit,
                        timezone,
                        checkForPreviousTime()
                      )}
                      format="hh:mm a"
                      onChange={handleTimeChange}
                      value={newDate(createMeetingState.startTime, timezone)}
                    />
                  )}
                </div>
                <div className={modalStyles.timePickerFields}>
                  <label className={modalStyles.miniLabel} id="duration">
                    Duration
                  </label>
                  <DropDownList
                    disabled={editEvent && disableEdit}
                    data={[15, 30, 45, 60]}
                    ariaLabelledBy="duration"
                    defaultValue={createMeetingState.duration}
                    onChange={handleOption}
                    id="duration"
                  />
                </div>
              </div>
            </div>
            <div className={modalStyles.fieldWrapper}>
              <div className={modalStyles.column}>
                <label className={modalStyles.labels} htmlFor="description">
                  Description
                </label>
                <span className={modalStyles.miniLabel}>Optional</span>
              </div>
              <div className={modalStyles.textFields}>
                <textarea
                  type="text"
                  rows="2"
                  className={`${modalStyles.inputStyle} ${modalStyles.description}`}
                  onChange={handleDescriptionChange}
                  id="description"
                  maxLength={modalType === MODAL_TYPES.meeting ? 500 : 2500}
                  value={createMeetingState.description}
                  disabled={editEvent && disableEdit}
                />
                {error && (
                  <span className={modalStyles.error}>
                    description cannot contain url
                  </span>
                )}
                {`${createMeetingState.description.length}/${
                  modalType === MODAL_TYPES.meeting ? 500 : 2500
                }`}
              </div>
            </div>

            <div className={modalStyles.buttonContainer}>
              {editEvent && (
                <Fragment>
                  {createMeetingState.showConfirmDeleteButton && (
                    <MeetingModalButtons
                      page={getAnalyticsPage(location.pathname)}
                      componentType="Confirm Delete Meeting Button"
                      name="Confirm Delete Meeting"
                      clickEvt={submitDeleteMeeting}
                    />
                  )}
                  {!createMeetingState.showConfirmDeleteButton && (
                    <MeetingModalButtons
                      page={getAnalyticsPage(location.pathname)}
                      componentType="Delete Meeting Button"
                      name="Delete Meeting"
                      clickEvt={showConfirmDelete}
                    />
                  )}
                </Fragment>
              )}
              {!editEvent && (
                <MeetingModalButtons
                  page={getAnalyticsPage(location.pathname)}
                  componentType="Button"
                  name={modalSettings[modalType].cancelButtonText}
                  clickEvt={toggleDialog}
                />
              )}
              <OEPAnalytics
                page={getAnalyticsPage(location.pathname)}
                componentType="Button"
                url="Save"
                componentName={modalSettings[modalType].saveButtonText}
              >
                <button type="submit" className={modalStyles.saveButton}>
                  {editEvent
                    ? "Send Update"
                    : modalSettings[modalType].saveButtonText}
                </button>
              </OEPAnalytics>
            </div>
          </form>
        )}
        <SaveSuccessModal
          message={
            limitErrorMessage ? (
              "You've reached the meeting invitation limit!"
            ) : errorModal ? (
              <div>
                Sorry, Meeting Scheduler is currently not available. Please use
                the{" "}
                <LinkWrapper to="/support" componentName="Support">
                  Technical Support Form
                </LinkWrapper>{" "}
                to report the issue.
              </div>
            ) : (
              meetingActionStatusMap(
                meetingActionType,
                createMeetingState.meetingType
              )
            )
          }
          show={isSuccess || errorModal}
          close={closeSuccessModal}
          buttonText={errorModal ? "Try Again" : "Okay"}
        />
      </Dialog>
    </div>
  );
};

export default CreateMeetingModal;
