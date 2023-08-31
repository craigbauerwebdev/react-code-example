import LinkWrapper from "Components/LinkWrapper/LinkWrapper";
import OEPAnalytics from "Components/OEPAnalytics";
import React from "react";

export const PreEventHeader = (props) => (
  <div id="header" className="header">
    <div className="headerinteriordiv">
      <LinkWrapper
        to="/"
        className="primarylogo"
        page="PreEvent Header"
        componentType="Home"
        trackingUrl="/"
      >
        <img src="images/your-event.png" alt=" Your Event" className="image" />
      </LinkWrapper>
      <div className="headerinteriordivright">
        <ul className="div-block">
          <li>
            <LinkWrapper
              to="/"
              external={true}
              className="buttonprimary w-button"
              page="PreEvent Header"
              componentType="Register for 2021"
              trackingUrl="/"
              componentName="register now"
            >
              Register Now
            </LinkWrapper>
          </li>
          <li>
            <OEPAnalytics
              page="PreEvent Header"
              componentType="FAQ"
              url="#event-faq"
              componentName="FAQs"
            >
              <a
                href="#event-faq"
                className="buttonprimary w-button faqs-button"
              >
                FAQS
              </a>
            </OEPAnalytics>
          </li>
        </ul>
      </div>
    </div>
  </div>
);
