import LinkWrapper from "Components/LinkWrapper/LinkWrapper";
import React from "react";

export default (props) => (
  <div className="authbar">
    {props.user && (
      <LinkWrapper
        to="/logout"
        className="details-button details-button-header details-button-inverse primary-bg item"
        page="Header"
        componentType="Button"
        trackingUrl="/logout"
        componentName="Log Out"
      >
        Sign Out
      </LinkWrapper>
    )}
    {!props.user && (
      <LinkWrapper
        to="/redirect"
        className="details-button details-button-header details-button-inverse primary-bg item"
        page="Header"
        componentType="Button"
        trackingUrl="/login"
        componentName="Log In"
      >
        Sign In
      </LinkWrapper>
    )}
  </div>
);
