import PropTypes from "prop-types";
import React from "react";
import SvgTypes from "Components/SVG/SvgTypes";
import modalStyles from "./scss/modal-overlay.module.scss";
import { saveAnalytic } from "Components/OEPAnalytics";

export const BUTTON_TYPES = {
  closeIcon: "close-icon",
  closeIconFilter: "close-icon-filter",
  confirmation: "confirmation",
  dismiss: "dismiss",
  confirmationOrDismiss: "confirmationOrDismiss",
  externalSite: "externalSite",
  apply: "apply",
};

export const ALIGNMENT_TYPES = {
  right: "right",
  center: "center",
  left: "left",
};
/**
 * Modal Buttons
 * @param {string} type used to fine what button should be used
 * @param {function} clickEvt fade out modal calls Modal.js to start closing process
 * @param {string} alignment used as a class to align the buttons flex box
 * @param {string} cbValue value you want to pass back to outer most parent. Example if you need to know fi the user clicked yes or no.  Used in LinkWrapper for externalModal.
 */
const ModalButtons = ({
  type,
  clickEvt,
  closeModal,
  alignment,
  cbValue,
  page = "",
  url = "",
  componentType = "",
  confirmationButtonText = "OK",
  componentName,
}) => {
  const tracking = () => {
    saveAnalytic({ page, url, componentType, componentName });
  };

  switch (type) {
    case BUTTON_TYPES.closeIcon:
      return (
        <button
          className={modalStyles.close}
          onClick={(e) => {
            tracking();
            clickEvt();
          }}
          tabIndex="0"
          title="Close modal"
          aria-label="Close modal"
        >
          <SvgTypes name="close-modal" />
        </button>
      );
    case BUTTON_TYPES.closeIconFilter:
      return (
        <button
          className={modalStyles.close}
          onClick={(e) => {
            tracking();
            closeModal();
          }}
          tabIndex="0"
          title="Close modal"
          aria-label="Close modal"
        >
          <SvgTypes name="close-modal" />
        </button>
      );
    case BUTTON_TYPES.confirmation:
      return (
        <div
          className={`${modalStyles.confirmation} ${modalStyles[alignment]}`}
        >
          <button
            onClick={(e) => {
              tracking();
              clickEvt(e, cbValue);
            }}
          >
            {confirmationButtonText}
          </button>
        </div>
      );
    case BUTTON_TYPES.dismiss:
      return (
        <div
          className={`${modalStyles.confirmation} ${modalStyles[alignment]}`}
        >
          <button
            onClick={(e) => {
              tracking();
              clickEvt(e, cbValue);
            }}
          >
            cancel
          </button>
        </div>
      );
    case BUTTON_TYPES.externalSite:
      return (
        <div
          className={`${modalStyles.externalSite} ${modalStyles[alignment]}`}
        >
          <a
            href={cbValue}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              tracking();
              clickEvt(e);
            }}
          >
            OK
          </a>
        </div>
      );
    case BUTTON_TYPES.confirmationOrDismiss:
      return (
        <div
          className={`${modalStyles.confirmation} ${modalStyles[alignment]}`}
        >
          <button
            className={modalStyles.dissmiss}
            onClick={(e) => {
              clickEvt(e, 0);
            }}
          >
            Cancel
          </button>

          <button
            onClick={(e) => {
              tracking();
              clickEvt(e, 1);
            }}
          >
            {confirmationButtonText}
          </button>
        </div>
      );
    case BUTTON_TYPES.apply:
      return (
        <div className={`${modalStyles.apply} ${modalStyles.center}`}>
          <button
            onClick={(e) => {
              tracking();
              clickEvt(e, 1);
            }}
          >
            Apply Filters
          </button>
        </div>
      );
    default:
      return null;
  }
};

ModalButtons.propTypes = {
  type: PropTypes.string.isRequired,
  alignment: PropTypes.string,
};

export default ModalButtons;
