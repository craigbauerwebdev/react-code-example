import React, { createContext, useContext, useState } from "react";

import { AudioVideoProvider } from "../AudioVideoProvider";
import { ContentShareProvider } from "../ContentShareProvider";
import { DevicesProvider } from "../DevicesProvider";
import { FeaturedVideoTileProvider } from "../FeaturedVideoTileProvider";
import { LocalAudioOutputProvider } from "../LocalAudioOutputProvider";
import { LocalVideoProvider } from "../LocalVideoProvider";
import { LogLevel } from "amazon-chime-sdk-js";
import MeetingManager from "./MeetingManager";
import { RemoteVideoTileProvider } from "../RemoteVideoTileProvider";
import { RosterProvider } from "../RosterProvider";
export const MeetingContext = createContext(null);
export const MeetingProvider = ({
  logLevel = LogLevel.WARN,
  postLogConfig,
  simulcastEnabled = false,
  children,
}) => {
  const [meetingManager] = useState(
    () => new MeetingManager({ logLevel, postLogConfig, simulcastEnabled })
  );
  return React.createElement(
    MeetingContext.Provider,
    { value: meetingManager },
    React.createElement(
      AudioVideoProvider,
      null,
      React.createElement(
        DevicesProvider,
        null,
        React.createElement(
          RosterProvider,
          null,
          React.createElement(
            RemoteVideoTileProvider,
            null,
            React.createElement(
              LocalVideoProvider,
              null,
              React.createElement(
                LocalAudioOutputProvider,
                null,
                React.createElement(
                  ContentShareProvider,
                  null,
                  React.createElement(FeaturedVideoTileProvider, null, children)
                )
              )
            )
          )
        )
      )
    )
  );
};
export const useMeetingManager = () => {
  const meetingManager = useContext(MeetingContext);
  if (!meetingManager) {
    throw new Error("useMeetingManager must be used within MeetingProvider");
  }
  return meetingManager;
};
//# sourceMappingURL=index.js.map
