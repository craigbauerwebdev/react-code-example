import LinkWrapper from "Components/LinkWrapper/LinkWrapper";
import React from "react";
import footerStyles from "./scss/footer.module.scss";
import getAnalyticsPage from "util/getAnalyticsPage";
import lodash from "lodash";
import { useLocation } from "react-router-dom";

const FooterLogo = ({ logo }) => {
  const location = useLocation();

  if (lodash.isEmpty(logo)) {
    return null;
  }

  return logo.map((img) => {
    const getImg = () => {
      return (
        <img
          key={img.imageURL}
          className={footerStyles.footerLogo}
          alt={img.imageAltText}
          src={img.imageURL}
        />
      );
    };

    if (img.imageLinkURL) {
      return (
        <LinkWrapper
          to={img.imageLinkURL}
          external={img.imageLinkTarget === "_blank"}
          key={img.imageAltText}
          page={getAnalyticsPage(location.pathname)}
          componentType="Logo"
          trackingUrl={img.imageLinkURL}
          componentName="OEP logo"
        >
          {getImg()}
        </LinkWrapper>
      );
    }

    return getImg();
  });
};

export default FooterLogo;
