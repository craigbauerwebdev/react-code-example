import React, { createContext, useContext, useEffect, useReducer } from "react";
import { VideoTileActionType, initialState, reducer } from "./state";

import { useAudioVideo } from "../AudioVideoProvider";

const Context = createContext(null);
const RemoteVideoTileProvider = ({ children }) => {
  const audioVideo = useAudioVideo();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (!audioVideo) {
      return;
    }
    const observer = {
      videoTileDidUpdate: (tileState) => {
        if (
          (tileState === null || tileState === void 0
            ? void 0
            : tileState.boundAttendeeId) &&
          (tileState === null || tileState === void 0
            ? void 0
            : tileState.tileId) &&
          !tileState.isContent &&
          !tileState.localTile
        ) {
          const { tileId, boundAttendeeId } = tileState;
          dispatch({
            type: VideoTileActionType.UPDATE,
            payload: {
              tileId,
              attendeeId: boundAttendeeId,
            },
          });
        }
      },
      videoTileWasRemoved: (tileId) => {
        dispatch({
          type: VideoTileActionType.REMOVE,
          payload: {
            tileId,
          },
        });
      },
    };
    audioVideo.addObserver(observer);
    return () => audioVideo.removeObserver(observer);
  }, [audioVideo]);

  useEffect(() => {
    if (!audioVideo) {
      return;
    }
    return () => dispatch({ type: VideoTileActionType.RESET });
  }, [audioVideo]);

  return React.createElement(Context.Provider, { value: state }, children);
};

const useRemoteVideoTileState = () => {
  const state = useContext(Context);
  if (!state) {
    throw new Error(
      "useRemoteVideoTileState must be used within a RemoteVideoTileProvider"
    );
  }
  return state;
};

export { RemoteVideoTileProvider, useRemoteVideoTileState };
//# sourceMappingURL=index.js.map
