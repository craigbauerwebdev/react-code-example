import LinkWrapper from "../LinkWrapper/LinkWrapper";
import React from "react";
import SvgTypes from "Components/SVG/SvgTypes";
import cardStyles from "./scss/sidenav-card.module.scss";
import getAnalyticsPage from "util/getAnalyticsPage";
import { useLocation } from "react-router-dom";

const SideNavCard = ({
  title,
  iconUrl,
  active,
  linkUrl,
  isNested,
  sectionRef,
}) => {
  const location = useLocation();
  const addMyToLabel = () => {
    if (
      title === "Profile" ||
      title === "Schedule" ||
      title === "Profile" ||
      title === "Notifications" ||
      title === "Favorites" ||
      title === "Settings"
    ) {
      return "My ";
    }
    return "";
  };

  const updateSectionFocus = () => {
    sectionRef.current.focus();
  };
  return (
    <LinkWrapper
      className={`
        ${cardStyles.cardWrapper}
        ${active ? cardStyles.active : ""}
        ${isNested && cardStyles.nested}
      `}
      to={linkUrl}
      title={`Go to ${addMyToLabel()}${title}`}
      aria-label={`Go to ${addMyToLabel()}${title}`}
      page={getAnalyticsPage(location.pathname)}
      componentType="Side Nav"
      trackingUrl={linkUrl}
      onClick={updateSectionFocus}
      componentName={title}
    >
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
        <span>{title}</span>
      </span>
      <div className={cardStyles.title}>{title}</div>
    </LinkWrapper>
  );
};

export default SideNavCard;
