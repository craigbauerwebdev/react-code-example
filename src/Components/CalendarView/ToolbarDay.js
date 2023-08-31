import OEPAnalytics from "Components/OEPAnalytics";
import React from "react";
import toolbarStyles from "./scss/toolbar.module.scss";

function ToolbarDay({ name, active }) {
  return (
    <OEPAnalytics componentType="Button" page="Calendar">
      <button
        key={name}
        className={active ? toolbarStyles.active : ""}
        componentName={name}
      >
        {name}
      </button>
    </OEPAnalytics>
  );
}

export default React.memo(ToolbarDay);
