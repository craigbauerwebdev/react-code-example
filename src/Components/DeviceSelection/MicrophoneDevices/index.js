import { Heading, MicSelection } from "../../../lib/chimeComponents";

import MicrophoneActivityPreview from "./MicrophoneActivityPreview";
import React from "react";
import styles from "../scss/device-selection.module.scss";

const MicrophoneDevices = () => {
  return React.createElement(
    "div",
    null,
    React.createElement(
      Heading,
      { tag: "h2", level: 6, css: styles.title },
      "Audio"
    ),
    React.createElement(MicSelection, null),
    React.createElement(MicrophoneActivityPreview, null)
  );
};
export default MicrophoneDevices;
