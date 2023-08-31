export const actionTypes = {
  HIDE_SESSION: "HIDE_SESSION",
  REMOVE_SESSION: "REMOVE_SESSION",
  SET_WATCH_NOW: "SET_WATCH_NOW",
  SET_TIMER_TO_EVENT: "SET_TIMER_TO_EVENT",
  SET_SESSIONS_DISPLAY: "SET_SESSIONS_DISPLAY",
  RESET: "RESET",
};

const hideItem = (state, item) => {
  const copy = state.sessionsDisplay.map((s) => {
    if (s.SessionId === item.SessionId) {
      s.active = false;
    }
    return s;
  });

  return {
    ...state,
    sessionsDisplay: copy,
  };
};

const removeItem = (state, { session, name }) => {
  const animationName = name.split("_");

  if (animationName.includes("slidOut")) {
    const copy = state.sessionsDisplay.filter(
      (s) => s.SessionId !== session.SessionId
    );

    return {
      ...state,
      sessionsDisplay: copy,
    };
  }

  return {
    ...state,
  };
};

const autoHide = (state) => {
  const [item] = state.sessionsDisplay.slice(0, 1);
  const copy = state.sessionsDisplay.map((s) => {
    if (s.SessionId === item.SessionId) {
      s.active = false;
    }
    return s;
  });

  return {
    ...state,
    sessionsDisplay: copy,
  };
};

const setDisplay = (state, payload) => {
  const id = payload.map((s) => s.SessionId);
  const updateWatchNow = state.watchNow.filter(
    (s) => !id.includes(s.SessionId)
  );

  return {
    ...state,
    watchNow: updateWatchNow,
    sessionsDisplay: payload,
    timerEventSet: false,
  };
};

export const alertReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_WATCH_NOW:
      return {
        ...state,
        watchNow: action.payload.watchNow,
      };
    case actionTypes.HIDE_SESSION:
      return hideItem(state, action.payload);
    case actionTypes.REMOVE_SESSION:
      return removeItem(state, action.payload);
    case actionTypes.AUTO_HIDE:
      return autoHide(state);
    case actionTypes.SET_TIMER_TO_EVENT:
      return {
        ...state,
        timerEventSet: action.payload,
      };
    case actionTypes.SET_SESSIONS_DISPLAY:
      return setDisplay(state, action.payload);
    case actionTypes.RESET:
      return {
        sessionsDisplay: null,
        watchNow: null,
        timerEventSet: false,
      };
    default:
      return {
        ...state,
      };
  }
};
