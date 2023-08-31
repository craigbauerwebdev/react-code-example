import LinkWrapper from "Components/LinkWrapper/LinkWrapper";
import Meta from "../Meta";
import React from "react";

export const Register = () => (
  <div className="register-banner">
    <Meta pageTitle="Register" />
    <div className="register-banner-container">
      <h1>Your Event</h1>
      <h2>
        September 7 - 9, 2020
        <br />
        Las Vegas, Nevada
      </h2>
      <LinkWrapper
        to="/register"
        rel="noopener"
        className="details-button details-button-white"
        page="Register page"
        componentType="Link"
        trackingUrl="Register"
        componentName="Register"
      >
        Register
      </LinkWrapper>
    </div>
  </div>
);
