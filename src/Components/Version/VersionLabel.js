import React from "react";
import { Versioning as SDKVersioning } from "amazon-chime-sdk-js";
import { Versioning } from "../../lib/chimeComponents";

export const VersionLabel = () => {
  const versionTag = `${Versioning.sdkName}@${Versioning.sdkVersion}`;
  const sdkVersionTag = `${SDKVersioning.sdkName}@${SDKVersioning.sdkVersion}`;

  return React.createElement(
    "span",
    {
      style: {
        position: "absolute",
        bottom: 1,
        right: 1,
        color: "#989da5",
        fontSize: "0.70rem",
      },
    },
    versionTag,
    " | ",
    sdkVersionTag
  );
};
//# sourceMappingURL=VersionLabel.js.map
