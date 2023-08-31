import ConfigService from "services/ConfigService";
import cleanEvents from "./utils/cleanEvents";
import getDaysList from "./utils/getDaysList";
import getEvents from "./utils/getEvents";
import getLegend from "./utils/legend";
import getMinHour from "./utils/getMinHour";
import getResourceMap from "./utils/getResourceMap";
import getStartDate from "./utils/getStartData";

export const actionTypesCalendar = {
  SET_EVENTS_LIST: "SET_EVENTS_LIST",
  SET_MODAL: "SET_MODAL",
  SET_TZ: "SET_TZ",
};

export const calendarState = {
  modalSession: null,
  modalActive: false,
  events: null,
  rooms: null,
  defaultDate: null,
  daysList: null,
  tz: ConfigService.runValues.momentTimezone,
  noData: false,
  min: null,
  legend: null,
};
const setEvents = (state, { data, tz }) => {
  // Remove event that are older then today
  const cleanOldEvent = data.filter(cleanEvents(tz));

  if (cleanOldEvent.length) {
    const events = getEvents(cleanOldEvent, tz);

    return {
      ...state,
      events,
      rooms: getResourceMap(cleanOldEvent),
      min: getMinHour(events, tz),
      legend: getLegend(data),
      daysList: getDaysList(cleanOldEvent, tz),
      tz,
      defaultDate: getStartDate(events, tz),
    };
  }

  return {
    ...state,
    noData: true,
  };
};

export const calendarReducer = (state, action) => {
  switch (action.type) {
    case actionTypesCalendar.SET_EVENTS_LIST:
      return setEvents(state, action.payload);
    case actionTypesCalendar.SET_MODAL:
      return {
        ...state,
        modalSession: action.payload.modalSession,
        modalActive: action.payload.modalActive,
      };
    case actionTypesCalendar.SET_TZ:
      return {
        ...state,
        tz: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};
