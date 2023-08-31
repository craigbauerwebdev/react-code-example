import CardStyles from "../scss/webinar-card.module.scss";
import OEPAnalytics from "Components/OEPAnalytics";
import React from "react";
import getAnalyticsPage from "util/getAnalyticsPage";
import { useLocation } from "react-router-dom";

const ViewButton = (props) => {
  const location = useLocation();
  return (
    <OEPAnalytics
      componentType="Button"
      page={getAnalyticsPage(location.pathname)}
      url="View meeting"
      componentName="View meeting"
    >
      <button className={CardStyles.viewButton} {...props}>
        View
      </button>
    </OEPAnalytics>
  );
};

export default ViewButton;
