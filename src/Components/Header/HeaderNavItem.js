import React from "react";
import PropTypes from "prop-types";

export default function HeaderNavItem({ children }) {
  return (
    <ul>
      <div className="header-label">
        <h4>{children}</h4>
      </div>
    </ul>
  );
}

HeaderNavItem.propTypes = {
  children: PropTypes.node.isRequired,
};
