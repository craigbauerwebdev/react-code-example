import { AudioInputProvider, useAudioInputs } from "./AudioInputProvider";
import { AudioOutputProvider, useAudioOutputs } from "./AudioOutputProvider";
import { VideoInputProvider, useVideoInputs } from "./VideoInputProvider";
import React from "react";
const DevicesProvider = ({ children }) =>
  React.createElement(
    AudioInputProvider,
    null,
    React.createElement(
      AudioOutputProvider,
      null,
      React.createElement(VideoInputProvider, null, children)
    )
  );
export { DevicesProvider, useAudioInputs, useAudioOutputs, useVideoInputs };
//# sourceMappingURL=index.js.map
