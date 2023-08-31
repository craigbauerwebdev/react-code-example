import Modal, { MODAL_TYPES } from "Components/Modal/Modal";

import LinkWrapper from "../LinkWrapper/LinkWrapper";
import ModalBody from "Components/Modal/ModalBody";
import ModalButtons from "Components/Modal/ModalButtons";
import PropTypes from "prop-types";
import React from "react";
import getAnalyticsPage from "util/getAnalyticsPage";
import modalStyles from "./scss/modal-overlay.module.scss";
import { useLocation } from "react-router";

/**
 * Error Modal with link to technical support form
 * https://github.com/Klowd/onlineeventpro-product-ui/wiki/Site-Modal
 * @param {boolean} isActive toggle display of modal
 * @param {function} onCloseErrorModal call parent component to close modal window
 * @param {string} className for styling
 */
const ErrorModal = ({
  isActive,
  onCloseErrorModal,
  customClassName,
  customMessage,
}) => {
  const location = useLocation();
  return (
    <Modal
      closeCallback={onCloseErrorModal}
      active={isActive}
      modalType={MODAL_TYPES.short}
      button={[
        <ModalButtons
          type={"confirmation"}
          key={"confirmation"}
          alignment={"center"}
          page={getAnalyticsPage(location.pathname)}
          componentType="Button"
          confirmationButtonText="Try Again"
          url="Try Again"
          componentName="Close blocked users"
        />,
        <ModalButtons type={"close-icon"} />,
      ]}
    >
      <ModalBody
        className={customClassName || modalStyles.errorModal}
        title={
          customMessage || (
            <div>
              Something went wrong. Please try again or select the{" "}
              <LinkWrapper to="/support" componentName="Support">
                Technical Support Form
              </LinkWrapper>
            </div>
          )
        }
      ></ModalBody>
    </Modal>
  );
};

ErrorModal.propTypes = {
  isActive: PropTypes.bool.isRequired,
  onCloseErrorModal: PropTypes.func.isRequired,
  customClassName: PropTypes.string,
  customMessage: PropTypes.element,
};

export default ErrorModal;
