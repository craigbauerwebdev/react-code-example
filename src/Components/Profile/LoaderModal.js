import Modal, { MODAL_TYPES } from "Components/Modal/Modal";

import Loader from "Components/Loader";
import React from "react";
import loaderModalStyles from "./scss/loader-modal.module.scss";

const LoaderModal = ({ active, message, disableParentPageScroll }) => {
  if (!message) message = "Updating";
  return (
    <Modal
      active={active}
      closeCallback={() => {}}
      modalType={MODAL_TYPES.short}
      preventUserClose={true}
      disableParentPageScroll={disableParentPageScroll}
    >
      <div className={loaderModalStyles.loaderModal}>
        <h3>{message}</h3>
        <Loader />
      </div>
    </Modal>
  );
};

export default LoaderModal;
