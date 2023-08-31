import OEPAnalytics from "Components/OEPAnalytics";
import React from "react";
import cardStyles from "../scss/webinar-card.module.scss";
import getAnalyticsPage from "util/getAnalyticsPage";
import { useLocation } from "react-router-dom";

const AddButton = () => {
  const location = useLocation();
  return (
    <OEPAnalytics
      componentType="Button"
      page={getAnalyticsPage(location.pathname)}
      url="Add Event"
      componentName="Add Event"
    >
      <button className={cardStyles.addButton}>
        <img src="/images/icons/Add.png" alt="" role="presentation" />
        <span className={cardStyles.btnText}>Add</span>
      </button>
    </OEPAnalytics>
  );
};

export default AddButton;
