import OEPAnalytics from "Components/OEPAnalytics";
import React from "react";
import modalStyles from "./scss/meeting-modals.module.scss";

const MeetingModalButtons = ({ page, name, clickEvt }) => {
  return (
    <OEPAnalytics
      page={page}
      componentType="Button"
      url={`View ${name}`}
      componentName={name}
    >
      <button
        type="button"
        look="outline"
        className={modalStyles.cancelButton}
        onClick={clickEvt}
      >
        {name}
      </button>
    </OEPAnalytics>
  );
};

export default MeetingModalButtons;
