import {
  DevicePermissionStatus,
  Modal,
  ModalBody,
  ModalHeader,
  useDevicePermissionStatus,
} from "lib/chimeComponents";

import Card from "../../Card/Card";
import React from "react";

const DevicePermissionPrompt = () => {
  const permission = useDevicePermissionStatus();
  return permission === DevicePermissionStatus.IN_PROGRESS
    ? React.createElement(
        Modal,
        {
          size: "md",
          onClose: () => {},
          rootId: "device-permission-modal-root",
        },
        React.createElement(ModalHeader, {
          title: "Device Label Permissions check",
          displayClose: false,
        }),
        React.createElement(
          ModalBody,
          null,
          React.createElement(Card, {
            title: "Unable to get device labels",
            description: React.createElement(
              React.Fragment,
              null,
              React.createElement(
                "p",
                null,
                "In order to select media devices, we need to do a quick permissions check of your mic and camera."
              ),
              React.createElement(
                "p",
                null,
                "When the pop-up appears, choose ",
                React.createElement("strong", null, "Allow"),
                "."
              )
            ),
          })
        )
      )
    : null;
};
export default DevicePermissionPrompt;
//# sourceMappingURL=DevicePermissionPrompt.js.map
