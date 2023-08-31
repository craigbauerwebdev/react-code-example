import React from "react";
import PropTypes from "prop-types";

export default function MobileHeaderNavItem({ children }) {
  return (
    <div className="header-label header-label-fake-button">
      <h4>{children}</h4>
    </div>
  );
}

MobileHeaderNavItem.propTypes = {
  children: PropTypes.node.isRequired,
};
