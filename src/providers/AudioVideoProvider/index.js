import React, { createContext, useContext, useEffect, useState } from "react";

import { useMeetingManager } from "providers/MeetingProvider";

export const AudioVideoContext = createContext(null);
const AudioVideoProvider = ({ children }) => {
  const meetingManager = useMeetingManager();
  const [audioVideo, setAudioVideo] = useState(null);

  useEffect(() => {
    function audioVideoUpdateCb(av) {
      setAudioVideo(av);
    }

    meetingManager.subscribeToAudioVideo(audioVideoUpdateCb);

    return () => meetingManager.unsubscribeFromAudioVideo(audioVideoUpdateCb);
  }, [meetingManager]);

  return React.createElement(
    AudioVideoContext.Provider,
    { value: audioVideo },
    children
  );
};

const useAudioVideo = () => {
  const audioVideo = useContext(AudioVideoContext);
  return audioVideo;
};

export { useAudioVideo, AudioVideoProvider };
//# sourceMappingURL=index.js.map
