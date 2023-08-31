import { Label } from "../../../lib/chimeComponents";
import MicrophoneActivityPreviewBar from "./MicrophoneActivityPreviewBar";
import React from "react";
import styles from "../scss/device-selection.module.scss";

const MicrophoneActivityPreview = () => {
  return React.createElement(
    "div",
    { css: styles.styledPreviewGroup },
    React.createElement(
      Label,
      { style: { display: "block", marginBottom: ".5rem" } },
      "Microphone Activity"
    ),
    React.createElement(MicrophoneActivityPreviewBar, null)
  );
};
export default MicrophoneActivityPreview;
