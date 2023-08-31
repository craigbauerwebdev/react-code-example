import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { AUDIO_INPUT } from "constants";
import { getFormattedDropdownDeviceOptions } from "lib/chimeComponents";
import { useAudioVideo } from "providers/AudioVideoProvider";
import { useMeetingManager } from "providers/MeetingProvider";

const Context = createContext(null);
const AudioInputProvider = ({ children }) => {
  const meetingManager = useMeetingManager();
  const audioVideo = useAudioVideo();
  const [audioInputs, setAudioInputs] = useState([]);
  const [selectedAudioInputDevice, setSelectedAudioInputDevice] = useState(
    meetingManager.selectedAudioInputDevice
  );
  const selectedInputRef = useRef(selectedAudioInputDevice);
  const contextValue = useMemo(
    () => ({
      devices: audioInputs,
      selectedDevice: selectedAudioInputDevice,
    }),
    [audioInputs, selectedAudioInputDevice]
  );

  selectedInputRef.current = selectedAudioInputDevice;

  useEffect(() => {
    const callback = (updatedAudioInputDevice) => {
      setSelectedAudioInputDevice(updatedAudioInputDevice);
    };
    meetingManager.subscribeToSelectedAudioInputDevice(callback);
    return () => {
      meetingManager.unsubscribeFromSelectedAudioInputDevice(callback);
    };
  }, [meetingManager]);

  useEffect(() => {
    let isMounted = true;
    const observer = {
      audioInputsChanged: async (newAudioInputs) => {
        const hasSelectedDevice = newAudioInputs.some(
          (device) => device.deviceId === selectedInputRef.current
        );
        if (
          selectedInputRef.current &&
          !hasSelectedDevice &&
          newAudioInputs.length
        ) {
          meetingManager.selectAudioInputDevice(newAudioInputs[0].deviceId);
        } else if (selectedInputRef.current === "default") {
          try {
            await (audioVideo === null || audioVideo === void 0
              ? void 0
              : audioVideo.chooseAudioInputDevice(selectedInputRef.current));
          } catch (e) {
            // eslint-disable-next-line no-console
            console.debug(e);
          }
        }
        setAudioInputs(newAudioInputs);
      },
    };
    async function initAudioInput() {
      if (!audioVideo) {
        return;
      }
      const devices = await audioVideo.listAudioInputDevices();
      if (isMounted) {
        setAudioInputs(devices);
        audioVideo.addDeviceChangeObserver(observer);
      }
    }
    initAudioInput();
    return () => {
      isMounted = false;
      audioVideo === null || audioVideo === void 0
        ? void 0
        : audioVideo.removeDeviceChangeObserver(observer);
    };
  }, [audioVideo, meetingManager]);

  return React.createElement(
    Context.Provider,
    { value: contextValue },
    children
  );
};
const useAudioInputs = (props) => {
  const needAdditionalIO = props && props.additionalDevices;
  const context = useContext(Context);
  if (!context) {
    throw new Error("useAudioInputs must be used within AudioInputProvider");
  }
  let { devices } = context;
  const { selectedDevice } = context;
  if (needAdditionalIO) {
    const additionalAudioInputs = getFormattedDropdownDeviceOptions(
      AUDIO_INPUT
    );
    if (additionalAudioInputs !== null) {
      devices = [...devices, ...additionalAudioInputs];
    }
  }
  return { devices, selectedDevice };
};
export { AudioInputProvider, useAudioInputs };
//# sourceMappingURL=AudioInputProvider.js.map
