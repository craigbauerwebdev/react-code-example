import * as actionTypes from "./actionTypes";

export const setRosterMapping = (payload) => ({
  type: actionTypes.SET_ROSTER_MAPPING,
  payload,
});

export const updateRosterMapping = (payload) => ({
  type: actionTypes.UPDATE_ROSTER_MAPPING,
  payload,
});

export const clearMeeting = () => ({
  type: actionTypes.CLEAR_MEETING,
});

export const setCurrentMeeting = (payload) => ({
  type: actionTypes.SET_CURRENT_MEETING,
  payload,
});

export const setAttendeeInfo = (payload) => ({
  type: actionTypes.SET_ATTENDEE_INFO,
  payload,
});
