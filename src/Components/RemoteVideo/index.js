import React from "react";
const RemoteVideo = ({ videoEleRef, enabled }) =>
  React.createElement("video", {
    style: {
      display: enabled ? "block" : "none",
      objectFit: "cover",
      height: "100%",
      width: "100%",
    },
    ref: videoEleRef,
  });
export default RemoteVideo;
//# sourceMappingURL=RemoteVideo.js.map
