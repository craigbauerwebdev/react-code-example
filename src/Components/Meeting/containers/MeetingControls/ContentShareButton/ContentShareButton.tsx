import {
  ControlBarButton,
  Remove,
  ScreenShare,
  useContentShareControls,
  useContentShareState,
} from "lib/chimeComponents";

import React from "react";

export const ContentShareButton: React.FC = () => {
  const { isLocalUserSharing } = useContentShareState();
  const { toggleContentShare } = useContentShareControls();

  return (
    <ControlBarButton
      label={isLocalUserSharing ? "Stop" : "Share"}
      onClick={toggleContentShare}
      icon={isLocalUserSharing ? <Remove /> : <ScreenShare />}
    />
  );
};
