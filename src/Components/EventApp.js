import LinkWrapper from "./LinkWrapper/LinkWrapper";
import React from "react";

export const EventApp = () => (
  <div className="footer-wrapper ">
    <div className="event-app">
      <div className="event-app-banner-container">
        <h1>Download the Your Event LIVE! App</h1>
        <div className="download-buttons-containner">
          <LinkWrapper
            to="https://cvent.me/3qbPY"
            external={true}
            className="download-app-button gtm-download-event"
            page="Event App"
            componentType="Button"
            trackingUrl="App Store (iPhone) https://cvent.me/3qbPY"
            componentName="Apple download"
          >
            <img
              src="https://uploads-ssl.webflow.com/5de98c06bb83ab5540fc1c92/5e5e9e12c84954381529cb3e_Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg"
              alt="Download on the App Store"
            />
          </LinkWrapper>
          <LinkWrapper
            to="https://cvent.me/3qbPY"
            external={true}
            className="download-app-button gtm-download-event"
            page="Event App"
            componentType="Button"
            trackingUrl="Play Store (Android) https://cvent.me/3qbPY"
            componentName="Google Play"
          >
            <img
              src="https://uploads-ssl.webflow.com/5de98c06bb83ab5540fc1c92/5e5f1d5b7dbd992d7116a3ba_google-play-badge.png"
              alt="Get it on Google Play"
            />
          </LinkWrapper>
        </div>
      </div>
    </div>
  </div>
);
