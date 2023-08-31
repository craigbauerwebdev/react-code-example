import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { useAudioVideo } from "../AudioVideoProvider";
import { useMeetingManager } from "../MeetingProvider";
import { videoInputSelectionToDevice } from "../../lib/chimeComponents";
const Context = createContext(null);
const LocalVideoProvider = ({ children }) => {
  const meetingManager = useMeetingManager();
  const audioVideo = useAudioVideo();
  const [isVideoEnabled, setIsVideoEnabled] = useState(false);
  const [tileId, setTileId] = useState(null);
  useEffect(() => {
    if (!audioVideo) {
      return;
    }
    if (audioVideo.hasStartedLocalVideoTile()) {
      setIsVideoEnabled(true);
    }
    return () => {
      setIsVideoEnabled(false);
    };
  }, [audioVideo]);
  const toggleVideo = useCallback(async () => {
    if (isVideoEnabled || !meetingManager.selectedVideoInputDevice) {
      audioVideo === null || audioVideo === void 0
        ? void 0
        : audioVideo.stopLocalVideoTile();
      setIsVideoEnabled(false);
    } else {
      await (audioVideo === null || audioVideo === void 0
        ? void 0
        : audioVideo.chooseVideoInputDevice(
            videoInputSelectionToDevice(meetingManager.selectedVideoInputDevice)
          ));
      audioVideo === null || audioVideo === void 0
        ? void 0
        : audioVideo.startLocalVideoTile();
      setIsVideoEnabled(true);
    }
  }, [audioVideo, isVideoEnabled, meetingManager.selectedVideoInputDevice]);
  useEffect(() => {
    if (!audioVideo) {
      return;
    }
    const videoTileDidUpdate = (tileState) => {
      if (
        !tileState.localTile ||
        !tileState.tileId ||
        tileId === tileState.tileId
      ) {
        return;
      }
      setTileId(tileState.tileId);
    };
    audioVideo.addObserver({
      videoTileDidUpdate,
    });
  }, [audioVideo, tileId]);
  const value = useMemo(
    () => ({ isVideoEnabled, toggleVideo, tileId, audioVideo }),
    [isVideoEnabled, toggleVideo, audioVideo, tileId]
  );
  return React.createElement(Context.Provider, { value: value }, children);
};
const useLocalVideo = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useLocalVideo must be used within LocalVideoProvider");
  }
  return context;
};
export { LocalVideoProvider, useLocalVideo };
//# sourceMappingURL=index.js.map
