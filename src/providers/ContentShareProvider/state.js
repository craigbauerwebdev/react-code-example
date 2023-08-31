export var ContentActionType;
(function (ContentActionType) {
  ContentActionType[(ContentActionType["STARTING"] = 0)] = "STARTING";
  ContentActionType[(ContentActionType["DID_STOP"] = 1)] = "DID_STOP";
  ContentActionType[(ContentActionType["UPDATE"] = 2)] = "UPDATE";
  ContentActionType[(ContentActionType["TOGGLE_PAUSE"] = 3)] = "TOGGLE_PAUSE";
  ContentActionType[(ContentActionType["REMOVE"] = 4)] = "REMOVE";
  ContentActionType[(ContentActionType["DENIED"] = 5)] = "DENIED";
  ContentActionType[(ContentActionType["RESET"] = 6)] = "RESET";
})(ContentActionType || (ContentActionType = {}));
export const initialState = {
  tileId: null,
  paused: false,
  isLocalUserSharing: false,
  isLocalShareLoading: false,
  sharingAttendeeId: null,
};
export function reducer(state, { type, payload }) {
  switch (type) {
    case ContentActionType.STARTING: {
      return {
        ...state,
        isLocalShareLoading: true,
      };
    }
    case ContentActionType.UPDATE: {
      const { isLocalUser, tileState } = payload;
      const { tileId } = state;
      if (
        tileId === tileState.tileId ||
        (tileId && tileId > tileState.tileId)
      ) {
        return state;
      }
      return {
        paused: false,
        tileId: tileState.tileId,
        isLocalShareLoading: false,
        isLocalUserSharing: isLocalUser,
        sharingAttendeeId: tileState.boundAttendeeId,
      };
    }
    case ContentActionType.REMOVE: {
      const { tileId } = state;
      if (tileId !== payload) {
        return state;
      }
      return initialState;
    }
    case ContentActionType.DID_STOP: {
      const { isLocalUserSharing } = state;
      if (isLocalUserSharing) {
        return initialState;
      }
      return {
        ...state,
        isLocalShareLoading: false,
        isLocalUserSharing: false,
        paused: false,
      };
    }
    case ContentActionType.TOGGLE_PAUSE: {
      if (!state.isLocalUserSharing) {
        return state;
      }
      return {
        ...state,
        paused: !state.paused,
      };
    }
    case ContentActionType.DENIED: {
      if (!state.isLocalShareLoading) {
        return state;
      }
      return {
        ...state,
        isLocalShareLoading: false,
      };
    }
    case ContentActionType.RESET: {
      return initialState;
    }
    default:
      throw new Error("Incorrect type in VideoProvider");
  }
}
//# sourceMappingURL=state.js.map
