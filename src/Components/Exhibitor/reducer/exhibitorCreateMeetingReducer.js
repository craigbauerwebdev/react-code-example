export const actionTypesCreateMeeting = {
  SET_VISIBLE: "SET_VISIBLE",
  SET_ATTENDEES: "SET_ATTENDEES",
  SET_TYPE_OF_MEETING: "SET_TYPE_OF_MEETING",
  SET_TITLE: "SET_TITLE",
  SET_DESCRIPTION: "SET_DESCRIPTION",
  SET_LINK: "SET_LINK",
  SET_INCLUDE_MODERATOR: "SET_INCLUDE_MODERATOR",
  SET_INVITED: "SET_INVITED",
  SET_MODERATORS: "SET_MODERATORS",
  SET_START: "SET_START",
  SET_END: "SET_END",
  SET_LOCATION: "SET_LOCATION",
  SET_SELECTED_DATE: "SET_SELECTED_DATE",
  SET_HOST: "SET_HOST",
  SET_MEETING: "SET_MEETING",
  SET_EXHIBITOR_ID: "SET_EXHIBITOR_ID",
  SET_DEFAULTED_START: "SET_DEFAULTED_START",
  SET_START_DATE: "SET_START_DATE",
  SET_EDITED_START_DATE: "SET_EDITED_START_DATE",
  SET_END_WITH_DURATION: "SET_END_WITH_DURATION",
  SET_ACTIVE_BTN: "SET_ACTIVE_BTN",
  SET_TIME_LIMIT_DEFAULT: "SET_TIME_LIMIT_DEFAULT",
  UPDATE_TIME_LIMIT: "UPDATE_TIME_LIMIT",
  SET_SHOW_CONFIRM_DELETE_BUTTON: "SET_SHOW_CONFIRM_DELETE_BUTTON",
};

export const createMeetingInitState = {
  visible: true,
  meetingType: "",
  meetingTitle: "",
  description: "",
  link: "",
  includeModerator: false,
  attendees: [],
  host: null,
  moderators: [],
  selectedModerators: [],
  location: "",
  startTime: null,
  endTime: null,
  selectedDate: "",
  exhibitorId: "",
  durationChanged: false,
  duration: 15,
  editHostLoaded: false,
  activeBtn: null,
  startTimeLimit: null,
  endTimeLimit: null,
  showConfirmDeleteButton: false,
};

export const createMeetingReducer = (state, action) => {
  switch (action.type) {
    case actionTypesCreateMeeting.SET_VISIBLE:
      return {
        ...state,
        visible: action.payload,
      };
    case actionTypesCreateMeeting.SET_ATTENDEES:
      return {
        ...state,
        attendees: action.payload,
      };
    case actionTypesCreateMeeting.SET_TYPE_OF_MEETING:
      return {
        ...state,
        meetingType: action.payload,
        activeBtn: action.payload,
      };
    case actionTypesCreateMeeting.SET_TITLE:
      return {
        ...state,
        meetingTitle: action.payload,
      };
    case actionTypesCreateMeeting.SET_DESCRIPTION:
      return {
        ...state,
        description: action.payload,
      };
    case actionTypesCreateMeeting.SET_LINK:
      return {
        ...state,
        link: action.payload,
      };
    case actionTypesCreateMeeting.SET_INCLUDE_MODERATOR:
      return {
        ...state,
        includeModerator: action.payload,
      };
    case actionTypesCreateMeeting.SET_INVITED:
      return {
        ...state,
        attendees: action.payload,
      };
    case actionTypesCreateMeeting.SET_MODERATORS:
      return {
        ...state,
        moderators: action.payload.slice(),
      };
    case actionTypesCreateMeeting.SET_START:
      return {
        ...state,
        startTime: action.payload,
      };
    case actionTypesCreateMeeting.SET_END:
      return {
        ...state,
        endTime: action.payload,
        durationChanged: true,
      };
    case actionTypesCreateMeeting.SET_LOCATION:
      return {
        ...state,
        location: action.payload,
      };
    case actionTypesCreateMeeting.SET_SELECTED_DATE:
      return {
        ...state,
        selectedDate: action.payload,
      };
    case actionTypesCreateMeeting.SET_HOST:
      return {
        ...state,
        host: action.payload,
      };
    case actionTypesCreateMeeting.SET_MEETING:
      return {
        ...state,
        ...action.payload,
      };
    case actionTypesCreateMeeting.SET_EXHIBITOR_ID:
      return {
        ...state,
        exhibitorId: action.payload,
        companyId: action.payload,
      };
    case actionTypesCreateMeeting.SET_DEFAULTED_START:
      return {
        ...state,
        startTime: action.payload.start,
        endTime: action.payload.end,
      };
    case actionTypesCreateMeeting.SET_START_DATE:
      return {
        ...state,
        selectedDate: action.payload.date,
        startTime: action.payload.start,
      };
    case actionTypesCreateMeeting.SET_EDITED_START_DATE:
      return {
        ...state,
        selectedDate: action.payload.date,
        startTime: action.payload.start,
        endTime: action.payload.end,
      };
    case actionTypesCreateMeeting.SET_END_WITH_DURATION:
      return {
        ...state,
        endTime: action.payload.time,
        duration: action.payload.duration,
        durationChanged: true,
      };
    case actionTypesCreateMeeting.SET_ACTIVE_BTN:
      return {
        ...state,
        activeBtn: action.payload,
      };
    case actionTypesCreateMeeting.SET_TIME_LIMIT_DEFAULT:
      return {
        ...state,
        startTimeLimit: action.payload,
        endTimeLimit: action.payload,
      };
    case actionTypesCreateMeeting.UPDATE_TIME_LIMIT:
      return {
        ...state,
        startTimeLimit: action.payload.startTime,
        endTimeLimit: action.payload.endTime,
      };
    case actionTypesCreateMeeting.SET_SHOW_CONFIRM_DELETE_BUTTON:
      return {
        ...state,
        showConfirmDeleteButton: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};
