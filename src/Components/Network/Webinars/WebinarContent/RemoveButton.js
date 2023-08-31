import CardStyles from "../scss/webinar-card.module.scss";
import OEPAnalytics from "Components/OEPAnalytics";
import React from "react";
import getAnalyticsPage from "util/getAnalyticsPage";
import { useLocation } from "react-router-dom";

const RemoveButton = () => {
  const location = useLocation();
  return (
    <OEPAnalytics
      componentType="Button"
      page={getAnalyticsPage(location.pathname)}
      url="Remove event"
      componentName="Remove event"
    >
      <button className={CardStyles.removeButton} type="button">
        <img src="/images/icons/Remove.png" alt="" role="presentation" />
        <span className={CardStyles.btnText}>Remove</span>
      </button>
    </OEPAnalytics>
  );
};

export default RemoveButton;
