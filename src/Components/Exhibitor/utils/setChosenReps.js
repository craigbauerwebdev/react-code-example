import moment from "moment-timezone";

const setChosenReps = (state, payload) => {
  if (state.byRep) {
    const meetingTime =
      (payload.availabilityTimes &&
        payload.availabilityTimes.length > 0 &&
        payload.availabilityTimes[0].time) ||
      "";
    const date = moment
      .tz(state.availabilityStartDate, state.userTimezone)
      .format("YYYY-MM-DD");
    return {
      ...state,
      chosenReps: payload.chosenReps,
      meetingTime,
      date,
      availabilityTimes: payload.availabilityTimes,
      calendarVisible: true,
    };
  } else {
    return {
      ...state,
      chosenReps: payload.chosenReps,
      calendarVisible: true,
    };
  }
};

export default setChosenReps;
