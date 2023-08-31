export const actionTypesPagination = {
  NEXT_PAGE: "NEXT_PAGE",
  PREV_PAGE: "PREV_PAGE",
  SET_END: "SET_END",
  RESET_PAGINATION: "RESET_PAGINATION",
  SET_START_AND_END_INDEX: "SET_START_AND_END_INDEX",
};

export const paginationState = {
  startIndex: 0,
  endIndex: 0,
  inc: 0,
};

const prev = (state, payload) => {
  if (state.endIndex - state.inc > 0) {
    const startIndex = state.startIndex - state.inc;
    const endIndex = state.endIndex - state.inc;

    payload.updateCurrentStartIndex(startIndex);
    payload.updateCurrentEndIndex(endIndex);

    return {
      ...state,
      startIndex,
      endIndex,
    };
  }

  return {
    ...state,
  };
};

const next = (state, payload) => {
  if (state.startIndex + state.inc <= payload.total) {
    const startIndex = state.startIndex + state.inc;
    const endIndex = state.endIndex + state.inc;
    payload.updateCurrentStartIndex(startIndex);
    payload.updateCurrentEndIndex(endIndex);

    return {
      ...state,
      startIndex,
      endIndex,
    };
  }

  return {
    ...state,
  };
};

const setStartAndEndIndex = (state, payload) => {
  if (
    state.startIndex === payload?.startIndex &&
    state.endIndex === payload?.endIndex
  ) {
    return state;
  }
  return {
    ...state,
    startIndex: payload?.startIndex || 0,
    endIndex: payload?.endIndex || state.inc,
  };
};

export const paginationReducer = (state, action) => {
  switch (action.type) {
    case actionTypesPagination.NEXT_PAGE:
      return next(state, action.payload);

    case actionTypesPagination.PREV_PAGE:
      return prev(state, action.payload);

    case actionTypesPagination.SET_END:
      return {
        ...state,
        endIndex: state.endIndex || action.payload,
        inc: action.payload,
      };

    case actionTypesPagination.SET_START_AND_END_INDEX:
      return setStartAndEndIndex(state, action.payload);

    case actionTypesPagination.RESET_PAGINATION:
      return {
        ...state,
        startIndex: 0,
        endIndex: state.inc,
      };

    default:
      return state;
  }
};
