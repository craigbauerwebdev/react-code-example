// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import React, { useState } from "react";
import {
  SecondaryButton,
  SpeakerSelection,
  useAudioOutputs,
} from "../../../lib/chimeComponents";

import TestSound from "util/TestSound";

const SpeakerDevices = () => {
  const { selectedDevice } = useAudioOutputs();
  const [selectedOutput, setSelectedOutput] = useState(selectedDevice);

  const handleChange = (deviceId) => {
    setSelectedOutput(deviceId);
  };

  const handleTestSpeaker = () => {
    new TestSound(selectedOutput);
  };

  return (
    <div>
      <SpeakerSelection onChange={handleChange} />
      <SecondaryButton label="Test Speakers" onClick={handleTestSpeaker} />
    </div>
  );
};

export default SpeakerDevices;
