import Modal, { MODAL_TYPES } from "Components/Modal/Modal";

import ModalBody from "Components/Modal/ModalBody";
import React from "react";
import useDevicePermissionStatus from "hooks/useDevicePermissionStatus";

const DevicePermissionPrompt = () => {
  const permission = useDevicePermissionStatus();
  return (
    <Modal
      modalType={MODAL_TYPES.short}
      active={permission === "IN_PROGRESS"}
      closeCallback={() => {}}
      preventUserClose={true}
    >
      <ModalBody>
        <p>
          In order to select media devices, we need to do a quick permissions
          check of your mic and camera.
        </p>
        <p>
          When the pop-up appears, choose <strong>Allow</strong>.
        </p>
      </ModalBody>
    </Modal>
  );
};

export default DevicePermissionPrompt;
