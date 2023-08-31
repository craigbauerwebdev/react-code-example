import { Dialog } from "@progress/kendo-react-dialogs";
import React from "react";

const MeetingRemovedPopup = ({ showModal }) => {
  return (
    <Dialog
      onClose={showModal}
      title={
        <span id="modal_title" tabIndex="0">
          Meeting Info
        </span>
      }
      width={700}
      autoFocus={true}
      aria-modal={true}
      aria-labelledby="modal_title"
      aria-describedby="modal_desc"
    >
      This meeting has been cancelled
    </Dialog>
  );
};

export default MeetingRemovedPopup;
