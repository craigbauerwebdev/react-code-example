import React from "react";
import sideBarStyles from "./scss/single-side-bar.module.scss";

const SideBarCategories = ({ data: { title, data }, boothStyle = "" }) => {
  return (
    <section
      className={`${sideBarStyles.sessionMeta} ${
        boothStyle === "Dark Mode" && sideBarStyles.darkMode
      }`}
    >
      <h2>{title}</h2>
      <ul>
        {data?.length ? data.map((cat) => <li key={cat}>{cat}</li>) : null}
      </ul>
    </section>
  );
};

export default SideBarCategories;
