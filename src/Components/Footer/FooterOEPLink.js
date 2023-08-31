import LinkWrapper from "Components/LinkWrapper/LinkWrapper";
import PropTypes from "prop-types";
import React from "react";
import getAnalyticsPage from "util/getAnalyticsPage";
import { withRouter } from "react-router-dom";
import { convertPathToComponentName } from "util/getAnalyticsComponentName";
const FooterOEPLink = ({
  href,
  componentType,
  onClick,
  children,
  className,
  grip,
  location,
}) => {
  return (
    <LinkWrapper
      className={className}
      to={href}
      onClick={onClick}
      external={href[0] !== "/"}
      grip={grip}
      page={getAnalyticsPage(location.pathname)}
      componentType={componentType}
      trackingUrl={grip ? "Network (Grip Link)" : href}
      componentName={convertPathToComponentName(href)}
    >
      {/* For Grip review https://github.com/Klowd/onlineeventpro-product-ui/wiki/Grip */}
      {children}
    </LinkWrapper>
  );
};

FooterOEPLink.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

FooterOEPLink.defaultProps = {
  componentType: "navigation item",
  onClick: () => {},
  className: "",
};

export default withRouter(FooterOEPLink);
