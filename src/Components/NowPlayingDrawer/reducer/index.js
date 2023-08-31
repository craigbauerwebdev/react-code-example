export const actionTypesNowPlayingDrawer = {
  SET_MIN_VIDEO_PLAYER: "SET_MIN_VIDEO_PLAYER",
  SET_DRAWER: "SET_DRAWER",
  SET_BRAWER_AND_PLAYER: "SET_BRAWER_AND_PLAYER",
  SET_VIDEO_AND_SESSION: "SET_VIDEO_AND_SESSION",
  REMOVE_VIDEO_PLAYING: "REMOVE_VIDEO_PLAYING",
  SET_TIMEOUT: "SET_TIMEOUT",
};

export const nowPlayingIntState = {
  miniVideoOpen: false,
  drawerIsOpen: false,
  hideDraw: false,
  session: null,
  watchNow: null,
  removeVideoPlaying: true,
  timeoutSet: false,
  timeoutDur: null,
};

/**
 *
 * @param {NowPlayingState} state
 * @param {Action} action
 *
 * @returns {NowPlayingState}
 */
export const nowPlayingReducer = (state, action) => {
  switch (action.type) {
    case actionTypesNowPlayingDrawer.SET_MIN_VIDEO_PLAYER:
      return {
        ...state,
        miniVideoOpen: action.payload,
        removeVideoPlaying:
          action.payload === true ? false : state.removeVideoPlaying,
      };
    case actionTypesNowPlayingDrawer.SET_DRAWER:
      return {
        ...state,
        drawerIsOpen: action.payload,
      };
    case actionTypesNowPlayingDrawer.SET_BRAWER_AND_PLAYER:
      return {
        ...state,
        miniVideoOpen: action.payload.min,
        drawerIsOpen: action.payload.drawer,
        removeVideoPlaying:
          action.payload.min === true ? false : state.removeVideoPlaying,
      };
    case actionTypesNowPlayingDrawer.SET_VIDEO_AND_SESSION:
      return {
        ...state,
        watchNow: action.payload.watchNow,
        session: action.payload.session,
        timeoutDur: action.payload.timeoutDur,
      };
    case actionTypesNowPlayingDrawer.HIDE_DRAWER:
      return {
        ...state,
        hideDraw: action.payload,
      };
    case actionTypesNowPlayingDrawer.REMOVE_VIDEO_PLAYING:
      return {
        ...state,
        removeVideoPlaying: action.payload,
      };
    case actionTypesNowPlayingDrawer.SET_TIMEOUT:
      return {
        ...state,
        timeoutSet: action.payload,
      };
    default:
      return state;
  }
};
