import React from "react";
/**
 * Sidebar Date and Time
 * @param {string} date display date
 * @param {string} time display time
 */
const SideBarDateTime = ({ date, time }) => {
  if (!date) {
    return null;
  }

  return (
    <h2>
      {date}
      <br />
      {time}
    </h2>
  );
};

export default SideBarDateTime;
