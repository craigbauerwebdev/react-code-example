import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { VIDEO_INPUT } from "../../constants";
import { getFormattedDropdownDeviceOptions } from "../../lib/chimeComponents";
import { useAudioVideo } from "../AudioVideoProvider";
import { useMeetingManager } from "../MeetingProvider";

const Context = createContext(null);
const VideoInputProvider = ({ children }) => {
  const audioVideo = useAudioVideo();
  const [videoInputs, setVideoInputs] = useState([]);
  const meetingManager = useMeetingManager();
  const [selectedVideoInputDevice, setSelectedVideoInputDevice] = useState(
    meetingManager.selectedVideoInputDevice
  );
  const contextValue = useMemo(
    () => ({
      devices: videoInputs,
      selectedDevice: selectedVideoInputDevice,
    }),
    [videoInputs, selectedVideoInputDevice]
  );

  useEffect(() => {
    const callback = (updatedVideoInputDevice) => {
      setSelectedVideoInputDevice(updatedVideoInputDevice);
    };
    meetingManager.subscribeToSelectedVideoInputDevice(callback);
    return () => {
      meetingManager.unsubscribeFromSelectedVideoInputDevice(callback);
    };
  }, [meetingManager]);

  useEffect(() => {
    let isMounted = true;
    const observer = {
      videoInputsChanged: (newvideoInputs) => {
        setVideoInputs(newvideoInputs);
      },
    };
    async function initVideoInput() {
      if (!audioVideo) {
        return;
      }
      const devices = await audioVideo.listVideoInputDevices();
      if (isMounted) {
        setVideoInputs(devices);
        audioVideo.addDeviceChangeObserver(observer);
      }
    }

    initVideoInput();

    return () => {
      isMounted = false;
      audioVideo === null || audioVideo === void 0
        ? void 0
        : audioVideo.removeDeviceChangeObserver(observer);
    };
  }, [audioVideo]);

  return React.createElement(
    Context.Provider,
    { value: contextValue },
    children
  );
};
const useVideoInputs = (props) => {
  const needAdditionalIO = props && props.additionalDevices;
  const additionalIOJSON = props && VIDEO_INPUT;
  const context = useContext(Context);
  if (!context) {
    throw new Error("useVideoInputs must be used within VideoInputProvider");
  }
  let { devices } = context;
  const { selectedDevice } = context;
  if (needAdditionalIO) {
    const additionalVideoInputs = getFormattedDropdownDeviceOptions(
      additionalIOJSON
    );
    if (additionalVideoInputs !== null) {
      devices = [...devices, ...additionalVideoInputs];
    }
  }
  return { devices, selectedDevice };
};
export { VideoInputProvider, useVideoInputs };
//# sourceMappingURL=VideoInputProvider.js.map
