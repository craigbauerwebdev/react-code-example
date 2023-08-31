import React from "react";
import sideBarStyles from "./scss/single-side-bar.module.scss";
/**
 * Generic Sidebar Item
 * @param {object} data
 * @param {string} data.title section title
 * @param {string} data.content section content
 */
const SideBarItem = ({ data: { title, content }, boothStyle = "" }: any) => {
  return (
    <section
      className={`${sideBarStyles.sessionMeta} ${
        boothStyle === "Dark Mode" && sideBarStyles.darkMode
      }`}
    >
      <h2>{title}</h2>
      <p>{content}</p>
    </section>
  );
};
export default SideBarItem;
