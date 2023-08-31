import React from "react";
import { bpMap } from "util/bpMap";
import useToggleDisplayMQ from "hooks/useToggleDisplayMQ";
/**
 * Sidebar title for screens below 768px
 * @param {string} title Mobile title for sidebar
 */
const SideBarTitle = ({ title, node }) => {
  const isMobile = useToggleDisplayMQ(bpMap.tablet);

  if (isMobile) {
    return (
      <h1>
        {title} {node && node}
      </h1>
    );
  }

  return null;
};

export default SideBarTitle;
