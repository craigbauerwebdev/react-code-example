// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import activityBarStyles from "./scss/activity-bar.module.scss";

const ActivityBar = React.forwardRef((props, ref) => (
  <div className={activityBarStyles.track}>
    <div className={activityBarStyles.progress} ref={ref} />
  </div>
));

export default ActivityBar;
