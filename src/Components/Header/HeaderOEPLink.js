import LinkWrapper from "Components/LinkWrapper/LinkWrapper";
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { convertPathToComponentName } from "util/getAnalyticsComponentName";
import getAnalyticsPage from "util/getAnalyticsPage";
import { withRouter } from "react-router-dom";
const HeaderOEPLink = ({
  href,
  onClick,
  children,
  className,
  grip,
  role,
  location,
}) => {
  const [pathname, setPathname] = useState("");
  useEffect(() => setPathname(location.pathname), [location.pathname]);
  // For Grip review https://github.com/Klowd/onlineeventpro-product-ui/wiki/Grip
  return (
    href && (
      <LinkWrapper
        role={role}
        className={className}
        to={href}
        onClick={onClick}
        external={href[0] !== "/"}
        grip={grip}
        page={getAnalyticsPage(pathname)}
        componentType="navigation item"
        trackingUrl={grip ? "Schedule a Meeting (Grip Link)" : href}
        componentName={
          grip
            ? "Schedule a Meeting (Grip Link)"
            : convertPathToComponentName(href)
        }
      >
        {children}
      </LinkWrapper>
    )
  );
};

HeaderOEPLink.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

HeaderOEPLink.defaultProps = {
  onClick: () => {},
  className: "",
};

export default withRouter(HeaderOEPLink);
