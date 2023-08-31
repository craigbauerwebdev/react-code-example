import OEPAnalytics from "Components/OEPAnalytics";
import PropTypes from "prop-types";
import React from "react";
import ReactTooltip from "react-tooltip";
import expandToggle from "./scss/expand-toggle.module.scss";

const ExpandToggle = ({
  expanded,
  page,
  handleClick,
  classList,
  ariaLabel,
  ariaControls,
  sessionId,
  disabled,
  sessionName,
}) => {
  if (disabled) {
    return null;
  }
  const [openLabel, closeLabel] = ariaLabel;
  const getClassNames = () => {
    return classList.map((className) => expandToggle[className]).join(" ");
  };
  return (
    <OEPAnalytics
      page={page}
      componentType="Accordion"
      url={`${expanded ? "Collapsed accordion" : "Expanded accordion"}`}
      classList
      componentName={
        sessionName || (expanded ? "ExpandedToggle" : "CollapsedToggle")
      }
    >
      <button
        data-tip={expanded ? openLabel : closeLabel}
        className={`${expandToggle.imgButton} ${classList && getClassNames()}`}
        onClick={handleClick}
        aria-label={expanded ? openLabel : closeLabel}
        aria-expanded={expanded ? true : false}
        aria-controls={ariaControls}
      >
        <span
          className={`${expandToggle.holder} ${expanded && expandToggle.open}`}
        >
          <span className={expandToggle.hLine}></span>
          <span className={expandToggle.vLine}></span>
        </span>
        <ReactTooltip />
      </button>
    </OEPAnalytics>
  );
};

export default ExpandToggle;

ExpandToggle.propTypes = {
  expanded: PropTypes.bool.isRequired,
  page: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  classList: PropTypes.arrayOf(PropTypes.string.isRequired),
  ariaLabel: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};
