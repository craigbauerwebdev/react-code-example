import LinkWrapper from "Components/LinkWrapper/LinkWrapper";
import React from "react";
import registerBannerStyles from "./scss/pre-event-register-banner.module.scss";

const PreEventRegisterBanner = () => {
  return (
    <div className={registerBannerStyles.registerBanner}>
      <div className={registerBannerStyles.registerBannerContainer}>
        <h1>Your Event</h1>
        <h2>
          September 7 - 9, 2020
          <br />
          Las Vegas, Nevada
        </h2>
        <LinkWrapper
          to="/register"
          rel="noopener"
          page="PreEvent Header"
          componentType="Register Now"
          trackingUrl="/"
          componentName="register"
        >
          Register
        </LinkWrapper>
      </div>
    </div>
  );
};

export default PreEventRegisterBanner;
