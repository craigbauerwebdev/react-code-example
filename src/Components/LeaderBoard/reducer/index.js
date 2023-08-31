import changeBoard from "./utils/changeBoard";
import getActiveBoard from "./utils/getActiveBoard";

export const actionTypesLeaderBoard = {
  SET_BADGES: "SET_BADGES",
  CHANGE_BOARD: "CHANGE_BOARD",
  CHANGE_TIMESTAMP: "CHANGE_TIMESTAMP",
};

export const leaderBoardInitState = {
  badgeOptions: null,
  activeBoard: null,
  noBoards: false,
  displayLeaderBoards: false,
  boardName: null,
  timestamp: null,
};

export const leaderBoardReducer = (state, action) => {
  switch (action.type) {
    case actionTypesLeaderBoard.SET_BADGES:
      return {
        ...state,
        badgeOptions: action.payload,
        noBoards: action.payload === null, // No badge data from liferay display sorry message
        displayLeaderBoards: action.payload !== null, // We have badge data show boards.
        ...getActiveBoard(action.payload),
      };
    case actionTypesLeaderBoard.CHANGE_BOARD:
      return {
        ...state,
        ...changeBoard(state.badgeOptions, action.payload),
      };
    case actionTypesLeaderBoard.CHANGE_TIMESTAMP:
      return {
        ...state,
        timestamp: action.payload,
      };
    default:
      return state;
  }
};
