import React from "react";

import cardStyles from "./scss/sidenav-card.module.scss";
import SvgTypes from "Components/SVG/SvgTypes";

const SideNavSection = ({ title, iconUrl, active, children }) => {
  return (
    <div>
      <div className={`${cardStyles.cardWrapper} ${cardStyles.noHover}`}>
        <span
          className={`${cardStyles.image} ${
            active ? cardStyles.imageActive : ""
          }`}
        >
          <SvgTypes name={iconUrl} />
          <span className="sr-only">{title}</span>
        </span>
        {/* mobile image */}
        <span
          className={`${cardStyles.mobileImage} ${
            active ? cardStyles.imageActive : ""
          }`}
        >
          <SvgTypes name={iconUrl} />
          <span className="sr-only">{title}</span>
        </span>
        <div className={cardStyles.title}>{title}</div>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default SideNavSection;
