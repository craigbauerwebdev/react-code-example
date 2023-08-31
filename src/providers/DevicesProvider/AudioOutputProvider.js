import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { useAudioVideo } from "../AudioVideoProvider";
import { useMeetingManager } from "../MeetingProvider";

const AudioOutputContext = createContext(null);
const AudioOutputProvider = ({ children }) => {
  const audioVideo = useAudioVideo();
  const [audioOutputs, setAudioOutputs] = useState([]);
  const meetingManager = useMeetingManager();
  const [selectedAudioOutputDevice, setSelectedAudioOutputDevice] = useState(
    meetingManager.selectedAudioOutputDevice
  );
  const contextValue = useMemo(
    () => ({
      devices: audioOutputs,
      selectedDevice: selectedAudioOutputDevice,
    }),
    [audioOutputs, selectedAudioOutputDevice]
  );

  useEffect(() => {
    const callback = (updatedAudioOutputDevice) => {
      setSelectedAudioOutputDevice(updatedAudioOutputDevice);
    };
    meetingManager.subscribeToSelectedAudioOutputDevice(callback);
    return () => {
      meetingManager.unsubscribeFromSelectedAudioOutputDevice(callback);
    };
  }, [meetingManager]);

  useEffect(() => {
    let isMounted = true;
    const observer = {
      audioOutputsChanged: (newAudioOutputs) => {
        setAudioOutputs(newAudioOutputs);
      },
    };
    async function initAudioOutput() {
      if (!audioVideo) {
        return;
      }
      const devices = await audioVideo.listAudioOutputDevices();
      if (isMounted) {
        setAudioOutputs(devices);
        audioVideo.addDeviceChangeObserver(observer);
      }
    }
    initAudioOutput();
    return () => {
      isMounted = false;
      audioVideo === null || audioVideo === void 0
        ? void 0
        : audioVideo.removeDeviceChangeObserver(observer);
    };
  }, [audioVideo]);

  return React.createElement(
    AudioOutputContext.Provider,
    { value: contextValue },
    children
  );
};

const useAudioOutputs = () => {
  const context = useContext(AudioOutputContext);
  if (!context) {
    throw new Error("useAudioOutputs must be used within AudioOutputProvider");
  }
  return context;
};
export { AudioOutputProvider, useAudioOutputs };
//# sourceMappingURL=AudioOutputProvider.js.map
