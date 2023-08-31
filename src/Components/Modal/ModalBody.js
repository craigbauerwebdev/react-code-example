import React from "react";
import modalStyles from "./scss/modal-overlay.module.scss";

const ModalBody = ({ title, children, titleSrOnly = false, ...props }) => {
  return (
    <div
      className={
        !title || (title && titleSrOnly) ? modalStyles.modalNoTitle : ""
      }
      {...props}
    >
      {title && (
        <h1
          id="modal_label"
          tabIndex="0"
          className={`${modalStyles.modalTitle} ${
            titleSrOnly ? "sr-only" : ""
          }`}
        >
          {title}
        </h1>
      )}
      <div id="modal_desc">{children}</div>
    </div>
  );
};

export default ModalBody;
