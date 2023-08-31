import * as actionTypes from "../actions/actionTypes";

import formatMeetings from "store/reducers/utils/formatMeetings";
import setRosterMapping from "../utils/setRosterMapping";
import updateRosterMapping from "../utils/updateRosterMapping";

const initialState = {
  rosterMapping: {},
  currentMeeting: null,
  attendeeInfo: null,
};

const chimeMeetingReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ROSTER_MAPPING:
      return {
        ...state,
        rosterMapping: setRosterMapping(state, action.payload),
      };
    case actionTypes.UPDATE_ROSTER_MAPPING:
      return {
        ...state,
        rosterMapping: updateRosterMapping(state, action.payload),
      };

    case actionTypes.SET_CURRENT_MEETING:
      return {
        ...state,
        currentMeeting: formatMeetings([action.payload])[0],
      };
    case actionTypes.SET_ATTENDEE_INFO:
      return {
        ...state,
        attendeeInfo: action.payload,
        rosterMapping: setRosterMapping(state, action.payload.mappings),
      };
    case actionTypes.CLEAR_MEETING:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default chimeMeetingReducer;
