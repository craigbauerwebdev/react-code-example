import Modal, { MODAL_TYPES } from "Components/Modal/Modal";
import ModalButtons, {
  ALIGNMENT_TYPES,
  BUTTON_TYPES,
} from "Components/Modal/ModalButtons";
import React, { useState } from "react";

import ModalBody from "Components/Modal/ModalBody";
import OEPAnalytics from "Components/OEPAnalytics";
import PropTypes from "prop-types";
import disclosureStyles from "./scss/side-bar-disclosure.module.scss";
import sideBarStyles from "./scss/single-side-bar.module.scss";

/**
 * Sidebar Disclosure Button
 * @param {object} data
 * @param {string} data.title section title
 * @param {string} data.page tracking info
 * @param {object} rawData orchestra data
 * @param {array} rawData.Presenters list of presenters
 */
const SideBarDisclosureBtn = ({
  page,
  data: { title },
  rawData: { presenters },
}) => {
  const [showModal, setShowModal] = useState(false);
  const handleOk = () => {
    setShowModal(false);
  };
  const showDisclosureModal = () => {
    setShowModal(true);
  };

  return (
    <section
      className={`${sideBarStyles.sessionMeta} ${sideBarStyles.sessionMetaDisclosure}`}
    >
      <h2>{title}</h2>
      <OEPAnalytics
        page={page}
        componentType="Button"
        url="Open Disclosure Statement"
        componentName="Open Disclosure Statement"
      >
        <div
          className={disclosureStyles.disclosure}
          onClick={showDisclosureModal}
        >
          <img
            src="/images/icons/disclosure-icon.svg"
            alt=""
            role="presentation"
            className={disclosureStyles.defaultIcon}
          />
          <img
            src="/images/icons/disclosure-icon-white.svg"
            alt=""
            role="presentation"
            className={disclosureStyles.hoverIcon}
          />
          <span className={disclosureStyles.spanText}>
            Disclosure Statement
          </span>
        </div>
      </OEPAnalytics>
      <Modal
        modalType={MODAL_TYPES.short}
        closeCallback={handleOk}
        active={showModal}
        button={[
          <ModalButtons
            type={BUTTON_TYPES.confirmation}
            key={BUTTON_TYPES.confirmation}
            alignment={ALIGNMENT_TYPES.right}
            page={page}
            componentType="button"
            url="Close Disclosure Statement"
            componentName="Close Disclosure Statement"
          />,
        ]}
      >
        <ModalBody title="Disclosure Statement">
          {presenters.map((presenter) => (
            <p
              key={presenter}
              dangerouslySetInnerHTML={{
                __html: presenter.disclosureText,
              }}
            />
          ))}
        </ModalBody>
      </Modal>
    </section>
  );
};

export default SideBarDisclosureBtn;

SideBarDisclosureBtn.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    page: PropTypes.string.isRequired,
  }).isRequired,
  rawData: PropTypes.shape({
    presenters: PropTypes.arrayOf(
      PropTypes.shape({
        disclosureText: PropTypes.string.isRequired,
      })
    ).isRequired,
  }),
};
