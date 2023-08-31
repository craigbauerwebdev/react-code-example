import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { useAudioVideo } from "../AudioVideoProvider";
const Context = createContext(null);
const LocalAudioOutputProvider = ({ children }) => {
  const audioVideo = useAudioVideo();
  const [isAudioOn, setIsAudioOn] = useState(true);
  const audioRef = useRef(null);
  useEffect(() => {
    if (!audioVideo) {
      return;
    }
    if (audioRef.current) {
      (async (element) => {
        try {
          await audioVideo.bindAudioElement(element);
        } catch (e) {
          // console.error("Failed to bind audio element.", e);
        }
      })(audioRef.current);
    }
    return () => {
      audioVideo.unbindAudioElement();
    };
  }, [audioVideo]);
  const toggleAudio = useCallback(() => {
    if (!audioRef.current) {
      return;
    }
    setIsAudioOn(!isAudioOn);
    if (isAudioOn) {
      audioVideo === null || audioVideo === void 0
        ? void 0
        : audioVideo.unbindAudioElement();
    } else {
      (async (element) => {
        try {
          await (audioVideo === null || audioVideo === void 0
            ? void 0
            : audioVideo.bindAudioElement(element));
        } catch (e) {
          // console.error("Failed to bind audio element.", e);
        }
      })(audioRef.current);
    }
  }, [audioRef, audioVideo, isAudioOn]);
  const value = useMemo(() => ({ isAudioOn, toggleAudio }), [
    isAudioOn,
    toggleAudio,
  ]);
  return React.createElement(
    Context.Provider,
    { value: value },
    children,
    React.createElement("audio", { ref: audioRef, style: { display: "none" } })
  );
};
const useLocalAudioOutput = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error(
      "useLocalAudioOutput must be used within LocalAudioOutputProvider"
    );
  }
  return context;
};
export { LocalAudioOutputProvider, useLocalAudioOutput };
//# sourceMappingURL=index.js.map
