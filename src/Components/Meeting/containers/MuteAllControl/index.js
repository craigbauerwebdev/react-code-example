import {
  ControlBarButton,
  Remove,
  useAudioVideo,
} from "../../../../lib/chimeComponents";

import React from "react";
import { useAppState } from "../../../../providers/AppStateProvider";
import { TOPICS } from "../../constants";

const MuteAllControl = () => {
  const { meetingId } = useAppState();
  const audioVideo = useAudioVideo();
  const muteAll = () => {
    const data = {
      meetingId,
    };

    audioVideo === null || audioVideo === void 0
      ? void 0
      : audioVideo.realtimeSendDataMessage(
          TOPICS.muteAll,
          JSON.stringify(data)
        );
  };

  return React.createElement(ControlBarButton, {
    icon: React.createElement(Remove, null),
    onClick: muteAll,
    label: "Mute All",
    popOver: null,
  });
};
export default MuteAllControl;
//# sourceMappingURL=index.js.map
