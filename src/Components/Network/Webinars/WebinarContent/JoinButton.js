import OEPAnalytics from "Components/OEPAnalytics";
import React from "react";
import cardStyles from "../scss/webinar-card.module.scss";
import getAnalyticsPage from "util/getAnalyticsPage";
import { useLocation } from "react-router-dom";

const JoinButton = () => {
  const location = useLocation();
  return (
    <OEPAnalytics
      componentType="Button"
      page={getAnalyticsPage(location.pathname)}
      url="Join Event"
      componentName="Join Event"
    >
      <button
        className={cardStyles.joinButton}
        aria-label={`Join Event`}
        type="submit"
      >
        Join
      </button>
    </OEPAnalytics>
  );
};

export default JoinButton;
