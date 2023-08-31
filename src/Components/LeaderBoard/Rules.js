import Modal, { MODAL_TYPES } from "Components/Modal/Modal";
import ModalButtons, { BUTTON_TYPES } from "Components/Modal/ModalButtons";
import React, { Fragment, useState } from "react";

import OEPAnalytics from "Components/OEPAnalytics";
import PropTypes from "prop-types";
import RuleModal from "./RuleModal";
import rulesStyles from "./scss/rules.module.scss";

/**
 * https://github.com/Klowd/onlineeventpro-product-ui/wiki/Leaderboard
 * Right hand sidebar.
 * Data comes from Liferay
 * @param {object} rulesData
 */
const Rules = ({ rulesData }) => {
  const [modalActive, setModalActive] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const openRule = (badge) => {
    // Display modal for badge content
    setModalActive(true);
    setModalContent(badge);
  };
  const closeModal = () => {
    setModalActive(false);
  };

  return (
    <Fragment>
      <div className={rulesStyles.rules}>
        {rulesData?.rulesTitle && <h2>{rulesData.rulesTitle}</h2>}
        {rulesData?.rules &&
          rulesData?.rules.map((rule) => (
            <div key={rule.title} className={rulesStyles.rule}>
              <h3>{rule.title}</h3>
              <p
                dangerouslySetInnerHTML={{
                  __html: rule.content,
                }}
              />
            </div>
          ))}
        <ul className={rulesStyles.badges}>
          {rulesData?.badges &&
            rulesData?.badges.map((badge) => (
              <li key={badge.title}>
                <OEPAnalytics
                  page="Leaderboard"
                  componentType="Card"
                  url={`Select ${badge.title}`}
                  componentName={`Select ${badge.title} Badge`}
                >
                  <button type="button" onClick={openRule.bind(null, badge)}>
                    <img src={badge.imageURL} alt={badge.imageAltText} />
                    <span>{badge.title}</span>
                  </button>
                </OEPAnalytics>
              </li>
            ))}
        </ul>
      </div>
      <Modal
        active={modalActive}
        closeCallback={closeModal}
        button={[
          <ModalButtons
            type={BUTTON_TYPES.closeIcon}
            key={BUTTON_TYPES.closeIcon}
            page="Leaderboard"
            componentType="Close Leaderboard Rule Modal"
            url="Leaderboard Modal"
            componentName="Close Leaderboard Rule Modal"
          />,
        ]}
        modalType={MODAL_TYPES.leaderBoard}
      >
        <RuleModal data={modalContent} />
      </Modal>
    </Fragment>
  );
};

export default Rules;

Rules.Rules = {
  rulesData: PropTypes.shape({
    rules: PropTypes.shape({
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    }),
    badges: PropTypes.shape({
      title: PropTypes.string.isRequired,
      imageURL: PropTypes.string.isRequired,
      imageAltText: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
