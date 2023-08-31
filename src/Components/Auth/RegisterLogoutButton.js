import LinkWrapper from "Components/LinkWrapper/LinkWrapper";
import React from "react";

export default (props) => (
  <div className={`auth-bar ${props.isMobile && "mobile"}`}>
    {props.user && (
      <LinkWrapper
        to="/logout"
        className="details-button details-button-header details-button-inverse item secondary-bg"
        page="Register Logout"
        componentType="Button"
        trackingUrl="/logout"
        componentName="Log out"
      >
        Sign Out
      </LinkWrapper>
    )}
    {!props.user && (
      <LinkWrapper
        to={process.env.REACT_APP_URL_REGISTER}
        external={true}
        className="details-button details-button-header details-button-inverse secondary secondary-bg item"
        page="Register Logout"
        componentType="Button"
        trackingUrl={process.env.REACT_APP_URL_REGISTER}
        componentName="Register"
      >
        Register
      </LinkWrapper>
    )}

    {props.children}
  </div>
);
