import moment from "moment-timezone";
import setChosenReps from "../utils/setChosenReps";

export const actionTypesMeetingScheduler = {
  SET_BY_REP: "SET_BY_REP",
  SET_BY_TIME: "SET_BY_TIME",
  SET_CALENDAR_VISIBLE: "SET_CALENDAR_VISIBLE",
  SET_CHOSEN_REPS: "SET_CHOSEN_REPS",
  SET_DATE: "SET_DATE",
  SET_MEETING_DURATION: "SET_MEETING_DURATION",
  SET_MEETING_TIME: "SET_MEETING_TIME",
  SET_MEETING_TYPE: "SET_MEETING_TYPE",
  SET_VISIBLE: "SET_VISIBLE",
  CLEAR: "CLEAR",
  CLEAR_AND_TOGGLE: "CLEAR_AND_TOGGLE",
  HANDLE_CHOOSE_A_TIME_BUTTON: "HANDLE_CHOOSE_A_TIME_BUTTON",
  HANDLE_CHOOSE_A_REP_BUTTON: "HANDLE_CHOOSE_A_REP_BUTTON",
  SET_AVAILABILITY_DATE_RANGE: "SET_AVAILABILITY_DATE_RANGE",
  SET_AVAILABILITY_TIMES: "SET_AVAILABILITY_TIMES",
  HANDLE_DATE_CHANGE: "HANDLE_DATE_CHANGE",
  HANDLE_USER_TIMEZONE_CHANGE: "HANDLE_USER_TIMEZONE_CHANGE",
};

export const meetingSchedulerInitState = {
  byRep: null,
  byTime: null,
  calendarVisible: false,
  chosenReps: null,
  date: null,
  meetingDuration: 15,
  meetingTime: null,
  meetingType: "",
  visible: false,
  availabilityStartDate: null,
  availabilityEndDate: null,
  availabilityTimes: null,
  userTimezone: null,
};

export const meetingSchedulerReducer = (state, action) => {
  switch (action.type) {
    case actionTypesMeetingScheduler.SET_BY_REP:
      return {
        ...state,
        byRep: action.payload,
      };
    case actionTypesMeetingScheduler.SET_BY_TIME:
      return {
        ...state,
        byTime: action.payload,
      };
    case actionTypesMeetingScheduler.SET_CALENDAR_VISIBLE:
      return {
        ...state,
        calendarVisible: action.payload,
      };
    case actionTypesMeetingScheduler.SET_CHOSEN_REPS:
      return {
        ...setChosenReps(state, action.payload),
      };
    case actionTypesMeetingScheduler.SET_DATE:
      return {
        ...state,
        date: action.payload,
        meetingTime: null,
      };
    case actionTypesMeetingScheduler.SET_MEETING_DURATION:
      return {
        ...state,
        meetingDuration: action.payload,
      };
    case actionTypesMeetingScheduler.SET_MEETING_TIME:
      return {
        ...state,
        meetingTime: action.payload,
      };
    case actionTypesMeetingScheduler.SET_MEETING_TYPE:
      return {
        ...state,
        meetingType: action.payload,
      };
    case actionTypesMeetingScheduler.SET_VISIBLE:
      return {
        ...state,
        visible: action.payload,
      };
    case actionTypesMeetingScheduler.SET_AVAILABILITY_DATE_RANGE:
      return {
        ...state,
        availabilityStartDate: action.payload.startDate,
        availabilityEndDate: action.payload.endDate,
        date: moment
          .tz(action.payload.startDate, state.userTimezone)
          .format("YYYY-MM-DD"),
      };
    case actionTypesMeetingScheduler.SET_AVAILABILITY_TIMES:
      return {
        ...state,
        availabilityTimes: action.payload,
      };
    case actionTypesMeetingScheduler.CLEAR:
      return {
        ...state,
        byRep: null,
        byTime: null,
        calendarVisible: false,
        chosenReps: null,
        date: state.availabilityStartDate,
        meetingDuration: "",
        meetingTime: null,
        meetingType: "",
        visible: action.payload.visible ? !state.visible : state.visible,
      };
    case actionTypesMeetingScheduler.HANDLE_CHOOSE_A_TIME_BUTTON:
      return {
        ...state,
        byTime: true,
        byRep: false,
        date: moment
          .tz(state.availabilityStartDate, state.userTimezone)
          .format("YYYY-MM-DD"),
        meetingTime:
          action.payload && action.payload.length > 0 && action.payload[0].time,
        calendarVisible: true,
        chosenReps: null,
        availabilityTimes: action.payload,
      };
    case actionTypesMeetingScheduler.HANDLE_CHOOSE_A_REP_BUTTON:
      return {
        ...state,
        byRep: true,
        byTime: false,
        chosenReps: null,
        date: "",
        meetingTime: null,
        calendarVisible: false,
        availabilityTimes: null,
      };
    case actionTypesMeetingScheduler.HANDLE_DATE_CHANGE:
      return {
        ...state,
        date: action.payload.date,
        meetingTime:
          action.payload.availabilityTimes &&
          action.payload.availabilityTimes.length > 0 &&
          action.payload.availabilityTimes[0].time,
        availabilityTimes: action.payload.availabilityTimes,
      };
    case actionTypesMeetingScheduler.HANDLE_USER_TIMEZONE_CHANGE:
      return {
        ...state,
        userTimezone: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};
