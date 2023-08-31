import React, { useState } from "react";

import OEPAnalytics from "Components/OEPAnalytics";
import accountProfileStyles from "./scss/account-profile.module.scss";
import getAnalyticsPage from "util/getAnalyticsPage";
import { useLocation } from "react-router-dom";

/**
 * TODO: Fill me out!!
 * @param {*} param0
 */
const FormButtons = ({ cancelCallback }) => {
  const [confirmView, setConfirmView] = useState(false);
  const location = useLocation();

  const toggleConfirmState = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setConfirmView(true);
  };

  const updateText = () => setConfirmView(false);

  return (
    <div
      className={accountProfileStyles.formButtons}
      style={{ display: "flex", justifyContent: "right" }}
    >
      <div className="k-form-buttons">
        <OEPAnalytics
          componentType="Button"
          page={getAnalyticsPage(location.pathname)}
          url="Cancel"
          componentName="Cancel"
        >
          <button
            type="button"
            className={accountProfileStyles.cancelButton}
            onClick={cancelCallback}
          >
            Cancel
          </button>
        </OEPAnalytics>
        {confirmView ? (
          <OEPAnalytics
            componentType="Button"
            page={getAnalyticsPage(location.pathname)}
            url="Confirm save"
            componentName="Confirm save"
          >
            <button
              type="submit"
              onClick={updateText}
              className={accountProfileStyles.submitButton}
            >
              Confirm Save
            </button>
          </OEPAnalytics>
        ) : (
          <OEPAnalytics
            componentType="Button"
            page={getAnalyticsPage(location.pathname)}
            url="Save"
            componentName="Save"
          >
            <button
              onClick={toggleConfirmState}
              className={accountProfileStyles.submitButton}
            >
              Save
            </button>
          </OEPAnalytics>
        )}
      </div>
    </div>
  );
};

export default FormButtons;
