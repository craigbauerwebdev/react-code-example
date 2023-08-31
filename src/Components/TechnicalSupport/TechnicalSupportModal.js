import Modal, { MODAL_TYPES } from "Components/Modal/Modal";
import ModalButtons, { BUTTON_TYPES } from "Components/Modal/ModalButtons";
import React, { useReducer } from "react";
import { actionTypes, technicalSupportModalReducer } from "./reducer";

import ModalBody from "Components/Modal/ModalBody";
import OEPAnalytics from "Components/OEPAnalytics";
import TechnicalSupportForm from "./TechnicalSupportForm.js";
import modalStyles from "./scss/modal.module.scss";
import staticData from "./TechnicalSupport.data.js";
import { useLocation } from "react-router-dom";

/**
 * Renders a button that will open a modal when clicked. The modal will contain the Technical Support Form.
 * In addition, the current page that the button is on will be added as the referrer URL when the form is submitted.
 *
 * @param {Object} user The user information
 * @param {string} classes The class(es) that will be given to the button that will open the Technical Support Form Modal
 * @param {string} label The label for the button. Defaults to "Technical Support"
 */
const TechnicalSupportModal = ({
  user,
  classes,
  label = "Technical Support",
}) => {
  const { pathname } = useLocation();
  const [technicalSupportModalState, dispatchLoginModal] = useReducer(
    technicalSupportModalReducer,
    {
      showModal: false,
    }
  );

  const showModal = () => {
    dispatchLoginModal({
      type: actionTypes.SHOW_MODAL,
    });
  };

  // Click outside the modal to close.
  const handleOk = () => {
    dispatchLoginModal({
      type: actionTypes.HIDE_MODAL,
    });
  };

  return (
    <React.Fragment>
      <OEPAnalytics
        page="networking"
        componentType="Button"
        url="Submit technical support form"
        componentName={label}
      >
        <button className={classes} onClick={showModal} type="button">
          {label}
        </button>
      </OEPAnalytics>
      <Modal
        closeCallback={handleOk}
        active={technicalSupportModalState.showModal}
        modalType={MODAL_TYPES.form}
        techSupportStyle
        button={[
          <ModalButtons
            type={BUTTON_TYPES.closeIcon}
            key={BUTTON_TYPES.closeIcon}
            componentName="Show modal"
          />,
        ]}
      >
        <ModalBody title={staticData.technicalSupportFormTitle}>
          <div className={modalStyles.scrollContainer}>
            <TechnicalSupportForm
              user={user}
              isModal
              closeModalFunction={handleOk}
              referrerUrl={pathname}
            />
          </div>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default TechnicalSupportModal;
