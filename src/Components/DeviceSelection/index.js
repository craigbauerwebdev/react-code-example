// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import CameraDevices from "./CameraDevices";
import MicrophoneDevices from "./MicrophoneDevices";
import React from "react";
import SpeakerDevices from "./SpeakerDevices";
import deviceSelectionStyles from "./scss/device-selection.module.scss";

const DeviceSelection = () => (
  <div className={deviceSelectionStyles.styledWrapper}>
    <div className={deviceSelectionStyles.styledAudioGroup}>
      <MicrophoneDevices />
      <SpeakerDevices />
    </div>
    <div className={deviceSelectionStyles.styledVideoGroup}>
      <CameraDevices />
    </div>
  </div>
);

export default DeviceSelection;
