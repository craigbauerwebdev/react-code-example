import React, { useRef } from "react";

import ActivityBar from "../../ActivityBar";
import { useLocalAudioInputActivityPreview } from "../../../lib/chimeComponents";

const MicrophoneActivityPreviewBar = () => {
  const activityBarRef = useRef();
  useLocalAudioInputActivityPreview(activityBarRef);
  return React.createElement(ActivityBar, { ref: activityBarRef });
};
export default MicrophoneActivityPreviewBar;
