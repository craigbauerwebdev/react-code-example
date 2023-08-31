import {
  CameraSelection,
  Heading,
  PreviewVideo,
  QualitySelection,
} from "lib/chimeComponents";

import React from "react";
import deviceSelectionStyles from "../scss/device-selection.module.scss";

const CameraDevices = () => {
  return (
    <div>
      <Heading tag="h2" level={6} css={deviceSelectionStyles.title}>
        Video
      </Heading>
      <PreviewVideo />
      <div className={deviceSelectionStyles.styledInputGroup}>
        <CameraSelection />
      </div>
      <div className={deviceSelectionStyles.styledInputGroup}>
        <QualitySelection />
      </div>
    </div>
  );
};

export default CameraDevices;
