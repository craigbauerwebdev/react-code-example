import { Dialog } from "@progress/kendo-react-dialogs";
import OEPAnalytics from "Components/OEPAnalytics";
import React from "react";
import SvgTypes from "Components/SVG/SvgTypes";
import saveSuccessModalStyles from "./scss/save-success-modal.module.scss";

const SaveSuccessModal = ({ message, show, close, buttonText = "Okay" }) => {
  return show ? (
    <Dialog autoFocus={true} aria-modal={true} aria-describedby="modal_desc">
      <div id="modal_desc" className={saveSuccessModalStyles.container}>
        <div className={saveSuccessModalStyles.mainContainer}>
          <div> {message}</div>
          <OEPAnalytics
            componentType="Button"
            page="My Schedule"
            url="Close modal"
            componentName="Close modal"
          >
            <button
              type="button"
              aria-label="Close Modal"
              onClick={close}
              className={saveSuccessModalStyles.closeIcon}
            >
              <SvgTypes name="close-icon" />
            </button>
          </OEPAnalytics>
        </div>
        <OEPAnalytics
          componentType="Button"
          page="My Schedule"
          url="Close modal"
          componentName="Close modal"
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              type="button"
              aria-label="Close Modal"
              onClick={close}
              className={saveSuccessModalStyles.okayButton}
            >
              {buttonText}
            </button>
          </div>
        </OEPAnalytics>
      </div>
    </Dialog>
  ) : (
    ""
  );
};

export default SaveSuccessModal;
