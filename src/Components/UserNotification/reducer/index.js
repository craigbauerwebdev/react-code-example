export const actionTypesNotification = {
  SET_DROPDOWN_OPEN: "SET_DROPDOWN_OPEN",
  SET_MEETING_INVITE_POPUP_OPEN: "SET_MEETING_INVITE_POPUP_OPEN",
  SET_EDIT_MEETING: "SET_EDIT_MEETING",
  SET_MATCHED_MEETING: "SET_MATCHED_MEETING",
  TOGGLE_MEETING_DETAILS: "TOGGLE_MEETING_DETAILS",
  MARK_AS_READ: "MARK_AS_READ",
};

export const initialNotificationState = {
  dropdownOpen: false,
  meetingInvitePopupOpen: false,
  matchedMeeting: null,
  markAsRead: false,
  editPopupMeeting: false,
  meetingDetailsPopup: false,
  hasOpened: false,
};

export const notificationReducer = (
  state = initialNotificationState,
  action
) => {
  switch (action.type) {
    case actionTypesNotification.SET_DROPDOWN_OPEN:
      return {
        ...state,
        dropdownOpen: action.payload,
      };
    case actionTypesNotification.SET_MEETING_INVITE_POPUP_OPEN:
      return {
        ...state,
        meetingInvitePopupOpen: action.payload,
        meetingDetailsPopup: action.payload,
        hasOpened: true,
      };
    case actionTypesNotification.SET_MATCHED_MEETING:
      return {
        ...state,
        matchedMeeting: action.payload,
      };
    case actionTypesNotification.SET_EDIT_MEETING:
      return {
        ...state,
        editPopupMeeting: !state.editPopupMeeting,
        meetingDetailsPopup: false,
        meetingInvitePopupOpen: false,
      };
    case actionTypesNotification.TOGGLE_MEETING_DETAILS:
      return {
        ...state,
        meetingDetailsPopup: action.payload,
        meetingInvitePopupOpen: action.payload,
      };
    case actionTypesNotification.MARK_AS_READ:
      return {
        ...state,
        dropdownOpen: false,
        markAsRead: true,
      };
    default:
      return state;
  }
};
